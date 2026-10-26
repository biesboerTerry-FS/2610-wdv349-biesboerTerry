import {
	BoosterMember,
	Coach,
	ContactMessage,
	Donation,
	EmailCampaign,
	EmailList,
	EmailSubscriber,
	Faq,
	FundraiserCampaign,
	Gallery,
	Highlight,
	InterestSubmission,
	MediaItem,
	Parent,
	Player,
	Registration,
	ScheduleEvent,
	Season,
	SiteSetting,
	Team,
	Testimonial,
} from "../models/index.js";

/**
 * Resource registry shared by the admin CRUD routes and the schema metadata
 * endpoint. Keeping the definitions here means the API and the admin UI stay
 * in sync as fields are added to the models.
 */
export const ADMIN_RESOURCES = [
	{
		slug: "players",
		model: Player,
		options: {
			searchFields: ["firstName", "lastName", "preferredName", "schoolEmail", "phone", "school"],
			allowedFilters: ["status", "division", "grade", "school", "teams", "seasons", "parents"],
			allowedSortFields: ["firstName", "lastName", "createdAt", "updatedAt", "status", "grade"],
			defaultSort: "lastName firstName",
			populate: ["parents", "teams", "seasons"],
		},
	},
	{
		slug: "parents",
		model: Parent,
		options: {
			searchFields: ["firstName", "lastName", "email", "phone"],
			allowedFilters: ["relationship", "players", "emailOptIn", "isEmergencyContact"],
			allowedSortFields: ["firstName", "lastName", "email", "createdAt", "updatedAt"],
			defaultSort: "lastName firstName",
			populate: ["players"],
		},
	},
	{
		slug: "coaches",
		model: Coach,
		options: {
			searchFields: ["firstName", "lastName", "email", "title"],
			allowedFilters: ["program", "division", "status", "teams", "isBoosterContact"],
			allowedSortFields: ["firstName", "lastName", "displayOrder", "createdAt", "updatedAt"],
			defaultSort: "displayOrder lastName",
			populate: ["teams"],
		},
	},
	{
		slug: "teams",
		model: Team,
		options: {
			searchFields: ["name", "description"],
			allowedFilters: ["program", "division", "season", "isActive"],
			allowedSortFields: ["name", "displayOrder", "createdAt", "updatedAt"],
			defaultSort: "displayOrder name",
			populate: ["season", "captains", "players", "coaches"],
		},
	},
	{
		slug: "seasons",
		model: Season,
		options: {
			searchFields: ["name", "description"],
			allowedFilters: ["year", "program", "isActive", "registrationOpen"],
			allowedSortFields: ["year", "startDate", "createdAt", "updatedAt"],
			defaultSort: "-year -startDate",
		},
	},
	{
		slug: "registrations",
		model: Registration,
		options: {
			searchFields: ["athleteName", "schoolEmail", "phone", "parentName", "parentEmail"],
			allowedFilters: ["status", "paymentStatus", "season", "division", "grade", "school", "player"],
			allowedSortFields: ["athleteName", "submittedAt", "createdAt", "updatedAt", "status"],
			defaultSort: "-submittedAt",
			populate: ["season", "player", "parent"],
		},
	},
	{
		slug: "interest-submissions",
		model: InterestSubmission,
		options: {
			searchFields: ["studentName", "studentEmail", "studentPhone", "parentEmail"],
			allowedFilters: ["status", "interestLevel", "grade", "school", "divisions"],
			allowedSortFields: ["studentName", "submittedAt", "createdAt", "updatedAt", "status"],
			defaultSort: "-submittedAt",
		},
	},
	{
		slug: "schedules",
		model: ScheduleEvent,
		options: {
			searchFields: ["title", "description", "opponent", "location.name", "organization"],
			allowedFilters: ["type", "status", "visibility", "program", "division", "source", "season", "team"],
			allowedSortFields: ["startAt", "endAt", "title", "createdAt", "updatedAt"],
			defaultSort: "startAt",
			populate: ["season", "team"],
		},
	},
	{
		slug: "email-lists",
		model: EmailList,
		options: {
			searchFields: ["name", "description"],
			allowedFilters: ["audience", "isPublic", "isActive"],
			allowedSortFields: ["name", "createdAt", "updatedAt"],
			defaultSort: "name",
		},
	},
	{
		slug: "email-subscribers",
		model: EmailSubscriber,
		options: {
			searchFields: ["email", "firstName", "lastName"],
			allowedFilters: ["status", "lists"],
			allowedSortFields: ["email", "createdAt", "updatedAt"],
			defaultSort: "-createdAt",
			populate: ["lists"],
		},
	},
	{
		slug: "email-campaigns",
		model: EmailCampaign,
		options: {
			searchFields: ["name", "subject", "previewText"],
			allowedFilters: ["status", "list"],
			allowedSortFields: ["name", "scheduledFor", "sentAt", "createdAt", "updatedAt"],
			defaultSort: "-createdAt",
			populate: ["list"],
		},
	},
	{
		slug: "booster-members",
		model: BoosterMember,
		options: {
			searchFields: ["name", "role", "email"],
			allowedFilters: ["status", "isOpenPosition", "roleKey"],
			allowedSortFields: ["displayOrder", "role", "name", "createdAt", "updatedAt"],
			defaultSort: "displayOrder",
		},
	},
	{
		slug: "fundraiser-campaigns",
		model: FundraiserCampaign,
		options: {
			searchFields: ["title", "description", "beneficiary"],
			allowedFilters: ["status", "isFeatured"],
			allowedSortFields: ["title", "startDate", "createdAt", "updatedAt"],
			defaultSort: "-createdAt",
		},
	},
	{
		slug: "donations",
		model: Donation,
		options: {
			searchFields: ["donorName", "donorEmail", "transactionId"],
			allowedFilters: ["status", "campaign", "player", "paymentProvider"],
			allowedSortFields: ["amount", "donatedAt", "createdAt", "updatedAt"],
			defaultSort: "-donatedAt",
			populate: ["campaign", "player"],
		},
	},
	{
		slug: "testimonials",
		model: Testimonial,
		options: {
			searchFields: ["quote", "authorName", "attribution"],
			allowedFilters: ["authorType", "isApproved", "isFeatured", "program"],
			allowedSortFields: ["displayOrder", "authorName", "createdAt", "updatedAt"],
			defaultSort: "displayOrder",
		},
	},
	{
		slug: "faqs",
		model: Faq,
		options: {
			searchFields: ["question", "answer"],
			allowedFilters: ["category", "isPublished"],
			allowedSortFields: ["displayOrder", "category", "createdAt", "updatedAt"],
			defaultSort: "category displayOrder",
		},
	},
	{
		slug: "highlights",
		model: Highlight,
		options: {
			searchFields: ["title", "description", "recipients"],
			allowedFilters: ["category", "isPublished"],
			allowedSortFields: ["displayOrder", "category", "title", "createdAt", "updatedAt"],
			defaultSort: "category displayOrder",
		},
	},
	{
		slug: "galleries",
		model: Gallery,
		options: {
			searchFields: ["title", "description"],
			allowedFilters: ["year", "program", "isPublished"],
			allowedSortFields: ["displayOrder", "year", "title", "createdAt", "updatedAt"],
			defaultSort: "displayOrder",
			populate: ["items"],
		},
	},
	{
		slug: "media",
		model: MediaItem,
		options: {
			searchFields: ["title", "description"],
			allowedFilters: ["type", "gallery", "year", "program", "isPublished"],
			allowedSortFields: ["displayOrder", "year", "title", "createdAt", "updatedAt"],
			defaultSort: "displayOrder",
			populate: ["gallery"],
		},
	},
	{
		slug: "settings",
		model: SiteSetting,
		options: {
			searchFields: ["key", "label", "description"],
			allowedFilters: ["category", "isPublic"],
			allowedSortFields: ["key", "category", "createdAt", "updatedAt"],
			defaultSort: "category key",
		},
	},
	{
		slug: "messages",
		model: ContactMessage,
		options: {
			searchFields: ["name", "email", "subject", "message"],
			allowedFilters: ["status", "assignedTo"],
			allowedSortFields: ["name", "status", "createdAt", "updatedAt"],
			defaultSort: "-createdAt",
		},
	},
];

export const ADMIN_RESOURCE_BY_SLUG = Object.fromEntries(
	ADMIN_RESOURCES.map((resource) => [resource.slug, resource])
);

/** Maps a Mongoose model name to its admin resource slug (for reference pickers). */
export const ADMIN_REF_SLUGS = {
	...Object.fromEntries(ADMIN_RESOURCES.map((resource) => [resource.model.modelName, resource.slug])),
	User: "users",
};
