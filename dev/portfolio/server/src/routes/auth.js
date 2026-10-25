import { Router } from "express";
import { login, me, changePassword } from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";
import { publicSubmissionLimiter } from "../middleware/rateLimit.js";
import { validateBody } from "../middleware/validate.js";
import { changePasswordSchema, loginSchema } from "../validators/public.js";

const router = Router();

router.post("/login", publicSubmissionLimiter, validateBody(loginSchema), login);
router.get("/me", authenticate, me);
router.post(
	"/change-password",
	authenticate,
	validateBody(changePasswordSchema),
	changePassword,
);

export default router;
