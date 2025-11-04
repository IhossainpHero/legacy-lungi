import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, product });
  } catch (err) {
    console.error("GET product error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { quantity } = await req.json();

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    if (product.quantity <= 0) {
      return NextResponse.json(
        { success: false, message: "Sold Out" },
        { status: 400 }
      );
    }

    if (quantity > product.quantity) {
      return NextResponse.json(
        { success: false, message: "Stock not enough" },
        { status: 400 }
      );
    }

    product.quantity -= quantity;
    await product.save();

    return NextResponse.json({ success: true, newQuantity: product.quantity });
  } catch (err) {
    console.error("Decrease stock error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
