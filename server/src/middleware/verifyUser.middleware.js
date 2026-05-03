import userModel from "../models/user.model.js";
import { JWT_TOKEN_NAME, JWT_SECRET_KEY } from "../config/config.js";
import jwt from "jsonwebtoken";
const verifyUser = async (req, res, next) => {
  try {
    // OAuth session authentication
    if (req.isAuthenticated?.() && req.user) {
      req.userId = req.user._id;
      return next();
    }

    // JWT token authentication
    const token = req.cookies?.[JWT_TOKEN_NAME];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized No TOKEN",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const userId = decoded?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized NO USERID",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized NO USER",
      });
    }

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