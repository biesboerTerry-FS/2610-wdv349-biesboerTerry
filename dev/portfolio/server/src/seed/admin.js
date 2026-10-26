import { config } from "../config/env.js";
import { connectDB, disconnectDB } from "../config/db.js";
import { seedAdminUser } from "./adminUser.js";

async function main() {
	await connectDB();
	await seedAdminUser();
	console.log(`[seed] admin user ready: ${config.SEED_ADMIN_EMAIL}`);
}

main()
	.catch((error) => {
		console.error("[seed] failed:", error);
		process.exitCode = 1;
	})
	.finally(async () => {
		await disconnectDB();
	});
