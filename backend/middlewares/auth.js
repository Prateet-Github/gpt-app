import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user and attach to request
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ success: false, message: "Not authorized, user not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
};