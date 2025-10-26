"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/UI/Card";
import { Flame, Package, ShoppingBag, Star, Tag } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function AdminHome() {
  // 🔹 Static Dummy Data
  const [orders] = useState([
    { month: "Jan", orders: 15, products: 40 },
    { month: "Feb", orders: 20, products: 55 },
    { month: "Mar", orders: 35, products: 70 },
    { month: "Apr", orders: 25, products: 60 },
  ]);

  const [products] = useState([
    { id: 1, category: "Premium" },
    { id: 2, category: "Premium" },
    { id: 3, category: "Popular" },
    { id: 4, category: "Discount" },
  ]);

  const collectionsData = [
    { name: "Premium", value: 12 },
    { name: "Popular", value: 8 },
    { name: "Discount", value: 5 },
  ];

  const COLORS = ["#6366F1", "#F59E0B", "#10B981"];

  return (
    <div className="lg:px-6 space-y-6 my-16 md:my-2 text-gray-900">
      {/* Header Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 md:p-6 shadow-lg rounded-xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold">
            Welcome Back, Admin!
          </CardTitle>
          <p className="text-md text-white/90">
            Here's your store overview. Manage products, orders, and
            collections.
          </p>
        </CardHeader>
      </Card>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-white text-black shadow-md border border-gray-200">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Total Orders</CardTitle>
            <ShoppingBag className="h-6 w-6 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{orders.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-white text-black shadow-md border border-gray-200">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Total Products</CardTitle>
            <Package className="h-6 w-6 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{products.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-white text-black shadow-md border border-gray-200">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Premium</CardTitle>
            <Star className="h-6 w-6 text-purple-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {collectionsData.find((c) => c.name === "Premium")?.value}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white text-black shadow-md border border-gray-200">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Popular</CardTitle>
            <Flame className="h-6 w-6 text-orange-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {collectionsData.find((c) => c.name === "Popular")?.value}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white text-black shadow-md border border-gray-200">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Discount</CardTitle>
            <Tag className="h-6 w-6 text-pink-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {collectionsData.find((c) => c.name === "Discount")?.value}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="bg-white text-black shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle>Orders vs Products</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orders}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#6366F1" />
                <Bar dataKey="products" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="bg-white text-black shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle>Collections Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={collectionsData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {collectionsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
