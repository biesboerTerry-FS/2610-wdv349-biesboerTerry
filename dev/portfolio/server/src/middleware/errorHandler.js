import mongoose from "mongoose";
import { config } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

export function notFound(req, _res, next) {
	next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(error, req, res, _next) {
	let statusCode = 500;
	let message = "Internal server error";
	let details;

	if (error instanceof ApiError) {
		statusCode = error.statusCode;
		message = error.message;
		details = error.details;
	} else if (error instanceof mongoose.Error.ValidationError) {
		statusCode = 422;
		message = "Validation failed";
		details = Object.values(error.errors).map((entry) => ({
			field: entry.path,
			message: entry.message,
		}));
	} else if (error instanceof mongoose.Error.CastError) {
		statusCode = 400;
		message = `Invalid ${error.path}: ${error.value}`;
	} else if (error?.code === 11000) {
		statusCode = 409;
		message = "A record with that value already exists";
		details = error.keyValue
			? Object.entries(error.keyValue).map(([field, value]) => ({ field, value }))
			: undefined;
	} else if (error?.name === "JsonWebTokenError" || error?.name === "TokenExpiredError") {
		statusCode = 401;
		message = "Invalid or expired token";
	}

	if (statusCode >= 500) {
		console.error("[api] unhandled error:", error);
	}

	const payload = { success: false, message };
	if (details) payload.details = details;
	if (!config.isProduction && statusCode >= 500) payload.stack = error.stack;

	res.status(statusCode).json(payload);
}
