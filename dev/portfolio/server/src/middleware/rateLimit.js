import rateLimit from "express-rate-limit";
import { config } from "../config/env.js";

function buildLimiter({ windowMs, max, message }) {
	return rateLimit({
		windowMs,
		limit: max,
		standardHeaders: "draft-8",
		legacyHeaders: false,
		message: { success: false, message },
		skip: (req) => req.path === "/api/health" || config.NODE_ENV === "test",
	});
}

export const globalLimiter = buildLimiter({
	windowMs: config.RATE_LIMIT_WINDOW_MS,
	max: config.RATE_LIMIT_MAX,
	message: "Too many requests. Please try again later.",
});

/**
 * Form submissions are public and therefore use a tighter limit.
 */
export const publicSubmissionLimiter = buildLimiter({
	windowMs: config.RATE_LIMIT_WINDOW_MS,
	max: config.PUBLIC_RATE_LIMIT_MAX,
	message: "Too many submissions. Please try again later.",
});
