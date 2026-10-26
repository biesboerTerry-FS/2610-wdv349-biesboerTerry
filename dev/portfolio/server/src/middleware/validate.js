import { ApiError } from "../utils/ApiError.js";

/**
 * Validates and replaces req.body using a Zod schema.
 */
export function validateBody(schema) {
	return (req, _res, next) => {
		const result = schema.safeParse(req.body);
		if (!result.success) {
			const details = result.error.issues.map((issue) => ({
				field: issue.path.join(".") || "(body)",
				message: issue.message,
			}));
			return next(ApiError.unprocessable("Validation failed", details));
		}
		req.body = result.data;
		return next();
	};
}
