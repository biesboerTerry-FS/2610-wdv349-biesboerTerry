import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { User } from "../models/User.js";
import { PublicUser } from "../models/PublicUser.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

function extractToken(req) {
	const header = req.get("authorization") || "";
	if (header.toLowerCase().startsWith("bearer ")) {
		return header.slice(7).trim();
	}
	return req.get("x-api-key") || null;
}

function getTokenKind(payload) {
	if (payload.kind === "public") return "public";
	if (payload.kind === "admin") return "admin";
	// Tokens issued before OAuth landed carry no `kind`.
	return "admin";
}

/**
 * Authenticates staff (`admin` kind) API calls. Rejects public OAuth tokens.
 * Accepts either a JWT issued by /api/auth/login or the shared ADMIN_API_KEY.
 * The API key is intended for scripts and local tooling only.
 */
export const authenticate = asyncHandler(async (req, _res, next) => {
	const token = extractToken(req);

	if (!token) {
		throw ApiError.unauthorized("Authentication required");
	}

	if (config.ADMIN_API_KEY && token === config.ADMIN_API_KEY) {
		req.user = { id: "api-key", role: "admin", kind: "admin", via: "api-key" };
		return next();
	}

	let payload;
	try {
		payload = jwt.verify(token, config.JWT_SECRET);
	} catch {
		throw ApiError.unauthorized("Invalid or expired token");
	}

	if (getTokenKind(payload) === "public") {
		throw ApiError.forbidden("Staff access required");
	}

	const user = await User.findById(payload.sub);
	if (!user || !user.isActive) {
		throw ApiError.unauthorized("User account is not active");
	}

	req.user = user;
	req.user.via = "jwt";
	req.user.kind = "admin";
	return next();
});

/**
 * Authenticates public (visitor) OAuth sessions. Rejects staff tokens so a
 * staff JWT can never be used as a public account (and vice versa).
 */
export const authenticatePublic = asyncHandler(async (req, _res, next) => {
	const token = extractToken(req);

	if (!token) {
		throw ApiError.unauthorized("Authentication required");
	}

	let payload;
	try {
		payload = jwt.verify(token, config.JWT_SECRET);
	} catch {
		throw ApiError.unauthorized("Invalid or expired token");
	}

	if (getTokenKind(payload) !== "public") {
		throw ApiError.forbidden("Public sign-in required");
	}

	const user = await PublicUser.findById(payload.sub);
	if (!user || !user.isActive) {
		throw ApiError.unauthorized("User account is not active");
	}

	req.user = user;
	req.user.via = "jwt";
	req.user.kind = "public";
	return next();
});

export function authorize(...roles) {
	return (req, _res, next) => {
		if (!req.user) return next(ApiError.unauthorized());
		if (roles.length && !roles.includes(req.user.role)) {
			return next(ApiError.forbidden("You do not have permission to perform this action"));
		}
		return next();
	};
}

export function signToken(user, { kind = "admin" } = {}) {
	return jwt.sign(
		{
			sub: user.id || user._id?.toString?.(),
			role: user.role || (kind === "public" ? "public" : "admin"),
			email: user.email,
			kind,
		},
		config.JWT_SECRET,
		{ expiresIn: config.JWT_EXPIRES_IN },
	);
}
