import { z } from "zod";
import {
	DIVISION_OPTIONS,
	GRADE_OPTIONS,
	INTEREST_LEVELS,
	SCHOOL_OPTIONS,
	SHIRT_SIZES,
} from "../models/constants.js";
import { PHONE_REGEX } from "../utils/validators.js";

const emptyToUndefined = (value) => (value === "" ? undefined : value);

const phone = z.preprocess(
	emptyToUndefined,
	z
		.string()
		.trim()
		.regex(PHONE_REGEX, "Enter a valid phone number (e.g. 314-555-0123)")
		.optional(),
);

const email = z.preprocess(
	emptyToUndefined,
	z.string().trim().toLowerCase().email("Enter a valid email address").optional(),
);

const optionalText = (max) => z.preprocess(emptyToUndefined, z.string().trim().max(max).optional());

const grade = z.enum(GRADE_OPTIONS);
const school = z.enum(SCHOOL_OPTIONS);
const division = z.enum(DIVISION_OPTIONS);

export const interestSubmissionSchema = z
	.object({
		studentName: z.string().trim().min(2, "Student name is required").max(160),
		grade: grade.optional(),
		schoolGrade: grade.optional(),
		gradeOther: optionalText(80),
		divisions: z.array(division).optional(),
		division: division.optional(),
		divisionOther: optionalText(80),
		school: school.optional(),
		schoolAttended: school.optional(),
		schoolOther: optionalText(160),
		studentPhone: phone,
		studentEmail: z.string().trim().toLowerCase().email("A valid student email is required"),
		parentPhone: phone,
		parentEmail: email,
		interestLevel: z.enum(INTEREST_LEVELS),
	})
	.transform((data) => {
		const selectedGrade = data.grade ?? data.schoolGrade;
		const selectedSchool = data.school ?? data.schoolAttended;
		const selectedDivisions = data.divisions?.length
			? data.divisions
			: data.division
				? [data.division]
				: [];

		return {
			studentName: data.studentName,
			grade: selectedGrade,
			gradeOther: data.gradeOther,
			divisions: selectedDivisions,
			divisionOther: data.divisionOther,
			school: selectedSchool,
			schoolOther: data.schoolOther,
			studentPhone: data.studentPhone,
			studentEmail: data.studentEmail,
			parentPhone: data.parentPhone,
			parentEmail: data.parentEmail,
			interestLevel: data.interestLevel,
		};
	})
	.superRefine((data, ctx) => {
		if (!data.grade) {
			ctx.addIssue({ code: "custom", path: ["grade"], message: "Grade selection is required" });
		}
		if (!data.school) {
			ctx.addIssue({ code: "custom", path: ["school"], message: "School selection is required" });
		}
		if (!data.divisions.length) {
			ctx.addIssue({
				code: "custom",
				path: ["divisions"],
				message: "Select at least one division",
			});
		}
		if (!data.studentPhone) {
			ctx.addIssue({
				code: "custom",
				path: ["studentPhone"],
				message: "Student phone number is required",
			});
		}
		if (data.grade === "Other" && !data.gradeOther) {
			ctx.addIssue({
				code: "custom",
				path: ["gradeOther"],
				message: "Please specify the grade",
			});
		}
		if (data.school === "Other" && !data.schoolOther) {
			ctx.addIssue({
				code: "custom",
				path: ["schoolOther"],
				message: "Please specify the school",
			});
		}
		if (data.divisions.includes("Other") && !data.divisionOther) {
			ctx.addIssue({
				code: "custom",
				path: ["divisionOther"],
				message: "Please specify the division",
			});
		}
	});

export const registrationSchema = z
	.object({
		athleteName: z.string().trim().min(2, "Athlete name is required").max(160),
		grade: grade.optional(),
		gradeLevel: grade.optional(),
		gradeOther: optionalText(80),
		school: school.optional(),
		schoolOther: optionalText(160),
		division: division.optional(),
		genderDivision: division.optional(),
		divisionOther: optionalText(80),
		shirtSize: z.enum(SHIRT_SIZES),
		phone: phone,
		athletePhone: phone,
		schoolEmail: email,
		athleteEmail: email,
		additionalEmail: email,
		parentName: optionalText(160),
		parentEmail: email,
		parentPhone: phone,
		emergencyContact: z
			.object({
				name: optionalText(160),
				relationship: optionalText(80),
				phone,
			})
			.optional(),
		medicalNotes: optionalText(4000),
		waivers: z
			.object({
				medical: z.boolean().optional(),
				media: z.boolean().optional(),
				transportation: z.boolean().optional(),
				codeOfConduct: z.boolean().optional(),
			})
			.optional(),
		season: z.string().trim().optional(),
	})
	.transform((data) => ({
		athleteName: data.athleteName,
		grade: data.grade ?? data.gradeLevel,
		gradeOther: data.gradeOther,
		school: data.school,
		schoolOther: data.schoolOther,
		division: data.division ?? data.genderDivision,
		divisionOther: data.divisionOther,
		shirtSize: data.shirtSize,
		phone: data.phone ?? data.athletePhone,
		schoolEmail: data.schoolEmail ?? data.athleteEmail,
		additionalEmail: data.additionalEmail,
		parentName: data.parentName,
		parentEmail: data.parentEmail,
		parentPhone: data.parentPhone,
		emergencyContact: data.emergencyContact,
		medicalNotes: data.medicalNotes,
		waivers: data.waivers,
		season: data.season,
	}))
	.superRefine((data, ctx) => {
		const required = [
			["phone", "Athlete phone number is required"],
			["schoolEmail", "A valid school email is required"],
			["school", "School selection is required"],
			["division", "Gender division is required"],
		];
		for (const [field, message] of required) {
			if (!data[field]) ctx.addIssue({ code: "custom", path: [field], message });
		}
		if (data.grade === "Other" && !data.gradeOther) {
			ctx.addIssue({
				code: "custom",
				path: ["gradeOther"],
				message: "Please specify the grade",
			});
		}
		if (data.school === "Other" && !data.schoolOther) {
			ctx.addIssue({
				code: "custom",
				path: ["schoolOther"],
				message: "Please specify the school",
			});
		}
		if (data.division === "Other" && !data.divisionOther) {
			ctx.addIssue({
				code: "custom",
				path: ["divisionOther"],
				message: "Please specify the division",
			});
		}
	});

export const subscribeSchema = z.object({
	email: z.string().trim().toLowerCase().email("Enter a valid email address"),
	firstName: optionalText(80),
	lastName: optionalText(80),
	list: z.string().trim().min(1).optional(),
	listSlug: z.string().trim().min(1).optional(),
	source: optionalText(200),
	tags: z.array(z.string().trim().max(60)).optional(),
});

export const unsubscribeSchema = z.object({
	email: z.string().trim().toLowerCase().email("Enter a valid email address"),
	list: z.string().trim().min(1).optional(),
	listSlug: z.string().trim().min(1).optional(),
});

export const contactMessageSchema = z.object({
	name: z.string().trim().min(2, "Name is required").max(160),
	email: z.string().trim().toLowerCase().email("Enter a valid email address"),
	phone: phone,
	subject: optionalText(240),
	message: z.string().trim().min(5, "Message is required").max(10000),
	source: optionalText(120),
});

export const loginSchema = z.object({
	email: z.string().trim().toLowerCase().email("Enter a valid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export const changePasswordSchema = z.object({
	currentPassword: z.string().min(8),
	newPassword: z.string().min(8, "Password must be at least 8 characters"),
});
