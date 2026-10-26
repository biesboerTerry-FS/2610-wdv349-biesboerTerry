import mongoose from "mongoose";
import { config } from "./env.js";

export async function connectDB() {
	mongoose.set("strictQuery", true);

	mongoose.connection.on("connected", () => {
		console.log(`[mongo] connected to ${mongoose.connection.name}`);
	});
	mongoose.connection.on("disconnected", () => {
		console.warn("[mongo] disconnected");
	});
	mongoose.connection.on("error", (error) => {
		console.error("[mongo] connection error:", error.message);
	});

	await mongoose.connect(config.MONGODB_URI, {
		dbName: config.MONGODB_DB_NAME,
		serverSelectionTimeoutMS: 10_000,
	});

	return mongoose.connection;
}

export async function disconnectDB() {
	await mongoose.disconnect();
}
