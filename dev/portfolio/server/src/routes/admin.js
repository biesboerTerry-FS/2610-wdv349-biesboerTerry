import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import { createCrudRouter } from "../controllers/crudController.js";
import {
	approveRegistrationHandler,
	convertInterestHandler,
	dashboard,
} from "../controllers/adminController.js";
import {
	createUser,
	deleteUser,
	getUser,
	listUsers,
	updateUser,
} from "../controllers/adminUserController.js";
import { ADMIN_RESOURCES } from "../config/adminResources.js";
import { buildAdminMeta } from "../utils/schemaMeta.js";

const router = Router();

router.use(authenticate);

router.get("/dashboard", dashboard);

// Field metadata used by the admin UI to build create/edit forms.
router.get("/meta", (req, res) => {
	res.json({ success: true, data: buildAdminMeta() });
});

for (const { slug, model, options } of ADMIN_RESOURCES) {
	createCrudRouter(router, `/${slug}`, { model, ...options });
}

// Workflow actions (kept outside the generic CRUD router).
router.post("/registrations/:id/approve", approveRegistrationHandler);
router.post("/interest-submissions/:id/convert", convertInterestHandler);

router.get("/users", authorize("admin"), listUsers);
router.get("/users/:id", authorize("admin"), getUser);
router.post("/users", authorize("admin"), createUser);
router.patch("/users/:id", authorize("admin"), updateUser);
router.delete("/users/:id", authorize("admin"), deleteUser);

export default router;
