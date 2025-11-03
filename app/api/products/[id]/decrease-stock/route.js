import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

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
    // MongoDB $inc operator দিয়ে concurrency-safe update
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, stock: { $gte: quantity } }, // only if enough stock
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
