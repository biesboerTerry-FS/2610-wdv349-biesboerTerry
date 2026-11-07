import crypto from "node:crypto";
import fs from "node:fs";
import { SignJWT, jwtVerify, importPKCS8, createRemoteJWKSet } from "jose";
import { config, oauthConfig } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

export const OAUTH_PROVIDERS = ["google", "apple"];
export const OAUTH_AUDIENCES = ["admin", "public"];

const GOOGLE = {
	authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
	tokenUrl: "https://oauth2.googleapis.com/token",
	jwksUrl: "https://www.googleapis.com/oauth2/v3/certs",
	issuers: ["https://accounts.google.com", "https://www.googleapis.com"],
	name: "Google",
};

const APPLE = {
	authUrl: "https://appleid.apple.com/auth/authorize",
	tokenUrl: "https://appleid.apple.com/auth/token",
	jwksUrl: "https://appleid.apple.com/auth/keys",
	issuers: ["https://appleid.apple.com"],
	name: "Apple",
};

const PROVIDER_META = { google: GOOGLE, apple: APPLE };

const googleJwks = createRemoteJWKSet(new URL(GOOGLE.jwksUrl));
const appleJwks = createRemoteJWKSet(new URL(APPLE.jwksUrl));

export function getCallbackUrl(provider) {
	if (config.OAUTH_CALLBACK_URL) {
		const base = config.OAUTH_CALLBACK_URL.replace(/\/+$/, "");
		return `${base}/${provider}/callback`;
	}
	return `${oauthConfig.apiPublicUrl}/api/auth/oauth/${provider}/callback`;
}

export function isProviderEnabled(provider) {
	if (provider === "google") return oauthConfig.isGoogleEnabled;
	if (provider === "apple") return oauthConfig.isAppleEnabled;
	return false;
}

export function assertProviderEnabled(provider) {
	if (!OAUTH_PROVIDERS.includes(provider)) {
		throw ApiError.notFound("OAuth provider not found");
	}
	if (!isProviderEnabled(provider)) {
		throw ApiError.badRequest(
			`${PROVIDER_META[provider].name} sign-in is not configured on this server.`,
		);
	}
}

export function randomState() {
	return crypto.randomBytes(32).toString("base64url");
}

export function generateCodeVerifier() {
	return crypto.randomBytes(48).toString("base64url");
}

export function codeChallengeFromVerifier(verifier) {
	return crypto.createHash("sha256").update(verifier).digest("base64url");
}

function readApplePrivateKey() {
	if (config.APPLE_PRIVATE_KEY_PATH) {
		return fs.readFileSync(config.APPLE_PRIVATE_KEY_PATH, "utf8");
	}
	if (!config.APPLE_PRIVATE_KEY) return null;
	let key = config.APPLE_PRIVATE_KEY.trim();
	// Vercel env vars often store the .p8 as base64 or with escaped newlines.
	if (!key.includes("BEGIN PRIVATE KEY")) {
		try {
			key = Buffer.from(key, "base64").toString("utf8");
		} catch {
			// fall through — importPKCS8 will throw a useful error
		}
	}
	key = key.replace(/\\n/g, "\n");
	return key;
}

async function buildAppleClientSecret() {
	const pem = readApplePrivateKey();
	if (!pem) {
		throw ApiError.badRequest("Apple sign-in is not configured (missing private key).");
	}
	const alg = "ES256";
	const key = await importPKCS8(pem, alg);
	const now = Math.floor(Date.now() / 1000);
	return new SignJWT({})
		.setProtectedHeader({ alg, kid: config.APPLE_KEY_ID })
		.setIssuer(config.APPLE_TEAM_ID)
		.setAudience("https://appleid.apple.com")
		.setSubject(config.APPLE_CLIENT_ID)
		.setIssuedAt(now)
		.setExpirationTime(now + 5 * 60)
		.sign(key);
}

