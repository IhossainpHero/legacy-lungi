// app/shop/page.jsx
import ShopPageClient from "./ShopPageClient"; // Client Component

export const revalidate = 60; // ISR: প্রতি ১ মিনিটে cache update হবে

export default async function ShopPage() {
  // 🧠 Base URL সেট করা হলো — লোকাল ও প্রোডাকশন দুইয়ের জন্যই কাজ করবে
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_API_URL;

  try {
    // ✅ Server-side fetch (ISR সহ)
    const res = await fetch(`${baseUrl}/api/products`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const products = await res.json();

    return <ShopPageClient products={products} />;
  } catch (error) {
    console.error("❌ Product Fetch Error:", error.message);

    return (
      <div className="text-center py-20 text-red-500">
        পণ্য লোড করতে সমস্যা হয়েছে 😢
      </div>
    );
  }
}
