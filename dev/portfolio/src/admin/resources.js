import { displayName, formatCurrency, formatDate } from "./format";

const name = (record) => displayName(record);

/**
 * Every admin-visible collection on the API. `columns` drive the table; the
 * record drawer always shows the full document, including fields not listed here.
 */
export const RESOURCES = {
	players: {
		label: "Players",
		group: "People",
		singular: "Player",
		columns: [
			{ label: "Name", get: name },
			{ label: "Grade", key: "grade" },
			{ label: "School", key: "school" },
			{ label: "Division", key: "division" },
			{ label: "Status", key: "status" },
			{ label: "Email", key: "schoolEmail" },
		],
	},
	parents: {
		label: "Parents",
		group: "People",
		singular: "Parent",
		columns: [
			{ label: "Name", get: name },
			{ label: "Email", key: "email" },
			{ label: "Phone", key: "phone" },
			{ label: "Relationship", key: "relationship" },
			{ label: "Opt-in", key: "emailOptIn" },
			{ label: "Players", key: "players" },
		],
	},
	coaches: {
		label: "Coaches",
		group: "People",
		singular: "Coach",
		columns: [
			{ label: "Name", get: name },
			{ label: "Title", key: "title" },
			{ label: "Program", key: "program" },
			{ label: "Division", key: "division" },
			{ label: "Status", key: "status" },
			{ label: "Email", key: "email" },
		],
	},
	teams: {
		label: "Teams",
		group: "People",
		singular: "Team",
		columns: [
			{ label: "Name", get: name },
			{ label: "Program", key: "program" },
			{ label: "Division", key: "division" },
			{ label: "Season", key: "season" },
			{ label: "Active", key: "isActive" },
			{ label: "Players", get: (r) => `${r.players?.length ?? 0}` },
		],
	},
	seasons: {
		label: "Seasons",
		group: "People",
		singular: "Season",
		columns: [
			{ label: "Name", get: name },
			{ label: "Year", key: "year" },
			{ label: "Starts", get: (r) => formatDate(r.startDate) },
			{ label: "Ends", get: (r) => formatDate(r.endDate) },
			{ label: "Registration", key: "registrationOpen" },
			{ label: "Active", key: "isActive" },
		],
	},
	registrations: {
		label: "Registrations",
		group: "Submissions",
		singular: "Registration",
		columns: [
			{ label: "Athlete", key: "athleteName" },
			{ label: "Grade", key: "grade" },
			{ label: "Division", key: "division" },
			{ label: "Status", key: "status" },
			{ label: "Payment", key: "paymentStatus" },
			{ label: "Submitted", get: (r) => formatDate(r.submittedAt) },
		],
	},
	"interest-submissions": {
		label: "Interest Forms",
		group: "Submissions",
		singular: "Interest form",
		columns: [
			{ label: "Student", key: "studentName" },
			{ label: "Grade", key: "grade" },
			{ label: "Divisions", key: "divisions" },
			{ label: "Interest", key: "interestLevel" },
			{ label: "Status", key: "status" },
			{ label: "Submitted", get: (r) => formatDate(r.submittedAt) },
		],
	},
	schedules: {
		label: "Schedule",
		group: "Scheduling",
		singular: "Event",
		columns: [
			{ label: "Title", key: "title" },
			{ label: "Type", key: "type" },
			{ label: "Starts", get: (r) => formatDate(r.startAt, true) },
			{ label: "Location", get: (r) => r.location?.name || "—" },
		],
	},
	"email-lists": {
		label: "Email Lists",
		group: "Email",
		singular: "Email list",
		columns: [
			{ label: "Name", get: name },
			{ label: "Audience", key: "audience" },
			{ label: "Public", key: "isPublic" },
			{ label: "Active", key: "isActive" },
			{ label: "Subscribers", get: (r) => `${r.subscriberCount ?? r.subscribers?.length ?? 0}` },
		],
	},
	"email-subscribers": {
		label: "Subscribers",
		group: "Email",
		singular: "Subscriber",
		columns: [
			{ label: "Email", key: "email" },
			{ label: "Name", get: name },
			{ label: "Status", key: "status" },
			{ label: "Lists", key: "lists" },
			{ label: "Added", get: (r) => formatDate(r.createdAt) },
		],
	},
	"email-campaigns": {
		label: "Campaigns",
		group: "Email",
		singular: "Campaign",
		columns: [
			{ label: "Name", get: name },
			{ label: "Subject", key: "subject" },
			{ label: "List", key: "list" },
			{ label: "Status", key: "status" },
			{ label: "Sent", get: (r) => formatDate(r.sentAt) },
		],
	},
	"booster-members": {
		label: "Boosters",
		group: "Boosters & Fundraising",
		singular: "Booster member",
		columns: [
			{ label: "Name", get: name },
			{ label: "Role", key: "role" },
			{ label: "Email", key: "email" },
			{ label: "Open position", key: "isOpenPosition" },
			{ label: "Status", key: "status" },
		],
	},
	"fundraiser-campaigns": {
		label: "Campaigns",
		group: "Boosters & Fundraising",
		singular: "Fundraiser",
		columns: [
			{ label: "Title", get: name },
			{ label: "Status", key: "status" },
			{ label: "Goal", get: (r) => formatCurrency(r.goalAmount) },
			{ label: "Raised", get: (r) => formatCurrency(r.raisedAmount) },
			{ label: "Ends", get: (r) => formatDate(r.endDate) },
		],
	},
	donations: {
		label: "Donations",
		group: "Boosters & Fundraising",
		singular: "Donation",
		columns: [
			{ label: "Donor", get: (r) => r.donorName || "Anonymous" },
			{ label: "Amount", get: (r) => formatCurrency(r.amount) },
			{ label: "Campaign", key: "campaign" },
			{ label: "Status", key: "status" },
			{ label: "Date", get: (r) => formatDate(r.donatedAt) },
		],
	},
	testimonials: {
		label: "Testimonials",
		group: "Website Content",
		singular: "Testimonial",
		columns: [
			{ label: "Author", key: "authorName" },
			{ label: "Type", key: "authorType" },
			{ label: "Quote", key: "quote" },
			{ label: "Approved", key: "isApproved" },
			{ label: "Featured", key: "isFeatured" },
		],
	},
	faqs: {
		label: "FAQs",
		group: "Website Content",
		singular: "FAQ",
		columns: [
			{ label: "Question", key: "question" },
			{ label: "Category", key: "category" },
			{ label: "Published", key: "isPublished" },
			{ label: "Order", key: "displayOrder" },
		],
	},
	highlights: {
		label: "Highlights",
		group: "Website Content",
		singular: "Highlight",
		columns: [
			{ label: "Title", get: name },
			{ label: "Category", key: "category" },
			{ label: "Published", key: "isPublished" },
			{ label: "Order", key: "displayOrder" },
		],
	},
	galleries: {
		label: "Galleries",
		group: "Website Content",
		singular: "Gallery",
		columns: [
			{ label: "Title", get: name },
			{ label: "Year", key: "year" },
			{ label: "Items", get: (r) => `${r.items?.length ?? 0}` },
			{ label: "Published", key: "isPublished" },
		],
	},
	media: {
		label: "Media",
		group: "Website Content",
		singular: "Media item",
		columns: [
			{ label: "Title", get: name },
			{ label: "Type", key: "type" },
			{ label: "Year", key: "year" },
			{ label: "Gallery", key: "gallery" },
			{ label: "Published", key: "isPublished" },
		],
	},
	settings: {
		label: "Site Settings",
		group: "Website Content",
		singular: "Setting",
		columns: [
			{ label: "Key", key: "key" },
			{ label: "Label", key: "label" },
			{ label: "Category", key: "category" },
			{ label: "Public", key: "isPublic" },
			{ label: "Value", key: "value" },
		],
	},
	messages: {
		label: "Inbox",
		group: "Inbox",
		singular: "Message",
		columns: [
			{ label: "From", get: name },
			{ label: "Email", key: "email" },
			{ label: "Subject", key: "subject" },
			{ label: "Status", key: "status" },
			{ label: "Received", get: (r) => formatDate(r.createdAt) },
		],
	},
	users: {
		label: "Admin Users",
		group: "System",
		singular: "Admin user",
		adminOnly: true,
		columns: [
			{ label: "Name", get: name },
			{ label: "Email", key: "email" },
			{ label: "Role", key: "role" },
			{ label: "Active", key: "isActive" },
			{ label: "Last login", get: (r) => formatDate(r.lastLoginAt) },
		],
	},
};

export const NAV_GROUPS = [
	{ label: "People", resources: ["players", "parents", "coaches", "teams", "seasons"] },
	{ label: "Submissions", resources: ["registrations", "interest-submissions"] },
	{ label: "Scheduling", resources: ["schedules"] },
	{ label: "Email", resources: ["email-lists", "email-subscribers", "email-campaigns"] },
	{
		label: "Boosters & Fundraising",
		resources: ["booster-members", "fundraiser-campaigns", "donations"],
	},
	{
		label: "Website Content",
		resources: ["testimonials", "faqs", "highlights", "galleries", "media", "settings"],
	},
	{ label: "Inbox", resources: ["messages"] },
	{ label: "System", resources: ["users"] },
];

export function getResource(slug) {
	return RESOURCES[slug] || null;
}
