import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { User } from "../models/User.js";
import { PublicUser } from "../models/PublicUser.js";
import { signToken } from "../middleware/auth.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
	assertProviderEnabled,
	buildAuthorizeUrl,
	exchangeCode,
	generateCodeVerifier,
	getCallbackUrl,
	randomState,
	verifyIdTokenAndProfile,
} from "../services/oauthService.js";

const STATE_COOKIE = "lu_oauth_state";
const STATE_TTL_SECONDS = 10 * 60;

function parseCookies(req) {
	const header = req.headers.cookie || "";
	const cookies = {};
	for (const part of header.split(";")) {
		const index = part.indexOf("=");
		if (index === -1) continue;
		const key = part.slice(0, index).trim();
		const value = part.slice(index + 1).trim();
		if (!key) continue;
		try {
			cookies[key] = decodeURIComponent(value);
		} catch {
			cookies[key] = value;
		}
	}
	return cookies;
}

function signState(payload) {
	return jwt.sign(payload, config.JWT_SECRET, { expiresIn: STATE_TTL_SECONDS });
}

function verifyState(token) {
	return jwt.verify(token, config.JWT_SECRET);
}

function setStateCookie(res, value) {
	const maxAge = STATE_TTL_SECONDS;
	const parts = [
		`${STATE_COOKIE}=${encodeURIComponent(value)}`,
		`Path=/api/auth/oauth`,
		`Max-Age=${maxAge}`,
		"HttpOnly",
		"SameSite=Lax",
	];
	if (config.isProduction) parts.push("Secure");
	res.setHeader("Set-Cookie", parts.join("; "));
}

function clearStateCookie(res) {
	res.setHeader(
		"Set-Cookie",
		`${STATE_COOKIE}=; Path=/api/auth/oauth; Max-Age=0; HttpOnly; SameSite=Lax${config.isProduction ? "; Secure" : ""}`,
	);
}

function sanitizeReturnTo(value) {
	if (!value || typeof value !== "string") return null;
	const trimmed = value.trim();
	if (!trimmed.startsWith("/")) return null;
	if (trimmed.startsWith("//")) return null;
	// Only allow return paths inside the site (no full URLs).
	if (trimmed.includes("://")) return null;
	return trimmed.slice(0, 512);
}

function frontendBase() {
	return (
		(config.frontendUrl || "").replace(/\/+$/, "") ||
		config.corsOrigins[0] ||
		"http://localhost:5173"
	).replace(/\/+$/, "");
}

function redirectToCallback(res, { token, error, audience, returnTo }) {
	const base = frontendBase();
	const hashParams = new URLSearchParams();
	if (token) {
		hashParams.set("token", token);
		hashParams.set("audience", audience || "public");
	}
	if (error) hashParams.set("error", error);
	if (returnTo) hashParams.set("returnTo", returnTo);
	const hash = hashParams.toString();
	const url = `${base}/auth/callback${hash ? `#${hash}` : ""}`;
	res.redirect(302, url);
}

export const listProviders = asyncHandler(async (_req, res) => {
	const providers = [];
	if (config.GOOGLE_CLIENT_ID && config.GOOGLE_CLIENT_SECRET) {
		providers.push({ id: "google", name: "Google", enabled: true });
	}
	if (config.APPLE_CLIENT_ID && config.APPLE_TEAM_ID && config.APPLE_KEY_ID) {
		providers.push({ id: "apple", name: "Apple", enabled: true });
	}
	res.json({
		success: true,
		data: {
			enabled: providers.length > 0,
			providers,
		},
	});
});

export const startOAuth = asyncHandler(async (req, res) => {
	const { provider } = req.params;
	assertProviderEnabled(provider);

	const audience = req.query.audience === "admin" ? "admin" : "public";
	const returnTo = sanitizeReturnTo(req.query.returnTo || req.query.return_to);

	const state = randomState();
	const codeVerifier = generateCodeVerifier();
	const nonce = randomState();

	const signed = signState({
		state,
		provider,
		audience,
		returnTo,
		codeVerifier,
		nonce,
	});

	setStateCookie(res, signed);
	res.redirect(302, buildAuthorizeUrl(provider, { state, codeVerifier, nonce }));
});

function isAllowlistedEmail(email) {
	if (!email) return false;
	const normalized = email.toLowerCase();
	if (normalized === config.SEED_ADMIN_EMAIL?.toLowerCase()) return true;
	return config.adminOauthAllowlist.includes(normalized);
}

