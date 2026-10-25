import { config } from "../config/env.js";
import { User } from "../models/User.js";

/**
 * Create or refresh the single administrator account used by the Admin Panel.
 * The User model hashes passwordHash in its pre-save hook, so assigning the
 * plain seed password here is intentional.
 */
export async function seedAdminUser() {
	const email = config.SEED_ADMIN_EMAIL;
	const admin = await User.findOne({ email }).select("+passwordHash");

	if (admin) {
		admin.name = admin.name || "Lindbergh Ultimate Admin";
		admin.role = "admin";
		admin.isActive = true;
		admin.passwordHash = config.SEED_ADMIN_PASSWORD;
		await admin.save();
		return admin;
	}

	return User.create({
		name: "Lindbergh Ultimate Admin",
		email,
		passwordHash: config.SEED_ADMIN_PASSWORD,
		role: "admin",
		isActive: true,
	});
}
