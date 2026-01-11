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

// Health check
app.get("/", (req, res) => {
  res.send("PakUniInfo backend is running successfully!");
});

// ---------- Start server AFTER DB connect ----------
const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();
