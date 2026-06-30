import { Link } from "react-router-dom";
import { Search, Heart, User, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../../lib/cart";
import { MenuButton } from "./MobileMenu";

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

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { count, setCartOpen, setSearchOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-background/95 border-b border-border"
          : "bg-background border-b border-transparent"
      }`}
    >
      <div className="container-luxe">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 md:gap-6 py-3.5 md:py-6">
          <div className="flex items-center gap-6 min-w-0">
            <MenuButton className="lg:hidden -ml-1.5 p-2 shrink-0" />
            <nav className="hidden lg:flex items-center gap-7">
              {NAV.slice(0, 4).map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="text-[11px] tracking-[0.18em] uppercase font-medium text-foreground/80 hover:text-accent-hover transition-colors"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link to="/" className="justify-self-center text-center min-w-0">
            <span className="block font-serif text-lg md:text-[28px] tracking-[0.06em] md:tracking-[0.08em] leading-none truncate">
              MAISON LIOR
            </span>
            <span className="hidden md:block text-[9px] tracking-[0.4em] uppercase text-muted-foreground mt-1">
              India · Est. 2024
            </span>
          </Link>

          <div className="flex items-center gap-0.5 md:gap-3 justify-end">
            <nav className="hidden lg:flex items-center gap-7 mr-4">
              {NAV.slice(4).map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`text-[11px] tracking-[0.18em] uppercase font-medium hover:text-accent-hover transition-colors ${n.label === "Sale" ? "text-sale" : "text-foreground/80"}`}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:text-accent-hover transition-colors"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link
              aria-label="Account"
              to="/account"
              className="p-2 hover:text-accent-hover transition-colors hidden sm:inline-flex"
            >
              <User className="h-[18px] w-[18px]" />
            </Link>
            <Link
              aria-label="Wishlist"
              to={{
                pathname: "/account",
                hash: "#wishlist",
              }}
              className="p-2 hover:text-accent-hover transition-colors hidden sm:inline-flex"
            >
              <Heart className="h-[18px] w-[18px]" />
            </Link>
            <button
              aria-label="Cart"
              onClick={() => setCartOpen(true)}
              className="p-2 hover:text-accent-hover transition-colors relative"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 text-[10px] bg-foreground text-background rounded-full h-4 min-w-4 px-1 flex items-center justify-center font-medium">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
