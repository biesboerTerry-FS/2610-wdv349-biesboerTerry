import { Router } from "express";
import { authenticatePublic } from "../middleware/auth.js";
import { publicSubmissionLimiter } from "../middleware/rateLimit.js";
import {
	listProviders,
	oauthCallback,
	publicMe,
	startOAuth,
} from "../controllers/oauthController.js";

const router = Router();

// Public OAuth discovery (which providers are configured).
router.get("/oauth/providers", listProviders);

// Browser redirect flow: start at the provider, then return via callback.
router.get("/oauth/:provider/start", publicSubmissionLimiter, startOAuth);
router.get("/oauth/:provider/callback", publicSubmissionLimiter, oauthCallback);
// Apple Sign In posts back with `form_post`, so the callback must also
// accept POST with an urlencoded body.
router.post("/oauth/:provider/callback", publicSubmissionLimiter, oauthCallback);

// Public visitor session.
router.get("/public/me", authenticatePublic, publicMe);

export default router;
