import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    // ✅ সব অর্ডার নাম অনুসারে sort করে পাঠানো
    const orders = await Order.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Admin Orders GET Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
