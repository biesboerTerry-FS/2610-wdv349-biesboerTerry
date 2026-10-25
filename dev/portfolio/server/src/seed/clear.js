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
} from "../models/index.js";
import { coaches, emailLists, fundraiserCampaign } from "./seedData.js";

const SEEDED_TEAM_NAMES = [
	"Lindbergh High School Boys Ultimate",
	"Lindbergh High School Gxrls Ultimate",
	"Lindbergh Middle School Ultimate",
];

const SEEDED_SEASON_NAMES = [
	"2026 Spring High School Season",
	"2026 Fall Middle School Season",
];

/**
 * Remove the content created by `npm run seed` while preserving the admin
 * login, public form submissions, messages, and any records added by hand.
 *
 * The seed script owns the public content collections, so those are cleared in
 * full. Known seed records in shared collections are targeted by name, email,
 * slug, title, or seed-specific identifiers.
 */
async function clearSeedData() {
	await connectDB();
	console.log("[seed:clear] connected");

	const counts = {};

	const remove = async (label, operation) => {
		const result = await operation;
		counts[label] = result.deletedCount ?? 0;
	};

	// Demo data first, so it cannot leave dangling references behind.
	await remove("demo donations", Donation.deleteMany({ transactionId: /^seed-donation-/ }));
	await remove(
		"demo email subscriber",
		EmailSubscriber.deleteMany({ email: "parent.demo@example.com" })
	);
	await remove("demo players", Player.deleteMany({ schoolEmail: /@example\.com$/i }));
	await remove("demo parent", Parent.deleteMany({ email: "parent.demo@example.com" }));

	// Seed-owned public content.
	await remove("schedule events", ScheduleEvent.deleteMany({ tags: "seed" }));
	await remove("gallery records", Gallery.deleteMany({}));
	await remove("media records", MediaItem.deleteMany({}));
	await remove("highlights", Highlight.deleteMany({}));
	await remove("FAQs", Faq.deleteMany({}));
	await remove("testimonials", Testimonial.deleteMany({}));
	await remove("booster members", BoosterMember.deleteMany({}));
	await remove("site settings", SiteSetting.deleteMany({}));
	await remove(
		"fundraiser campaigns",
		FundraiserCampaign.deleteMany({ title: fundraiserCampaign.title })
	);

	// Shared collections: remove only records created by the seed.
	await remove(
		"email lists",
		EmailList.deleteMany({ slug: { $in: emailLists.map((list) => list.slug) } })
	);
	await remove("teams", Team.deleteMany({ name: { $in: SEEDED_TEAM_NAMES } }));
	await remove("seasons", Season.deleteMany({ name: { $in: SEEDED_SEASON_NAMES } }));
	await remove(
		"coaches",
		Coach.deleteMany({ email: { $in: coaches.map((coach) => coach.email) } })
	);

	for (const [label, count] of Object.entries(counts)) {
		console.log(`[seed:clear] ${label}: ${count}`);
	}

	console.log(
		"[seed:clear] preserved: admin login, registrations, interest forms, messages, and other non-seed records"
	);
	console.log("[seed:clear] done");
}

clearSeedData()
	.catch((error) => {
		console.error("[seed:clear] failed:", error);
		process.exitCode = 1;
	})
	.finally(async () => {
		await disconnectDB();
	});
