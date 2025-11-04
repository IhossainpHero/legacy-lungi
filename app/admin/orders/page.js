"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner.jsx";
import { Button } from "../../components/UI/Button.js";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // 🟢 Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/admin/orders");
        const text = await res.text();
        const data = text ? JSON.parse(text) : { orders: [] };
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // 🟢 Approve Order
  const handleApprove = async (orderId) => {
    try {
      const res = await fetch("/api/admin/orders/approve", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const text = await res.text();
      const data = text
        ? JSON.parse(text)
        : { message: "Empty server response" };

      if (!res.ok) throw new Error(data.message || "Failed to approve order");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "Approved" } : order
        )
      );
      toast.success(data.message);
    } catch (error) {
      console.error("Error approving order:", error);
      toast.error(error.message || "Server error. Try again later.");
    }
  };

  // 🟢 Delete Order
  const handleDelete = async (orderId) => {
    try {
      const res = await fetch("/api/admin/orders/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const text = await res.text();
      let data = {};
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Response not JSON:", text);
        throw new Error("Invalid JSON response from server");
      }

      if (!res.ok) throw new Error(data.message || "Delete failed");

      toast.success(data.message || "Order deleted successfully");

      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message);
    }
  };

  // 🟢 View Order Details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOrderItems(order.items || []);
    setModalOpen(true);
  };

  // ✅ Filter logic
  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((o) => o.status?.toLowerCase() === filter.toLowerCase());

  // ✅ Status color
  const statusColor = (status) => {
    const colors = {
      pending: "text-yellow-600",
      cancelled: "text-red-600",
      approved: "text-green-700",
    };
    return colors[status?.toLowerCase()] || "text-gray-800";
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen p-4 md:p-2 py-20 text-gray-800">
      {/* Header & Filter Buttons */}

      <div className="flex flex-col md:flex-row gap-5 justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>

        <div className="flex gap-2">
          {["All", "Approved", "Pending"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 border 
          ${
            filter === f
              ? "bg-black text-white border-black shadow-md scale-105"
              : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:scale-105"
          }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 🖥️ Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-md">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              {["Customer", "Address", "Status", "Date", "Action"].map((h) => (
                <th key={h} className="p-3 text-center text-sm font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="border-b text-gray-800 text-sm">
                <td className="p-3 text-center">{order.name}</td>
                <td className="p-3 text-center">{order.address}</td>
                <td
                  className={`p-3 text-center font-semibold ${statusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </td>
                <td className="p-3 text-center">
                  {new Date(order.createdAt).toLocaleDateString("en-GB")}
                </td>
                <td className="p-3 text-center flex flex-wrap justify-center gap-1">
                  <Button
                    className="px-2 py-1 text-xs"
                    onClick={() => handleViewDetails(order)}
                  >
                    View
                  </Button>
                  <Button
                    className="px-2 py-1 text-xs bg-green-600 text-white hover:bg-green-700"
                    onClick={() => handleApprove(order._id)}
                    disabled={["approved", "cancelled"].includes(
                      order.status?.toLowerCase?.() || ""
                    )}
                  >
                    Approve
                  </Button>
                  <Button
                    className="px-2 py-1 text-xs bg-red-600 text-white hover:bg-red-700"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="border p-3 rounded-md bg-white shadow-sm text-gray-800 text-sm"
          >
            <div className="flex justify-between items-center mb-1">
              <h2 className="font-semibold">{order.name}</h2>
              <span className={`font-semibold ${statusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <p className="text-xs mb-1">Address: {order.address}</p>
            <p className="text-xs mb-2">
              Date: {new Date(order.createdAt).toLocaleDateString("en-GB")}
            </p>
            <div className="flex gap-1">
              <Button
                className="flex-1 text-xs px-2 py-1"
                onClick={() => handleViewDetails(order)}
              >
                View
              </Button>
              <Button
                className="flex-1 text-xs px-2 py-1 bg-green-600 text-white hover:bg-green-700"
                onClick={() => handleApprove(order._id)}
                disabled={order.status?.toLowerCase?.() === "approved"}
              >
                Approve
              </Button>
              <Button
                className="flex-1 text-xs px-2 py-1 bg-red-600 text-white hover:bg-red-700"
                onClick={() => handleDelete(order._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔍 Modal */}
      {modalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md max-w-3xl w-full mx-5 p-6 relative max-h-[80vh] overflow-y-auto shadow-lg text-gray-800 text-sm">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-3">Order Details</h2>

            <div className="space-y-1 mb-4">
              {[
                ["Customer", selectedOrder.name],
                ["Mobile", selectedOrder.phone || selectedOrder.mobile],
                ["Address", selectedOrder.address],
                ["Shipping", selectedOrder.shippingLocation],
                ["Payment", selectedOrder.payment || "Cash on Delivery"],
                ["Total", selectedOrder.total],
              ].map(([label, value]) => (
                <p key={label}>
                  <strong>{label}:</strong> {value}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {orderItems.map((item, index) => (
                <div
                  key={item._id || index}
                  className="border p-2 rounded-md flex gap-2 items-center text-gray-800"
                >
                  <img
                    src={item.image || "/no-image.png"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <div>
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p>
                      ৳{item.price} × {item.quantity}
                    </p>
                    {item.size && <p>Size: {item.size}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
