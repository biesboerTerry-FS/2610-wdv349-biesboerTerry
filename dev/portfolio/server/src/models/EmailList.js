import mongoose from "mongoose";
import { EMAIL_AUDIENCES } from "./constants.js";
import { baseSchemaOptions, slugPlugin } from "./helpers.js";

const emailListSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true, maxlength: 120 },
		description: { type: String, trim: true, maxlength: 2000 },
		audience: { type: String, enum: EMAIL_AUDIENCES, default: "custom", index: true },
		isPublic: { type: Boolean, default: false },
		isActive: { type: Boolean, default: true, index: true },
		doubleOptIn: { type: Boolean, default: false },
		welcomeMessage: { type: String, trim: true, maxlength: 4000 },
		tags: [{ type: String, trim: true, lowercase: true }],
	},
	baseSchemaOptions,
);

slugPlugin(emailListSchema, "name");

emailListSchema.virtual("subscribers", {
	ref: "EmailSubscriber",
	localField: "_id",
	foreignField: "lists",
});

export const EmailList = mongoose.model("EmailList", emailListSchema);
