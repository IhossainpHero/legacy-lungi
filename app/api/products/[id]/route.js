import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// ---------------- GET — একক প্রোডাক্ট ফেচ ----------------
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
  } catch (err) {
    console.error("GET product error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// ---------------- PUT — প্রোডাক্ট আপডেট (PATCH এর পরিবর্তে) ----------------
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await req.json();

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    const fields = [
      "name",
      "sku",
      "category",
      "brand",
      "regular_price",
      "sale_price",
      "description",
      "discount",
      "images",
      "sizes",
      "stock_status",
    ];

    fields.forEach((field) => {
      if (body[field] !== undefined) {
        if (
          ["regular_price", "sale_price", "discount"].includes(field) &&
          body[field] !== ""
        ) {
          product[field] = Number(body[field]);
        } else if (field === "images" && Array.isArray(body.images)) {
          product.images = body.images;
          product.main_image = body.images[0];
        } else if (field === "sizes" && Array.isArray(body.sizes)) {
          product.sizes = body.sizes;
        } else if (field === "stock_status") {
          const allowed = ["In Stock", "Sold Out"];
          if (allowed.includes(body.stock_status))
            product.stock_status = body.stock_status;
        } else {
          product[field] = body[field];
        }
      }
    });

    await product.save();

    return NextResponse.json({
      success: true,
      message: "✅ Product updated successfully!",
      product,
    });
  } catch (err) {
    console.error("PUT product error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// ---------------- DELETE — প্রোডাক্ট মুছে ফেলা ----------------
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "✅ Product deleted successfully!",
    });
  } catch (err) {
    console.error("DELETE product error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
