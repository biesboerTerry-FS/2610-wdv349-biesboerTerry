import mongoose from "mongoose";
import { baseSchemaOptions } from "./helpers.js";

const siteSettingSchema = new mongoose.Schema(
	{
		key: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			maxlength: 120,
			match: [
				/^[A-Za-z0-9._-]+$/,
				"Key may only contain letters, numbers, dots, dashes and underscores",
			],
		},
		label: { type: String, trim: true, maxlength: 200 },
		description: { type: String, trim: true, maxlength: 1000 },
		category: {
			type: String,
			enum: ["contact", "social", "program", "fundraiser", "registration", "content", "other"],
			default: "other",
			index: true,
		},
		value: { type: mongoose.Schema.Types.Mixed, required: true },
		isPublic: { type: Boolean, default: true, index: true },
	},
	baseSchemaOptions,
);

export const SiteSetting = mongoose.model("SiteSetting", siteSettingSchema);
