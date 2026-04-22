import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clear: () => void;
  hasItem: (id: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "srp-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch { /* noop */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem: CartContextValue["addItem"] = (item) => {
    setItems((prev) => {
      const qty = item.quantity ?? 1;
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + qty } : p,
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((p) => p.id !== id));

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) return removeItem(id);
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p)));
  };

  const clear = () => setItems([]);

  const hasItem = (id: string) => items.some((p) => p.id === id);

  const { count, total } = useMemo(() => {
    let c = 0, t = 0;
    for (const i of items) { c += i.quantity; t += i.quantity * i.price; }
    return { count: c, total: t };
  }, [items]);

  return (
    <CartContext.Provider
      value={{ items, count, total, isOpen, setIsOpen, addItem, removeItem, updateQuantity, clear, hasItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}