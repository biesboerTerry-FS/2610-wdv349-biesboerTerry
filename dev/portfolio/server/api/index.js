import { createApp } from "../src/app.js";
import { connectDB } from "../src/config/db.js";

// Create the Express app once per lambda instance (module scope is cached
// between warm invocations on Vercel).
const app = createApp();

// Lazy, cached DB connection — never disconnect per-request on serverless.
let dbPromise;
function getDb() {
	if (!dbPromise) {
		dbPromise = connectDB().catch((error) => {
			// Reset the cached promise so a later request can retry.
			dbPromise = undefined;
			throw error;
		});
	}
	return dbPromise;
}

export default async function handler(req, res) {
	try {
		await getDb();
	} catch (error) {
		console.error("[api] db connection failed:", error);
		return res.status(503).json({ error: "Database unavailable" });
	}
	return app(req, res);
}
