import mongoose from "mongoose";
import { PROGRAMS } from "./constants.js";
import { baseSchemaOptions } from "./helpers.js";

const mediaItemSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true, maxlength: 240 },
		type: {
			type: String,
			enum: ["video", "photo", "gallery"],
			required: true,
			index: true,
		},
		gallery: { type: mongoose.Schema.Types.ObjectId, ref: "Gallery", index: true },
		videoId: { type: String, trim: true, maxlength: 100 },
		url: { type: String, trim: true, maxlength: 1000 },
		thumbnailUrl: { type: String, trim: true, maxlength: 1000 },
		description: { type: String, trim: true, maxlength: 2000 },
		duration: { type: String, trim: true, maxlength: 20 },
		year: { type: Number, min: 2000, max: 2100, index: true },
		program: { type: String, enum: PROGRAMS, default: "all" },
		isPublished: { type: Boolean, default: true, index: true },
		displayOrder: { type: Number, default: 0, index: true },
		publishedAt: { type: Date },
	},
	baseSchemaOptions,
);

mediaItemSchema.index({ isPublished: 1, type: 1, displayOrder: 1 });

export const MediaItem = mongoose.model("MediaItem", mediaItemSchema);
