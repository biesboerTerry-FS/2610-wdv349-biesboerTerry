import { config } from "./config/env.js";
import { connectDB, disconnectDB } from "./config/db.js";
import { createApp } from "./app.js";

async function main() {
	await connectDB();

	const app = createApp();
	const server = app.listen(config.PORT, () => {
		console.log(`[api] listening on http://localhost:${config.PORT} (${config.NODE_ENV})`);
	});

	async function shutdown(signal) {
		console.log(`[api] ${signal} received, shutting down`);
		server.close(async () => {
			await disconnectDB();
			process.exit(0);
		});
		setTimeout(() => process.exit(1), 10_000).unref();
	}

	process.on("SIGINT", () => shutdown("SIGINT"));
	process.on("SIGTERM", () => shutdown("SIGTERM"));

	process.on("unhandledRejection", (reason) => {
		console.error("[api] unhandled rejection:", reason);
	});
	process.on("uncaughtException", (error) => {
		console.error("[api] uncaught exception:", error);
		shutdown("uncaughtException");
	});
}

main().catch((error) => {
	console.error("[api] failed to start:", error);
	process.exit(1);
});
