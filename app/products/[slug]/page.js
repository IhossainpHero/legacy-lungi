import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { notFound } from "next/navigation";
import ProductDetails from "./productDetails";

export const revalidate = 60; // 60 সেকেন্ড পর ডেটা রিফ্রেশ হবে

export default async function ProductPage({ params }) {
  const { slug } = params;

  try {
    await connectDB(); // lean() ব্যবহার করে ফাস্টার কোয়েরি

    const product = await Product.findOne({ slug }).lean();

    if (!product) return notFound();

    // 💡 মূল পরিবর্তন: ডেটাটিকে পূর্ণাঙ্গ JSON স্ট্রিং এ রূপান্তর করে আবার পার্স করা
    // এটি _id, Date সহ সমস্ত Mongoose বিশেষ অবজেক্টকে প্লেইন স্ট্রিং/নাম্বারে রূপান্তরিত করে।
    const plainProduct = JSON.parse(JSON.stringify(product)); // ✅ এখন প্লেইন অবজেক্টটি ক্লায়েন্ট কম্পোনেন্টে পাঠানো হচ্ছে

    return <ProductDetails product={plainProduct} />;
  } catch (error) {
    console.error("Product fetch error:", error);
    return (
      <div className="text-center text-red-600 py-10">
        ❌ ডেটা লোড করা সম্ভব হয়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।
      </div>
    );
  }
}
