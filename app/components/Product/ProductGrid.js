// ProductGrid.js
import ProductCard from "./ProductCard";

// ✅ 1. ডেটা ফেচিং ফাংশন তৈরি করুন (সার্ভার কম্পোনেন্টের জন্য অপটিমাইজড)
async function getProducts() {
  // ❌ ত্রুটি দূর করা হয়েছে: baseURL এর জন্য NEXT_PUBLIC_API_URL ব্যবহার করবেন না।
  // ✅ Next.js App Router-এর সেরা পদ্ধতি: অভ্যন্তরীণ API কল করতে শুধু আপেক্ষিক পাথ ব্যবহার করুন।

  const res = await fetch(`/api/products`, {
    // ✅ Next.js সার্ভার-সাইড ক্যাশিং ব্যবহার হবে
    next: {
      revalidate: 60, // প্রতি ৬০ সেকেন্ডে ডেটা রিফ্রেশ হবে (ISR)
    },
  });

  if (!res.ok) {
    // এরর হলে throw করুন, যাতে পেজের error.js ফাইলটি এটি ধরতে পারে
    // Vercel-এর log-এ স্ট্যাটাস কোড দেখা গুরুত্বপূর্ণ
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const data = await res.json();

  // ✅ Mongoose-এর _id এবং Date অবজেক্টের সমস্যা এড়াতে JSON সিরিয়ালাইজেশন নিশ্চিত
  return JSON.parse(JSON.stringify(data));
}

// ✅ 2. কম্পোনেন্টটিকে async করুন
export default async function ProductGrid() {
  let products = [];
  let errorOccurred = false;

  try {
    products = await getProducts();
  } catch (error) {
    // Production এ এই error Console-এ দেখা যাবে
    console.error("Error fetching products:", error);
    errorOccurred = true;
  }

  if (errorOccurred || !products || products.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        {errorOccurred ? "❌ ডেটা লোড করা যায়নি।" : "No products found 😞"}
      </p>
    );
  }

  // ✅ 3. রেন্ডারিং
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 p-4">
      {products.map((p) => (
        <ProductCard
          key={p._id + (p.sizes?.[0] || "")}
          _id={p._id}
          name={p.name}
          sale_price={p.sale_price}
          regular_price={p.regular_price}
          image={p.image}
          slug={p.slug || p.sku}
          discount={p.discount}
          description={p.description}
          sizes={p.sizes}
          sku={p.sku}
        />
      ))}
    </div>
  );
}
