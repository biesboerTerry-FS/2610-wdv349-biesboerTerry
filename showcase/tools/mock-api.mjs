/**
 * Screenshot-only mock of the Lindbergh Ultimate API.
 *
 * The real API lives in dev/portfolio/server and needs MongoDB. This mock
 * keeps the same response shapes so the built frontend can be photographed
 * for the Milestone 4 slideshow without touching a database.
 *
 * Run: node showcase/tools/mock-api.mjs
 * Port: 5050 (the frontend's default VITE_API_URL)
 */
import http from "node:http";

const PORT = Number(process.env.MOCK_API_PORT || 5050);
const TOKEN = "showcase-demo-token";

const user = {
	id: "65f000000000000000000001",
	name: "Terry Biesboer",
	email: "admin@lindberghultimate.com",
	role: "admin",
};

const iso = (daysAgo, hour = 18) => {
	const date = new Date();
	date.setDate(date.getDate() - daysAgo);
	date.setHours(hour, 15, 0, 0);
	return date.toISOString();
};

const future = (daysAhead, hour = 17) => {
	const date = new Date();
	date.setDate(date.getDate() + daysAhead);
	date.setHours(hour, 30, 0, 0);
	return date.toISOString();
};

const id = (n) => `65f1${String(n).padStart(20, "0")}`;

