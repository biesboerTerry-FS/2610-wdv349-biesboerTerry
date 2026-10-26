import { Router } from "express";
import {
	createContactMessage,
	createInterestSubmission,
	createRegistration,
	getFundraiser,
	healthCheck,
	listPublicBoosterMembers,
	listPublicCampaigns,
	listPublicCoaches,
	listPublicFaqs,
	listPublicGalleries,
	listPublicHighlights,
	listPublicMedia,
	listPublicSchedules,
	listPublicSettings,
	listPublicTestimonials,
	subscribe,
	unsubscribe,
} from "../controllers/publicController.js";
import { publicSubmissionLimiter } from "../middleware/rateLimit.js";
import { validateBody } from "../middleware/validate.js";
import {
	contactMessageSchema,
	interestSubmissionSchema,
	registrationSchema,
	subscribeSchema,
	unsubscribeSchema,
} from "../validators/public.js";

const router = Router();

router.get("/health", healthCheck);

// Public content used by the React pages.
router.get("/coaches", listPublicCoaches);
router.get("/booster-members", listPublicBoosterMembers);
router.get("/schedules", listPublicSchedules);
router.get("/fundraiser", getFundraiser);
router.get("/fundraiser/campaigns", listPublicCampaigns);
router.get("/faqs", listPublicFaqs);
router.get("/testimonials", listPublicTestimonials);
router.get("/highlights", listPublicHighlights);
router.get("/media", listPublicMedia);
router.get("/galleries", listPublicGalleries);
router.get("/settings", listPublicSettings);

// Website forms.
router.post(
	"/interest-submissions",
	publicSubmissionLimiter,
	validateBody(interestSubmissionSchema),
	createInterestSubmission,
);
router.post(
	"/registrations",
	publicSubmissionLimiter,
	validateBody(registrationSchema),
	createRegistration,
);
router.post("/contact", publicSubmissionLimiter, validateBody(contactMessageSchema), createContactMessage);

// Email list opt-in / opt-out.
function listSlugFromParam(req, _res, next) {
	if (req.params.slug) req.body.listSlug = req.params.slug;
	next();
}

router.post(
	"/email-lists/subscribe",
	publicSubmissionLimiter,
	validateBody(subscribeSchema),
	subscribe,
);
router.post(
	"/email-lists/:slug/subscribe",
	publicSubmissionLimiter,
	listSlugFromParam,
	validateBody(subscribeSchema),
	subscribe,
);
router.post(
	"/email-lists/unsubscribe",
	publicSubmissionLimiter,
	validateBody(unsubscribeSchema),
	unsubscribe,
);

export default router;
