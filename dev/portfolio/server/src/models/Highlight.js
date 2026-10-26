import mongoose from "mongoose";
import { baseSchemaOptions } from "./helpers.js";

const highlightSchema = new mongoose.Schema(
	{
		category: {
			type: String,
			enum: ["girls", "boys", "coaches", "players", "team"],
			required: true,
			index: true,
		},
		title: { type: String, required: true, trim: true, maxlength: 240 },
		years: {
			type: [{ type: Number, min: 2000, max: 2100 }],
			default: [],
		},
		recipients: [{ type: String, trim: true, maxlength: 160 }],
		description: { type: String, trim: true, maxlength: 4000 },
		displayOrder: { type: Number, default: 0, index: true },
		isPublished: { type: Boolean, default: true, index: true },
	},
	baseSchemaOptions,
);

highlightSchema.index({ category: 1, displayOrder: 1 });

export const Highlight = mongoose.model("Highlight", highlightSchema);
