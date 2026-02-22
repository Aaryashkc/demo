import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import {
    createPickup,
    getPickup,
    getPendingPickups,
    acceptPickup,
    cancelPickup,
} from "../controllers/pickup.controller.js";

const router = express.Router();

// All pickup routes require authentication
router.use(authMiddleware);

// Customer: create a pickup request
router.post("/", roleMiddleware("customer_admin"), createPickup);

// Driver: fetch all pending requests (initial load)
router.get("/pending", roleMiddleware("driver"), getPendingPickups);

// Shared: get a specific pickup (customer who owns it or any driver)
router.get("/:id", getPickup);

// Driver: atomically accept a pending request
router.post("/:id/accept", roleMiddleware("driver"), acceptPickup);

// Customer (or admin): cancel a request
router.post("/:id/cancel", cancelPickup);

export default router;
