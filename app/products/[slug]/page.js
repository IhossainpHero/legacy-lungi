import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { notFound } from "next/navigation";
import ProductDetails from "./productDetails";

export const revalidate = 60;

export async function generateStaticParams() {
  await connectDB();
  const products = await Product.find({}, "slug").lean();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }) {
  const start = Date.now(); // ✅ সময় শুরু

  const { slug } = await params;
  await connectDB();

  const product = await Product.findOne({ slug }).lean();

  // const end = Date.now(); // ✅ সময় শেষ
  // console.log(`🕒 [DEV] Product fetch took: ${end - start}ms`);

  if (!product) return notFound();

  const plainProduct = JSON.parse(JSON.stringify(product));
  return <ProductDetails product={plainProduct} />;
}
