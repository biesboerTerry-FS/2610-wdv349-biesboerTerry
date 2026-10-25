import { readFileSync } from "node:fs";
import { config } from "../config/env.js";
import { connectDB, disconnectDB } from "../config/db.js";
import {
	BoosterMember,
	Coach,
	Donation,
	EmailList,
	EmailSubscriber,
	Faq,
	FundraiserCampaign,
	Gallery,
	Highlight,
	MediaItem,
	Parent,
	Player,
	ScheduleEvent,
	Season,
	SiteSetting,
	Team,
	Testimonial,
	User,
} from "../models/index.js";
import { slugify } from "../utils/slugify.js";
import { seedAdminUser } from "./adminUser.js";
import {
	boosterMembers,
	coaches,
	demoDonations,
	demoPlayers,
	emailLists,
	externalEvents,
	faqs,
	fundraiserCampaign,
	galleries,
	highlights,
	mediaItems,
	siteSettings,
	testimonials,
} from "./seedData.js";

const calendar = JSON.parse(
	readFileSync(new URL("./calendar2026.json", import.meta.url), "utf8"),
);

const TRUMAN = {
	name: "Truman Middle School",
	address: "12225 Clayton Rd, St. Louis, MO 63131",
};

function chicagoOffset(dateString) {
	const date = new Date(`${dateString}T12:00:00Z`);
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: "America/Chicago",
		timeZoneName: "longOffset",
	}).formatToParts(date);
	const zone = parts.find((part) => part.type === "timeZoneName")?.value || "GMT-06:00";
	return zone.replace("GMT", "");
}

function atLocalTime(dateString, timeString = "00:00") {
	const offset = chicagoOffset(dateString);
	return new Date(`${dateString}T${timeString}:00${offset}`);
}

function parseTimeRange(value = "") {
	const matches = [...value.matchAll(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/gi)];
	if (matches.length < 2) return null;

	const to24 = (match) => {
		let hour = Number(match[1]);
		const minutes = match[2] || "00";
		const meridiem = match[3].toLowerCase();
		if (meridiem === "pm" && hour !== 12) hour += 12;
		if (meridiem === "am" && hour === 12) hour = 0;
		return `${String(hour).padStart(2, "0")}:${minutes}`;
	};

	return { start: to24(matches[0]), end: to24(matches[1]) };
}

function detectType(title = "") {
	const lower = title.toLowerCase();
	if (lower.includes("practice") || lower.includes("agility")) return "practice";
	if (lower.includes("clinic")) return "clinic";
	if (lower.includes("tournament")) return "tournament";
	if (lower.includes("game day")) return "game";
	if (lower.includes("meeting")) return "meeting";
	if (lower.includes("scrim")) return "scrimmage";
	if (lower.includes("spring break")) return "other";
	if (lower.includes("power lunch")) return "clinic";
	return "other";
}

function eachDate(startDate, endDate, callback) {
	const cursor = new Date(`${startDate}T12:00:00Z`);
	const end = new Date(`${endDate}T12:00:00Z`);
	while (cursor <= end) {
		callback(cursor.toISOString().slice(0, 10));
		cursor.setUTCDate(cursor.getUTCDate() + 7);
	}
}

function buildCalendarEvents(season) {
	const events = [];

	for (const [date, dayEvents] of Object.entries(calendar)) {
		for (const event of dayEvents) {
			const range = parseTimeRange(event.time);
			const allDay = !range;
			const type = detectType(event.title);
			const division =
				event.type === "gxrls" ? "gxrls" : event.type === "boys" ? "boys" : "general";
			const isPractice = ["practice", "clinic"].includes(type);

			events.push({
				title: event.title,
				type,
				program: "high-school",
				division,
				startAt: atLocalTime(date, range?.start || "00:00"),
				endAt: allDay
					? new Date(atLocalTime(date, "00:00").getTime() + 24 * 60 * 60 * 1000)
					: atLocalTime(date, range.end),
				allDay,
				location: isPractice ? TRUMAN : undefined,
				isMandatory: event.title.toLowerCase().includes("mandatory"),
				status: "scheduled",
				visibility: "public",
				source: "lindbergh",
				season: season._id,
				timezone: "America/Chicago",
				tags: ["seed"],
			});
		}
	}

	return events;
}