const players = [
	{
		_id: id(11),
		firstName: "Maya",
		lastName: "Thompson",
		preferredName: "",
		grade: "9th",
		school: "Lindbergh High School",
		division: "Girls",
		shirtSize: "M",
		phone: "(314) 555-0142",
		schoolEmail: "maya.thompson@lindberghschools.ws",
		status: "active",
		jerseyNumber: "12",
		experienceLevel: "intermediate",
		positions: ["handler", "hybrid"],
		notes: "Joined the spring clinic; strong handler instincts.",
		createdAt: iso(34),
		updatedAt: iso(2),
	},
	{
		_id: id(12),
		firstName: "Eli",
		lastName: "Larson",
		preferredName: "Eli",
		grade: "11th",
		school: "Lindbergh High School",
		division: "Boys",
		shirtSize: "L",
		phone: "(314) 555-0188",
		schoolEmail: "eli.larson@lindberghschools.ws",
		status: "active",
		jerseyNumber: "07",
		experienceLevel: "advanced",
		positions: ["cutter"],
		notes: "Captain track candidate. Runs the warm-up.",
		createdAt: iso(61),
		updatedAt: iso(4),
	},
	{
		_id: id(13),
		firstName: "Nora",
		lastName: "Patel",
		grade: "10th",
		school: "Lindbergh High School",
		division: "Girls",
		shirtSize: "S",
		phone: "(314) 555-0119",
		schoolEmail: "nora.patel@lindberghschools.ws",
		status: "registered",
		jerseyNumber: "21",
		experienceLevel: "beginner",
		positions: ["unknown"],
		notes: "",
		createdAt: iso(12),
		updatedAt: iso(1),
	},
	{
		_id: id(14),
		firstName: "Caleb",
		lastName: "Brooks",
		grade: "12th",
		school: "Lindbergh High School",
		division: "Boys",
		shirtSize: "XL",
		phone: "(314) 555-0163",
		schoolEmail: "caleb.brooks@lindberghschools.ws",
		status: "active",
		jerseyNumber: "03",
		experienceLevel: "advanced",
		positions: ["handler"],
		notes: "",
		createdAt: iso(88),
		updatedAt: iso(8),
	},
	{
		_id: id(15),
		firstName: "Sophia",
		lastName: "Nguyen",
		grade: "9th",
		school: "Lindbergh High School",
		division: "Girls",
		shirtSize: "M",
		phone: "(314) 555-0171",
		schoolEmail: "sophia.nguyen@lindberghschools.ws",
		status: "prospect",
		jerseyNumber: "",
		experienceLevel: "beginner",
		positions: ["unknown"],
		notes: "Met the team at the activities fair.",
		createdAt: iso(5),
		updatedAt: iso(5),
	},
	{
		_id: id(16),
		firstName: "Owen",
		lastName: "Fischer",
		grade: "11th",
		school: "Lindbergh High School",
		division: "Boys",
		shirtSize: "L",
		phone: "(314) 555-0134",
		schoolEmail: "owen.fischer@lindberghschools.ws",
		status: "inactive",
		jerseyNumber: "18",
		experienceLevel: "intermediate",
		positions: ["hybrid"],
		notes: "Taking the fall off for marching band.",
		createdAt: iso(120),
		updatedAt: iso(20),
	},
	{
		_id: id(17),
		firstName: "Ava",
		lastName: "Ramirez",
		grade: "10th",
		school: "Lindbergh High School",
		division: "Girls",
		shirtSize: "S",
		phone: "(314) 555-0156",
		schoolEmail: "ava.ramirez@lindberghschools.ws",
		status: "active",
		jerseyNumber: "09",
		experienceLevel: "intermediate",
		positions: ["cutter", "hybrid"],
		notes: "",
		createdAt: iso(46),
		updatedAt: iso(3),
	},
	{
		_id: id(18),
		firstName: "Liam",
		lastName: "O'Connor",
		grade: "12th",
		school: "Lindbergh High School",
		division: "Boys",
		shirtSize: "L",
		phone: "(314) 555-0195",
		schoolEmail: "liam.oconnor@lindberghschools.ws",
		status: "alumni",
		jerseyNumber: "11",
		experienceLevel: "advanced",
		positions: ["handler"],
		notes: "Class of 2025. Helping with the alumni game.",
		createdAt: iso(300),
		updatedAt: iso(90),
	},
	{
		_id: id(19),
		firstName: "Grace",
		lastName: "Kim",
		grade: "9th",
		school: "Lindbergh High School",
		division: "Girls",
		shirtSize: "M",
		phone: "(314) 555-0122",
		schoolEmail: "grace.kim@lindberghschools.ws",
		status: "registered",
		jerseyNumber: "",
		experienceLevel: "beginner",
		positions: ["unknown"],
		notes: "",
		createdAt: iso(9),
		updatedAt: iso(9),
	},
	{
		_id: id(20),
		firstName: "Noah",
		lastName: "Bennett",
		grade: "11th",
		school: "Lindbergh High School",
		division: "Boys",
		shirtSize: "XL",
		phone: "(314) 555-0177",
		schoolEmail: "noah.bennett@lindberghschools.ws",
		status: "active",
		jerseyNumber: "24",
		experienceLevel: "intermediate",
		positions: ["cutter"],
		notes: "",
		createdAt: iso(72),
		updatedAt: iso(6),
	},
	{
		_id: id(21),
		firstName: "Zoe",
		lastName: "Carter",
		grade: "8th",
		school: "Sperreng Middle School",
		division: "Mixed",
		shirtSize: "S",
		phone: "(314) 555-0108",
		schoolEmail: "zoe.carter@lindberghschools.ws",
		status: "prospect",
		jerseyNumber: "",
		experienceLevel: "beginner",
		positions: ["unknown"],
		notes: "Interested in the spring middle school club.",
		createdAt: iso(3),
		updatedAt: iso(3),
	},
	{
		_id: id(22),
		firstName: "Henry",
		lastName: "Walsh",
		grade: "10th",
		school: "Lindbergh High School",
		division: "Boys",
		shirtSize: "M",
		phone: "(314) 555-0149",
		schoolEmail: "henry.walsh@lindberghschools.ws",
		status: "active",
		jerseyNumber: "15",
		experienceLevel: "intermediate",
		positions: ["hybrid"],
		notes: "",
		createdAt: iso(39),
		updatedAt: iso(7),
	},
];

