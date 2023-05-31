import express from "express";

import {
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
} from "../controllers/UserController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, admin, getUsers);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
