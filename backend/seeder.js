import mongoose from "mongoose";
import dotenv from "dotenv";

import users from "./data/users.js";
import products from "./data/products.js";

import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";

import connectDB from "./config/db.js";

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Import data
const importData = async () => {
  try {
    // Clear all data first before inserting 
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Insert users
    const createdUsers = await User.insertMany(users);

    // Get admin user
    const adminUser = createdUsers[0]._id;

    // Insert products with admin user for each product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Insert products
    await Product.insertMany(sampleProducts);

    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// Destroy data
const destroyData = async () => {
  try {
    // Clear all data first before inserting  
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Check if the argument is "-d" (destroy data)
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