function buildProgramEvents() {
	const events = [];

	// Middle School fall after-school club (Wednesdays, Aug 26 - Dec 9 2026).
	eachDate("2026-08-26", "2026-12-09", (date) => {
		if (date === "2026-11-25") return; // Thanksgiving week
		events.push({
			title: "Middle School Fall After School Club",
			description: "Free after-school ultimate club for middle school players.",
			type: "practice",
			program: "middle-school",
			division: "mixed",
			startAt: atLocalTime(date, "15:00"),
			endAt: atLocalTime(date, "16:15"),
			location: TRUMAN,
			status: "scheduled",
			visibility: "public",
			source: "lindbergh",
			timezone: "America/Chicago",
			tags: ["seed", "middle-school"],
		});
	});

	// Power Lunch, year-round Wednesdays during A Lunch in the Green Gym.
	eachDate("2026-10-21", "2027-05-26", (date) => {
		events.push({
			title: "Power Lunch",
			description:
				"Low commitment opportunity to learn the basics of Ultimate. No experience needed.",
			type: "clinic",
			program: "high-school",
			division: "general",
			startAt: atLocalTime(date, "11:00"),
			endAt: atLocalTime(date, "11:30"),
			location: { name: "Lindbergh High School - Green Gym" },
			status: "scheduled",
			visibility: "public",
			source: "lindbergh",
			timezone: "America/Chicago",
			tags: ["seed", "power-lunch"],
		});
	});

	// Community Ed summer camps.
	for (const [title, start] of [
		["Community Ed Summer Camp - Beginner", "2026-06-03"],
		["Community Ed Summer Camp - Intermediate", "2026-07-08"],
	]) {
		eachDate(start, new Date(new Date(`${start}T12:00:00Z`).getTime() + 28 * 86400000).toISOString().slice(0, 10), (date) => {
			events.push({
				title,
				type: "clinic",
				program: "middle-school",
				division: "mixed",
				startAt: atLocalTime(date, "15:15"),
				endAt: atLocalTime(date, "16:45"),
				location: TRUMAN,
				status: "scheduled",
				visibility: "public",
				source: "lindbergh",
				timezone: "America/Chicago",
				tags: ["seed", "summer-camp"],
			});
		});
	}

	return events;
}

function buildExternalEvents() {
	return externalEvents.map((event) => ({
		...event,
		startAt: new Date(event.startAt),
		endAt: new Date(event.endAt),
		status: "scheduled",
		visibility: "public",
		source: "external",
		organization: "STL Ultimate",
		externalUrl: "https://calendar.google.com/calendar",
		timezone: "America/Chicago",
		tags: ["seed", "external"],
	}));
}

async function upsertBy(Model, query, data) {
	let document = await Model.findOne(query);
	if (!document) document = new Model();
	Object.assign(document, data);
	return document.save();
}

