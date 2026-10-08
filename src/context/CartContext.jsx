import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { readJson } from "../lib/storage";

const CartContext = createContext(null);
const CART_KEY = "velune-cart";

const codes = {
  VELUNE10: 0.1,
  VELUNE20: 0.2,
};

function money(value) {
  return Math.round(value * 100) / 100;
}

export function CartProvider({ children }) {
  const location = useLocation();
  const [items, setItems] = useState(() => {
    const stored = readJson(CART_KEY, []);
    return Array.isArray(stored) ? stored : [];
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [promo, setPromo] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timeout);
  }, [toast]);

  const notify = (message) => setToast({ id: Date.now(), message });

  const addItem = (product, options = {}) => {
    const qty = Math.max(1, Math.min(8, options.qty ?? 1));
    const color = options.color || product.colors[0]?.name || "Default";
    const palette = options.palette || product.colors.find((entry) => entry.name === color)?.palette || product.palette;
    const key = `${product.id}::${color}`;

    setItems((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, qty: Math.min(8, item.qty + qty) } : item,
        );
      }
      return [
        ...current,
        {
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          color,
          palette,
          variant: product.variant,
          compact: product.compact,
          qty,
        },
      ];
    });

    if (options.open !== false) setDrawerOpen(true);
  };

  const updateQty = (key, qty) => {
    setItems((current) => {
      if (qty < 1) return current.filter((item) => item.key !== key);
      return current.map((item) => (item.key === key ? { ...item, qty: Math.min(8, qty) } : item));
    });
  };

  const removeItem = (key) => setItems((current) => current.filter((item) => item.key !== key));
  const clearCart = () => {
    setItems([]);
    setPromo("");
  };

  const applyPromo = (raw) => {
    const code = raw.trim().toUpperCase();
    if (!codes[code]) {
      setPromo("");
      return { ok: false, error: "That code is not active." };
    }
    setPromo(code);
    notify(codes[code] === 0.1 ? "10% off applied" : "20% off applied");
    return { ok: true };
  };

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = money(items.reduce((sum, item) => sum + item.price * item.qty, 0));
  const discount = money(subtotal * (codes[promo] ?? 0));
  const shipping = subtotal === 0 || subtotal - discount >= 150 ? 0 : 12;
  const total = money(Math.max(0, subtotal - discount + shipping));

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      discount,
      shipping,
      total,
      promo,
      drawerOpen,
      setDrawerOpen,
      toast,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      applyPromo,
      notify,
    }),
    [items, count, subtotal, discount, shipping, total, promo, drawerOpen, toast],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
