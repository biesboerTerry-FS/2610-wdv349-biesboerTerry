import { createApp } from "./app.js";
import { connectDB } from "./config/db.js";

const app = createApp();

let dbPromise;
function getDb() {
	if (!dbPromise) {
		dbPromise = connectDB().catch((error) => {
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
		return res.status(503).json({ success: false, message: "Database unavailable" });
	}
	return app(req, res);
}
