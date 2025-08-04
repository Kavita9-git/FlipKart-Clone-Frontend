


import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";

import userRoutes from "./routes/user.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";
import bannerRoutes from './routes/bannerRoutes.js';

import connectDB from "./config/connect.js";
import { PORT } from "./config/config.js";
import { buildAdminJS } from "./config/setup.js";

dotenv.config();

const app = express();

app.use(express.json());

// Allow React Native device or browser to access backend
app.use(cors({
  origin: "http://localhost:8081", // Adjust if your frontend runs elsewhere
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Serve static images from /uploads
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Root route - simple test endpoint
app.get('/', (req, res) => {
  res.send('Server is running');
});

// API routes
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use('/api/banners', bannerRoutes);

// Start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await buildAdminJS(app);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server started on http://localhost:${PORT}`);
      console.log(`✅ AdminJS: http://localhost:${PORT}/admin`);
    });
  } catch (error) {
    console.log("❌ Error Starting Server ->", error);
  }
};

start();
