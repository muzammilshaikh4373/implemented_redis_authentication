// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/jwt.js";


export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) return res.status(401).json({ message: "Unauthorized, token required" });

  try {
    req.user = verifyToken(token); 
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Role-based access (Only Admin)
export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin only" });
  }
  next();
};
