import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// ✅ Helper: Name থেকে slug বানানো
function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

// ✅ GET — সব প্রোডাক্ট দেখাবে
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

// ✅ POST — একটাই ছবি সহ প্রোডাক্ট যোগ করা হবে
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    console.log("🟢 Received from client:", data);
    const {
      name,
      sku,
      category,
      brand,
      regular_price,
      sale_price,
      description,
      discount,
      image,
      sizes,
    } = data;

    // 🔸 Validation
    if (!name || !image) {
      return NextResponse.json(
        {
          success: false,
          message: "Name এবং Image দুটোই দিতে হবে",
        },
        { status: 400 }
      );
    }

    // 🔸 Slug generate
    const slug = generateSlug(name);

    // MongoDB তে ডাটা সংরক্ষণ
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
      image,
      sizes,
    });
    console.log("🟠 Saved product in DB:", product);

    return NextResponse.json(
      { success: true, message: "Product added successfully", product },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to add product" },
      { status: 500 }
    );
  }
}
