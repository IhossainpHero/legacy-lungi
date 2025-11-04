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

// 🟡 POST (optional): stock update logic (তুমি আগেরটা রাখতে পারো)
export async function POST(req, { params }) {
  await connectDB();

  const { id } = params;
  const { quantity } = await req.json();

  if (!quantity || quantity <= 0) {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid quantity" }),
      { status: 400 }
    );
  }

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, stock: { $gte: quantity } },
      { $inc: { stock: -quantity } },
      { new: true }
    );

    if (!updatedProduct) {
      return new Response(
        JSON.stringify({ success: false, message: "Product not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, stock: updatedProduct.stock }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}
