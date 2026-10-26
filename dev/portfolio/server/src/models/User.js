import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { baseSchemaOptions, lowerCaseTrimmed } from "./helpers.js";

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true, maxlength: 160 },
		email: lowerCaseTrimmed({
			required: true,
			unique: true,
			match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
		}),
		passwordHash: { type: String, required: true, select: false },
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

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
	return bcrypt.compare(candidatePassword, this.passwordHash);
};

userSchema.statics.hashPassword = function hashPassword(plainPassword) {
	return bcrypt.hash(plainPassword, 12);
};

userSchema.pre("save", async function hashPassword() {
	if (!this.isModified("passwordHash")) return;
	this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
	this.passwordChangedAt = new Date();
});

userSchema.methods.toJSON = function toJSON() {
	const user = this.toObject();
	delete user.passwordHash;
	return user;
};

export const User = mongoose.model("User", userSchema);
