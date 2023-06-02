import jwt from "jsonwebtoken";

import asyncHandler from "./asyncHandler.js";
import UserModel from "../models/User.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  // Read the JWT from cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify token
      // decoded is an object that has the id of the user from jwt.sign()
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by id
      req.user = await UserModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Check if user is admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
