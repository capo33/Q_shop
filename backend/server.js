import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import productRoutes from "./routes/Product.routes.js";
import userRoutes from "./routes/User.routes.js";

import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

// Load env variables
dotenv.config();

// Initialize express
const app = express();

// Set port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Welcome route
app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

// Routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);

// Error middlewares
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, console.log(`Server running on port ${PORT}`));
