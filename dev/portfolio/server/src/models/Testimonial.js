import mongoose from "mongoose";
import { PROGRAMS } from "./constants.js";
import { baseSchemaOptions } from "./helpers.js";

const testimonialSchema = new mongoose.Schema(
	{
		quote: { type: String, required: true, trim: true, maxlength: 4000 },
		authorName: { type: String, required: true, trim: true, maxlength: 160 },
		authorType: {
			type: String,
			enum: ["player", "parent", "coach", "alumni", "supporter"],
			default: "parent",
			index: true,
		},
		attribution: { type: String, trim: true, maxlength: 200 },
		graduationYear: { type: Number, min: 2000, max: 2100 },
		program: { type: String, enum: PROGRAMS, default: "all" },
		isFeatured: { type: Boolean, default: false, index: true },
		isApproved: { type: Boolean, default: false, index: true },
		fullWidth: { type: Boolean, default: false },
		displayOrder: { type: Number, default: 0, index: true },
	},
	baseSchemaOptions,
);

testimonialSchema.index({ isApproved: 1, displayOrder: 1 });

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
