import { User } from "../models/User.js";
import { signToken } from "../middleware/auth.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email }).select("+passwordHash");
	if (!user || !user.isActive) {
		throw ApiError.unauthorized("Invalid email or password");
	}

	const matches = await user.comparePassword(password);
	if (!matches) {
		throw ApiError.unauthorized("Invalid email or password");
	}

	user.lastLoginAt = new Date();
	await user.save();

	const token = signToken(user);
	res.json({
		success: true,
		data: { token, user },
	});
});

export const me = asyncHandler(async (req, res) => {
	if (req.user.via === "api-key") {
		res.json({ success: true, data: { id: "api-key", role: "admin", via: "api-key" } });
		return;
	}
	const user = await User.findById(req.user.id).populate("coach", "firstName lastName title");
	if (!user) throw ApiError.notFound("User not found");
	res.json({ success: true, data: user });
});

export const changePassword = asyncHandler(async (req, res) => {
	if (req.user.via === "api-key") {
		throw ApiError.badRequest("The shared API key does not have a password");
	}
	const { currentPassword, newPassword } = req.body;
	const user = await User.findById(req.user.id).select("+passwordHash");
	if (!user) throw ApiError.notFound("User not found");

	const matches = await user.comparePassword(currentPassword);
	if (!matches) throw ApiError.badRequest("Current password is incorrect");

	user.passwordHash = newPassword;
	await user.save();

	res.json({ success: true, message: "Password updated" });
});
