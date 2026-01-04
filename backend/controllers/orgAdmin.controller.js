import User from "../models/User.model.js";
import Truck from "../models/Truck.model.js";
import Driver from "../models/Driver.model.js";
import Task from "../models/Task.model.js";
import bcrypt from "bcryptjs";

export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, contactInfo } = req.body;
    const orgId = req.user.orgId;

    if (!orgId) {
      return res.status(403).json({ message: "Organization ID required" });
    }

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      name,
      email,
      password: hashedPassword,
      contactInfo,
      role: "ORG_ADMIN",
      orgId
    });

    await admin.save();

    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create admin", error: error.message });
  }
};

export const addTruck = async (req, res) => {
  try {
    const { truckType, capacity, licensePlate } = req.body;
    const orgId = req.user.orgId;

    if (!orgId) {
      return res.status(403).json({ message: "Organization ID required" });
    }

    if (!truckType || !capacity || !licensePlate) {
      return res.status(400).json({ message: "Truck type, capacity, and license plate are required" });
    }

    const truck = new Truck({
      truckType,
      capacity,
      licensePlate,
      orgId
    });

    await truck.save();

    res.status(201).json({
      message: "Truck added successfully",
      truck
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add truck", error: error.message });
  }
};

export const addDriver = async (req, res) => {
  try {
    const { userId } = req.body;
    const orgId = req.user.orgId;

    if (!orgId) {
      return res.status(403).json({ message: "Organization ID required" });
    }

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "DRIVER") {
      return res.status(400).json({ message: "User must have DRIVER role" });
    }

    if (user.orgId && user.orgId.toString() !== orgId.toString()) {
      return res.status(403).json({ message: "Driver belongs to another organization" });
    }

    user.orgId = orgId;
    await user.save();

    const existingDriver = await Driver.findOne({ userId });
    if (existingDriver) {
      return res.status(400).json({ message: "Driver already exists" });
    }

    const driver = new Driver({
      userId,
      isAvailable: true
    });

    await driver.save();

    res.status(201).json({
      message: "Driver added successfully",
      driver
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add driver", error: error.message });
  }
};

export const reviewOnDemandRequest = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { action, estimatedVolume } = req.body;
    const orgId = req.user.orgId;

    if (!orgId) {
      return res.status(403).json({ message: "Organization ID required" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.orgId.toString() !== orgId.toString()) {
      return res.status(403).json({ message: "Unauthorized access to task" });
    }

    if (task.taskType !== "ON_DEMAND") {
      return res.status(400).json({ message: "Task is not an on-demand request" });
    }

    if (action === "approve") {
      if (estimatedVolume) {
        task.estimatedVolume = estimatedVolume;
      }
      task.status = "PENDING";
      await task.save();
      return res.status(200).json({
        message: "On-demand request approved",
        task
      });
    } else if (action === "reject") {
      task.status = "COMPLETED";
      await task.save();
      return res.status(200).json({
        message: "On-demand request rejected",
        task
      });
    } else {
      return res.status(400).json({ message: "Invalid action. Use 'approve' or 'reject'" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to review request", error: error.message });
  }
};

export const assignTaskToDriver = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { driverId, truckId } = req.body;
    const orgId = req.user.orgId;

    if (!orgId) {
      return res.status(403).json({ message: "Organization ID required" });
    }

    if (!driverId || !truckId) {
      return res.status(400).json({ message: "Driver ID and Truck ID are required" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.orgId.toString() !== orgId.toString()) {
      return res.status(403).json({ message: "Unauthorized access to task" });
    }

    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    const truck = await Truck.findById(truckId);
    if (!truck) {
      return res.status(404).json({ message: "Truck not found" });
    }

    if (truck.orgId.toString() !== orgId.toString()) {
      return res.status(403).json({ message: "Truck belongs to another organization" });
    }

    if (truck.truckType !== task.wasteType) {
      return res.status(400).json({ message: "Truck type does not match waste type" });
    }

    task.assignedDriverId = driverId;
    task.assignedTruckId = truckId;
    task.status = "ASSIGNED";
    await task.save();

    res.status(200).json({
      message: "Task assigned successfully",
      task
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to assign task", error: error.message });
  }
};

export const estimateWasteVolume = async (req, res) => {
  try {
    const { location, wasteType, taskType } = req.body;

    if (!location || !wasteType) {
      return res.status(400).json({ message: "Location and waste type are required" });
    }

    // Placeholder estimation logic
    // In production, this would use historical data, ML models, or other algorithms
    const baseEstimate = taskType === "ROUTINE" ? 500 : 200;
    const randomVariation = Math.random() * 200;
    const estimatedVolume = Math.round(baseEstimate + randomVariation);

    res.status(200).json({
      message: "Waste volume estimated",
      estimatedVolume,
      unit: "liters"
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to estimate waste volume", error: error.message });
  }
};

