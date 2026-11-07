import mongoose from "mongoose";
import { baseSchemaOptions, lowerCaseTrimmed } from "./helpers.js";

/**
 * Public visitor account created by Google/Apple sign-in (parents, players,
 * supporters). Kept separate from the staff `User` model so admin panel
 * access can never be granted by a public OAuth login.
 */
const publicOAuthProviderSchema = new mongoose.Schema(
	{
		provider: { type: String, enum: ["google", "apple"], required: true, index: true },
		providerId: { type: String, required: true, trim: true },
		email: { type: String, trim: true, lowercase: true },
		verified: { type: Boolean, default: false },
		connectedAt: { type: Date, default: Date.now },
	},
	{ _id: false },
);

const publicUserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true, maxlength: 160 },
		email: lowerCaseTrimmed({
			required: true,
			unique: true,
			match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
		}),
		avatar: { type: String, trim: true, maxlength: 2048 },
		emailVerified: { type: Boolean, default: false, index: true },
		providers: { type: [publicOAuthProviderSchema], default: [] },
		isActive: { type: Boolean, default: true, index: true },
		lastLoginAt: { type: Date },
	},
	baseSchemaOptions,
);

publicUserSchema.index({ "providers.provider": 1, "providers.providerId": 1 });

publicUserSchema.methods.linkProvider = function linkProvider(provider, providerId, email, verified) {
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

publicUserSchema.methods.toJSON = function toJSON() {
	return this.toObject();
};

export const PublicUser = mongoose.model("PublicUser", publicUserSchema);
