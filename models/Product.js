import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  // ✅ এই লাইনটি যোগ করুন
  slug: { type: String, unique: true },
  category: String,
  sku: { type: String, required: true, unique: true },
  brand: String,
  regular_price: Number, // oldPrice
  sale_price: Number, // newPrice
  description: String,
  discount: Number,
  image: { type: String, required: true },
  sizes: [String],
  createdAt: { type: Date, default: Date.now },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
