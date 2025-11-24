import jwt from "jsonwebtoken";

export const requireAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  // Expecting: Authorization: Bearer <token>
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optional extra safety: check role
    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as admin" });
    }

    req.admin = decoded; // attach admin info to request
    next();
  } catch (err) {
    console.error("Error in requireAdmin:", err.message);
    return res.status(401).json({ message: "Token is not valid" });
  }
};
