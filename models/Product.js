import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  sku: { type: String, required: true, unique: true },
  category: String,
  brand: String,
  regular_price: Number, // old price
  sale_price: Number, // new price
  description: String,
  discount: Number,
  main_image: { type: String, required: true }, // main image
  images: [String], // array for thumbnails or additional images
  sizes: [String],
  createdAt: { type: Date, default: Date.now },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
