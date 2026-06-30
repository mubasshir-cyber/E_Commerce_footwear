import { Link, useNavigate } from "react-router-dom";
import { Search, X, Menu } from "lucide-react";
import { useCart } from "../../lib/cart";
import { useEffect } from "react";

const NAV = [
  { label: "New", to: "/shop/new-arrivals" },
  { label: "Sandals", to: "/shop/sandals" },
  { label: "Heels", to: "/shop/heels" },
  { label: "Flats", to: "/shop/flats" },
  { label: "Sneakers", to: "/shop/sneakers" },
  { label: "Boots", to: "/shop/boots" },
  { label: "Collections", to: "/shop/collections" },
  { label: "Sale", to: "/shop/sale" },
];

export function MobileMenu() {
  const { menuOpen, setMenuOpen, setSearchOpen, count } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, setMenuOpen]);

  if (!menuOpen) return null;

  const go = (to: string) => {
    setMenuOpen(false);
    navigate(to);
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-background lg:hidden overflow-y-auto"
      role="dialog"
      aria-label="Menu"
    >
      <div className="container-luxe py-5">
        <div className="flex items-center justify-between">
          <span className="font-serif text-lg tracking-[0.06em]">
            MAISON LIOR
          </span>
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="p-2 -mr-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <button
          onClick={() => {
            setMenuOpen(false);
            setSearchOpen(true);
          }}
          className="mt-8 w-full flex items-center gap-3 border border-border px-4 py-3.5 text-sm text-muted-foreground hover:border-foreground transition-colors"
        >
          <Search className="h-4 w-4" /> Search Maison Lior…
        </button>
        <nav className="mt-8 flex flex-col">
          {NAV.map((n) => (
            <button
              key={n.to}
              onClick={() => go(n.to)}
              className={`text-left font-serif text-2xl py-3 border-b border-border ${n.label === "Sale" ? "text-sale" : ""}`}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <div className="mt-8 pt-6 border-t border-border flex flex-col gap-3 text-xs tracking-[0.2em] uppercase text-muted-foreground">
          <button onClick={() => go("/account")} className="text-left">
            Account
          </button>
          <button onClick={() => go("/cart")} className="text-left">
            Bag ({count})
          </button>
          <button onClick={() => go("/about")} className="text-left">
            About
          </button>
          <button onClick={() => go("/contact")} className="text-left">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}

export function MenuButton({ className }: { className?: string }) {
  const { setMenuOpen } = useCart();
  return (
    <button
      aria-label="Open menu"
      onClick={() => setMenuOpen(true)}
      className={className}
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}
