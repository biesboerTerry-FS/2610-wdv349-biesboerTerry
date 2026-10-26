import mongoose from "mongoose";
import { EVENT_DIVISIONS, EVENT_TYPES, PROGRAMS } from "./constants.js";
import { baseSchemaOptions } from "./helpers.js";

const recurrenceSchema = new mongoose.Schema(
	{
		frequency: {
			type: String,
			enum: ["none", "daily", "weekly", "biweekly", "monthly"],
			default: "none",
		},
		interval: { type: Number, min: 1, default: 1 },
		daysOfWeek: {
			type: [{ type: String, enum: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] }],
			default: [],
		},
		until: { type: Date },
		count: { type: Number, min: 1 },
	},
	{ _id: false },
);

const locationSchema = new mongoose.Schema(
	{
		name: { type: String, trim: true, maxlength: 200 },
		address: { type: String, trim: true, maxlength: 300 },
		mapUrl: { type: String, trim: true, maxlength: 1000 },
	},
	{ _id: false },
);

const scheduleEventSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true, maxlength: 200 },
		description: { type: String, trim: true, maxlength: 4000 },
		type: { type: String, enum: EVENT_TYPES, required: true, index: true },
		program: { type: String, enum: PROGRAMS, default: "all", index: true },
		division: { type: String, enum: EVENT_DIVISIONS, default: "all", index: true },
		startAt: { type: Date, required: true, index: true },
		endAt: { type: Date },
		allDay: { type: Boolean, default: false },
		timezone: { type: String, default: "America/Chicago", trim: true },
		location: locationSchema,
		opponent: { type: String, trim: true, maxlength: 160 },
		homeAway: {
			type: String,
			enum: ["home", "away", "neutral", "not_applicable"],
			default: "not_applicable",
		},
		isMandatory: { type: Boolean, default: false },
		status: {
			type: String,
			enum: ["scheduled", "canceled", "postponed", "completed"],
			default: "scheduled",
			index: true,
		},
		visibility: {
			type: String,
			enum: ["public", "team", "admin"],
			default: "public",
			index: true,
		},
		source: {
			type: String,
			enum: ["lindbergh", "external"],
			default: "lindbergh",
			index: true,
		},
		organization: { type: String, trim: true, maxlength: 160 },
		externalUrl: { type: String, trim: true, maxlength: 1000 },
		season: { type: mongoose.Schema.Types.ObjectId, ref: "Season", index: true },
		team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", index: true },
		recurrence: { type: recurrenceSchema, default: undefined },
		tags: [{ type: String, trim: true, lowercase: true }],
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	baseSchemaOptions,
);

scheduleEventSchema.pre("validate", function validateDates() {
	if (this.startAt && this.endAt && this.endAt < this.startAt) {
		this.invalidate("endAt", "endAt must be on or after startAt");
	}
});

scheduleEventSchema.index({ startAt: 1, status: 1, visibility: 1 });
scheduleEventSchema.index({ type: 1, division: 1, startAt: 1 });

export const ScheduleEvent = mongoose.model("ScheduleEvent", scheduleEventSchema);
