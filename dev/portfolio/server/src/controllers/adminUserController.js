import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { buildPaginationMeta, parsePagination } from "../utils/pagination.js";

export const listUsers = asyncHandler(async (req, res) => {
	const { page, limit, skip } = parsePagination(req.query);
	const filter = {};
	if (req.query.role) filter.role = req.query.role;
	if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === "true";
	if (req.query.q) {
		const regex = new RegExp(String(req.query.q).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
		filter.$or = [{ name: regex }, { email: regex }];
	}

	const [data, total] = await Promise.all([
		User.find(filter).sort("-createdAt").skip(skip).limit(limit).populate("coach", "firstName lastName"),
		User.countDocuments(filter),
	]);

	res.json({ success: true, data, pagination: buildPaginationMeta({ page, limit, total }) });
});

export const getUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).populate("coach", "firstName lastName");
	if (!user) throw ApiError.notFound("User not found");
	res.json({ success: true, data: user });
});

function validateUserPayload(body, { requirePassword }) {
	const { name, email, password, role, coach, isActive } = body;
	if (!name || !email) throw ApiError.unprocessable("name and email are required");
	if (requirePassword && (!password || password.length < 8)) {
		throw ApiError.unprocessable("password must be at least 8 characters");
	}
	if (password && password.length < 8) {
		throw ApiError.unprocessable("password must be at least 8 characters");
	}
	return { name, email, password, role, coach, isActive };
}

export const createUser = asyncHandler(async (req, res) => {
	const payload = validateUserPayload(req.body, { requirePassword: true });
	const user = await User.create({
		name: payload.name,
		email: payload.email,
		passwordHash: payload.password,
		role: payload.role || "editor",
		coach: payload.coach,
		isActive: payload.isActive ?? true,
	});
	res.status(201).json({ success: true, data: user });
});

export const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select("+passwordHash");
	if (!user) throw ApiError.notFound("User not found");

	if (req.body.password) {
		if (req.body.password.length < 8) {
			throw ApiError.unprocessable("password must be at least 8 characters");
		}
		user.passwordHash = req.body.password;
	}
	if (req.body.name) user.name = req.body.name;
	if (req.body.email) user.email = req.body.email;
	if (req.body.role) user.role = req.body.role;
	if (req.body.isActive !== undefined) user.isActive = req.body.isActive;
	if (req.body.coach !== undefined) user.coach = req.body.coach || undefined;

	await user.save();
	res.json({ success: true, data: user });
});

export const deleteUser = asyncHandler(async (req, res) => {
	if (req.params.id === req.user.id) {
		throw ApiError.badRequest("You cannot delete your own account");
	}
	const user = await User.findByIdAndDelete(req.params.id);
	if (!user) throw ApiError.notFound("User not found");
	res.json({ success: true, data: { id: req.params.id, deleted: true } });
});
