"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

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

    toast.info("❌ কার্ট থেকে প্রোডাক্টটি সরিয়ে দেওয়া হয়েছে!", {
      position: "top-center",
      autoClose: 2000,
    });
  };

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

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
        addToCart,
        removeFromCart,
        updateQuantity,
        totalQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
