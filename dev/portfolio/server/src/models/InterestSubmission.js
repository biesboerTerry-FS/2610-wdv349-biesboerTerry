import mongoose from "mongoose";
import {
	DIVISION_OPTIONS,
	GRADE_OPTIONS,
	INTEREST_LEVELS,
	SCHOOL_OPTIONS,
	SUBMISSION_STATUSES,
} from "./constants.js";
import { baseSchemaOptions, lowerCaseTrimmed, phoneField } from "./helpers.js";

const interestSubmissionSchema = new mongoose.Schema(
	{
		studentName: { type: String, required: true, trim: true, maxlength: 160 },
		grade: { type: String, enum: GRADE_OPTIONS, required: true },
		gradeOther: { type: String, trim: true, maxlength: 80 },
		divisions: {
			type: [{ type: String, enum: DIVISION_OPTIONS }],
			validate: {
				validator(value) {
					return Array.isArray(value) && value.length > 0;
				},
				message: "Select at least one division",
			},
		},
		divisionOther: { type: String, trim: true, maxlength: 80 },
		school: { type: String, enum: SCHOOL_OPTIONS, required: true },
		schoolOther: { type: String, trim: true, maxlength: 160 },
		studentPhone: phoneField({ required: true }),
		studentEmail: lowerCaseTrimmed({
			required: true,
			match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid student email address"],
		}),
		parentPhone: phoneField(),
		parentEmail: lowerCaseTrimmed({
			match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid parent email address"],
		}),
		interestLevel: { type: String, enum: INTEREST_LEVELS, required: true },
		status: {
			type: String,
			enum: SUBMISSION_STATUSES,
			default: "new",
			index: true,
		},
		notes: { type: String, trim: true, maxlength: 4000 },
		assignedTo: { type: String, trim: true, maxlength: 160 },
		convertedPlayer: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
		convertedAt: { type: Date },
		source: {
			type: String,
			enum: ["website-interest-form", "paper", "event", "import"],
			default: "website-interest-form",
		},
		submittedAt: { type: Date, default: Date.now, index: true },
		ipAddress: { type: String, trim: true, maxlength: 64 },
		userAgent: { type: String, trim: true, maxlength: 500 },
	},
	baseSchemaOptions,
);

interestSubmissionSchema.index({ studentEmail: 1, submittedAt: -1 });
interestSubmissionSchema.index({ status: 1, submittedAt: -1 });

export const InterestSubmission = mongoose.model("InterestSubmission", interestSubmissionSchema);
