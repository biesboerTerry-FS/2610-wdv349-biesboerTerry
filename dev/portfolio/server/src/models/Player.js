import mongoose from "mongoose";
import {
	DIVISION_OPTIONS,
	GRADE_OPTIONS,
	SCHOOL_OPTIONS,
	SHIRT_SIZES,
} from "./constants.js";
import { baseSchemaOptions, lowerCaseTrimmed, phoneField, slugPlugin } from "./helpers.js";

const emergencyContactSchema = new mongoose.Schema(
	{
		name: { type: String, trim: true },
		relationship: { type: String, trim: true },
		phone: phoneField(),
	},
	{ _id: false },
);

const playerSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true, trim: true, maxlength: 80 },
		lastName: { type: String, required: true, trim: true, maxlength: 80 },
		preferredName: { type: String, trim: true, maxlength: 80 },
		dateOfBirth: { type: Date },
		grade: { type: String, enum: GRADE_OPTIONS },
		gradeOther: { type: String, trim: true, maxlength: 80 },
		school: { type: String, enum: SCHOOL_OPTIONS },
		schoolOther: { type: String, trim: true, maxlength: 160 },
		division: { type: String, enum: DIVISION_OPTIONS },
		divisionOther: { type: String, trim: true, maxlength: 80 },
		shirtSize: { type: String, enum: SHIRT_SIZES },
		phone: phoneField(),
		schoolEmail: lowerCaseTrimmed({
			match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid school email address"],
		}),
		additionalEmail: lowerCaseTrimmed({
			match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid additional email address"],
		}),
		parents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Parent" }],
		teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
		seasons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Season" }],
		status: {
			type: String,
			enum: ["prospect", "registered", "active", "inactive", "alumni"],
			default: "prospect",
			index: true,
		},
		jerseyNumber: { type: String, trim: true, maxlength: 8 },
		positions: {
			type: [{ type: String, enum: ["handler", "cutter", "hybrid", "utility", "unknown"] }],
			default: [],
		},
		experienceLevel: {
			type: String,
			enum: ["beginner", "intermediate", "advanced"],
			default: "beginner",
		},
		usaUltimateMembership: {
			memberNumber: { type: String, trim: true },
			expiresOn: { type: Date },
		},
		emergencyContact: emergencyContactSchema,
		medicalNotes: { type: String, trim: true, maxlength: 2000 },
		photoUrl: { type: String, trim: true, maxlength: 1000 },
		registration: { type: mongoose.Schema.Types.ObjectId, ref: "Registration" },
		notes: { type: String, trim: true, maxlength: 4000 },
	},
	baseSchemaOptions,
);

slugPlugin(
	playerSchema,
	function playerSlugSource() {
		return `${this.firstName} ${this.lastName}`;
	},
	{ unique: false },
);

playerSchema.virtual("fullName").get(function fullName() {
	const nickname = this.preferredName ? `"${this.preferredName}"` : null;
	return [this.firstName, nickname, this.lastName].filter(Boolean).join(" ");
});

playerSchema.index({ firstName: 1, lastName: 1 });
playerSchema.index({ schoolEmail: 1 });
playerSchema.index({ status: 1, division: 1 });
playerSchema.index({ teams: 1 });

export const Player = mongoose.model("Player", playerSchema);
