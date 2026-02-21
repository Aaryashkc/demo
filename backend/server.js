import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.route.js";
import superAdminRoutes from "./routes/superAdmin.route.js";
import orgAdminRoutes from "./routes/orgAdmin.route.js";
import driverRoutes from "./routes/driver.route.js";
import userRoutes from "./routes/user.route.js";
import scheduleRoutes from "./routes/schedule.route.js";
import locationRoutes from "./routes/location.route.js";
import { cleanupExpiredUploads } from "./controllers/upload.controller.js";

dotenv.config();

// Single cron schedule guard so hot reload (e.g. nodemon) does not register multiple jobs
let cleanupCronScheduled = false;
const CRON_SCHEDULE = "0 2 * * *"; // 2:00 AM every day (server local time)

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
// In development, allow all origins for easier debugging
// In production, use specific origin from env variable
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? (process.env.FRONTEND_URL || 'http://localhost:5173')
    : true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/super-admin", superAdminRoutes);
app.use("/api/org-admin", orgAdminRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/user", userRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/location", locationRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Waste Management System API" });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Optional: cron endpoint for external scheduler (e.g. Vercel Cron). Use CRON_SECRET in query.
app.get("/api/cron/cleanup-uploads", async (req, res) => {
  const secret = process.env.CRON_SECRET;
  if (secret && req.query.secret !== secret) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const result = await cleanupExpiredUploads();
    return res.status(200).json({ message: "Cleanup completed", ...result });
  } catch (err) {
    console.error("Cleanup error:", err);
    return res.status(500).json({ message: "Cleanup failed", error: err.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`CORS enabled for: ${process.env.NODE_ENV === 'production' ? (process.env.FRONTEND_URL || 'http://localhost:5173') : 'all origins (development)'}`);
  connectDB();

  // 30-day Cloudinary cleanup: run daily at 2:00 AM; single schedule to avoid duplicate jobs on hot reload
  if (!cleanupCronScheduled) {
    cleanupCronScheduled = true;
    cron.schedule(CRON_SCHEDULE, () => {
      cleanupExpiredUploads()
        .then((r) => {
          if (r.total > 0) console.log(`Cleanup: removed ${r.deleted} expired waste upload(s), errors=${r.errors}`);
        })
        .catch((e) => console.error("Cleanup error:", e));
    });  
  }
});
