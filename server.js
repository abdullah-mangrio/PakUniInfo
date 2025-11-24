// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import { connectDB } from "./config.js";
import universityRoutes from "./routes/universityRoutes.js";
import University from "./models/University.js";

import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/admin", adminRoutes);

// ======= DEBUG: see every incoming request path/method =======
app.use((req, res, next) => {
  console.log("INCOMING:", req.method, req.url);
  next();
});
// ============================================================

// ============== INLINE ADMIN LOGIN ROUTE ====================
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body || {};

  console.log("LOGIN BODY:", email, password);
  console.log("ENV EMAIL:", process.env.ADMIN_EMAIL);
  console.log("ENV PASS:", process.env.ADMIN_PASSWORD);
  console.log("JWT_SECRET set:", !!process.env.JWT_SECRET);

  const envEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const envPassword = (process.env.ADMIN_PASSWORD || "").trim();
  const inputEmail = (email || "").trim().toLowerCase();
  const inputPassword = (password || "").trim();

  if (!envEmail || !envPassword || !process.env.JWT_SECRET) {
    return res
      .status(500)
      .json({ message: "Admin credentials or JWT secret not configured" });
  }

  if (inputEmail !== envEmail || inputPassword !== envPassword) {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  const token = jwt.sign(
    { email: envEmail, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({ token });
});
// ============================================================

// University routes
app.use("/api/universities", universityRoutes);

// (Optional) sample route for testing
app.get("/add-sample", async (req, res) => {
  try {
    const sampleUni = new University({
      name: "FAST NUCES",
      city: "Peshawar",
      ranking: 1,
      programs: ["BSCS", "BSEE", "BSIT"],
    });

    await sampleUni.save();
    res.send("Sample university added successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding sample university");
  }
});

app.get("/", (req, res) => {
  res.send("PakUniInfo backend is running successfully!");
});

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
