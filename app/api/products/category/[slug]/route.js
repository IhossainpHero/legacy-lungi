import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req, { params }) {
  const { slug } = params;

  try {
    await connectDB();
    const products = await Product.find({ category: slug });
    return Response.json(products);
  } catch (error) {
    console.error("❌ API Error:", error);
    return Response.json({ message: "Server Error", error }, { status: 500 });
  }
}
