export const dynamic = "force-dynamic";
export const revalidate = 0;

import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// Helper: name → slug বানানো
function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

// GET — সব প্রোডাক্ট দেখাবে
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST — নতুন প্রোডাক্ট যোগ করা হবে
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const {
      name,
      sku,
      category,
      brand,
      regular_price,
      sale_price,
      description,
      discount,
      images, // এখন Cloudinary URLs array
      sizes,
    } = data;

    if (!name || !images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Product name এবং অন্তত ১টি image দিতে হবে",
        },
        { status: 400 }
      );
    }

    const slug = generateSlug(name);

    // নতুন প্রোডাক্ট তৈরি
    const product = await Product.create({
      name,
      slug,
      sku,
      category,
      brand,
      regular_price: Number(regular_price) || 0,
      sale_price: Number(sale_price) || 0,
      description,
      discount: Number(discount) || 0,
      main_image: images[0], // first image main
      images, // সব Cloudinary URLs array
      sizes,
    });

    return NextResponse.json(
      { success: true, message: "✅ Product added successfully!", product },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "❌ Failed to add product" },
      { status: 500 }
    );
  }
}
