import {
	BoosterMember,
	Coach,
	ContactMessage,
	Faq,
	FundraiserCampaign,
	Gallery,
	Highlight,
	InterestSubmission,
	MediaItem,
	Registration,
	ScheduleEvent,
	SiteSetting,
	Testimonial,
} from "../models/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { addContactsToLists, subscribeToList, unsubscribeFromList } from "../services/emailService.js";
import { getFundraiserSummary } from "../services/fundraiserService.js";
import { resolveSeasonSlugOrId } from "../services/registrationService.js";

function requestMeta(req) {
	return {
		ipAddress: req.ip,
		userAgent: req.get("user-agent") || undefined,
	};
}

export const createInterestSubmission = asyncHandler(async (req, res) => {
	const submission = await InterestSubmission.create({
		...req.body,
		...requestMeta(req),
	});

	try {
		await addContactsToLists({
			email: submission.studentEmail,
			firstName: submission.studentName.split(" ")[0],
			lastName: submission.studentName.split(" ").slice(1).join(" "),
			listSlugs: ["interest"],
			source: "interest-form",
		});
	} catch (error) {
		console.warn("[interest] could not sync email list:", error.message);
	}

	res.status(201).json({ success: true, data: submission });
});

export const createRegistration = asyncHandler(async (req, res) => {
	const { season: seasonIdentifier, ...registrationBody } = req.body;
	const season = await resolveSeasonSlugOrId(seasonIdentifier);

	const registration = await Registration.create({
		...registrationBody,
		season: season?._id,
		feeAmount: registrationBody.feeAmount ?? season?.feeAmount ?? 0,
		...requestMeta(req),
	});

	res.status(201).json({ success: true, data: registration });
});

export const subscribe = asyncHandler(async (req, res) => {
	const { subscriber, list } = await subscribeToList({
		...req.body,
		...requestMeta(req),
	});

	res.status(201).json({
		success: true,
		data: { subscriber },
		meta: { list: { id: list.id, name: list.name, slug: list.slug } },
	});
});

export const unsubscribe = asyncHandler(async (req, res) => {
	const result = await unsubscribeFromList(req.body);
	res.json({ success: true, data: result });
});

export const createContactMessage = asyncHandler(async (req, res) => {
	const message = await ContactMessage.create({ ...req.body, ...requestMeta(req) });
	res.status(201).json({ success: true, data: message });
});

function leanToJson(document) {
	const { _id, ...rest } = document;
	return { id: _id?.toString?.() ?? _id, ...rest };
}

export const listPublicSchedules = asyncHandler(async (req, res) => {
	const now = new Date();
	const filter = {
		visibility: "public",
		status: { $ne: "canceled" },
	};

	if (req.query.type) filter.type = { $in: String(req.query.type).split(",") };
	if (req.query.division) filter.division = { $in: String(req.query.division).split(",") };
	if (req.query.program) filter.program = { $in: String(req.query.program).split(",") };
	if (req.query.source) filter.source = req.query.source;
	if (req.query.from || req.query.to) {
		filter.startAt = {};
		if (req.query.from) filter.startAt.$gte = new Date(req.query.from);
		if (req.query.to) filter.startAt.$lte = new Date(req.query.to);
	} else if (req.query.past !== "true") {
		filter.startAt = { $gte: now };
	}

	const events = await ScheduleEvent.find(filter).sort({ startAt: 1 }).limit(500).lean();
	const sanitized = events.map(leanToJson);

	if (req.query.group === "day") {
		const groups = new Map();
		for (const event of sanitized) {
			const date = new Date(event.startAt).toLocaleDateString("en-CA", {
				timeZone: event.timezone || "America/Chicago",
			});
			if (!groups.has(date)) groups.set(date, []);
			groups.get(date).push(event);
		}
		res.json({
			success: true,
			data: [...groups.entries()].map(([date, dayEvents]) => ({ date, events: dayEvents })),
		});
		return;
	}

	res.json({ success: true, data: sanitized });
});

export const getFundraiser = asyncHandler(async (req, res) => {
	const summary = await getFundraiserSummary({ campaignSlug: req.query.campaign });
	res.json({ success: true, data: summary });
});

export const listPublicSettings = asyncHandler(async (_req, res) => {
	const settings = await SiteSetting.find({ isPublic: true }).sort({ category: 1, key: 1 }).lean();
	const data = Object.fromEntries(settings.map((setting) => [setting.key, setting.value]));
	res.json({ success: true, data });
});

function publicListHandler({ model, filter = {}, sort = "displayOrder", populate = [], limit = 200 }) {
	return asyncHandler(async (req, res) => {
		const where = { ...filter };
		const query = model.find(where).sort(sort).limit(Math.min(Number(req.query.limit) || limit, 500));
		for (const entry of populate) query.populate(entry);
		const data = await query.exec();
		res.json({ success: true, data });
	});
}

export const listPublicFaqs = publicListHandler({
	model: Faq,
	filter: { isPublished: true },
	sort: "category displayOrder",
});

export const listPublicTestimonials = publicListHandler({
	model: Testimonial,
	filter: { isApproved: true },
	sort: "displayOrder",
});

export const listPublicHighlights = publicListHandler({
	model: Highlight,
	filter: { isPublished: true },
	sort: "category displayOrder",
});

export const listPublicMedia = publicListHandler({
	model: MediaItem,
	filter: { isPublished: true },
	sort: "displayOrder",
	populate: [{ path: "gallery", select: "title slug year" }],
});

export const listPublicGalleries = publicListHandler({
	model: Gallery,
	filter: { isPublished: true },
	sort: "displayOrder",
});

export const listPublicCoaches = publicListHandler({
	model: Coach,
	filter: { status: "active" },
	sort: "displayOrder lastName",
});

export const listPublicBoosterMembers = publicListHandler({
	model: BoosterMember,
	filter: { status: { $in: ["active", "open"] } },
	sort: "displayOrder role",
});

export const listPublicCampaigns = asyncHandler(async (_req, res) => {
	const campaigns = await FundraiserCampaign.find({ status: { $in: ["active", "ended"] } })
		.sort({ isFeatured: -1, startDate: -1 })
		.lean();
	res.json({ success: true, data: campaigns.map(leanToJson) });
});

export const healthCheck = asyncHandler(async (_req, res) => {
	res.json({ success: true, data: { status: "ok", timestamp: new Date().toISOString() } });
});
