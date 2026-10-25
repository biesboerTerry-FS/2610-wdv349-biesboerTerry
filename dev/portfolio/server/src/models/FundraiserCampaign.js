import mongoose from "mongoose";
import { baseSchemaOptions, slugPlugin } from "./helpers.js";

const fundraiserCampaignSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true, maxlength: 200 },
		description: { type: String, trim: true, maxlength: 4000 },
		story: { type: String, trim: true, maxlength: 20000 },
		goalAmount: { type: Number, required: true, min: 0 },
		startDate: { type: Date },
		endDate: { type: Date },
		status: {
			type: String,
			enum: ["draft", "active", "ended", "archived"],
			default: "draft",
			index: true,
		},
		imageUrl: { type: String, trim: true, maxlength: 1000 },
		beneficiary: { type: String, trim: true, maxlength: 200 },
		donationUrl: { type: String, trim: true, maxlength: 1000 },
		isFeatured: { type: Boolean, default: false, index: true },
	},
	baseSchemaOptions,
);

slugPlugin(fundraiserCampaignSchema, "title");

fundraiserCampaignSchema.virtual("donations", {
	ref: "Donation",
	localField: "_id",
	foreignField: "campaign",
});

fundraiserCampaignSchema.index({ status: 1, isFeatured: -1, startDate: -1 });

export const FundraiserCampaign = mongoose.model("FundraiserCampaign", fundraiserCampaignSchema);
