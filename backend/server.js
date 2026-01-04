import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.route.js";
import superAdminRoutes from "./routes/superAdmin.route.js";
import orgAdminRoutes from "./routes/orgAdmin.route.js";
import driverRoutes from "./routes/driver.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/super-admin", superAdminRoutes);
app.use("/api/org-admin", orgAdminRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Waste Management System API" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
