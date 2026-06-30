import { Link, useParams } from "react-router-dom";
import { Header } from "../../components/site/Header";
import { Footer } from "../../components/site/Footer";
import { AnnouncementBar } from "../../components/site/AnnouncementBar";
import { ProductCard } from "../../components/site/ProductCard";
import { filterProducts, products } from "../../data/products";
import { SlidersHorizontal, ChevronRight, X } from "lucide-react";
import { useMemo, useState } from "react";

function titleCase(s: string) {
  return s
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

const COPY: Record<string, { eyebrow: string; title: string; intro: string }> =
  {
    "new-arrivals": {
      eyebrow: "Just Landed",
      title: "New Arrivals",
      intro:
        "The latest from our Mumbai atelier. Fresh silhouettes, considered details.",
    },
    "best-sellers": {
      eyebrow: "Most Loved",
      title: "Best Sellers",
      intro: "The pairs our community returns to, season after season.",
    },
    sale: {
      eyebrow: "Final Edit",
      title: "Sale",
      intro: "A quiet edit of seasonal favourites at considered prices.",
    },
    collections: {
      eyebrow: "Curated",
      title: "Collections",
      intro: "Stories told in leather and form.",
    },
  };

const ALL_COLORS = Array.from(
  new Set(products.flatMap((p) => p.colors?.map((c) => c.name) ?? [])),
);
const ALL_SIZES = Array.from(
  new Set(products.flatMap((p) => p.sizes ?? [])),
).sort();
const ALL_OCCASIONS = Array.from(
  new Set(products.flatMap((p) => p.occasion ?? [])),
);

type Sort = "featured" | "price-asc" | "price-desc";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();

  const currentCategory = category ?? "new-arrivals";

  const meta = COPY[currentCategory] ?? {
    eyebrow: "The Collection",
    title: titleCase(currentCategory),
    intro: `Discover our edit of women's ${titleCase(currentCategory).toLowerCase()} — designed in India, made to move with you.`,
  };

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<number[]>([]);
  const [occasions, setOccasions] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sort, setSort] = useState<Sort>("featured");

  const items = useMemo(
    () =>
      filterProducts({
        category,
        colors,
        sizes,
        occasion: occasions,
        maxPrice,
        sort,
      }),
    [category, colors, sizes, occasions, maxPrice, sort],
  );

  const activeCount =
    colors.length +
    sizes.length +
    occasions.length +
    (maxPrice < 10000 ? 1 : 0);

  const toggle = <T,>(list: T[], v: T, set: (v: T[]) => void) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const clearAll = () => {
    setColors([]);
    setSizes([]);
    setOccasions([]);
    setMaxPrice(10000);
  };

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
            <Link to="/shop/new-arrivals" className="hover:text-foreground">
              Shop
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-foreground">{meta.title}</span>
          </nav>
        </div>

        <section className="container-luxe py-10 md:py-20 text-center">
          <p className="eyebrow">{meta.eyebrow}</p>
          <h1 className="mt-4 md:mt-5 text-4xl md:text-6xl xl:text-7xl">
            {meta.title}
          </h1>
          <p className="mt-4 md:mt-6 text-sm md:text-base text-muted-foreground max-w-xl mx-auto px-2">
            {meta.intro}
          </p>
        </section>

        {/* Filter bar */}
        <div className="border-y border-border sticky top-[58px] md:top-[81px] bg-background/95 backdrop-blur z-30">
          <div className="container-luxe flex items-center justify-between py-3 md:py-4 gap-3">
            <button
              onClick={() => setFiltersOpen(true)}
              className="inline-flex items-center gap-2 text-[11px] md:text-xs tracking-[0.2em] uppercase font-medium"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filter{" "}
              {activeCount > 0 && (
                <span className="bg-foreground text-background rounded-full px-1.5 text-[10px]">
                  {activeCount}
                </span>
              )}
            </button>
            <p className="text-[11px] md:text-xs text-muted-foreground tracking-[0.1em]">
              {items.length} item{items.length === 1 ? "" : "s"}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sort by"
              className="bg-transparent text-[11px] md:text-xs tracking-[0.18em] uppercase font-medium border-0 cursor-pointer focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
            </select>
          </div>
        </div>

        <section className="container-luxe py-8 md:py-16">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-2xl">No matches</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your filters.
              </p>
              <button onClick={clearAll} className="btn-ghost-luxe mt-6">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
              {items.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />

      {/* Filter drawer */}
      <div
        className={`fixed inset-0 z-[75] transition-opacity ${filtersOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!filtersOpen}
      >
        <div
          className="absolute inset-0 bg-foreground/40"
          onClick={() => setFiltersOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 h-dvh w-[88%] sm:w-[380px] bg-background flex flex-col transition-transform duration-500 ${filtersOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <header className="flex items-center justify-between px-6 py-5 border-b border-border">
            <h2 className="font-serif text-xl">Filter</h2>
            <button
              aria-label="Close"
              onClick={() => setFiltersOpen(false)}
              className="p-2 -mr-2"
            >
              <X className="h-5 w-5" />
            </button>
          </header>
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
            <div>
              <p className="eyebrow mb-3">
                Price · up to ₹{maxPrice.toLocaleString("en-IN")}
              </p>
              <input
                type="range"
                min={1000}
                max={10000}
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-foreground"
              />
            </div>
            <div>
              <p className="eyebrow mb-3">Color</p>
              <div className="flex flex-wrap gap-2">
                {ALL_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => toggle(colors, c, setColors)}
                    className={`px-3 py-1.5 text-xs uppercase tracking-[0.15em] border transition-colors ${colors.includes(c) ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-3">Size · EU</p>
              <div className="grid grid-cols-5 gap-2">
                {ALL_SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggle(sizes, s, setSizes)}
                    className={`h-10 text-sm border tabular-nums transition-colors ${sizes.includes(s) ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-3">Occasion</p>
              <div className="flex flex-wrap gap-2">
                {ALL_OCCASIONS.map((o) => (
                  <button
                    key={o}
                    onClick={() => toggle(occasions, o, setOccasions)}
                    className={`px-3 py-1.5 text-xs uppercase tracking-[0.15em] border transition-colors ${occasions.includes(o) ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <footer className="border-t border-border px-6 py-4 grid grid-cols-2 gap-3">
            <button onClick={clearAll} className="btn-ghost-luxe !py-3">
              Clear
            </button>
            <button
              onClick={() => setFiltersOpen(false)}
              className="btn-luxe !py-3"
            >
              Show {items.length}
            </button>
          </footer>
        </aside>
      </div>
    </div>
  );
}
