import mongoose from "mongoose";
import { baseSchemaOptions, lowerCaseTrimmed, phoneField } from "./helpers.js";

const emailSubscriberSchema = new mongoose.Schema(
	{
		email: lowerCaseTrimmed({
			required: true,
			unique: true,
			match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
		}),
		firstName: { type: String, trim: true, maxlength: 80 },
		lastName: { type: String, trim: true, maxlength: 80 },
		phone: phoneField(),
		lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "EmailList", index: true }],
		status: {
			type: String,
			enum: ["pending", "subscribed", "unsubscribed", "bounced"],
			default: "subscribed",
			index: true,
		},
		source: { type: String, trim: true, maxlength: 200 },
		tags: [{ type: String, trim: true, lowercase: true }],
		consent: {
			granted: { type: Boolean, default: true },
			grantedAt: { type: Date, default: Date.now },
			ipAddress: { type: String, trim: true, maxlength: 64 },
			userAgent: { type: String, trim: true, maxlength: 500 },
		},
		unsubscribedAt: { type: Date },
	},
	baseSchemaOptions,
);

emailSubscriberSchema.virtual("fullName").get(function fullName() {
	return [this.firstName, this.lastName].filter(Boolean).join(" ");
});

emailSubscriberSchema.index({ status: 1, createdAt: -1 });

export const EmailSubscriber = mongoose.model("EmailSubscriber", emailSubscriberSchema);