async function seed() {
	await connectDB();
	console.log("[seed] connected");

	const now = new Date();

	// Email lists -----------------------------------------------------------
	for (const list of emailLists) {
		await upsertBy(EmailList, { slug: list.slug }, list);
	}
	console.log(`[seed] email lists: ${emailLists.length}`);

	// Seasons and teams -----------------------------------------------------
	const spring = await upsertBy(
		Season,
		{ name: "2026 Spring High School Season", year: 2026 },
		{
			name: "2026 Spring High School Season",
			year: 2026,
			program: "high-school",
			startDate: new Date("2026-02-10T06:00:00.000Z"),
			endDate: new Date("2026-05-17T05:00:00.000Z"),
			registrationOpen: true,
			registrationOpensAt: new Date("2026-01-01T06:00:00.000Z"),
			registrationClosesAt: new Date("2026-02-28T05:59:59.000Z"),
			feeAmount: 0,
			description: "Lindbergh Ultimate spring high school season.",
			isActive: true,
		},
	);

	const fall = await upsertBy(
		Season,
		{ name: "2026 Fall Middle School Season", year: 2026 },
		{
			name: "2026 Fall Middle School Season",
			year: 2026,
			program: "middle-school",
			startDate: new Date("2026-08-26T05:00:00.000Z"),
			endDate: new Date("2026-12-09T06:00:00.000Z"),
			registrationOpen: true,
			feeAmount: 0,
			description: "Free after-school ultimate club for middle school players.",
			isActive: false,
		},
	);

	const boysTeam = await upsertBy(
		Team,
		{ name: "Lindbergh High School Boys Ultimate" },
		{
			name: "Lindbergh High School Boys Ultimate",
			program: "high-school",
			division: "Boys",
			season: spring._id,
			description: "Lindbergh High School boys ultimate team.",
			color: "#fbcc00",
			isActive: true,
			displayOrder: 1,
		},
	);

	const gxrlsTeam = await upsertBy(
		Team,
		{ name: "Lindbergh High School Gxrls Ultimate" },
		{
			name: "Lindbergh High School Gxrls Ultimate",
			program: "high-school",
			division: "Gxrls",
			season: spring._id,
			description: "Lindbergh High School Gxrls ultimate team.",
			color: "#fbcc00",
			isActive: true,
			displayOrder: 2,
		},
	);

	const middleSchoolTeamData = {
		name: "Lindbergh Middle School Ultimate",
		program: "middle-school",
		division: "Mixed",
		season: fall._id,
		description: "Free after-school ultimate club for Sperreng and Truman students.",
		color: "#1c6a37",
		isActive: true,
		displayOrder: 3,
	};
	await upsertBy(Team, { name: middleSchoolTeamData.name }, middleSchoolTeamData);

	// Coaches ---------------------------------------------------------------
	const savedCoaches = [];
	for (const coach of coaches) {
		const document = await upsertBy(
			Coach,
			{ email: coach.email },
			{ ...coach, slug: slugify(`${coach.firstName} ${coach.lastName}`), status: "active" },
		);
		savedCoaches.push(document);
	}

	const teamByCoachEmail = {
		"gabriellalavezzi@lindberghschools.ws": [boysTeam._id],
		"goodric3@gmail.com": [boysTeam._id],
		"kristinagu@lindberghschools.ws": [gxrlsTeam._id],
		"serioustob@gmail.com": [gxrlsTeam._id],
	};
	for (const coach of savedCoaches) {
		coach.teams = teamByCoachEmail[coach.email] || [];
		await coach.save();
	}
	console.log(`[seed] coaches: ${savedCoaches.length}`);

	// Public content --------------------------------------------------------
	await BoosterMember.deleteMany({});
	await BoosterMember.insertMany(boosterMembers);

	await Faq.deleteMany({});
	await Faq.insertMany(faqs);

	await Testimonial.deleteMany({});
	await Testimonial.insertMany(testimonials.map((item) => ({ ...item, isApproved: true })));

	await Highlight.deleteMany({});
	await Highlight.insertMany(highlights);

	await Gallery.deleteMany({});
	await Gallery.insertMany(galleries);

	await MediaItem.deleteMany({});
	await MediaItem.insertMany(mediaItems);

	await SiteSetting.deleteMany({});
	await SiteSetting.insertMany(siteSettings);

	// Schedules -------------------------------------------------------------
	await ScheduleEvent.deleteMany({ tags: "seed" });
	const scheduleEvents = [
		...buildCalendarEvents(spring),
		...buildProgramEvents(),
		...buildExternalEvents(),
	];
	await ScheduleEvent.insertMany(scheduleEvents);
	console.log(`[seed] schedule events: ${scheduleEvents.length}`);

	// Fundraiser ------------------------------------------------------------
	const campaign = await upsertBy(
		FundraiserCampaign,
		{ title: fundraiserCampaign.title },
		{
			...fundraiserCampaign,
			startDate: new Date(fundraiserCampaign.startDate),
			endDate: new Date(fundraiserCampaign.endDate),
		},
	);

	if (config.SEED_DEMO_DATA) {
		const players = [];
		for (const player of demoPlayers) {
			players.push(
				await upsertBy(
					Player,
					{ firstName: player.firstName, lastName: player.lastName, school: player.school },
					{
						...player,
						schoolEmail: `${player.firstName}.${player.lastName}@example.com`.toLowerCase(),
						status: "active",
					},
				),
			);
		}

		const parent = await upsertBy(
			Parent,
			{ email: "parent.demo@example.com" },
			{
				firstName: "Demo",
				lastName: "Parent",
				email: "parent.demo@example.com",
				phone: "314-555-0100",
				relationship: "guardian",
				players: players.map((player) => player._id),
				emailOptIn: true,
			},
		);

		for (const player of players) {
			player.parents = [parent._id];
			player.teams = [player.division === "Gxrls" ? gxrlsTeam._id : boysTeam._id];
			await player.save();
		}

		await Donation.deleteMany({ transactionId: /^seed-donation-/ });
		await Donation.insertMany(
			demoDonations.map((donation, index) => ({
				campaign: campaign._id,
				donorName: donation.donorName,
				donorEmail: `supporter${index + 1}@example.com`,
				amount: donation.amount,
				player: donation.playerIndex === null ? undefined : players[donation.playerIndex]._id,
				isAnonymous: Boolean(donation.isAnonymous),
				status: "completed",
				paymentProvider: "other",
				transactionId: donation.transactionId,
				donatedAt: new Date(`2026-0${(index % 8) + 2}-15T12:00:00Z`),
			})),
		);

		await upsertBy(
			EmailSubscriber,
			{ email: "parent.demo@example.com" },
			{
				email: "parent.demo@example.com",
				firstName: "Demo",
				lastName: "Parent",
				lists: [(await EmailList.findOne({ slug: "parents" }))._id],
				status: "subscribed",
				source: "seed",
				consent: { granted: true, grantedAt: now },
			},
		);

		console.log(`[seed] demo players: ${players.length}, donations: ${demoDonations.length}`);
	}

	// Admin user ------------------------------------------------------------
	// The site has a single Admin Panel login. No coach account is seeded.
	await seedAdminUser();
	console.log(`[seed] admin user: ${config.SEED_ADMIN_EMAIL}`);

	// Disable the legacy demo coach account if it was created by an earlier seed.
	const legacyCoach = await User.updateOne(
		{ email: "coach@lindberghultimate.com", role: "coach" },
		{ isActive: false },
	);
	if (legacyCoach.modifiedCount) {
		console.log("[seed] disabled legacy demo coach account");
	}

	console.log("[seed] done");
}

seed()
	.catch((error) => {
		console.error("[seed] failed:", error);
		process.exitCode = 1;
	})
	.finally(async () => {
		await disconnectDB();
	});
