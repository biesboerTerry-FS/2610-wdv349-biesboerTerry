import mongoose from "mongoose";
import { DIVISION_OPTIONS, PROGRAMS } from "./constants.js";
import { baseSchemaOptions, slugPlugin } from "./helpers.js";

const teamSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true, maxlength: 120 },
		program: { type: String, enum: PROGRAMS, required: true, index: true },
		division: { type: String, enum: DIVISION_OPTIONS, required: true },
		season: { type: mongoose.Schema.Types.ObjectId, ref: "Season", index: true },
		captains: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
		description: { type: String, trim: true, maxlength: 2000 },
		color: { type: String, trim: true, maxlength: 40 },
		isActive: { type: Boolean, default: true, index: true },
		displayOrder: { type: Number, default: 0 },
	},
	baseSchemaOptions,
);

slugPlugin(teamSchema, function teamSlugSource() {
	return this.name;
});

teamSchema.virtual("players", {
	ref: "Player",
	localField: "_id",
	foreignField: "teams",
});

teamSchema.virtual("coaches", {
	ref: "Coach",
	localField: "_id",
	foreignField: "teams",
});

teamSchema.index({ program: 1, division: 1, season: 1 });

export const Team = mongoose.model("Team", teamSchema);
