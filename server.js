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

// CORS
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ---------- Health FIRST ----------
app.get("/api/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("PakUniInfo backend is running successfully!");
});

// ---------- Debug ----------
app.use((req, res, next) => {
  console.log("INCOMING:", req.method, req.url);
  next();
});

// ---------- Routes ----------
app.use("/api/admin", adminRoutes);
app.use("/api/universities", universityRoutes);

// ---------- START SERVER (MOST IMPORTANT) ----------
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

// ---------- CONNECT DB (BACKGROUND) ----------
connectDB();
