import { Heart, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../lib/cart";
import { toast } from "sonner";
import type { Product } from "../../data/products";

export type { Product };

export function ProductCard({ p }: { p: Product }) {
  const { add, toggleWish, wishlist } = useCart();
  const wished = wishlist.includes(p.id);

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add({
      productId: p.id,
      slug: p.slug,
      name: p.name,
      image: p.image,
      price: p.price,
      color: p.colors?.[0]?.name,
      size: p.sizes?.[Math.floor((p.sizes?.length ?? 1) / 2)],
    });
    toast.success(`${p.name} added to bag`);
  };

  const wish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWish(p.id);
    toast.success(wished ? `${p.name} removed from wishlist` : `${p.name} saved to wishlist`);
  };

  return (
    <article className="group">
      <Link to={"/product/" + p.slug} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface">
          <img
            src={p.image} alt={p.name} loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
          {p.hoverImage && (
            <img
              src={p.hoverImage} alt="" aria-hidden loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}
          {p.badge && (
            <span className="absolute top-3 left-3 bg-background/95 backdrop-blur px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase font-medium">
              {p.badge}
            </span>
          )}
          <button
            onClick={wish}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3 right-3 grid place-items-center h-9 w-9 rounded-full bg-background/95 backdrop-blur md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:text-accent-hover"
          >
            <Heart className={`h-4 w-4 ${wished ? "fill-current text-foreground" : ""}`} />
          </button>
          <button
            onClick={quickAdd}
            className="absolute inset-x-3 bottom-3 bg-foreground text-background py-3 text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-medium translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-accent-hover flex items-center justify-center gap-2"
          >
            <Plus className="h-3.5 w-3.5" /> Quick Add
          </button>
        </div>

        <div className="pt-3 md:pt-4 px-0.5">
          <p className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">{p.category}</p>
          <h3 className="mt-1 text-[13px] md:text-[15px] font-sans font-medium tracking-tight line-clamp-1">{p.name}</h3>
          <div className="mt-1.5 flex items-center gap-2 md:gap-3 flex-wrap">
            <span className="text-sm tabular-nums">₹{p.price.toLocaleString("en-IN")}</span>
            {p.compareAt && (
              <>
                <span className="text-xs md:text-sm text-muted-foreground line-through tabular-nums">₹{p.compareAt.toLocaleString("en-IN")}</span>
                <span className="text-[10px] md:text-[11px] text-sale font-medium">
                  {Math.round(((p.compareAt - p.price) / p.compareAt) * 100)}% off
                </span>
              </>
            )}
          </div>
          {p.colors && (
            <div className="mt-2 md:mt-3 flex items-center gap-1.5">
              {p.colors.map((c) => (
                <span key={c.name} title={c.name} style={{ background: c.hex }} className="h-3 w-3 rounded-full border border-border" />
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
