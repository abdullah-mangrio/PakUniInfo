import express from "express";
import jwt from "jsonwebtoken";
import { requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * POST /api/admin/login
 * Body: { email, password }
 * Returns: { token }
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const payload = {
    id: "admin",
    email,
    role: "admin",
  };

  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d", // you can change this
    });

    return res.json({ token });
  } catch (err) {
    console.error("Error creating admin token:", err.message);
    return res.status(500).json({ message: "Server error creating token" });
  }
});

/**
 * GET /api/admin/me
 * Example protected route to test your token.
 * Must send Authorization: Bearer <token>
 */
router.get("/me", requireAdmin, (req, res) => {
  return res.json({
    admin: {
      email: req.admin.email,
      role: req.admin.role,
    },
  });
});

export default router;
