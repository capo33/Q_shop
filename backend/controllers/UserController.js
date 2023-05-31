import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";

import UserModel from "../models/User.js";
import generateToken from "../utils/generrateToken.js";

// @desc    Register a new user
// @route   POST /api/v1/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate Token & Cookie
  generateToken(res, user._id);

  // Send response
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// @desc    Login a user
// @route   POST /api/v1/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });

  if (!existingUser) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // Generate Token & Cookie
  generateToken(res, existingUser._id);

  // Send response
  res.status(200).json({
    _id: existingUser._id,
    name: existingUser.name,
    email: existingUser.email,
    isAdmin: existingUser.isAdmin,
  });
});

// @desc    Logout a user / clear cookie
// @route   GET /api/v1/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // expires immediately
  });

  // Send response
  res.status(200).json({
    message: "Logged out successfully",
  });
});

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
// no need to pass id because we are getting it from the token
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user?._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);

  // if name is not provided, use the existing name
  // if email is not provided, use the existing email
  if (user) {
    user.name = req.body.name || user.name; 
    user.email = req.body.email || user.email; 

    if (req.body.password) {
      // we need to hash the password before saving it or we could do it in the model
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    // Generate Token & Cookie
    generateToken(res, updatedUser._id);

    // Send response
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      message: "Profile updated successfully",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private (admin only)
const getUsers = asyncHandler(async (req, res) => {
  res.send("success");
});

// @desc    Get a user by id
// @route   GET /api/v1/users/:id
// @access  Private (admin only)
const getUserById = asyncHandler(async (req, res) => {
  res.send("success");
});

// @desc    Update a user
// @route   PUT /api/v1/users/:id
// @access  Private (admin only)
const updateUser = asyncHandler(async (req, res) => {
  res.send("success");
});

// @desc    Delete a user
// @route   DELETE /api/v1/users/:id
// @access  Private (admin only)
const deleteUser = asyncHandler(async (req, res) => {
  res.send("success");
});

export {
  // public routes
  registerUser,
  loginUser,
  // private routes
  getUserProfile,
  updateUserProfile,
  logoutUser,
  // admin routes
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
