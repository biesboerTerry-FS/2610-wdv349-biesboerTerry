import mongoose from "mongoose";
import { baseSchemaOptions } from "./helpers.js";

const faqSchema = new mongoose.Schema(
	{
		question: { type: String, required: true, trim: true, maxlength: 500 },
		answer: { type: String, required: true, trim: true, maxlength: 10000 },
		category: {
			type: String,
			enum: ["registration", "season", "practices", "costs", "transportation", "spirit", "general"],
			default: "general",
			index: true,
		},
		link: {
			label: { type: String, trim: true, maxlength: 120 },
			to: { type: String, trim: true, maxlength: 500 },
			href: { type: String, trim: true, maxlength: 1000 },
		},
		displayOrder: { type: Number, default: 0, index: true },
		isPublished: { type: Boolean, default: true, index: true },
	},
	baseSchemaOptions,
);

faqSchema.index({ isPublished: 1, category: 1, displayOrder: 1 });

export const Faq = mongoose.model("Faq", faqSchema);
