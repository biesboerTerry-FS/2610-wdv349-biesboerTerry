import mongoose from "mongoose";
import { baseSchemaOptions, lowerCaseTrimmed, phoneField } from "./helpers.js";

const parentSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true, trim: true, maxlength: 80 },
		lastName: { type: String, required: true, trim: true, maxlength: 80 },
		email: lowerCaseTrimmed({
			required: true,
			unique: true,
			match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
		}),
		phone: phoneField(),
		relationship: {
			type: String,
			enum: ["mother", "father", "guardian", "grandparent", "other"],
			default: "guardian",
		},
		players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
		address: {
			street: { type: String, trim: true, maxlength: 200 },
			city: { type: String, trim: true, maxlength: 120 },
			state: { type: String, trim: true, maxlength: 60 },
			postalCode: { type: String, trim: true, maxlength: 20 },
		},
		preferredContact: {
			type: String,
			enum: ["email", "phone", "text"],
			default: "email",
		},
		emailOptIn: { type: Boolean, default: true },
		isEmergencyContact: { type: Boolean, default: false },
		notes: { type: String, trim: true, maxlength: 4000 },
	},
	baseSchemaOptions,
);

parentSchema.virtual("fullName").get(function fullName() {
	return [this.firstName, this.lastName].filter(Boolean).join(" ");
});

parentSchema.index({ lastName: 1, firstName: 1 });
parentSchema.index({ players: 1 });

export const Parent = mongoose.model("Parent", parentSchema);
