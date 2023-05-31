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

router.get("/", protect, admin, getOrders);
router.post("/", protect, addOrderItems);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);

export default router;
