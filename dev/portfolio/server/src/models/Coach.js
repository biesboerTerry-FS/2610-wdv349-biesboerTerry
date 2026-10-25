import mongoose from "mongoose";
import { DIVISION_OPTIONS, PROGRAMS } from "./constants.js";
import { baseSchemaOptions, lowerCaseTrimmed, phoneField, slugPlugin } from "./helpers.js";

const coachSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true, trim: true, maxlength: 80 },
		lastName: { type: String, required: true, trim: true, maxlength: 80 },
		preferredName: { type: String, trim: true, maxlength: 80 },
		title: {
			type: String,
			trim: true,
			maxlength: 120,
			description: "Display title, e.g. Boys Ultimate Coach",
		},
		role: {
			type: String,
			enum: ["head_coach", "assistant_coach", "program_coordinator", "volunteer", "other"],
			default: "assistant_coach",
		},
		email: lowerCaseTrimmed({
			unique: true,
			sparse: true,
			match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
		}),
		phone: phoneField(),
		program: { type: String, enum: PROGRAMS, default: "high-school", index: true },
		division: { type: String, enum: DIVISION_OPTIONS },
		teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
		bio: { type: String, trim: true, maxlength: 4000 },
		photoUrl: { type: String, trim: true, maxlength: 1000 },
		yearsExperience: { type: Number, min: 0, max: 80 },
		usaUltimateCertification: {
			certified: { type: Boolean, default: false },
			level: { type: String, trim: true },
			expiresOn: { type: Date },
		},
		isBoosterContact: { type: Boolean, default: false },
		displayOrder: { type: Number, default: 0 },
		status: {
			type: String,
			enum: ["active", "inactive", "alumni"],
			default: "active",
			index: true,
		},
		socials: {
			instagram: { type: String, trim: true },
			facebook: { type: String, trim: true },
			twitter: { type: String, trim: true },
		},
	},
	baseSchemaOptions,
);

slugPlugin(coachSchema, function coachSlugSource() {
	return `${this.firstName} ${this.lastName}`;
});

coachSchema.virtual("fullName").get(function fullName() {
	const nickname = this.preferredName ? `"${this.preferredName}"` : null;
	return [this.firstName, nickname, this.lastName].filter(Boolean).join(" ");
});

coachSchema.index({ displayOrder: 1, lastName: 1 });

export const Coach = mongoose.model("Coach", coachSchema);
