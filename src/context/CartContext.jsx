import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "cart-items";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // abaikan jika storage tidak tersedia
    }
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: Math.min(item.quantity + quantity, item.stock ?? Infinity) } : item));
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock ?? Infinity)) } : item)));
  };

  const removeFromCart = (id) => setItems((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return <CartContext.Provider value={{ items, addToCart, updateQuantity, removeFromCart, clearCart, totalItems, subtotal }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart harus dipakai di dalam CartProvider");
  return context;
};
