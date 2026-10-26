import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { config } from "./config/env.js";
import { globalLimiter } from "./middleware/rateLimit.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import publicRoutes from "./routes/public.js";
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";

export function createApp() {
	const app = express();

	app.set("trust proxy", 1);
	app.disable("x-powered-by");

	app.use(
		helmet({
			crossOriginResourcePolicy: { policy: "cross-origin" },
		}),
	);
	app.use(
		cors({
			origin(origin, callback) {
				if (!origin || config.corsOrigins.includes(origin)) {
					return callback(null, true);
				}
				return callback(null, false);
			},
			credentials: true,
		}),
	);
	app.use(compression());
	app.use(express.json({ limit: "1mb" }));
	app.use(express.urlencoded({ extended: true, limit: "1mb" }));
	app.use(morgan(config.LOG_FORMAT));

	app.get("/", (_req, res) => {
		res.json({
			success: true,
			name: "Lindbergh Ultimate API",
			version: "0.1.0",
			docs: "/api/health",
		});
	});

	app.use("/api", globalLimiter);
	app.use("/api", publicRoutes);
	app.use("/api/auth", authRoutes);
	app.use("/api/admin", adminRoutes);

	app.use(notFound);
	app.use(errorHandler);

	return app;
}
