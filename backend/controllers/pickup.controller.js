import PickupRequest from "../models/PickupRequest.model.js";
import Driver from "../models/Driver.model.js";
import Truck from "../models/Truck.model.js";
import { getIO } from "../socket/socketServer.js";

// ── helpers ────────────────────────────────────────────────────────────────

function pickupPayload(doc) {
    return {
        id: doc._id,
        customerId: doc.customerId,
        wasteUploadId: doc.wasteUploadId,
        location: doc.location,
        category: doc.category,
        level: doc.level,
        status: doc.status,
        driverInfo: doc.driverInfo,
        assignedAt: doc.assignedAt,
        expiresAt: doc.expiresAt,
        createdAt: doc.createdAt,
    };
}

// ── POST /api/pickups ──────────────────────────────────────────────────────

/**
 * Customer creates a new pickup request.
 * Emits `pickup:created` to the "drivers" room.
 */
export const createPickup = async (req, res) => {
    try {
        const { latitude, longitude, address, category, level, wasteUploadId } = req.body;

        if (!latitude || !longitude) {
            return res.status(400).json({ message: "latitude and longitude are required" });
        }

        const customer = req.user;

        const pickup = await PickupRequest.create({
            customerId: customer._id,
            orgId: customer.orgId,
            wasteUploadId: wasteUploadId || null,
            location: { latitude, longitude, address: address || null },
            category: category || "non-recyclable",
            level: level || "easy",
        });

        // Broadcast to all online drivers
        try {
            getIO().to("drivers").emit("pickup:created", {
                ...pickupPayload(pickup),
                customerName: customer.name,
            });
        } catch (_) {
            // Socket.IO might not yet be attached in test environments; swallow
        }

        return res.status(201).json({
            message: "Pickup request created",
            pickup: pickupPayload(pickup),
        });
    } catch (err) {
        console.error("createPickup error:", err);
        return res.status(500).json({ message: "Failed to create pickup request", error: err.message });
    }
};

// ── GET /api/pickups/:id ───────────────────────────────────────────────────

export const getPickup = async (req, res) => {
    try {
        const pickup = await PickupRequest.findById(req.params.id);
        if (!pickup) return res.status(404).json({ message: "Pickup request not found" });

        // Only the customer who created it or any driver may view it
        const { role, _id } = req.user;
        const isOwner = pickup.customerId.toString() === _id.toString();
        if (role !== "driver" && !isOwner) {
            return res.status(403).json({ message: "Access denied" });
        }

        return res.status(200).json({ pickup: pickupPayload(pickup) });
    } catch (err) {
        console.error("getPickup error:", err);
        return res.status(500).json({ message: "Failed to fetch pickup", error: err.message });
    }
};

// ── GET /api/pickups/pending ───────────────────────────────────────────────

/**
 * Driver fetches all PENDING pickups (for initial load / catch-up).
 */
export const getPendingPickups = async (req, res) => {
    try {
        const pickups = await PickupRequest.find({
            status: "PENDING",
            expiresAt: { $gt: new Date() },
        })
            .sort({ createdAt: -1 })
            .limit(20);

        return res.status(200).json({ pickups: pickups.map(pickupPayload) });
    } catch (err) {
        console.error("getPendingPickups error:", err);
        return res.status(500).json({ message: "Failed to fetch pickups", error: err.message });
    }
};

// ── POST /api/pickups/:id/accept ───────────────────────────────────────────

/**
 * Driver accepts a pickup request.
 * ATOMIC: uses findOneAndUpdate with status:"PENDING" filter so only one
 * driver can ever succeed.
 */
export const acceptPickup = async (req, res) => {
    try {
        const driverUser = req.user;

        // Get driver profile for truck info
        const driverProfile = await Driver.findOne({ userId: driverUser._id }).populate(
            "assignedTruckId",
            "licensePlate truckType"
        );
        if (!driverProfile) {
            return res.status(404).json({ message: "Driver profile not found" });
        }

        const driverInfo = {
            name: driverUser.name,
            phone: driverUser.phone || null,
            vehicleId: driverProfile.assignedTruckId?.truckType || null,
            licensePlate: driverProfile.assignedTruckId?.licensePlate || null,
        };

        // Atomic update — only succeeds if status is still PENDING
        const updated = await PickupRequest.findOneAndUpdate(
            { _id: req.params.id, status: "PENDING" },
            {
                $set: {
                    status: "ASSIGNED",
                    driverId: driverUser._id,
                    driverInfo,
                    assignedAt: new Date(),
                },
            },
            { new: true }
        );

        if (!updated) {
            // Either not found or already taken
            const exists = await PickupRequest.findById(req.params.id);
            if (!exists) return res.status(404).json({ message: "Pickup request not found" });
            return res.status(409).json({ message: "This request has already been accepted by another driver" });
        }

        const payload = pickupPayload(updated);

        try {
            const io = getIO();
            // Notify the customer
            io.to(`customer:${updated.customerId}`).emit("pickup:accepted", payload);
            // Notify all drivers so they can remove it from their list
            io.to("drivers").emit("pickup:accepted", { id: updated._id, status: "ASSIGNED" });
        } catch (_) { }

        return res.status(200).json({
            message: "Pickup request accepted",
            pickup: payload,
        });
    } catch (err) {
        console.error("acceptPickup error:", err);
        return res.status(500).json({ message: "Failed to accept pickup", error: err.message });
    }
};

// ── POST /api/pickups/:id/cancel ───────────────────────────────────────────

export const cancelPickup = async (req, res) => {
    try {
        const { _id, role } = req.user;

        const pickup = await PickupRequest.findById(req.params.id);
        if (!pickup) return res.status(404).json({ message: "Pickup request not found" });

        // Only the customer who owns it (or admins) can cancel
        const isOwner = pickup.customerId.toString() === _id.toString();
        if (role !== "super_admin" && role !== "admin" && !isOwner) {
            return res.status(403).json({ message: "Access denied" });
        }

        if (!["PENDING", "ASSIGNED"].includes(pickup.status)) {
            return res.status(400).json({ message: `Cannot cancel a request with status: ${pickup.status}` });
        }

        pickup.status = "CANCELLED";
        await pickup.save();

        const payload = pickupPayload(pickup);

        try {
            const io = getIO();
            io.to(`customer:${pickup.customerId}`).emit("pickup:status", payload);
            io.to("drivers").emit("pickup:cancelled", { id: pickup._id });
        } catch (_) { }

        return res.status(200).json({ message: "Pickup request cancelled", pickup: payload });
    } catch (err) {
        console.error("cancelPickup error:", err);
        return res.status(500).json({ message: "Failed to cancel pickup", error: err.message });
    }
};
