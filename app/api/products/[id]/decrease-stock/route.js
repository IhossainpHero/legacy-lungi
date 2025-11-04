export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// 🟢 GET: single product details
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("GET Product Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// 🟡 POST: decrease product quantity
export async function POST(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { quantity } = await req.json();

    if (!quantity || quantity <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid quantity" },
        { status: 400 }
      );
    }
    console.log("🟡 Trying to decrease quantity for:", id, "by:", quantity);

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, quantity: { $gte: quantity } }, // ✅ match with schema
      { $inc: { quantity: -quantity } }, // ✅ match with schema
      { new: true }
    );
    console.log("✅ Updated Product Quantity:", updatedProduct?.quantity);

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: "Not enough stock or product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      newQuantity: updatedProduct.quantity,
    });
  } catch (err) {
    console.error("Decrease stock error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
