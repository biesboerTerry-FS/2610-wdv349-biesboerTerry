import { Parent, Player, Registration, Season } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";
import { addContactsToLists } from "./emailService.js";

export function splitName(fullName = "") {
	const parts = String(fullName).trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return { firstName: "Unknown", lastName: "Player" };
	if (parts.length === 1) return { firstName: parts[0], lastName: "" };
	return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

/**
 * Approves a registration by creating or updating linked Player/Parent records.
 * Safe to call more than once; returns the existing links if already approved.
 */
export async function approveRegistration(registrationId) {
	const registration = await Registration.findById(registrationId).populate("season");
	if (!registration) throw ApiError.notFound("Registration not found");

	const { firstName, lastName } = splitName(registration.athleteName);

	let player = registration.player ? await Player.findById(registration.player) : null;
	if (!player) {
		player = await Player.findOne({
			schoolEmail: registration.schoolEmail,
			firstName,
			lastName,
		});
	}

	if (!player) {
		player = new Player({
			firstName,
			lastName,
			grade: registration.grade,
			gradeOther: registration.gradeOther,
			school: registration.school,
			schoolOther: registration.schoolOther,
			division: registration.division,
			divisionOther: registration.divisionOther,
			shirtSize: registration.shirtSize,
			phone: registration.phone,
			schoolEmail: registration.schoolEmail,
			additionalEmail: registration.additionalEmail,
			status: "registered",
			emergencyContact: registration.emergencyContact,
			medicalNotes: registration.medicalNotes,
			registration: registration._id,
		});
	} else {
		player.grade = registration.grade ?? player.grade;
		player.school = registration.school ?? player.school;
		player.division = registration.division ?? player.division;
		player.shirtSize = registration.shirtSize ?? player.shirtSize;
		player.phone = registration.phone ?? player.phone;
		player.schoolEmail = registration.schoolEmail ?? player.schoolEmail;
		player.additionalEmail = registration.additionalEmail ?? player.additionalEmail;
		player.status = player.status === "prospect" ? "registered" : player.status;
		player.registration = registration._id;
	}

	if (registration.season?._id) {
		player.seasons.addToSet(registration.season._id);
	}

	await player.save();

	let parent = registration.parent ? await Parent.findById(registration.parent) : null;
	if (!parent && registration.parentEmail) {
		parent = await Parent.findOne({ email: registration.parentEmail });
	}

	if (!parent && registration.parentEmail) {
		const parentName = splitName(registration.parentName || `Parent ${lastName}`);
		parent = await Parent.create({
			firstName: parentName.firstName,
			lastName: parentName.lastName || lastName,
			email: registration.parentEmail,
			phone: registration.parentPhone,
			players: [player._id],
			emailOptIn: true,
		});
	}

	if (parent) {
		parent.players.addToSet(player._id);
		if (registration.parentPhone && !parent.phone) parent.phone = registration.parentPhone;
		await parent.save();
		player.parents.addToSet(parent._id);
		await player.save();
	}

	registration.player = player._id;
	if (parent) registration.parent = parent._id;
	registration.status = "approved";
	await registration.save();

	await addContactsToLists({
		email: player.schoolEmail,
		firstName: player.firstName,
		lastName: player.lastName,
		listSlugs: ["players"],
		source: "registration",
	});
	if (parent) {
		await addContactsToLists({
			email: parent.email,
			firstName: parent.firstName,
			lastName: parent.lastName,
			listSlugs: ["parents"],
			source: "registration",
		});
	}

	return { registration, player, parent };
}

export async function resolveSeasonSlugOrId(identifier) {
	if (!identifier) {
		return Season.findOne({ isActive: true }).sort({ startDate: -1 });
	}
	if (/^[a-f\d]{24}$/i.test(identifier)) return Season.findById(identifier);
	return Season.findOne({ slug: String(identifier).toLowerCase() });
}
