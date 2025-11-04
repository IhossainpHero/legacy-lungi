import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Missing orderId" },
        { status: 400 }
      );
    }

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // ✅ সবসময় JSON ফেরাতে হবে
    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
      orderId,
    });
  } catch (error) {
    console.error("❌ Delete Order Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
