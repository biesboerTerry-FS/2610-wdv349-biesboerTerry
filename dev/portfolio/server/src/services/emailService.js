import { EmailList, EmailSubscriber } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Finds a list by slug or ObjectId. Returns null when no list matches.
 */
export async function resolveList({ list, listSlug, publicOnly = false }) {
	const identifier = listSlug || list;
	const visibility = publicOnly ? { isPublic: true, isActive: true } : {};

	if (identifier) {
		const bySlug = await EmailList.findOne({ slug: identifier.toLowerCase(), ...visibility });
		if (bySlug) return bySlug;
		if (/^[a-f\d]{24}$/i.test(identifier)) {
			return EmailList.findOne({ _id: identifier, ...visibility });
		}
		return null;
	}

	// Default public list used by footer/site-wide subscribe forms.
	const general = await EmailList.findOne({ slug: "general", ...visibility });
	if (general) return general;

	return EmailList.findOne({ isPublic: true, isActive: true }).sort({ createdAt: 1 });
}

export async function subscribeToList({
	email,
	list,
	listSlug,
	firstName,
	lastName,
	source,
	tags = [],
	ipAddress,
	userAgent,
	allowPrivate = false,
}) {
	const targetList = await resolveList({ list, listSlug, publicOnly: !allowPrivate });
	if (!targetList) {
		throw ApiError.notFound("No subscription list is available");
	}

	const now = new Date();
	let subscriber = await EmailSubscriber.findOne({ email });

	if (!subscriber) {
		subscriber = await EmailSubscriber.create({
			email,
			firstName,
			lastName,
			lists: [targetList._id],
			status: "subscribed",
			source: source || "website",
			tags,
			consent: { granted: true, grantedAt: now, ipAddress, userAgent },
		});
	} else {
		subscriber.lists.addToSet(targetList._id);
		subscriber.status = "subscribed";
		subscriber.unsubscribedAt = undefined;
		subscriber.source = source || subscriber.source;
		for (const tag of tags) subscriber.tags.addToSet(tag);
		if (firstName) subscriber.firstName = firstName;
		if (lastName) subscriber.lastName = lastName;
		subscriber.consent = {
			granted: true,
			grantedAt: subscriber.consent?.grantedAt || now,
			ipAddress,
			userAgent,
		};
		await subscriber.save();
	}

	return { subscriber, list: targetList };
}

export async function unsubscribeFromList({ email, list, listSlug }) {
	const subscriber = await EmailSubscriber.findOne({ email });
	if (!subscriber) return { subscriber: null, removedFromList: false };

	const targetList = await resolveList({ list, listSlug });

	if (targetList) {
		subscriber.lists.pull(targetList._id);
		if (subscriber.lists.length === 0) {
			subscriber.status = "unsubscribed";
			subscriber.unsubscribedAt = new Date();
		}
	} else {
		subscriber.lists = [];
		subscriber.status = "unsubscribed";
		subscriber.unsubscribedAt = new Date();
	}

	await subscriber.save();
	return { subscriber, removedFromList: Boolean(targetList) };
}

export async function addContactsToLists({ email, firstName, lastName, listSlugs = [], source }) {
	if (!email) return [];
	const results = [];

	for (const slug of listSlugs) {
		const list = await EmailList.findOne({ slug });
		if (!list) continue;
		results.push(
			await subscribeToList({
				email,
				list: list.id,
				firstName,
				lastName,
				source: source || "registration",
				allowPrivate: true,
			}),
		);
	}

	return results;
}
