// app/category/[slug]/page.js
// এটি একটি Server Component, তাই "use client" দরকার নেই।

import CategoryClientContent from "./CategoryClientContent"; // Client Component আমদানি করা হলো

// --- Categories and Price Ranges (Static Data) ---
// ডেটা এখানেও রাখা যায়, অথবা Client Component-এও রাখা যেতে পারে
const categories = [
  { name: "ডিপ কালেকশন", slug: "deep-collection" },
  { name: "স্ট্রাইপ এবং চেক লুঙ্গি", slug: "stripe-check" },
  { name: "ফ্যান্সি লুঙ্গি", slug: "fancy-lungi" },
  { name: "টু পার্ট লুঙ্গি", slug: "two-part" },
  { name: "এক কালার লুঙ্গি", slug: "one-color" },
  { name: "সাদা এবং অন্যান্য", slug: "white-and-others" },
];

// ডেটা ফেচিং ফাংশন
async function fetchCategoryProducts(slug) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/products/category/${slug}`;
  try {
    const res = await fetch(url, {
      // ✅ এখানে Next.js ক্যাশিং যোগ করা হলো (হোম পেজের মতো)।
      // ডেটা ৬০ সেকেন্ডের জন্য ক্যাশ করা থাকবে।
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      // সার্ভার-সাইডে এরর হ্যান্ডলিং
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

export default async function CategoryPage({ params }) {
  const { slug } = params;

  // 1. সার্ভার-সাইডে ডেটা ফেচিং
  const initialProducts = await fetchCategoryProducts(slug);
  const currentCategory = categories.find((c) => c.slug === slug);

  // 2. Client Component-এ ডেটা পাস করা
  return (
    <CategoryClientContent
      initialProducts={initialProducts}
      initialSlug={slug}
      currentCategoryName={currentCategory?.name || "Category"}
    />
  );
}
