import Task from "../models/Task.model.js";
import Driver from "../models/Driver.model.js";
import Truck from "../models/Truck.model.js";
import User from "../models/User.model.js";

export const getAssignedTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const driver = await Driver.findOne({ userId });

    if (!driver) {
      return res.status(404).json({ message: "Driver profile not found" });
    }

    const tasks = await Task.find({
      assignedDriverId: driver._id,
      status: { $in: ["ASSIGNED", "IN_PROGRESS"] }
    })
      .populate("assignedTruckId", "truckType capacity licensePlate")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Assigned tasks retrieved successfully",
      tasks
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tasks", error: error.message });
  }
};

export const acceptTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user._id;
    const driver = await Driver.findOne({ userId });

    if (!driver) {
      return res.status(404).json({ message: "Driver profile not found" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.assignedDriverId.toString() !== driver._id.toString()) {
      return res.status(403).json({ message: "Task not assigned to this driver" });
    }

    if (task.status !== "ASSIGNED") {
      return res.status(400).json({ message: "Task is not in ASSIGNED status" });
    }

    task.status = "IN_PROGRESS";
    await task.save();

    res.status(200).json({
      message: "Task accepted and started",
      task
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to accept task", error: error.message });
  }
};

export const completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user._id;
    const driver = await Driver.findOne({ userId });

    if (!driver) {
      return res.status(404).json({ message: "Driver profile not found" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.assignedDriverId.toString() !== driver._id.toString()) {
      return res.status(403).json({ message: "Task not assigned to this driver" });
    }

    if (task.status !== "IN_PROGRESS") {
      return res.status(400).json({ message: "Task must be IN_PROGRESS to complete" });
    }

    task.status = "COMPLETED";
    task.completedAt = new Date();
    await task.save();

    if (task.assignedTruckId) {
      const truck = await Truck.findById(task.assignedTruckId);
      if (truck) {
        truck.isAvailable = true;
        await truck.save();
      }
    }

    driver.isAvailable = true;
    await driver.save();

    res.status(200).json({
      message: "Task completed successfully",
      task
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to complete task", error: error.message });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const { latitude, longitude, address } = req.body;
    const userId = req.user._id;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude and longitude are required" });
    }

    const driver = await Driver.findOne({ userId });
    if (!driver) {
      return res.status(404).json({ message: "Driver profile not found" });
    }

    driver.currentLocation = {
      latitude,
      longitude,
      address: address || driver.currentLocation?.address
    };

    await driver.save();

    res.status(200).json({
      message: "Location updated successfully",
      location: driver.currentLocation
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update location", error: error.message });
  }
};

