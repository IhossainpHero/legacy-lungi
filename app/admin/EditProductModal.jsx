"use client";
import { useState } from "react";

const categories = [
  { name: "ডিপ কালেকশন", slug: "deep-collection" },
  { name: "স্ট্রাইপ এবং চেক লুঙ্গি", slug: "stripe-check" },
  { name: "ফ্যান্সি লুঙ্গি", slug: "fancy-lungi" },
  { name: "টু পার্ট লুঙ্গি", slug: "two-part" },
  { name: "জ্যাকার্ড লুঙ্গি", slug: "jacquard-lungi" },
  { name: "এক কালার লুঙ্গি", slug: "one-color" },
  { name: "সাদা এবং অন্যান্য", slug: "white-and-others" },
];

export default function EditProductModal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || categories[0].slug,
    regular_price: product?.regular_price || "",
    sale_price: product?.sale_price || "",
    description: product?.description || "",
    stock_status: product?.stock_status || "In Stock",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const updated = await res.json();
        onSave(updated);
        onClose();
      } else {
        alert("Update failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4 overflow-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <input
              name="regular_price"
              type="number"
              value={formData.regular_price}
              onChange={handleChange}
              placeholder="Regular Price"
              className="flex-1 border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <input
              name="sale_price"
              type="number"
              value={formData.sale_price}
              onChange={handleChange}
              placeholder="Sale Price"
              className="flex-1 border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
          />

          <select
            name="stock_status"
            value={formData.stock_status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="In Stock">In Stock</option>
            <option value="Sold Out">Sold Out</option>
          </select>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-800 font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white font-medium transition"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Close X button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition text-lg font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
}
