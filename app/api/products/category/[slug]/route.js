import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req, context) {
  const { slug } = await context.params; // ✅ await ব্যবহার করা হলো

  try {
    await connectDB();
    const products = await Product.find({ category: slug });
    return Response.json(products);
  } catch (error) {
    console.error("❌ API Error:", error);
    return Response.json(
      { message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}
