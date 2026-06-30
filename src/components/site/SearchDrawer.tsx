import { Link, useNavigate } from "react-router-dom";
import { Search, X, Camera, ArrowRight } from "lucide-react";
import { useCart } from "../../lib/cart";
import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "../../data/products";
import { toast } from "sonner";

const SUGGEST = [
  { label: "Block heels", category: "heels" },
  { label: "Kolhapuri", category: "flats" },
  { label: "Bridal", category: "heels" },
  { label: "White sneakers", category: "sneakers" },
  { label: "Office flats", category: "flats" },
  { label: "Gold stiletto", category: "heels" },
];

export function SearchDrawer() {
  const { searchOpen, setSearchOpen } = useCart();
  const [q, setQ] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = searchOpen ? "hidden" : "";
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 100);
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    if (searchOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, setSearchOpen]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.occasion?.some((o) => o.toLowerCase().includes(term)) ||
          p.colors?.some((c) => c.name.toLowerCase().includes(term)),
      )
      .slice(0, 8);
  }, [q]);

  const close = () => {
    setSearchOpen(false);
    setPhoto(null);
  };

  const submit = () => {
    if (!q.trim()) return;
    if (results[0]) {
      navigate(`/product/${results[0].slug}`);
      close();
    } else {
      navigate("/shop/new-arrivals");
    }
  };

  const handlePhoto = (file: File) => {
    const url = URL.createObjectURL(file);
    setPhoto(url);
    toast.success("Visual search active — showing closest matches");
    // Stub: pick a curated set as "matches"
    setQ("");
    setTimeout(() => {
      const match = products[Math.floor(Math.random() * products.length)];
      setQ(match.category.toLowerCase());
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-[80] transition-opacity ${searchOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      role="dialog"
      aria-label="Search products"
    >
      <div className="absolute inset-0 bg-foreground/40" onClick={close} />
      <div
        className={`relative bg-background transition-transform duration-500 ${searchOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="container-luxe py-5 md:py-7">
          <div className="flex items-center gap-3 md:gap-5 border-b border-border pb-4">
            <Search className="h-5 w-5 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
              placeholder="Search for sandals, heels, bridal…"
              className="flex-1 min-w-0 bg-transparent text-lg md:text-2xl font-serif outline-none placeholder:text-muted-foreground/60"
            />
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handlePhoto(f);
              }}
            />
            <button
              onClick={() => fileRef.current?.click()}
              aria-label="Search by photo"
              title="Search by photo"
              className="p-2 hover:text-accent-hover transition-colors shrink-0 border border-border rounded-full"
            >
              <Camera className="h-4 w-4" />
            </button>
            <button
              onClick={close}
              aria-label="Close search"
              className="p-2 -mr-2 shrink-0"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {photo && (
            <div className="mt-4 flex items-center gap-3 p-3 bg-surface">
              <img
                src={photo}
                alt="Visual search reference"
                className="h-14 w-14 object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                  Visual search
                </p>
                <p className="text-sm truncate">Finding similar styles…</p>
              </div>
              <button onClick={() => setPhoto(null)} className="p-2">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="mt-6 max-h-[70vh] overflow-y-auto">
            {q.trim() === "" ? (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="eyebrow mb-4">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGEST.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => {
                          setQ(s.label);
                        }}
                        className="px-4 py-2 text-xs tracking-[0.15em] uppercase border border-border hover:border-foreground transition-colors"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="mt-5 inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground"
                  >
                    <Camera className="h-4 w-4" /> Search by photo
                  </button>
                </div>
                <div>
                  <p className="eyebrow mb-4">Trending Now</p>
                  <div className="grid grid-cols-3 gap-2">
                    {products.slice(0, 3).map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.slug}`}
                        onClick={close}
                        className="group"
                      >
                        <div className="aspect-[4/5] bg-surface overflow-hidden">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <p className="mt-2 text-xs truncate">{p.name}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : results.length === 0 ? (
              <p className="text-center py-12 text-muted-foreground">
                No matches for "{q}"
              </p>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="eyebrow">
                    {results.length} result{results.length === 1 ? "" : "s"}
                  </p>
                  <button
                    onClick={submit}
                    className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase hover:text-accent-hover"
                  >
                    View all <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
                <ul className="divide-y divide-border">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link
                        to={`/product/${p.slug}`}
                        onClick={close}
                        className="flex items-center gap-4 py-3 hover:bg-surface px-2 -mx-2 transition-colors"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-16 w-14 object-cover bg-surface"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">
                            {p.name}
                          </p>
                          <p className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground mt-0.5">
                            {p.category}
                          </p>
                        </div>
                        <span className="text-sm tabular-nums">
                          ₹{p.price.toLocaleString("en-IN")}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
