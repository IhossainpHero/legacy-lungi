import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { notFound } from "next/navigation";
import ProductDetails from "./productDetails";

export default async function ProductPage({ params }) {
  const { slug } = await params; // Server component এ সরাসরি access করা যাবে

  try {
    await connectDB();
    const product = await Product.findOne({ slug });

    if (!product) return notFound();

    // product client component এ পাঠাচ্ছি
    return <ProductDetails product={JSON.parse(JSON.stringify(product))} />;
  } catch (error) {
    console.error("Product fetch error:", error);
    return notFound();
  }
}
