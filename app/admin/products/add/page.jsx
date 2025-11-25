"use client";

import { Button } from "@/app/components/UI/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/UI/Card";
import { Input } from "@/app/components/UI/input";
import { Label } from "@/app/components/UI/label";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const categories = [
  { name: "ডিপ কালেকশন", slug: "deep-collection" },
  { name: "স্ট্রাইপ এবং চেক লুঙ্গি", slug: "stripe-check" },
  { name: "ফ্যান্সি লুঙ্গি", slug: "fancy-lungi" },
  { name: "টু পার্ট লুঙ্গি", slug: "two-part" },
  { name: "জ্যাকার্ড লুঙ্গি", slug: "jacquard-lungi" },
  { name: "এক কালার লুঙ্গি", slug: "one-color" },
  { name: "সাদা এবং অন্যান্য", slug: "white-and-others" },
  { name: "বাটিক লুঙ্গি", slug: "batik-lungi" },
  { name: "হ্যান্ডলুম লুঙ্গি", slug: "handloom-lungi" },
];

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState(categories[0].slug);
  const [sizes, setSizes] = useState("");
  const [brand, setBrand] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [stockStatus, setStockStatus] = useState("In Stock");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Images state
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  // ✅ Image Upload handler with compression
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    const uploadedUrls = [];
    const localPreviews = [];

    try {
      for (let file of files) {
        // 🔹 Compress image before uploading
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 2, // Target max 2MB
          maxWidthOrHeight: 1600, // Max resolution
          useWebWorker: true,
        });

        const formData = new FormData();
        formData.append("file", compressedFile);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (res.ok && data.urls?.length) {
          uploadedUrls.push(...data.urls);
          localPreviews.push(URL.createObjectURL(compressedFile));
        } else {
          toast.error("❌ Some images failed to upload!");
        }
      }

      if (uploadedUrls.length > 0) {
        setImages((prev) => [...prev, ...uploadedUrls]);
        setPreviews((prev) => [...prev, ...localPreviews]);
        toast.success("✅ Images uploaded successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Upload error!");
    } finally {
      setUploading(false);
    }
  };

  const handleSetMainImage = (index) => setMainImageIndex(index);

  // ✅ Add product handler
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!name) return toast.error("Product name is required!");
    if (!sku) return toast.error("SKU is required!");
    if (!images.length) return toast.error("At least 1 image is required!");

    setSubmitting(true);

    const sizeArray = sizes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const productData = {
      name,
      sku,
      category,
      brand,
      regular_price: Number(regularPrice) || 0,
      sale_price: Number(salePrice) || 0,
      description,
      discount: Number(discount) || 0,
      main_image: images[mainImageIndex],
      images,
      sizes: sizeArray,
      stock_status: stockStatus,
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("✅ Product added successfully!");
        resetForm();
      } else {
        toast.error(result.message || "❌ Failed to add product!");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setName("");
    setSku("");
    setCategory(categories[0].slug);
    setBrand("");
    setRegularPrice("");
    setSalePrice("");
    setDescription("");
    setDiscount("");
    setStockStatus("In Stock");
    setImages([]);
    setPreviews([]);
    setMainImageIndex(0);
    setSizes("");
  };

  return (
    <div className="min-h-screen py-10 sm:px-6 lg:px-8 bg-gray-100 text-gray-900">
      <Card className="max-w-3xl mx-auto shadow-xl rounded-2xl border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-2xl text-white p-6">
          <CardTitle className="text-3xl font-extrabold">
            Add New Product
          </CardTitle>
          <p className="mt-2 text-sm text-white/90">
            Fill out the form below to add a new product.
          </p>
        </CardHeader>

        <CardContent className="space-y-6 p-6 bg-white rounded-b-2xl text-gray-900">
          <form onSubmit={handleAddProduct} className="space-y-6">
            {/* Images Upload */}
            <div className="flex flex-col gap-2">
              <Label>Upload Images</Label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
              {uploading && (
                <p className="text-blue-600 text-sm">Uploading...</p>
              )}

              {previews.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {previews.map((src, idx) => (
                    <div key={idx} className="relative">
                      <Image
                        src={src}
                        alt={`preview-${idx}`}
                        width={80}
                        height={80}
                        className={`rounded border cursor-pointer ${
                          idx === mainImageIndex
                            ? "border-blue-500"
                            : "border-gray-300"
                        }`}
                        onClick={() => handleSetMainImage(idx)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="grid gap-4">
              <div className="flex flex-col">
                <Label>Product Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter product name"
                />
              </div>

              <div className="flex flex-col">
                <Label>SKU</Label>
                <Input
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="Enter SKU"
                />
              </div>

              <div className="flex flex-col">
                <Label>Category</Label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border border-gray-300 rounded-md p-2"
                >
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <Label>Sizes</Label>
                <Input
                  value={sizes}
                  onChange={(e) => setSizes(e.target.value)}
                  placeholder="e.g., 4 Haat, 5 Haat"
                />
              </div>

              <div className="flex flex-col">
                <Label>Brand</Label>
                <Input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Brand name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Label>Old Price</Label>
                  <Input
                    type="number"
                    value={regularPrice}
                    onChange={(e) => setRegularPrice(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <Label>New Price</Label>
                  <Input
                    type="number"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <Label>Short Description</Label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description"
                  className="border border-gray-300 rounded-md p-2 w-full min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Label>Discount %</Label>
                  <Input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>

                {/* Stock Status */}
                <div className="flex flex-col">
                  <Label>Stock Status</Label>
                  <Input
                    type="text"
                    value={stockStatus}
                    disabled
                    className="bg-gray-100 font-semibold text-green-700"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    (New product add করার সময় শুধু "In Stock" থাকবে)
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className={`w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-all duration-200 ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? "Adding..." : "Add Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
