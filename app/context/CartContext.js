"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [shippingLocation, setShippingLocation] = useState("outside"); // default outside Dhaka
  const [shippingCharge, setShippingCharge] = useState(120); // default outside

  // 🧩 Load saved data
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedLocation = localStorage.getItem("shippingLocation");
    const savedCharge = localStorage.getItem("shippingCharge");

    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedLocation) setShippingLocation(savedLocation);
    if (savedCharge) setShippingCharge(Number(savedCharge));
  }, []);

  // 💾 Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("shippingLocation", shippingLocation);
    localStorage.setItem("shippingCharge", shippingCharge.toString());
  }, [shippingLocation, shippingCharge]);

  // 🛒 Add to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) =>
          item._id === product._id &&
          (item.selectedSize ?? "") === (product.selectedSize ?? "")
      );

      if (existingItem) {
        return prev.map((item) =>
          item._id === product._id &&
          (item.selectedSize ?? "") === (product.selectedSize ?? "")
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    toast.success("✅ প্রোডাক্টটি কার্টে যোগ হয়েছে!", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  // ❌ Remove item
  const removeFromCart = (_id, selectedSize) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item._id === _id &&
            (item.selectedSize ?? "") === (selectedSize ?? "")
          )
      )
    );

    toast.info("❌ কার্ট থেকে প্রোডাক্টটি সরানো হয়েছে!", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  // 🔢 Update quantity
  const updateQuantity = (_id, delta, selectedSize) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === _id && (item.selectedSize ?? "") === (selectedSize ?? "")
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // 🧮 Totals
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.sale_price || 0) * (item.quantity || 0),
    0
  );

  // 🚚 Shipping logic
  useEffect(() => {
    if (totalQuantity >= 2) {
      setShippingCharge(0); // free shipping
    } else {
      setShippingCharge(shippingLocation === "inside" ? 80 : 120);
    }
  }, [shippingLocation, totalQuantity]);

  const total = subtotal + shippingCharge;

  const clearCart = () => {
    setCartItems([]);
    toast.info("কার্ট খালি করা হয়েছে।", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalQuantity,
        subtotal,
        shippingLocation,
        setShippingLocation,
        shippingCharge,
        total,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
