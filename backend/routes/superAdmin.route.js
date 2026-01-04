import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import {
  createOrganization,
  getAllOrganizations,
  manageSystemSettings
} from "../controllers/superAdmin.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("SUPER_ADMIN"));

router.post("/organizations", createOrganization);
router.get("/organizations", getAllOrganizations);
router.put("/settings", manageSystemSettings);

export default router;

