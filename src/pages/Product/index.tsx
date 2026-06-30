import { Link, useParams } from "react-router-dom";
import { Header } from "../../components/site/Header";
import { Footer } from "../../components/site/Footer";
import { AnnouncementBar } from "../../components/site/AnnouncementBar";
import { ProductCard } from "../../components/site/ProductCard";
import { ARButton } from "../../components/site/ARViewer";
import { findProduct, products } from "../../data/products";
import { useCart } from "../../lib/cart";
import {
  ChevronRight,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Minus,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <div>Product not found</div>;
  }
  const p = findProduct(slug);

  if (!p) {
    return <div>Product not found</div>;
  }
  const { add, toggleWish, wishlist } = useCart();
  const [color, setColor] = useState(p.colors?.[0]?.name ?? "");
  const [size, setSize] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const wished = wishlist.includes(p.id);
  const gallery = p.gallery ?? [p.image];

  const handleAdd = () => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    add({
      productId: p.id,
      slug: p.slug,
      name: p.name,
      image: p.image,
      price: p.price,
      size,
      color,
    });
    toast.success(`${p.name} added to bag`);
  };

  const related = products.filter((x) => x.id !== p.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        <div className="container-luxe pt-5 md:pt-6">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-muted-foreground overflow-x-auto"
          >
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <Link
              to={`/shop/${p.categorySlug}`}
              className="hover:text-foreground"
            >
              {p.category}
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-foreground truncate">{p.name}</span>
          </nav>
        </div>

        <section className="container-luxe pt-6 md:pt-10 pb-16 md:pb-24">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-14">
            {/* Gallery */}
            <div>
              <div className="aspect-[4/5] bg-surface overflow-hidden relative">
                <img
                  src={gallery[activeImg]}
                  alt={p.name}
                  className="h-full w-full object-cover"
                />
                {p.badge && (
                  <span className="absolute top-4 left-4 bg-background/95 px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-medium">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2 md:gap-3">
                {gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`aspect-square bg-surface overflow-hidden border ${i === activeImg ? "border-foreground" : "border-transparent"} transition-colors`}
                  >
                    <img
                      src={g}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Buy */}
            <div className="lg:sticky lg:top-28 self-start">
              <p className="eyebrow">{p.category}</p>
              <h1 className="mt-3 text-3xl md:text-4xl xl:text-5xl">
                {p.name}
              </h1>
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xl tabular-nums">
                  ₹{p.price.toLocaleString("en-IN")}
                </span>
                {p.compareAt && (
                  <>
                    <span className="text-muted-foreground line-through tabular-nums">
                      ₹{p.compareAt.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-sale font-medium">
                      {Math.round(
                        ((p.compareAt - p.price) / p.compareAt) * 100,
                      )}
                      % off
                    </span>
                  </>
                )}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                MRP incl. of all taxes
              </p>

              <p className="mt-6 text-sm leading-relaxed text-foreground/80">
                {p.description}
              </p>

              {/* Colors */}
              {p.colors && (
                <div className="mt-8">
                  <p className="eyebrow">
                    Color ·{" "}
                    <span className="text-foreground normal-case tracking-normal">
                      {color}
                    </span>
                  </p>
                  <div className="mt-3 flex gap-2.5">
                    {p.colors.map((c, idx) => (
                      <button
                        key={c.name}
                        onClick={() => {
                          setColor(c.name);
                          if (gallery[idx]) setActiveImg(idx);
                        }}
                        aria-label={c.name}
                        title={c.name}
                        className={`h-9 w-9 rounded-full border-2 transition-all ${color === c.name ? "border-foreground scale-105 ring-2 ring-foreground/20 ring-offset-2 ring-offset-background" : "border-border hover:border-foreground/40"}`}
                        style={{ background: c.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {p.sizes && (
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-3">
                    <p className="eyebrow">Size · EU</p>
                    <button className="text-[11px] tracking-[0.15em] uppercase underline underline-offset-4 text-muted-foreground hover:text-foreground">
                      Size guide
                    </button>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {p.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`h-12 text-sm border tabular-nums transition-all ${size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Qty + actions */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <div className="inline-flex items-center border border-border h-[52px]">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 h-full hover:bg-surface"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 text-sm tabular-nums">{qty}</span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => setQty(qty + 1)}
                    className="px-4 h-full hover:bg-surface"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button onClick={handleAdd} className="btn-luxe flex-1 !py-4">
                  Add to Bag · ₹{(p.price * qty).toLocaleString("en-IN")}
                </button>
                <button
                  onClick={() => toggleWish(p.id)}
                  aria-label={
                    wished ? "Remove from wishlist" : "Add to wishlist"
                  }
                  className={`h-[52px] w-[52px] grid place-items-center border ${wished ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"} transition-colors`}
                >
                  <Heart
                    className={`h-4 w-4 ${wished ? "fill-current" : ""}`}
                  />
                </button>
              </div>

              {/* AR */}
              {p.hasAR && (
                <div className="mt-4">
                  <ARButton
                    glbUrl={p.glbModelUrl}
                    usdzUrl={p.usdzModelUrl}
                    productName={p.name}
                    poster={p.image}
                    modelScale={p.modelScale}
                  />
                  <p className="mt-2 text-[11px] text-muted-foreground tracking-wide">
                    Try this pair on in your space · iPhone, Android & desktop
                    3D
                  </p>
                </div>
              )}

              {/* USPs */}
              <ul className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border pt-8 text-xs">
                <li className="flex items-start gap-3">
                  <Truck className="h-4 w-4 mt-0.5 text-accent-hover shrink-0" />
                  <span>
                    <b className="block">Free shipping</b>
                    <span className="text-muted-foreground">
                      Orders ₹2,499+
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <RotateCcw className="h-4 w-4 mt-0.5 text-accent-hover shrink-0" />
                  <span>
                    <b className="block">15-day returns</b>
                    <span className="text-muted-foreground">
                      Quietly, no questions
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="h-4 w-4 mt-0.5 text-accent-hover shrink-0" />
                  <span>
                    <b className="block">Authenticity</b>
                    <span className="text-muted-foreground">
                      Hand-inspected
                    </span>
                  </span>
                </li>
              </ul>

              {/* Details */}
              {p.details && (
                <details
                  className="mt-10 border-t border-border pt-6 group"
                  open
                >
                  <summary className="cursor-pointer flex justify-between items-center text-sm tracking-[0.15em] uppercase font-medium">
                    Craft & Details
                    <Plus className="h-4 w-4 group-open:rotate-45 transition-transform" />
                  </summary>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                    {p.details.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span className="text-accent-hover">—</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="container-luxe pb-24 md:pb-32">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl md:text-4xl">You may also love</h2>
            <Link
              to={`/shop/${p.categorySlug}`}
              className="hover:text-foreground"
            >
              Shop {p.category}
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {related.map((r) => (
              <ProductCard key={r.id} p={r} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
