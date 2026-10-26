import mongoose from "mongoose";
import { Donation, FundraiserCampaign } from "../models/index.js";

export async function getFundraiserSummary({ campaignSlug } = {}) {
	let campaign = campaignSlug
		? await FundraiserCampaign.findOne({ slug: campaignSlug })
		: await FundraiserCampaign.findOne({ status: "active" }).sort({
				isFeatured: -1,
				startDate: -1,
			});

	if (!campaign && !campaignSlug) {
		campaign = await FundraiserCampaign.findOne({ status: "ended" }).sort({
			isFeatured: -1,
			endDate: -1,
		});
	}

	if (!campaign) {
		return {
			campaign: null,
			totals: { amountRaised: 0, supporterCount: 0, goalAmount: 0, percentRaised: 0 },
			leaderboard: [],
			supporters: [],
		};
	}

	const match = { campaign: campaign._id, status: "completed" };

	const [totals] = await Donation.aggregate([
		{ $match: match },
		{
			$group: {
				_id: null,
				amountRaised: { $sum: "$amount" },
				supporterCount: { $sum: 1 },
			},
		},
	]);

	const leaderboard = await Donation.aggregate([
		{ $match: { ...match, player: { $ne: null } } },
		{
			$group: {
				_id: "$player",
				amountRaised: { $sum: "$amount" },
				donationCount: { $sum: 1 },
			},
		},
		{ $sort: { amountRaised: -1 } },
		{ $limit: 25 },
		{
			$lookup: {
				from: "players",
				localField: "_id",
				foreignField: "_id",
				as: "player",
			},
		},
		{ $unwind: { path: "$player", preserveNullAndEmptyArrays: true } },
		{
			$project: {
				_id: 0,
				playerId: "$_id",
				playerName: {
					$trim: {
						input: {
							$concat: [
								{ $ifNull: ["$player.firstName", ""] },
								" ",
								{ $ifNull: ["$player.lastName", ""] },
							],
						},
					},
				},
				amountRaised: 1,
				donationCount: 1,
			},
		},
	]);

	const supporters = await Donation.find(match)
		.sort({ amount: -1, donatedAt: 1 })
		.limit(100)
		.select("donorName amount isAnonymous donatedAt message")
		.lean();

	const amountRaised = totals?.amountRaised ?? 0;
	const supporterCount = totals?.supporterCount ?? 0;
	const goalAmount = campaign.goalAmount ?? 0;

	return {
		campaign,
		totals: {
			amountRaised,
			supporterCount,
			goalAmount,
			percentRaised: goalAmount > 0 ? Math.min(100, (amountRaised / goalAmount) * 100) : 0,
		},
		leaderboard,
		supporters: supporters.map((donation, index) => ({
			place: index + 1,
			name: donation.isAnonymous ? "Anonymous" : donation.donorName || "Anonymous",
			amount: donation.amount,
			message: donation.message,
			donatedAt: donation.donatedAt,
		})),
	};
}

export async function getCampaignDonationTotal(campaignId) {
	const result = await Donation.aggregate([
		{
			$match: {
				campaign: new mongoose.Types.ObjectId(campaignId),
				status: "completed",
			},
		},
		{ $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } },
	]);
	return result[0] ?? { total: 0, count: 0 };
}
