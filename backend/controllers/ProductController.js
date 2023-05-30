import asyncHandler from "../middlewares/asyncHandler.js";
import ProductModel from "../models/Product.js";

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await ProductModel.find({});

  res.status(200).json(products);
});

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById };
