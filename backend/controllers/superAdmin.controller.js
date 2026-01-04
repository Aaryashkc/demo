import Organization from "../models/Organization.model.js";
import User from "../models/User.model.js";

export const createOrganization = async (req, res) => {
  try {
    const { name, location } = req.body;

    if (!name || !location || !location.address) {
      return res.status(400).json({ message: "Organization name and location are required" });
    }

    const organization = new Organization({
      name,
      location
    });

    await organization.save();

    res.status(201).json({
      message: "Organization created successfully",
      organization
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create organization", error: error.message });
  }
};

export const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find()
      .populate("admins", "name email")
      .populate("fleet", "truckType capacity licensePlate");

    res.status(200).json({
      message: "Organizations retrieved successfully",
      organizations
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve organizations", error: error.message });
  }
};

export const manageSystemSettings = async (req, res) => {
  try {
    // Placeholder for system settings management
    res.status(200).json({
      message: "System settings management endpoint",
      note: "Implementation pending"
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to manage system settings", error: error.message });
  }
};

