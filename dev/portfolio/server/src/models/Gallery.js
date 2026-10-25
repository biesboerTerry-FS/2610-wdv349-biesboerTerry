import mongoose from "mongoose";
import { PROGRAMS } from "./constants.js";
import { baseSchemaOptions, slugPlugin } from "./helpers.js";

const gallerySchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true, maxlength: 200 },
		description: { type: String, trim: true, maxlength: 2000 },
		note: { type: String, trim: true, maxlength: 500 },
		coverImageUrl: { type: String, trim: true, maxlength: 1000 },
		year: { type: Number, min: 2000, max: 2100, index: true },
		program: { type: String, enum: PROGRAMS, default: "all" },
		externalUrl: { type: String, trim: true, maxlength: 1000 },
		isPublished: { type: Boolean, default: true, index: true },
		displayOrder: { type: Number, default: 0, index: true },
	},
	baseSchemaOptions,
);

slugPlugin(gallerySchema, function gallerySlugSource() {
	return `${this.title} ${this.year ?? ""}`;
});

gallerySchema.virtual("items", {
	ref: "MediaItem",
	localField: "_id",
	foreignField: "gallery",
});

gallerySchema.index({ isPublished: 1, displayOrder: 1 });

export const Gallery = mongoose.model("Gallery", gallerySchema);
