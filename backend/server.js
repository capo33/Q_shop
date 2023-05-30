import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import products from "./data/products.js";

// Load env variables
dotenv.config();

// Initialize express
const app = express();

// Start server
const PORT = process.env.PORT || 5000;

// Connect to MongoDB

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:id", (req, res) => {
  const product = products.find((p) => p._id === Number(req.params.id));
  res.json(product);
});

app.listen(PORT, console.log(`Server running on port ${PORT}`));
