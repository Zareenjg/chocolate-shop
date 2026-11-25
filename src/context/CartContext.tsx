"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  CHOCOLATES,
  Chocolate,
  FREE_DELIVERY_THRESHOLD_AED,
  STANDARD_DELIVERY_FEE_AED,
} from "@/data/chocolates";

export interface CartItem {
  chocolate: Chocolate;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotalAed: number;
  deliveryFeeAed: number;
  totalAed: number;
  addToCart: (chocolate: Chocolate, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  lastAddedName: string | null;
}

const STORAGE_KEY = "chocolate-shop-cart-v1";
const EMPTY_ITEMS: CartItem[] = [];

let cachedRaw: string | null | undefined = undefined;
let cachedItems: CartItem[] = EMPTY_ITEMS;
const listeners = new Set<() => void>();

function parseStoredCart(raw: string | null): CartItem[] {
  if (!raw) return EMPTY_ITEMS;
  try {
    const parsed = JSON.parse(raw) as Array<{
      id?: string;
      chocolate?: Chocolate;
      quantity: number;
    }>;
    if (!Array.isArray(parsed)) return EMPTY_ITEMS;
    const restored: CartItem[] = [];
    for (const entry of parsed) {
      if (entry.quantity <= 0) continue;
      if (entry.chocolate && entry.chocolate.id && entry.chocolate.name) {
        restored.push({ chocolate: entry.chocolate, quantity: entry.quantity });
      } else if (entry.id) {
        const found = CHOCOLATES.find((c) => c.id === entry.id);
        if (found) {
          restored.push({ chocolate: found, quantity: entry.quantity });
        }
      }
    }
    return restored.length > 0 ? restored : EMPTY_ITEMS;
  } catch {
    return EMPTY_ITEMS;
  }
}

function getCartSnapshot(): CartItem[] {
  if (typeof window === "undefined") return EMPTY_ITEMS;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedItems = parseStoredCart(raw);
  }
  return cachedItems;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY_ITEMS;
}

function writeCart(nextItems: CartItem[]) {
  if (typeof window === "undefined") return;
  const serialized = nextItems.map((item) => ({
    chocolate: item.chocolate,
    quantity: item.quantity,
  }));
  const raw = serialized.length > 0 ? JSON.stringify(serialized) : "";
  try {
    if (raw) {
      window.localStorage.setItem(STORAGE_KEY, raw);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Ignore storage quota issues.
  }
  cachedRaw = raw || null;
  cachedItems = nextItems.length > 0 ? nextItems : EMPTY_ITEMS;
  listeners.forEach((listener) => listener());
}

function subscribeToCart(listener: () => void) {
  listeners.add(listener);
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cachedRaw = undefined;
      listener();
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getServerSnapshot
  );
  const [lastAddedName, setLastAddedName] = useState<string | null>(null);

  useEffect(() => {
    if (!lastAddedName) return;
    const timer = window.setTimeout(() => setLastAddedName(null), 2200);
    return () => window.clearTimeout(timer);
  }, [lastAddedName]);

  const addToCart = useCallback((chocolate: Chocolate, quantity = 1) => {
    if (quantity <= 0) return;
    const current = getCartSnapshot();
    const existing = current.find((item) => item.chocolate.id === chocolate.id);
    const next = existing
      ? current.map((item) =>
          item.chocolate.id === chocolate.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      : [...current, { chocolate, quantity }];
    writeCart(next);
    setLastAddedName(chocolate.name);
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    const current = getCartSnapshot();
    const next =
      quantity <= 0
        ? current.filter((item) => item.chocolate.id !== id)
        : current.map((item) =>
            item.chocolate.id === id ? { ...item, quantity } : item
          );
    writeCart(next);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    const current = getCartSnapshot();
    writeCart(current.filter((item) => item.chocolate.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    writeCart([]);
  }, []);

  const totals = useMemo(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotalAed = items.reduce(
      (sum, item) => sum + item.chocolate.priceAed * item.quantity,
      0
    );
    const deliveryFeeAed =
      subtotalAed === 0 || subtotalAed >= FREE_DELIVERY_THRESHOLD_AED
        ? 0
        : STANDARD_DELIVERY_FEE_AED;
    const totalAed = subtotalAed + deliveryFeeAed;
    return { totalItems, subtotalAed, deliveryFeeAed, totalAed };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      ...totals,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      lastAddedName,
    }),
    [items, totals, addToCart, updateQuantity, removeFromCart, clearCart, lastAddedName]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
