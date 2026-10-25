import mongoose from "mongoose";
import { PROGRAMS } from "./constants.js";
import { baseSchemaOptions, slugPlugin } from "./helpers.js";

const seasonSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true, maxlength: 120 },
		year: { type: Number, required: true, min: 2000, max: 2100, index: true },
		program: { type: String, enum: PROGRAMS, default: "all" },
		startDate: { type: Date },
		endDate: { type: Date },
		registrationOpen: { type: Boolean, default: false },
		registrationOpensAt: { type: Date },
		registrationClosesAt: { type: Date },
		feeAmount: { type: Number, min: 0, default: 0 },
		description: { type: String, trim: true, maxlength: 4000 },
		isActive: { type: Boolean, default: false, index: true },
	},
	baseSchemaOptions,
);

slugPlugin(seasonSchema, function seasonSlugSource() {
	return `${this.name} ${this.year}`;
});

seasonSchema.pre("validate", function validateDateRange() {
	if (this.startDate && this.endDate && this.endDate < this.startDate) {
		this.invalidate("endDate", "endDate must be on or after startDate");
	}
});

export const Season = mongoose.model("Season", seasonSchema);
