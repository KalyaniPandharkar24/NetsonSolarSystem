import jwt from "jsonwebtoken";
import Admin from "../modules/auth/auth.model.js";

export const protect = async (req, res, next) => {
  let token;

  // Check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach admin to request (without password)
      req.admin = await Admin.findById(decoded.id).select("-password");

      if (!req.admin) {
        return res.status(401).json({ message: "Admin not found" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Token is not valid" });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};
