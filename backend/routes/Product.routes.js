import express from "express";

import {
  getProductById,
  getProducts,
} from "../controllers/ProductController.js";

const router = express.Router();

router.route("/:id").get(getProductById);
router.route("/").get(getProducts);

export default router;
