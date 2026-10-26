import mongoose from "mongoose";
import { baseSchemaOptions, lowerCaseTrimmed, phoneField } from "./helpers.js";

const boosterMemberSchema = new mongoose.Schema(
	{
		name: { type: String, trim: true, maxlength: 160 },
		role: { type: String, required: true, trim: true, maxlength: 120 },
		roleKey: {
			type: String,
			enum: [
				"president",
				"vice_president",
				"secretary",
				"treasurer",
				"alumni_rep",
				"middle_school_rep",
				"coach",
				"historian",
				"member",
				"other",
			],
			default: "member",
		},
		email: lowerCaseTrimmed({
			sparse: true,
			match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
		}),
		phone: phoneField(),
		isOpenPosition: { type: Boolean, default: false, index: true },
		bio: { type: String, trim: true, maxlength: 2000 },
		photoUrl: { type: String, trim: true, maxlength: 1000 },
		committees: [{ type: String, trim: true }],
		termStart: { type: Date },
		termEnd: { type: Date },
		displayOrder: { type: Number, default: 0, index: true },
		status: {
			type: String,
			enum: ["active", "open", "former"],
			default: "active",
			index: true,
		},
	},
	baseSchemaOptions,
);

boosterMemberSchema.pre("validate", function syncOpenPosition() {
	if (this.isOpenPosition && this.status === "active") this.status = "open";
	if (this.status === "open") this.isOpenPosition = true;
	if (!this.isOpenPosition && !this.name) {
		this.invalidate("name", "name is required unless this is an open position");
	}
});

boosterMemberSchema.index({ displayOrder: 1, role: 1 });

export const BoosterMember = mongoose.model("BoosterMember", boosterMemberSchema);
