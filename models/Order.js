import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: [
      {
        productId: String,
        name: String,
        quantity: Number,
        price: Number,
        selectedSize: String,
        image: String,
      },
    ],
    subtotal: Number,
    shippingCharge: Number,
    total: Number,
    shippingLocation: String,
  },
  { timestamps: true }
);

// Prevent model overwrite error in dev
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
