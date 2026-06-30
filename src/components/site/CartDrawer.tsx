import { Link } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "../../lib/cart";
import { useEffect } from "react";

export function CartDrawer() {
  const { cartOpen, setCartOpen, lines, setQty, remove, subtotal, count } =
    useCart();

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-foreground/40 backdrop-blur-sm z-[70] transition-opacity ${cartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setCartOpen(false)}
        aria-hidden
      />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 h-dvh w-full sm:w-[420px] bg-background z-[71] shadow-2xl flex flex-col transition-transform duration-500 ease-out ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-serif text-xl">
            Your Bag{" "}
            <span className="text-muted-foreground text-sm ml-1">
              ({count})
            </span>
          </h2>
          <button
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
            className="p-2 -mr-2"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <ShoppingBag
              className="h-10 w-10 text-muted-foreground"
              strokeWidth={1}
            />
            <p className="mt-6 font-serif text-2xl">Your bag is empty</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Discover pieces made to move with you.
            </p>
            <Link
              to="/shop/new-arrivals"
              onClick={() => setCartOpen(false)}
              className="btn-luxe mt-8"
            >
              Shop New Arrivals
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {lines.map((l) => (
                <article key={l.id} className="grid grid-cols-[88px_1fr] gap-4">
                  <Link
                    to={`/product/${l.slug}`}
                    onClick={() => setCartOpen(false)}
                    className="block bg-surface aspect-[4/5] overflow-hidden"
                  >
                    <img
                      src={l.image}
                      alt={l.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="min-w-0">
                    <div className="flex justify-between gap-2">
                      <Link
                        to={`/product/${l.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="text-sm font-medium hover:text-accent-hover truncate"
                      >
                        {l.name}
                      </Link>
                      <button
                        aria-label="Remove"
                        onClick={() => remove(l.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                      {l.color}
                      {l.size ? ` · EU ${l.size}` : ""}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-border">
                        <button
                          aria-label="Decrease"
                          onClick={() => setQty(l.id, l.qty - 1)}
                          className="px-2.5 py-1.5 hover:bg-surface"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 text-sm tabular-nums">
                          {l.qty}
                        </span>
                        <button
                          aria-label="Increase"
                          onClick={() => setQty(l.id, l.qty + 1)}
                          className="px-2.5 py-1.5 hover:bg-surface"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm tabular-nums">
                        ₹{(l.price * l.qty).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <footer className="border-t border-border px-6 py-5 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium tabular-nums">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                Shipping & taxes calculated at checkout
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="btn-luxe w-full"
                >
                  Checkout · ₹{subtotal.toLocaleString("en-IN")}
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setCartOpen(false)}
                  className="btn-ghost-luxe w-full"
                >
                  View Bag
                </Link>
              </div>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
