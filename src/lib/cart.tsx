import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface CartLine {
  id: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size?: number;
  color?: string;
  qty: number;
}

interface CartCtx {
  lines: CartLine[];
  wishlist: string[];
  cartOpen: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setMenuOpen: (v: boolean) => void;
  add: (line: Omit<CartLine, "id" | "qty"> & { qty?: number }) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  toggleWish: (productId: string) => void;
  count: number;
  subtotal: number;
}

const Ctx = createContext<CartCtx | null>(null);

const STORAGE = "ml.cart.v1";
const WSTORAGE = "ml.wish.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem(STORAGE);
      if (c) setLines(JSON.parse(c));
      const w = localStorage.getItem(WSTORAGE);
      if (w) setWishlist(JSON.parse(w));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) localStorage.setItem(STORAGE, JSON.stringify(lines)); }, [lines, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(WSTORAGE, JSON.stringify(wishlist)); }, [wishlist, hydrated]);

  const value: CartCtx = useMemo(() => {
    const add: CartCtx["add"] = (l) => {
      const id = `${l.productId}-${l.size ?? "n"}-${l.color ?? "n"}`;
      setLines((prev) => {
        const existing = prev.find((x) => x.id === id);
        if (existing) return prev.map((x) => x.id === id ? { ...x, qty: x.qty + (l.qty ?? 1) } : x);
        return [...prev, { ...l, id, qty: l.qty ?? 1 }];
      });
      setCartOpen(true);
    };
    return {
      lines, wishlist, cartOpen, searchOpen, menuOpen,
      setCartOpen, setSearchOpen, setMenuOpen, add,
      remove: (id) => setLines((p) => p.filter((x) => x.id !== id)),
      setQty: (id, qty) => setLines((p) => p.map((x) => x.id === id ? { ...x, qty: Math.max(1, qty) } : x)),
      clear: () => setLines([]),
      toggleWish: (pid) => setWishlist((w) => w.includes(pid) ? w.filter((x) => x !== pid) : [...w, pid]),
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.price, 0),
    };
  }, [lines, wishlist, cartOpen, searchOpen, menuOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
