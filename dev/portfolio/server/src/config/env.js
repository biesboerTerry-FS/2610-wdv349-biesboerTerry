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

const emptyToUndefined = (value) =>
	value === "" || value === undefined ? undefined : value;

const optionalString = (min = 1) =>
	z.preprocess(emptyToUndefined, z.string().trim().min(min).optional());

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
	// Public site URL the frontend runs on (used as OAuth redirect target).
	FRONTEND_URL: z.string().url().optional(),
	// Public API URL (used to build OAuth callback URLs when unset).
	API_PUBLIC_URL: z.string().url().optional(),
	// Google OAuth (https://console.cloud.google.com/apis/credentials).
	GOOGLE_CLIENT_ID: optionalString(),
	GOOGLE_CLIENT_SECRET: optionalString(),
	// Apple Sign In (https://developer.apple.com).
	// APPLE_CLIENT_ID is the Services ID (or App ID for web flow).
	APPLE_CLIENT_ID: optionalString(),
	APPLE_TEAM_ID: optionalString(),
	APPLE_KEY_ID: optionalString(),
	// PEM contents of the .p8 key (with real newlines) or base64, or set
	// APPLE_PRIVATE_KEY_PATH to a .p8 file path when running locally.
	APPLE_PRIVATE_KEY: z.string().optional(),
	APPLE_PRIVATE_KEY_PATH: optionalString(),
	// Optional override for the OAuth callback base URL.
	OAUTH_CALLBACK_URL: z.string().url().optional(),
	// Comma-separated list of emails allowed to create an admin account via
	// OAuth. Existing users may always link a provider. Leave empty to only
	// allow linking existing users plus SEED_ADMIN_EMAIL.
	ADMIN_OAUTH_ALLOWLIST: z.string().default(""),
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
	frontendUrl: (env.FRONTEND_URL || "").replace(/\/+$/, "") || null,
	apiPublicUrl: (env.API_PUBLIC_URL || "").replace(/\/+$/, "") || null,
	adminOauthAllowlist: env.ADMIN_OAUTH_ALLOWLIST.split(",")
		.map((email) => email.trim().toLowerCase())
		.filter(Boolean),
};

export const oauthConfig = {
	get frontendUrl() {
		return config.frontendUrl || config.corsOrigins[0] || "http://localhost:5173";
	},
	get apiPublicUrl() {
		return config.apiPublicUrl || `http://localhost:${config.PORT}`;
	},
	get isGoogleEnabled() {
		return Boolean(config.GOOGLE_CLIENT_ID && config.GOOGLE_CLIENT_SECRET);
	},
	get isAppleEnabled() {
		return Boolean(config.APPLE_CLIENT_ID && config.APPLE_TEAM_ID && config.APPLE_KEY_ID);
	},
	get isEnabled() {
		return this.isGoogleEnabled || this.isAppleEnabled;
	},
	getConfiguredProviders() {
		const providers = [];
		if (this.isGoogleEnabled) providers.push({ id: "google", name: "Google" });
		if (this.isAppleEnabled) providers.push({ id: "apple", name: "Apple" });
		return providers;
	},
};
