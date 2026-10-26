import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// server/.env regardless of the directory the process is started from.
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const booleanFromString = z
	.union([z.boolean(), z.string()])
	.transform((value) =>
		typeof value === "boolean" ? value : ["1", "true", "yes", "on"].includes(value.toLowerCase()),
	);

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
	PORT: z.coerce.number().int().positive().default(5050),
	MONGODB_URI: z
		.string()
		.min(1)
		.default("mongodb://127.0.0.1:27017/lindbergh_ultimate"),
	MONGODB_DB_NAME: z.string().min(1).default("lindbergh_ultimate"),
	JWT_SECRET: z.string().min(16).default("dev-only-secret-change-before-production"),
	JWT_EXPIRES_IN: z.string().default("7d"),
	ADMIN_API_KEY: z.string().min(8).optional(),
	CORS_ORIGINS: z.string().default(
		"http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174",
	),
	RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(15 * 60 * 1000),
	RATE_LIMIT_MAX: z.coerce.number().int().positive().default(300),
	PUBLIC_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(30),
	LOG_FORMAT: z.string().default("dev"),
	SEED_ADMIN_EMAIL: z.string().email().default("admin@example.com"),
	SEED_ADMIN_PASSWORD: z.string().min(8).default("ChangeMe123!"),
	SEED_DEMO_DATA: booleanFromString.default(false),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
	console.error("Invalid environment configuration:");
	console.error(result.error.flatten().fieldErrors);
	process.exit(1);
}

const env = result.data;

export const isProduction = env.NODE_ENV === "production";

if (isProduction && env.JWT_SECRET.startsWith("dev-only")) {
	throw new Error("JWT_SECRET must be set to a secure value in production.");
}

export const config = {
	...env,
	isProduction,
	corsOrigins: env.CORS_ORIGINS.split(",")
		.map((origin) => origin.trim())
		.filter(Boolean),
};
