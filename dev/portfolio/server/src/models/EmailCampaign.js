import mongoose from "mongoose";
import { baseSchemaOptions } from "./helpers.js";

const emailCampaignSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true, maxlength: 160 },
		subject: { type: String, required: true, trim: true, maxlength: 240 },
		previewText: { type: String, trim: true, maxlength: 240 },
		bodyHtml: { type: String, trim: true },
		bodyText: { type: String, trim: true },
		list: { type: mongoose.Schema.Types.ObjectId, ref: "EmailList", index: true },
		status: {
			type: String,
			enum: ["draft", "scheduled", "sending", "sent", "canceled"],
			default: "draft",
			index: true,
		},
		scheduledFor: { type: Date },
		sentAt: { type: Date },
		recipientCount: { type: Number, min: 0, default: 0 },
		openCount: { type: Number, min: 0, default: 0 },
		clickCount: { type: Number, min: 0, default: 0 },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	baseSchemaOptions,
);

emailCampaignSchema.index({ status: 1, scheduledFor: 1 });

export const EmailCampaign = mongoose.model("EmailCampaign", emailCampaignSchema);