const interestSubmissions = [
	{
		_id: id(31),
		studentName: "Maya Thompson",
		grade: "9th",
		divisions: ["Girls"],
		school: "Lindbergh High School",
		studentPhone: "(314) 555-0142",
		studentEmail: "maya.thompson@lindberghschools.ws",
		parentPhone: "(314) 555-0143",
		parentEmail: "parent.thompson@example.com",
		interestLevel: "definitely-playing",
		status: "converted",
		notes: "Converted to a player record.",
		submittedAt: iso(18, 19),
	},
	{
		_id: id(32),
		studentName: "Jordan Lee",
		grade: "8th",
		divisions: ["Mixed"],
		school: "Sperreng Middle School",
		studentPhone: "(314) 555-0201",
		studentEmail: "jordan.lee@lindberghschools.ws",
		parentPhone: "(314) 555-0202",
		parentEmail: "lee.family@example.com",
		interestLevel: "probably-playing",
		status: "contacted",
		notes: "Sent the middle school flyer.",
		submittedAt: iso(6, 16),
	},
	{
		_id: id(33),
		studentName: "Priya Shah",
		grade: "10th",
		divisions: ["Girls"],
		school: "Lindbergh High School",
		studentPhone: "(314) 555-0228",
		studentEmail: "priya.shah@lindberghschools.ws",
		parentPhone: "",
		parentEmail: "shah.family@example.com",
		interestLevel: "definitely-playing",
		status: "new",
		notes: "",
		submittedAt: iso(2, 20),
	},
	{
		_id: id(34),
		studentName: "Marcus Reed",
		grade: "11th",
		divisions: ["Boys"],
		school: "Lindbergh High School",
		studentPhone: "(314) 555-0233",
		studentEmail: "marcus.reed@lindberghschools.ws",
		parentPhone: "(314) 555-0234",
		parentEmail: "reed.family@example.com",
		interestLevel: "probably-playing",
		status: "new",
		notes: "",
		submittedAt: iso(1, 15),
	},
	{
		_id: id(35),
		studentName: "Chloe Martin",
		grade: "9th",
		divisions: ["Girls", "Mixed"],
		school: "Lindbergh High School",
		studentPhone: "(314) 555-0240",
		studentEmail: "chloe.martin@lindberghschools.ws",
		parentEmail: "martin.family@example.com",
		interestLevel: "undecided",
		status: "new",
		notes: "Wants to try a practice first.",
		submittedAt: iso(1, 12),
	},
	{
		_id: id(36),
		studentName: "Diego Alvarez",
		grade: "7th",
		divisions: ["Mixed"],
		school: "Truman Middle School",
		studentPhone: "(314) 555-0255",
		studentEmail: "diego.alvarez@lindberghschools.ws",
		parentEmail: "alvarez.family@example.com",
		interestLevel: "definitely-playing",
		status: "contacted",
		notes: "",
		submittedAt: iso(4, 17),
	},
];

const registrations = [
	{
		_id: id(41),
		athleteName: "Nora Patel",
		grade: "10th",
		division: "Girls",
		status: "submitted",
		paymentStatus: "pending",
		shirtSize: "S",
		schoolEmail: "nora.patel@lindberghschools.ws",
		submittedAt: iso(1, 18),
	},
	{
		_id: id(42),
		athleteName: "Grace Kim",
		grade: "9th",
		division: "Girls",
		status: "submitted",
		paymentStatus: "paid",
		shirtSize: "M",
		schoolEmail: "grace.kim@lindberghschools.ws",
		submittedAt: iso(2, 20),
	},
	{
		_id: id(43),
		athleteName: "Noah Bennett",
		grade: "11th",
		division: "Boys",
		status: "approved",
		paymentStatus: "paid",
		shirtSize: "XL",
		schoolEmail: "noah.bennett@lindberghschools.ws",
		submittedAt: iso(7, 11),
	},
	{
		_id: id(44),
		athleteName: "Ava Ramirez",
		grade: "10th",
		division: "Girls",
		status: "approved",
		paymentStatus: "paid",
		shirtSize: "S",
		schoolEmail: "ava.ramirez@lindberghschools.ws",
		submittedAt: iso(9, 14),
	},
	{
		_id: id(45),
		athleteName: "Henry Walsh",
		grade: "10th",
		division: "Boys",
		status: "under_review",
		paymentStatus: "pending",
		shirtSize: "M",
		schoolEmail: "henry.walsh@lindberghschools.ws",
		submittedAt: iso(3, 16),
	},
];