async function resolveAdminUser(profile, provider) {
	const { providerId, email, emailVerified, name, avatar } = profile;

	let user = await User.findOne({
		"providers.provider": provider,
		"providers.providerId": providerId,
	});

	if (!user) {
		user = await User.findOne({ email });
	}

	if (user) {
		user.linkProvider(provider, providerId, email, emailVerified);
		if (avatar && !user.avatar) user.avatar = avatar;
		if (emailVerified) user.emailVerified = true;
		user.lastLoginAt = new Date();
		await user.save();
		return { user, isNew: false };
	}

	if (!emailVerified) {
		throw ApiError.forbidden("Email must be verified with the provider to access the admin panel.");
	}

	if (!isAllowlistedEmail(email)) {
		throw ApiError.forbidden(
			"This email is not authorized for the admin panel. Ask an administrator to add it to ADMIN_OAUTH_ALLOWLIST.",
		);
	}

	const role = email.toLowerCase() === config.SEED_ADMIN_EMAIL?.toLowerCase() ? "admin" : "editor";
	const created = await User.create({
		name,
		email,
		avatar: avatar || undefined,
		emailVerified: true,
		role,
		isActive: true,
		providers: [
			{
				provider,
				providerId,
				email,
				verified: true,
				connectedAt: new Date(),
			},
		],
		lastLoginAt: new Date(),
	});
	return { user: created, isNew: true };
}

async function resolvePublicUser(profile, provider) {
	const { providerId, email, emailVerified, name, avatar } = profile;

	let user = await PublicUser.findOne({
		"providers.provider": provider,
		"providers.providerId": providerId,
	});

	if (!user) {
		user = await PublicUser.findOne({ email });
	}

	if (user) {
		user.linkProvider(provider, providerId, email, emailVerified);
		if (avatar && !user.avatar) user.avatar = avatar;
		if (emailVerified) user.emailVerified = true;
		if (!user.isActive) user.isActive = true;
		user.lastLoginAt = new Date();
		await user.save();
		return { user, isNew: false };
	}

	const created = await PublicUser.create({
		name,
		email,
		avatar: avatar || undefined,
		emailVerified: Boolean(emailVerified),
		isActive: true,
		providers: [
			{
				provider,
				providerId,
				email,
				verified: Boolean(emailVerified),
				connectedAt: new Date(),
			},
		],
		lastLoginAt: new Date(),
	});
	return { user: created, isNew: true };
}

export const oauthCallback = asyncHandler(async (req, res) => {
	const { provider } = req.params;
	let statePayload = null;
	try {
		const raw = parseCookies(req)[STATE_COOKIE];
		clearStateCookie(res);
		if (!raw) throw new Error("Missing OAuth state cookie");
		statePayload = verifyState(raw);
		if (statePayload.provider !== provider) {
			throw new Error("OAuth provider mismatch");
		}
	} catch {
		return redirectToCallback(res, {
			error: "Your sign-in session expired. Please try again.",
			audience: "public",
		});
	}

	const { audience, returnTo, codeVerifier } = statePayload;

	// Apple posts back via form_post (body); Google uses query params.
	const resolvedCode = req.query.code || req.body?.code || null;
	const queryError = req.query.error || req.body?.error;
	const queryErrorDesc = req.query.error_description || req.body?.error_description;

	if (queryError) {
		return redirectToCallback(res, {
			error: queryErrorDesc || "Sign-in was cancelled or failed. Please try again.",
			audience,
			returnTo,
		});
	}
	if (!resolvedCode) {
		return redirectToCallback(res, {
			error: "Sign-in failed. Please try again.",
			audience,
			returnTo,
		});
	}

	try {
		const tokenResponse = await exchangeCode(provider, {
			code: resolvedCode,
			codeVerifier,
		});

		const idToken = tokenResponse.id_token;
		if (!idToken) {
			throw new Error("Provider did not return an id_token.");
		}

		const profile = await verifyIdTokenAndProfile(provider, {
			idToken,
			rawUser: req.body?.user,
		});

		const resolved =
			audience === "admin"
				? await resolveAdminUser(profile, provider)
				: await resolvePublicUser(profile, provider);

		const { user } = resolved;
		const token = signToken(user, { kind: audience });
		return redirectToCallback(res, {
			token,
			audience,
			returnTo: returnTo || (audience === "admin" ? "/admin" : "/account"),
		});
	} catch (error) {
		console.error(`[oauth:${provider}] callback failed:`, error?.message || error);
		const message =
			error?.message && error.message.length < 300
				? error.message
				: "Sign-in failed. Please try again.";
		return redirectToCallback(res, {
			error: message,
			audience,
			returnTo,
		});
	}
});

export const publicMe = asyncHandler(async (req, res) => {
	const user = await PublicUser.findById(req.user.id);
	if (!user) throw ApiError.notFound("User not found");
	res.json({ success: true, data: user });
});

export const adminMeOAuth = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id).populate("coach", "firstName lastName title");
	if (!user) throw ApiError.notFound("User not found");
	res.json({ success: true, data: user });
});

// Re-export for callers that need the callback URL in tests/docs.
export { getCallbackUrl };
