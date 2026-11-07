import mongoose from "mongoose";
import { config } from "./env.js";

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function connectDB() {
	mongoose.set("strictQuery", true);

	if (cached.conn) return cached.conn;
	if (!cached.promise) {
		mongoose.connection.on("connected", () => {
			console.log(`[mongo] connected to ${mongoose.connection.name}`);
		});
		mongoose.connection.on("disconnected", () => {
			console.warn("[mongo] disconnected");
		});
		mongoose.connection.on("error", (error) => {
			console.error("[mongo] connection error:", error.message);
		});

		cached.promise = mongoose
			.connect(config.MONGODB_URI, {
				dbName: config.MONGODB_DB_NAME,
				serverSelectionTimeoutMS: 10_000,
			})
			.catch((error) => {
				// Reset so the next serverless invocation can retry.
				cached.promise = undefined;
				throw error;
			});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}

export async function disconnectDB() {
	await mongoose.disconnect();
	cached.conn = null;
	cached.promise = null;
}
