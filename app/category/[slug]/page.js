// app/category/[slug]/page.js
// এটি একটি Server Component, তাই "use client" দরকার নেই।

import CategoryClientContent from "./CategoryClientContent"; // Client Component আমদানি করা হলো
export const revalidate = 60; // ISR

// --- Categories (Static Data) ---
const categories = [
  { name: "ডিপ কালেকশন", slug: "deep-collection" },
  { name: "স্ট্রাইপ এবং চেক লুঙ্গি", slug: "stripe-check" },
  { name: "ফ্যান্সি লুঙ্গি", slug: "fancy-lungi" },
  { name: "টু পার্ট লুঙ্গি", slug: "two-part" },
  { name: "এক কালার লুঙ্গি", slug: "one-color" },
  { name: "সাদা এবং অন্যান্য", slug: "white-and-others" },
];

// ✅ Environment অনুযায়ী Base URL সেট করা
const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_API_URL;

// ✅ ডেটা ফেচিং ফাংশন
async function fetchCategoryProducts(slug) {
  const url = `${API_BASE_URL}/api/products/category/${slug}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 }, // ISR cache (১ মিনিট পর cache রিফ্রেশ)
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch products for slug: ${slug}, Status: ${res.status}`
      );
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching products in server component:", err);
    return []; // এরর হলে খালি অ্যারে রিটার্ন
  }
}

// ✅ মূল Server Component
export default async function CategoryPage({ params }) {
  const { slug } = await params;

  // 1️⃣ সার্ভার-সাইডে ডেটা ফেচিং
  const initialProducts = await fetchCategoryProducts(slug);
  const currentCategory = categories.find((c) => c.slug === slug);

  // 2️⃣ Client Component-এ ডেটা পাস করা
  return (
    <CategoryClientContent
      initialProducts={initialProducts}
      initialSlug={slug}
      currentCategoryName={currentCategory?.name || "Category"}
    />
  );
}