const schedules = [
	{
		_id: id(51),
		title: "Spring Season Kickoff",
		type: "practice",
		status: "scheduled",
		visibility: "public",
		startAt: future(2),
		endAt: future(2, 19),
		location: { name: "Lindbergh High School turf" },
	},
	{
		_id: id(52),
		title: "Home game vs. Parkway West",
		type: "game",
		status: "scheduled",
		visibility: "public",
		startAt: future(5),
		endAt: future(5, 19),
		location: { name: "Flyers Field" },
	},
];

const coaches = [
	{
		_id: id(61),
		firstName: "Alex",
		lastName: "Morgan",
		title: "Head Coach",
		program: "High School",
		division: "Boys",
		status: "active",
		email: "alex.morgan@example.com",
	},
	{
		_id: id(62),
		firstName: "Jamie",
		lastName: "Rivera",
		title: "Assistant Coach",
		program: "High School",
		division: "Girls",
		status: "active",
		email: "jamie.rivera@example.com",
	},
];

const store = {
	players,
	"interest-submissions": interestSubmissions,
	registrations,
	schedules,
	coaches,
	"booster-members": [],
	media: [],
	galleries: [],
	faqs: [],
	testimonials: [],
	highlights: [],
	"email-lists": [],
	"email-subscribers": [],
	"email-campaigns": [],
	"fundraiser-campaigns": [],
	donations: [],
	"contact-messages": [],
	settings: [],
	users: [user],
};

const meta = {
	players: {
		collection: "players",
		fields: [
			{ name: "firstName", kind: "string", required: true },
			{ name: "lastName", kind: "string", required: true },
			{ name: "preferredName", kind: "string" },
			{ name: "dateOfBirth", kind: "date" },
			{
				name: "grade",
				kind: "enum",
				enumValues: ["6th", "7th", "8th", "9th", "10th", "11th", "12th", "Other"],
			},
			{
				name: "school",
				kind: "enum",
				enumValues: [
					"Lindbergh High School",
					"Sperreng Middle School",
					"Truman Middle School",
					"Other",
				],
			},
			{ name: "division", kind: "enum", enumValues: ["Boys", "Girls", "Mixed", "Other"] },
			{ name: "shirtSize", kind: "enum", enumValues: ["XS", "S", "M", "L", "XL", "XXL"] },
			{ name: "phone", kind: "string" },
			{ name: "schoolEmail", kind: "email" },
			{
				name: "status",
				kind: "enum",
				enumValues: ["prospect", "registered", "active", "inactive", "alumni"],
			},
			{ name: "jerseyNumber", kind: "string" },
			{
				name: "experienceLevel",
				kind: "enum",
				enumValues: ["beginner", "intermediate", "advanced"],
			},
			{
				name: "positions",
				kind: "enumArray",
				enumValues: ["handler", "cutter", "hybrid", "utility", "unknown"],
			},
			{ name: "notes", kind: "text", rows: 4 },
		],
	},
	"interest-submissions": {
		collection: "interestsubmissions",
		fields: [
			{ name: "studentName", kind: "string", required: true },
			{
				name: "grade",
				kind: "enum",
				enumValues: ["6th", "7th", "8th", "9th", "10th", "11th", "12th", "Other"],
			},
			{
				name: "divisions",
				kind: "enumArray",
				enumValues: ["Boys", "Girls", "Mixed", "Other"],
			},
			{
				name: "school",
				kind: "enum",
				enumValues: [
					"Lindbergh High School",
					"Sperreng Middle School",
					"Truman Middle School",
					"Other",
				],
			},
			{ name: "studentPhone", kind: "string" },
			{ name: "studentEmail", kind: "email" },
			{ name: "parentPhone", kind: "string" },
			{ name: "parentEmail", kind: "email" },
			{
				name: "interestLevel",
				kind: "enum",
				enumValues: ["definitely-playing", "probably-playing", "undecided"],
			},
			{
				name: "status",
				kind: "enum",
				enumValues: ["new", "contacted", "converted", "closed"],
			},
			{ name: "notes", kind: "text", rows: 4 },
			{ name: "submittedAt", kind: "date" },
		],
	},
	registrations: {
		collection: "registrations",
		fields: [
			{ name: "athleteName", kind: "string", required: true },
			{ name: "grade", kind: "enum", enumValues: ["7th", "8th", "9th", "10th", "11th", "12th"] },
			{ name: "division", kind: "enum", enumValues: ["Boys", "Girls", "Mixed", "Other"] },
			{ name: "status", kind: "enum", enumValues: ["submitted", "under_review", "approved", "denied"] },
			{ name: "paymentStatus", kind: "enum", enumValues: ["pending", "paid", "waived", "refunded"] },
			{ name: "submittedAt", kind: "date" },
		],
	},
};

