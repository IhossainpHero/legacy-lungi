"use client";
import {
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Package,
  PlusSquare,
  ShoppingBag,
  User,
} from "lucide-react";
// Next.js-এর 'next/link' এবং 'next/navigation' মডিউলগুলি স্যান্ডবক্স পরিবেশে কম্পাইল হয় না,
// তাই আমরা সেগুলিকে সরিয়ে ব্রাউজারের নিজস্ব window.location এবং সাধারণ <a> ট্যাগ ব্যবহার করছি।
import { useEffect, useState } from "react";

// Next.js রাউটার ফাংশনগুলি অনুকরণ (simulate) করার জন্য কাস্টম ফাংশন
const navigate = (href) => {
  if (typeof window !== "undefined") {
    window.location.href = href;
  }
};
const replace = (href) => {
  if (typeof window !== "undefined") {
    window.location.replace(href);
  }
};

export default function AdminLayout({ children }) {
  // বর্তমান পাথ (pathname) পেতে window অবজেক্ট ব্যবহার করা হচ্ছে
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/admin";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⚠️ নিরাপত্তা সতর্কতা: localStorage-এ প্রমাণীকরণ (Authentication) চেক করা অত্যন্ত অরক্ষিত।
    // একটি বাস্তব অ্যাপ্লিকেশনের জন্য, এটি একটি সুরক্ষিত Auth Context দ্বারা প্রতিস্থাপিত হওয়া উচিত।
    const loggedIn = localStorage.getItem("loggedIn");

    if (!loggedIn) {
      // কাস্টম 'replace' ফাংশন ব্যবহার করা হলো
      // replace("/login"); // 👈 এই লাইনটিই আপনাকে লগইনে পাঠাচ্ছিল। এটি এখন ডেভেলপমেন্টের জন্য বন্ধ করা হলো।
    }

    // লোডিং বন্ধ করতে হবে যাতে UI দেখা যায়।
    setLoading(false);

    // যেহেতু রাউটার আর নির্ভরতা (dependency) নয়, তাই dependency array খালি করা হলো
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-800 bg-gray-100">
        <p className="text-xl animate-pulse">Loading Admin Panel...</p>
      </div>
    );

  // NavItem কম্পোনেন্ট: <Link> এর পরিবর্তে <a> ট্যাগ ব্যবহার করা হলো
  const NavItem = ({ href, label, Icon }) => (
    <a
      href={href}
      className={`flex flex-col items-center px-4 py-2 rounded-md transition-colors duration-300
        ${
          // হাইলাইটিং লজিক একই রাখা হলো
          pathname.startsWith(href) && href !== "/admin"
            ? "text-[#0d5967]"
            : pathname === href
            ? "text-[#0d5967]"
            : "text-gray-400 hover:text-white"
        }`}
    >
      <Icon size={22} />
      <span className="text-xs mt-1">{label}</span>
    </a>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (Desktop only) */}
      <aside className="hidden md:flex md:flex-col md:w-64 xl:w-72 bg-gray-900 text-white p-5 shadow-lg">
        <h2 className="text-2xl font-extrabold mb-8 text-[#0d5967] uppercase tracking-wider">
          Admin Panel
        </h2>
        <nav className="space-y-3">
          {/* Dashboard - <a> ট্যাগ ব্যবহার করা হলো */}
          <a
            href="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              pathname === "/admin"
                ? "bg-[#0d5967] font-semibold"
                : "hover:bg-gray-700"
            }`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </a>

          {/* All Products - <a> ট্যাগ ব্যবহার করা হলো */}
          <a
            href="/admin/products"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              pathname.startsWith("/admin/products") &&
              !pathname.includes("/add") &&
              !pathname.includes("/myOrders")
                ? "bg-[#0d5967] font-semibold"
                : "hover:bg-gray-700"
            }`}
          >
            <Package size={20} /> All Products
          </a>

          {/* Add Product - <a> ট্যাগ ব্যবহার করা হলো */}
          <a
            href="/admin/products/add"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              pathname === "/admin/products/add"
                ? "bg-[#0d5967] font-semibold"
                : "hover:bg-gray-700"
            }`}
          >
            <PlusSquare size={20} /> Add Product
          </a>

          {/* My Orders - <a> ট্যাগ ব্যবহার করা হলো */}
          <a
            href="/admin/orders"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              pathname === "/admin/orders"
                ? "bg-[#0d5967] font-semibold"
                : "hover:bg-gray-700"
            }`}
          >
            <ShoppingBag size={20} /> My Orders
          </a>
          {/* Category Image - <a> ট্যাগ ব্যবহার করা হলো */}
          <a
            href="/admin/categoryPage"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              pathname === "/admin/categoryPage"
                ? "bg-[#0d5967] font-semibold"
                : "hover:bg-gray-700"
            }`}
          >
            <ImageIcon size={20} /> Category Image
          </a>

          {/* Profile - <a> ট্যাগ ব্যবহার করা হলো */}
          <a
            href="/admin/profile"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              pathname === "/admin/profile"
                ? "bg-[#0d5967] font-semibold"
                : "hover:bg-gray-700"
            }`}
          >
            <User size={20} /> Profile
          </a>

          <button
            onClick={() => {
              localStorage.removeItem("loggedIn");
              // কাস্টম 'navigate' ফাংশন ব্যবহার করা হলো
              navigate("/login");
            }}
            className="flex items-center gap-3 text-red-400 mt-8 px-4 py-3 bg-red-900/50 hover:bg-red-600 hover:text-white rounded-xl w-full transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 pb-20 md:pb-5">{children}</main>

      {/* Mobile Top Navbar */}
      <div className="bg-[#063238] w-full text-white shadow-lg fixed top-0 left-0 z-50 right-0 flex justify-between items-center px-4 py-4 md:hidden">
        <div className="text-xl font-bold uppercase flex gap-3">
          <span>Admin</span>
          <span>Dashboard</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          {/* Profile Link - <a> ট্যাগ ব্যবহার করা হলো */}
          <a href="/admin/profile">
            <User size={24} />
          </a>
        </div>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white shadow-2xl md:hidden z-50">
        <div className="flex justify-around items-center py-2">
          {/* Nav Items - NavItem কম্পোনেন্ট ব্যবহার করা হলো, যা এখন <a> ট্যাগ ব্যবহার করে */}
          <NavItem href="/admin" label="Home" Icon={LayoutDashboard} />
          <NavItem href="/admin/products" label="Products" Icon={Package} />
          <NavItem href="/admin/products/add" label="Add" Icon={PlusSquare} />
          <NavItem
            href="/admin/categoryPage"
            label="Category"
            Icon={ImageIcon}
          />

          <NavItem href="/admin/orders" label="Orders" Icon={ShoppingBag} />
        </div>
      </div>
    </div>
  );
}
