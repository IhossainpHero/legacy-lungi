import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // সব origin allow করতে
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(req, { params }) {
  const { slug } = params;

  try {
    await connectDB();
    const products = await Product.find({ category: slug });
    return NextResponse.json(products, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { message: "Server Error", error },
      { status: 500, headers: corsHeaders }
    );
  }
}

// OPTIONS preflight request handle করা
export async function OPTIONS() {
  return NextResponse.json(
    { message: "CORS Preflight" },
    { status: 200, headers: corsHeaders }
  );
}
