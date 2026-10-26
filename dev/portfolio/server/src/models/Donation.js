import mongoose from "mongoose";
import { baseSchemaOptions, lowerCaseTrimmed, phoneField } from "./helpers.js";

const donationSchema = new mongoose.Schema(
	{
		campaign: { type: mongoose.Schema.Types.ObjectId, ref: "FundraiserCampaign", required: true, index: true },
		donorName: { type: String, trim: true, maxlength: 200 },
		donorEmail: lowerCaseTrimmed({
			match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid donor email address"],
		}),
		donorPhone: phoneField(),
		amount: { type: Number, required: true, min: 0.01 },
		currency: { type: String, default: "USD", uppercase: true, trim: true, maxlength: 3 },
		player: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Player",
			index: true,
			description: "Player credited with the donation for the fundraiser leaderboard",
		},
		message: { type: String, trim: true, maxlength: 2000 },
		isAnonymous: { type: Boolean, default: false },
		status: {
			type: String,
			enum: ["pending", "completed", "refunded", "failed"],
			default: "completed",
			index: true,
		},
		paymentProvider: {
			type: String,
			enum: ["stripe", "paypal", "venmo", "check", "cash", "other"],
			default: "other",
		},
		transactionId: { type: String, trim: true, maxlength: 300 },
		receiptSent: { type: Boolean, default: false },
		donatedAt: { type: Date, default: Date.now, index: true },
	},
	baseSchemaOptions,
);

donationSchema.index({ campaign: 1, status: 1, donatedAt: -1 });
donationSchema.index({ donorEmail: 1, donatedAt: -1 });

export const Donation = mongoose.model("Donation", donationSchema);
