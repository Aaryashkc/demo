import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import {
  requestOnDemandPickup,
  trackRequestStatus
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("customer_admin"));

router.post("/pickup-request", requestOnDemandPickup);
router.get("/requests/:taskId/status", trackRequestStatus);

export default router;

