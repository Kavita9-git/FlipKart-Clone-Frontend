import mongoose, { Schema } from "mongoose";
import Category from "./category.js";



const ProductSchema = new Schema({
  name: { type: String, required: true },
  image_uri: { type: String, required: true },
  price: { type: Number, required: true },
  ar_uri: { type: String },
  description: { type: String },
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  
  // ✅ Add color and size arrays
  color: [{ type: String }],
  size: [{ type: String }],
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
