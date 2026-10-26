import mongoose from "mongoose";
import { baseSchemaOptions, lowerCaseTrimmed, phoneField } from "./helpers.js";

const contactMessageSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true, maxlength: 160 },
		email: lowerCaseTrimmed({
			required: true,
			match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
		}),
		phone: phoneField(),
		subject: { type: String, trim: true, maxlength: 240 },
		message: { type: String, required: true, trim: true, maxlength: 10000 },
		status: {
			type: String,
			enum: ["new", "read", "replied", "archived"],
			default: "new",
			index: true,
		},
		assignedTo: { type: String, trim: true, maxlength: 160 },
		replyNotes: { type: String, trim: true, maxlength: 4000 },
		source: { type: String, trim: true, maxlength: 120, default: "website" },
		ipAddress: { type: String, trim: true, maxlength: 64 },
		userAgent: { type: String, trim: true, maxlength: 500 },
	},
	baseSchemaOptions,
);

contactMessageSchema.index({ status: 1, createdAt: -1 });

export const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);
