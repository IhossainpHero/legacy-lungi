import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB(); // ✅ Mongoose connection

    const data = await request.json();

    const newOrder = new Order(data);
    await newOrder.save();

    return NextResponse.json({ success: true, orderId: newOrder._id });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
