import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    await connectDB();

    const { orderId } = await request.json();
    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Order ID missing" },
        { status: 400 }
      );
    }

    // ✅ order update করা হচ্ছে
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: "Approved" },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order approved successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Approve Order Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to approve order" },
      { status: 500 }
    );
  }
}
