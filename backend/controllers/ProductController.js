import asyncHandler from "../middlewares/asyncHandler.js";
import ProductModel from "../models/Product.js";

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT || 4;
  const page = Number(req.query.pageNumber) || 1;
  // we get the total number of products
  // const count = await ProductModel.countDocuments({});

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i", // case insensitive search
        },
      }
    : {};

  // we add the keyword to the count because we want to get the total number of products that match the keyword and we want to limit the count
  const count = await ProductModel.countDocuments({ ...keyword });

  // we add the keyword to the find because we want to get the products that match the keyword
  const products = await ProductModel.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1)); // we get the products for the current page and we skip the products from the previous pages

  res.status(200).json({
    products,
    page,
    pages: Math.ceil(count / pageSize), // we get the total number of pages
  });
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

// @desc    Get top rated products
// @route   GET /api/v1/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await ProductModel.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(products);
});

// @desc    Create a product
// @route   POST /api/v1/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  // we create a new sample product
  const product = new ProductModel({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await ProductModel.findById(id);

  if (product) {
    // we update the product with the new values coming from the request body
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);

  if (product) {
    await ProductModel.deleteOne({ _id: product._id });
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   POST /api/v1/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // we need to get the rating and comment because we are going to send a number rating and a comment
  const { rating, comment } = req.body;

  const product = await ProductModel.findById(id);

  if (product) {
    // we check if the user has already reviewed the product, so we match the review user with the logged in user
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    // if the user has not reviewed the product yet, we create a new review
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    // we push the new review to the product reviews array
    product.reviews.push(review);

    // we update the number of reviews
    product.numReviews = product.reviews.length;

    // we update the rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    // we save the product
    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