const json = (res, status, body) => {
	res.writeHead(status, {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
		"Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
	});
	res.end(JSON.stringify(body));
};

const readBody = (req) =>
	new Promise((resolve) => {
		let raw = "";
		req.on("data", (chunk) => {
			raw += chunk;
		});
		req.on("end", () => {
			try {
				resolve(raw ? JSON.parse(raw) : {});
			} catch {
				resolve({});
			}
		});
	});

const authed = (req) => req.headers.authorization === `Bearer ${TOKEN}`;

function dashboard() {
	const countBy = (rows, key) =>
		rows.reduce((acc, row) => {
			acc[row[key]] = (acc[row[key]] || 0) + 1;
			return acc;
		}, {});

	return {
		registrations: { total: 18, byStatus: countBy(store.registrations, "status") },
		interest: {
			total: store["interest-submissions"].length + 8,
			byStatus: countBy(store["interest-submissions"], "status"),
		},
		players: { total: store.players.length, active: store.players.filter((p) => p.status === "active").length },
		email: { subscribed: 126 },
		schedule: { upcomingPublicEvents: 6 },
		inbox: { newMessages: 3 },
		activeSeason: {
			_id: id(71),
			name: "2026 Spring Season",
			year: 2026,
			startDate: future(2),
			endDate: future(96),
			registrationOpen: true,
			isActive: true,
		},
		fundraiser: {
			campaign: {
				_id: id(72),
				name: "2026 Program Fundraiser",
				status: "active",
				goalAmount: 12000,
			},
			totalRaised: 4820,
			donationCount: 31,
		},
		recent: {
			registrations: [...store.registrations]
				.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
				.slice(0, 5)
				.map(({ _id, athleteName, status, submittedAt }) => ({
					_id,
					athleteName,
					status,
					submittedAt,
				})),
			interest: [...store["interest-submissions"]]
				.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
				.slice(0, 5)
				.map(({ _id, studentName, status, submittedAt }) => ({
					_id,
					studentName,
					status,
					submittedAt,
				})),
		},
	};
}

function listResource(resource, url) {
	const rows = store[resource] || [];
	const q = (url.searchParams.get("q") || "").toLowerCase().trim();
	const page = Math.max(1, Number(url.searchParams.get("page") || 1));
	const limit = Math.max(1, Number(url.searchParams.get("limit") || 25));
	const searchable = (row) =>
		Object.values(row)
			.filter((value) => typeof value === "string" || typeof value === "number")
			.join(" ")
			.toLowerCase();
	const filtered = q ? rows.filter((row) => searchable(row).includes(q)) : rows;
	const start = (page - 1) * limit;
	const data = filtered.slice(start, start + limit);
	const totalPages = Math.max(1, Math.ceil(filtered.length / limit));

	return {
		success: true,
		data,
		pagination: {
			page,
			limit,
			total: filtered.length,
			totalPages,
			hasNextPage: page < totalPages,
			hasPreviousPage: page > 1,
		},
	};
}

