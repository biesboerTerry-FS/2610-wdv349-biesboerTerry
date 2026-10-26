import {
	ContactMessage,
	Donation,
	EmailSubscriber,
	FundraiserCampaign,
	InterestSubmission,
	Player,
	Registration,
	ScheduleEvent,
	Season,
} from "../models/index.js";

export async function getDashboardStats() {
	const now = new Date();
	const [
		registrationsTotal,
		registrationsByStatus,
		interestTotal,
		interestByStatus,
		playersTotal,
		playersActive,
		subscribersTotal,
		upcomingEvents,
		newMessages,
		activeSeason,
		activeCampaign,
		donationTotals,
		recentRegistrations,
		recentInterest,
	] = await Promise.all([
		Registration.countDocuments(),
		Registration.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
		InterestSubmission.countDocuments(),
		InterestSubmission.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
		Player.countDocuments(),
		Player.countDocuments({ status: "active" }),
		EmailSubscriber.countDocuments({ status: "subscribed" }),
		ScheduleEvent.countDocuments({
			startAt: { $gte: now },
			status: "scheduled",
			visibility: "public",
		}),
		ContactMessage.countDocuments({ status: "new" }),
		Season.findOne({ isActive: true }).sort({ startDate: -1 }),
		FundraiserCampaign.findOne({ status: { $in: ["active", "ended"] } }).sort({
			status: 1,
			isFeatured: -1,
			endDate: -1,
		}),
		Donation.aggregate([
			{ $match: { status: "completed" } },
			{ $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } },
		]),
		Registration.find().sort({ submittedAt: -1 }).limit(5).select("athleteName status submittedAt"),
		InterestSubmission.find()
			.sort({ submittedAt: -1 })
			.limit(5)
			.select("studentName status submittedAt"),
	]);

	return {
		registrations: {
			total: registrationsTotal,
			byStatus: Object.fromEntries(registrationsByStatus.map((row) => [row._id, row.count])),
		},
		interest: {
			total: interestTotal,
			byStatus: Object.fromEntries(interestByStatus.map((row) => [row._id, row.count])),
		},
		players: { total: playersTotal, active: playersActive },
		email: { subscribed: subscribersTotal },
		schedule: { upcomingPublicEvents: upcomingEvents },
		inbox: { newMessages },
		activeSeason,
		fundraiser: {
			campaign: activeCampaign,
			totalRaised: donationTotals[0]?.total ?? 0,
			donationCount: donationTotals[0]?.count ?? 0,
		},
		recent: {
			registrations: recentRegistrations,
			interest: recentInterest,
		},
	};
}
