import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { notFound } from "next/navigation";
import ProductDetails from "./productDetails";

export const revalidate = 60; // ISR: 60 seconds

// 🔹 Static Params for SSG
export async function generateStaticParams() {
  await connectDB();

  const products = await Product.find({}, "slug").lean();
  return products.map((p) => ({ slug: p.slug }));
}

// 🔹 Product Page
export default async function ProductPage({ params }) {
  const { slug } = await params; // params সরাসরি destructure

  await connectDB();

  const product = await Product.findOne({ slug }).lean();

  if (!product) return notFound();

  // ✅ MongoDB থেকে আসা object কে plain JS object হিসেবে stringify-parse
  const plainProduct = JSON.parse(JSON.stringify(product));

  return <ProductDetails product={plainProduct} />;
}
