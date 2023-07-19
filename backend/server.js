import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Load env variables
dotenv.config();

import connectDB from "./config/db.js";
import userRoutes from "./routes/User.routes.js";
import productRoutes from "./routes/Product.routes.js";
import orderRoutes from "./routes/Order.routes.js";
import uploadRoutes from "./routes/Upload.routes.js";

import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

// Initialize express
const app = express();

// Set port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
// Routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/upload", uploadRoutes);

// PayPal route
app.get("/api/v1/config/paypal", (req, res) =>
  res.send({
    clientId: process.env.PAYPAL_CLIENT_ID,
  })
);

// dirname is not available when using ES modules, we set __dirname to current directory

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Make uploads folder static
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // for any route that is not api, redirect to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  // Welcome route
  app.get("/", (req, res) => {
    res.json({
      message: "API is running...",
      path: path.join(__dirname, "/uploads"),
    });
  });
}

// Error middlewares
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
