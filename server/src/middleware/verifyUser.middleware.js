import userModel from "../models/user.model.js";
import { JWT_TOKEN_NAME, JWT_SECRET_KEY } from "../config/config.js";
import jwt from "jsonwebtoken";

const verifyUser = async (req, res, next) => {
  try {
    // OAuth session authentication
    if (req.isAuthenticated?.() && req.user) {
      return next();
    }

    // Get JWT token from cookie
    const token = req.cookies?.[JWT_TOKEN_NAME];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const userId = decoded?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Fetch user
    const user = await userModel
      .findById(userId)
      .select("-password -emailVerificationToken -resetPasswordToken -__v");

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Attach user to request
    req.userId = userId;

    return next();
  } catch (err) {
    console.log(err);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default verifyUser;