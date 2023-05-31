import express from "express";

import {
  // user routes
  getMyOrders,
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  // admin routes
  getOrders,
  updateOrderToDelivered,
} from "../controllers/OrderController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, admin, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);

export default router;
