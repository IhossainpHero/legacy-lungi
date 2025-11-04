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

    subtotal: { type: Number, required: true },
    shippingCharge: { type: Number, required: true },
    total: { type: Number, required: true },
    shippingLocation: { type: String, required: true },

    // ✅ status field auto default = "pending"
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite error
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
