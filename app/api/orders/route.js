import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB(); // ✅ Mongoose connection

    const data = await request.json();
    const { items } = data;

    // 1️⃣ Save the order
    const newOrder = new Order(data);
    await newOrder.save();

    // 2️⃣ Update product quantities
    for (let item of items) {
      await Product.updateOne(
        { _id: item._id }, // find product by ID
        { $inc: { quantity: -item.quantity } } // decrease stock
      );
    }

    return NextResponse.json({ success: true, orderId: newOrder._id });
  } catch (err) {
    console.error("Order POST Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