export function buildAuthorizeUrl(provider, { state, codeVerifier, nonce } = {}) {
	assertProviderEnabled(provider);
	const redirectUri = getCallbackUrl(provider);
	const params = new URLSearchParams();

	if (provider === "google") {
		params.set("client_id", config.GOOGLE_CLIENT_ID);
		params.set("redirect_uri", redirectUri);
		params.set("response_type", "code");
		params.set("scope", "openid profile email");
		params.set("state", state);
		if (codeVerifier) {
			params.set("code_challenge", codeChallengeFromVerifier(codeVerifier));
			params.set("code_challenge_method", "S256");
		}
		params.set("access_type", "online");
		params.set("prompt", "select_account");
		return `${GOOGLE.authUrl}?${params.toString()}`;
	}

	// Apple requires form_post so the callback arrives as POST.
	params.set("client_id", config.APPLE_CLIENT_ID);
	params.set("redirect_uri", redirectUri);
	params.set("response_type", "code");
	params.set("scope", "name email");
	params.set("state", state);
	params.set("response_mode", "form_post");
	if (nonce) params.set("nonce", nonce);
	if (codeVerifier) {
		params.set("code_challenge", codeChallengeFromVerifier(codeVerifier));
		params.set("code_challenge_method", "S256");
	}
	return `${APPLE.authUrl}?${params.toString()}`;
}

async function tokenRequest(url, body) {
	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams(body),
	});
	const text = await res.text();
	let json = null;
	try {
		json = text ? JSON.parse(text) : null;
	} catch {
		// non-JSON error from provider
	}
	if (!res.ok) {
		throw ApiError.unauthorized(
			json?.error_description || json?.error || "OAuth token exchange failed",
		);
	}
	return json;
}

export async function exchangeCode(provider, { code, codeVerifier }) {
	assertProviderEnabled(provider);
	const redirectUri = getCallbackUrl(provider);

	if (provider === "google") {
		return tokenRequest(GOOGLE.tokenUrl, {
			grant_type: "authorization_code",
			code,
			redirect_uri: redirectUri,
			client_id: config.GOOGLE_CLIENT_ID,
			client_secret: config.GOOGLE_CLIENT_SECRET,
			...(codeVerifier ? { code_verifier: codeVerifier } : {}),
		});
	}

	const clientSecret = await buildAppleClientSecret();
	return tokenRequest(APPLE.tokenUrl, {
		grant_type: "authorization_code",
		code,
		redirect_uri: redirectUri,
		client_id: config.APPLE_CLIENT_ID,
		client_secret: clientSecret,
		...(codeVerifier ? { code_verifier: codeVerifier } : {}),
	});
}

async function verifyWithJwks(provider, idToken, expectedAudience) {
	const meta = PROVIDER_META[provider];
	const jwks = provider === "google" ? googleJwks : appleJwks;
	const { payload } = await jwtVerify(idToken, jwks, {
		issuer: meta.issuers,
		audience: expectedAudience,
	});
	return payload;
}

function normalizeVerified(value) {
	return value === true || value === "true";
}

/**
 * Verifies an id_token and returns a normalized profile:
 * { providerId, email, emailVerified, name, avatar }
 */
export async function verifyIdTokenAndProfile(provider, { idToken, rawUser }) {
	assertProviderEnabled(provider);
	const expectedAudience = provider === "google" ? config.GOOGLE_CLIENT_ID : config.APPLE_CLIENT_ID;

	const claims = await verifyWithJwks(provider, idToken, expectedAudience);

	const providerId = claims.sub;
	const email = claims.email?.toLowerCase?.() || null;
	const emailVerified = normalizeVerified(claims.email_verified);
	let name = claims.name || null;
	const avatar = claims.picture || null;

	// Apple only returns the name once (inside the `user` POST field).
	if (!name && rawUser) {
		try {
			const parsed = typeof rawUser === "string" ? JSON.parse(rawUser) : rawUser;
			const first = parsed.name?.firstName || parsed.name?.first_name;
			const last = parsed.name?.lastName || parsed.name?.last_name;
			if (first || last) name = [first, last].filter(Boolean).join(" ").trim() || null;
		} catch {
			// ignore malformed user payload
		}
	}

	if (!email) {
		// Some Apple private-relay emails still arrive; if email is missing we
		// cannot create/link an account safely.
		throw ApiError.unauthorized("Provider did not return an email address.");
	}

	if (!name) {
		// Fall back to the email prefix so required `name` always has a value.
		name = email.split("@")[0].replace(/[._-]+/g, " ").trim() || email;
	}

	return { providerId, email, emailVerified, name, avatar };
}
