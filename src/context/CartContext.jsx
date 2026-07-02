import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

function cartKey(username) {
  return `cc_cart_${username || "guest"}`;
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  // Carga el carrito correspondiente al usuario logueado al cambiar de sesión
  useEffect(() => {
    const stored = localStorage.getItem(cartKey(user?.username));
    setItems(stored ? JSON.parse(stored) : []);
  }, [user?.username]);

  useEffect(() => {
    localStorage.setItem(cartKey(user?.username), JSON.stringify(items));
  }, [items, user?.username]);

  function addToCart(product) {
    setItems((prev) => {
      const existing = prev.find((i) => i.type === product.type && i.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + product.quantity, product.stock);
        return prev.map((i) => (i === existing ? { ...i, quantity: newQty } : i));
      }
      return [...prev, { ...product, quantity: Math.min(product.quantity, product.stock) }];
    });
  }

  function updateQuantity(type, id, quantity) {
    setItems((prev) => prev.map((i) => (i.type === type && i.id === id ? { ...i, quantity } : i)));
  }

  function removeFromCart(type, id) {
    setItems((prev) => prev.filter((i) => !(i.type === type && i.id === id)));
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const value = { items, addToCart, updateQuantity, removeFromCart, clearCart, total };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
