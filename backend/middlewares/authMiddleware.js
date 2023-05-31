import jwt from "jsonwebtoken";

import asyncHandler from "./asyncHandler.js";
import UserModel from "../models/User.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  // Read the JWT from cookie
  token = req.cookies.jwt; 
  console.log('token: ', token);
  
  if(token){
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // decoded is an object that has the id of the user from jwt.sign()
      // Find user by id
      console.log('decoded: ', decoded);
      req.user = await UserModel.findById(decoded.id).select("-password");
      console.log('req.user: ', req.user);
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
  if(req.user && req.user.isAdmin){
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
}

export { protect, admin };