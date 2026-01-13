// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config.js";
import universityRoutes from "./routes/universityRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ---------- Middleware ----------
app.use(express.json());

// CORS (deploy-friendly)
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server / Postman / curl (no origin)
      if (!origin) return callback(null, true);

      // If no CORS_ORIGIN set, allow all (easy during early deploy)
      if (allowedOrigins.length === 0) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ======= DEBUG: see every incoming request path/method =======
app.use((req, res, next) => {
  console.log("INCOMING:", req.method, req.url);
  next();
});
// ============================================================

// ---------- Routes ----------
app.use("/api/admin", adminRoutes);
app.use("/api/universities", universityRoutes);

// Basic root route
app.get("/", (req, res) => {
  res.send("PakUniInfo backend is running successfully!");
});

// Health check (for UptimeRobot)
app.get("/api/health", (req, res) => {
  res.status(200).send("OK");
});

// ---------- Start server FIRST, then connect DB ----------
const start = () => {
  // Start listening immediately (important for Railway health/edge)
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
  });

  // Connect MongoDB in background (avoid blocking startup)
  connectDB()
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((err) =>
      console.error("MongoDB connection failed:", err?.message || err)
    );
};

start();
