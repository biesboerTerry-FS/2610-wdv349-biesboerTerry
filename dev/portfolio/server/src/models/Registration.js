import mongoose from "mongoose";
import {
	DIVISION_OPTIONS,
	GRADE_OPTIONS,
	SCHOOL_OPTIONS,
	SHIRT_SIZES,
	SUBMISSION_STATUSES,
} from "./constants.js";
import { baseSchemaOptions, lowerCaseTrimmed, phoneField } from "./helpers.js";

const registrationSchema = new mongoose.Schema(
	{
		season: { type: mongoose.Schema.Types.ObjectId, ref: "Season", index: true },
		player: { type: mongoose.Schema.Types.ObjectId, ref: "Player", index: true },
		parent: { type: mongoose.Schema.Types.ObjectId, ref: "Parent", index: true },

		// Athlete details, mirroring the website registration form.
		athleteName: { type: String, required: true, trim: true, maxlength: 160 },
		grade: { type: String, enum: GRADE_OPTIONS, required: true },
		gradeOther: { type: String, trim: true, maxlength: 80 },
		school: { type: String, enum: SCHOOL_OPTIONS, required: true },
		schoolOther: { type: String, trim: true, maxlength: 160 },
		division: { type: String, enum: DIVISION_OPTIONS, required: true },
		divisionOther: { type: String, trim: true, maxlength: 80 },
		shirtSize: { type: String, enum: SHIRT_SIZES, required: true },
		phone: phoneField({ required: true }),
		schoolEmail: lowerCaseTrimmed({
			required: true,
			match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid school email address"],
		}),
		additionalEmail: lowerCaseTrimmed({
			match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid additional email address"],
		}),

		// Optional guardian details. A Parent document is linked when available.
		parentName: { type: String, trim: true, maxlength: 160 },
		parentEmail: lowerCaseTrimmed({
			match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid parent email address"],
		}),
		parentPhone: phoneField(),
		emergencyContact: {
			name: { type: String, trim: true, maxlength: 160 },
			relationship: { type: String, trim: true, maxlength: 80 },
			phone: phoneField(),
		},

		medicalNotes: { type: String, trim: true, maxlength: 4000 },
		waivers: {
			medical: { type: Boolean, default: false },
			media: { type: Boolean, default: false },
			transportation: { type: Boolean, default: false },
			codeOfConduct: { type: Boolean, default: false },
		},
		status: {
			type: String,
			enum: SUBMISSION_STATUSES,
			default: "submitted",
			index: true,
		},
		paymentStatus: {
			type: String,
			enum: ["not_required", "pending", "paid", "refunded", "waived"],
			default: "pending",
		},
		feeAmount: { type: Number, min: 0, default: 0 },
		adminNotes: { type: String, trim: true, maxlength: 4000 },
		source: {
			type: String,
			enum: ["website-registration", "paper", "transfer", "import"],
			default: "website-registration",
		},
		submittedAt: { type: Date, default: Date.now, index: true },
		ipAddress: { type: String, trim: true, maxlength: 64 },
		userAgent: { type: String, trim: true, maxlength: 500 },
	},
	baseSchemaOptions,
);

registrationSchema.index({ schoolEmail: 1, season: 1 });
registrationSchema.index({ status: 1, submittedAt: -1 });

registrationSchema.virtual("displayName").get(function displayName() {
	return this.athleteName;
});

export const Registration = mongoose.model("Registration", registrationSchema);
