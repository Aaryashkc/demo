import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import {
  getAssignedTasks,
  acceptTask,
  completeTask,
  updateLocation
} from "../controllers/driver.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("DRIVER"));

router.get("/tasks", getAssignedTasks);
router.put("/tasks/:taskId/accept", acceptTask);
router.put("/tasks/:taskId/complete", completeTask);
router.put("/location", updateLocation);

export default router;