const server = http.createServer(async (req, res) => {
	const url = new URL(req.url, `http://${req.headers.host}`);

	if (req.method === "OPTIONS") {
		res.writeHead(204, {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
			"Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
		});
		res.end();
		return;
	}

	// Public health + form endpoints.
	if (url.pathname === "/api/health") {
		json(res, 200, { success: true, data: { status: "ok", mode: "showcase-mock" } });
		return;
	}

	if (req.method === "POST" && url.pathname === "/api/interest-submissions") {
		const body = await readBody(req);
		const created = {
			_id: id(900 + store["interest-submissions"].length),
			studentName: body.studentName || "New submission",
			grade: body.grade || "9th",
			divisions: body.divisions || [body.division].filter(Boolean),
			school: body.school || "",
			studentPhone: body.studentPhone || "",
			studentEmail: body.studentEmail || "",
			parentPhone: body.parentPhone || "",
			parentEmail: body.parentEmail || "",
			interestLevel: body.interestLevel || "probably-playing",
			status: "new",
			notes: "",
			submittedAt: new Date().toISOString(),
		};
		store["interest-submissions"].unshift(created);
		json(res, 201, { success: true, data: created });
		return;
	}

	if (req.method === "POST" && url.pathname === "/api/registrations") {
		const body = await readBody(req);
		const created = {
			_id: id(950 + store.registrations.length),
			athleteName: body.athleteName || "New athlete",
			grade: body.grade || "9th",
			division: body.division || "",
			status: "submitted",
			paymentStatus: "pending",
			shirtSize: body.shirtSize || "",
			schoolEmail: body.schoolEmail || "",
			submittedAt: new Date().toISOString(),
		};
		store.registrations.unshift(created);
		json(res, 201, { success: true, data: created });
		return;
	}

	if (url.pathname === "/api/auth/login" && req.method === "POST") {
		const body = await readBody(req);
		if (!body.email || !body.password) {
			json(res, 400, { success: false, message: "Email and password are required." });
			return;
		}
		json(res, 200, { success: true, data: { token: TOKEN, user } });
		return;
	}

	// Everything below requires a token, just like the real API.
	if (url.pathname.startsWith("/api/admin") || url.pathname === "/api/auth/me") {
		if (!authed(req)) {
			json(res, 401, { success: false, message: "Sign in to continue." });
			return;
		}
	}

	if (url.pathname === "/api/auth/me") {
		json(res, 200, { success: true, data: user });
		return;
	}

	if (url.pathname === "/api/admin/dashboard") {
		json(res, 200, { success: true, data: dashboard() });
		return;
	}

	if (url.pathname === "/api/admin/meta") {
		json(res, 200, { success: true, data: meta });
		return;
	}

	const adminMatch = url.pathname.match(/^\/api\/admin\/([^/]+)(?:\/([^/]+))?(?:\/([^/]+))?$/);
	if (adminMatch) {
		const [, resource, recordId, action] = adminMatch;
		const rows = store[resource];

		if (!rows) {
			json(res, 404, { success: false, message: "Unknown resource." });
			return;
		}

		if (action) {
			json(res, 200, { success: true, data: { id: recordId, action } });
			return;
		}

		if (req.method === "GET" && !recordId) {
			json(res, 200, listResource(resource, url));
			return;
		}

		if (req.method === "GET" && recordId) {
			const record = rows.find((row) => row._id === recordId);
			if (!record) {
				json(res, 404, { success: false, message: "Record not found." });
				return;
			}
			json(res, 200, { success: true, data: record });
			return;
		}

		if (req.method === "POST" && !recordId) {
			const body = await readBody(req);
			const created = {
				_id: id(1000 + rows.length),
				...body,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			rows.unshift(created);
			json(res, 201, { success: true, data: created });
			return;
		}

		if (req.method === "PATCH" && recordId) {
			const body = await readBody(req);
			const index = rows.findIndex((row) => row._id === recordId);
			if (index === -1) {
				json(res, 404, { success: false, message: "Record not found." });
				return;
			}
			rows[index] = { ...rows[index], ...body, updatedAt: new Date().toISOString() };
			json(res, 200, { success: true, data: rows[index] });
			return;
		}

		if (req.method === "DELETE" && recordId) {
			const index = rows.findIndex((row) => row._id === recordId);
			if (index !== -1) rows.splice(index, 1);
			json(res, 200, { success: true, data: { id: recordId, deleted: true } });
			return;
		}
	}

	// Public content endpoints used by the pages (most pages ship local data).
	if (url.pathname.startsWith("/api/") && req.method === "GET") {
		json(res, 200, { success: true, data: [] });
		return;
	}

	json(res, 404, { success: false, message: "Not found." });
});

server.listen(PORT, "127.0.0.1", () => {
	console.log(`[showcase mock API] http://127.0.0.1:${PORT}/api`);
});
