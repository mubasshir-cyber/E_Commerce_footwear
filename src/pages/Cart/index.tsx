import { Link } from "react-router-dom";
import { Header } from "../../components/site/Header";
import { Footer } from "../../components/site/Footer";
import { AnnouncementBar } from "../../components/site/AnnouncementBar";
import { useCart } from "../../lib/cart";
import {
  Minus,
  Plus,
  X,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

export default function CartPage() {
  const { lines, setQty, remove, subtotal, count } = useCart();
  const shipping = subtotal === 0 ? 0 : subtotal >= 2499 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <section className="container-luxe py-12 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <p className="eyebrow">Step 1 of 2</p>
            <h1 className="mt-4 text-4xl md:text-5xl">Your Bag</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {count} item{count === 1 ? "" : "s"} · Reserved for 30 minutes
            </p>
          </div>

          {lines.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag
                className="h-12 w-12 mx-auto text-muted-foreground"
                strokeWidth={1}
              />
              <p className="mt-6 font-serif text-2xl">Your bag is empty</p>
              <Link
                to="/shop/new-arrivals"
                className="btn-luxe mt-8 inline-flex"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16">
              <div>
                <ul className="divide-y divide-border border-y border-border">
                  {lines.map((l) => (
                    <li key={l.id} className="py-6">
                      <div className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-4 md:gap-6">
                        <Link
                          to={`/product/${l.slug}`}
                          className="aspect-[4/5] bg-surface overflow-hidden"
                        >
                          <img
                            src={l.image}
                            alt={l.name}
                            className="h-full w-full object-cover"
                          />
                        </Link>
                        <div className="min-w-0 flex flex-col">
                          <div className="flex justify-between gap-3">
                            <div className="min-w-0">
                              <Link
                                to={`/product/${l.slug}`}
                                className="font-serif text-lg md:text-xl hover:text-accent-hover"
                              >
                                {l.name}
                              </Link>
                              <p className="mt-1 text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                                {l.color}
                                {l.size ? ` · EU ${l.size}` : ""}
                              </p>
                            </div>
                            <button
                              aria-label="Remove"
                              onClick={() => remove(l.id)}
                              className="text-muted-foreground hover:text-foreground p-1"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-auto pt-4 flex items-center justify-between">
                            <div className="inline-flex items-center border border-border">
                              <button
                                aria-label="Decrease"
                                onClick={() => setQty(l.id, l.qty - 1)}
                                className="px-3 py-2 hover:bg-surface"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-3 text-sm tabular-nums">
                                {l.qty}
                              </span>
                              <button
                                aria-label="Increase"
                                onClick={() => setQty(l.id, l.qty + 1)}
                                className="px-3 py-2 hover:bg-surface"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="text-base tabular-nums font-medium">
                              ₹{(l.price * l.qty).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/shop/new-arrivals"
                  className="link-underline mt-8 inline-flex"
                >
                  ← Continue shopping
                </Link>
              </div>

              <aside className="bg-surface p-6 md:p-8 h-fit lg:sticky lg:top-28">
                <h2 className="font-serif text-2xl">Order Summary</h2>
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Subtotal</dt>
                    <dd className="tabular-nums">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Shipping</dt>
                    <dd className="tabular-nums">
                      {shipping === 0 ? "Free" : `₹${shipping}`}
                    </dd>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border text-base font-medium">
                    <dt>Total</dt>
                    <dd className="tabular-nums">
                      ₹{total.toLocaleString("en-IN")}
                    </dd>
                  </div>
                </dl>
                {subtotal < 2499 && (
                  <p className="mt-4 text-xs text-muted-foreground">
                    Add ₹{(2499 - subtotal).toLocaleString("en-IN")} more for
                    free shipping
                  </p>
                )}
                <Link to="/checkout" className="btn-luxe w-full mt-6">
                  Secure Checkout
                </Link>
                <ul className="mt-6 space-y-3 text-xs text-muted-foreground">
                  <li className="flex gap-2">
                    <ShieldCheck className="h-4 w-4 text-accent-hover shrink-0" />{" "}
                    256-bit SSL encrypted payments
                  </li>
                  <li className="flex gap-2">
                    <Truck className="h-4 w-4 text-accent-hover shrink-0" />{" "}
                    Free shipping on orders ₹2,499+
                  </li>
                  <li className="flex gap-2">
                    <RotateCcw className="h-4 w-4 text-accent-hover shrink-0" />{" "}
                    Easy 15-day returns
                  </li>
                </ul>
              </aside>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
