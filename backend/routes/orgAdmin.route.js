import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import {
  createAdmin,
  addTruck,
  addDriver,
  reviewOnDemandRequest,
  assignTaskToDriver,
  estimateWasteVolume
} from "../controllers/orgAdmin.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("ORG_ADMIN"));

router.post("/admins", createAdmin);
router.post("/trucks", addTruck);
router.post("/drivers", addDriver);
router.put("/requests/:taskId/review", reviewOnDemandRequest);
router.put("/tasks/:taskId/assign", assignTaskToDriver);
router.post("/estimate-volume", estimateWasteVolume);

export default router;

