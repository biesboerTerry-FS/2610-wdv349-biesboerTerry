import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { baseSchemaOptions, lowerCaseTrimmed } from "./helpers.js";

const oauthProviderSchema = new mongoose.Schema(
	{
		provider: { type: String, enum: ["google", "apple"], required: true, index: true },
		providerId: { type: String, required: true, trim: true },
		email: { type: String, trim: true, lowercase: true },
		verified: { type: Boolean, default: false },
		connectedAt: { type: Date, default: Date.now },
	},
	{ _id: false },
);

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true, maxlength: 160 },
		email: lowerCaseTrimmed({
			required: true,
			unique: true,
			match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
		}),
		// Empty for OAuth-only accounts; select:false keeps it out of JSON.
		passwordHash: { type: String, required: false, select: false },
		avatar: { type: String, trim: true, maxlength: 2048 },
		emailVerified: { type: Boolean, default: false, index: true },
		providers: { type: [oauthProviderSchema], default: [] },
		role: {
			type: String,
			enum: ["admin", "editor", "coach"],
			default: "editor",
			index: true,
		},
		coach: { type: mongoose.Schema.Types.ObjectId, ref: "Coach" },
		isActive: { type: Boolean, default: true, index: true },
		lastLoginAt: { type: Date },
		passwordChangedAt: { type: Date },
	},
	baseSchemaOptions,
);

userSchema.index({ "providers.provider": 1, "providers.providerId": 1 });

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
	if (!this.passwordHash) return Promise.resolve(false);
	return bcrypt.compare(candidatePassword, this.passwordHash);
};

userSchema.statics.hashPassword = function hashPassword(plainPassword) {
	return bcrypt.hash(plainPassword, 12);
};

userSchema.methods.linkProvider = function linkProvider(provider, providerId, email, verified) {
	const existing = this.providers.find(
		(entry) => entry.provider === provider && entry.providerId === providerId,
	);
	if (existing) {
		if (email) {
			existing.email = email;
			existing.verified = verified ?? existing.verified;
		}
		return existing;
	}
	this.providers.push({
		provider,
		providerId,
		email: email || undefined,
		verified: Boolean(verified),
		connectedAt: new Date(),
	});
	return this.providers[this.providers.length - 1];
};

userSchema.methods.hasPassword = function hasPassword() {
	return Boolean(this.passwordHash);
};

userSchema.pre("save", async function hashPassword() {
	if (!this.isModified("passwordHash") || !this.passwordHash) return;
	// Already hashed (e.g. seed/imported hash) — leave it alone.
	if (/^\$2[aby]\$/.test(this.passwordHash)) return;
	this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
	this.passwordChangedAt = new Date();
});

userSchema.methods.toJSON = function toJSON() {
	const user = this.toObject();
	const hasPassword = Boolean(user.passwordHash);
	delete user.passwordHash;
	// Lets the UI decide whether to offer "change password".
	user.hasPassword = hasPassword;
	delete user.__v;
	return user;
};

export const User = mongoose.model("User", userSchema);
