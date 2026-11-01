// import { createApp } from "./app.js";
// import { connectDB } from "./config/db.js";

// const app = createApp();
// let connectionPromise;

// export async function handler(req, res) {
// 	if (!connectionPromise) {
// 		connectionPromise = connectDB().catch((error) => {
// 			connectionPromise = undefined;
// 			throw error;
// 		});
// 	}

// 	await connectionPromise;

// 	if (!req.url.startsWith("/api")) {
// 		req.url = `/api${req.url}`;
// 	}

// 	return app(req, res);
// }

import app from "./app.js";

export default async function handler(req, res) {
  try {
    return await app(req, res);
  } catch (err) {
    console.error("HANDLER ERROR:", err);
    res.status(500).send(err.message); // temporary — see the real error
  }
}
