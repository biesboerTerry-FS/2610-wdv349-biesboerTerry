import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

function extractToken(req) {
	const header = req.get("authorization") || "";
	if (header.toLowerCase().startsWith("bearer ")) {
		return header.slice(7).trim();
	}
	return req.get("x-api-key") || null;
}

/**
 * Accepts either a JWT issued by /api/auth/login or the shared ADMIN_API_KEY.
 * The API key is intended for scripts and local tooling only.
 */
export const authenticate = asyncHandler(async (req, _res, next) => {
	const token = extractToken(req);

	if (!token) {
		throw ApiError.unauthorized("Authentication required");
	}

	if (config.ADMIN_API_KEY && token === config.ADMIN_API_KEY) {
		req.user = { id: "api-key", role: "admin", via: "api-key" };
		return next();
	}

	let payload;
	try {
		payload = jwt.verify(token, config.JWT_SECRET);
	} catch {
		throw ApiError.unauthorized("Invalid or expired token");
	}

	const user = await User.findById(payload.sub);
	if (!user || !user.isActive) {
		throw ApiError.unauthorized("User account is not active");
	}

	req.user = user;
	req.user.via = "jwt";
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

export function signToken(user) {
	return jwt.sign(
		{ sub: user.id, role: user.role, email: user.email },
		config.JWT_SECRET,
		{ expiresIn: config.JWT_EXPIRES_IN },
	);
}
