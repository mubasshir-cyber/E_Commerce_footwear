import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";
import p5 from "../assets/p5.jpg";
import p6 from "../assets/p6.jpg";
import s1 from "../assets/cat-sandals.jpg";
import s2 from "../assets/cat-heels.jpg";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  compareAt?: number;
  badge?: string;
  image: string;
  hoverImage?: string;
  gallery?: string[];
  colors?: { name: string; hex: string }[];
  sizes?: number[];
  description?: string;
  details?: string[];
  occasion?: string[];
  glbModelUrl?: string;
  usdzModelUrl?: string;
  hasAR?: boolean;
  modelScale?: string;
}

// const SHOE_GLB = "https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb";
const SHOE_GLB = "/models/chappal.glb";
const SHOE_USDZ = "https://modelviewer.dev/shared-assets/models/MaterialsVariantsShoe.usdz";

const baseSizes = [35, 36, 37, 38, 39, 40, 41];
const baseDetails = [
  "Hand-stitched in our Mumbai atelier",
  "Full-grain Italian leather upper",
  "Memory-foam comfort footbed",
  "Leather lining, anti-slip outsole",
  "Ships in signature gift box",
];

export const products: Product[] = [
  {
    id: "p-001", slug: "yasmine-block-heel", name: "Yasmine Block Heel", category: "Sandals", categorySlug: "sandals",
    price: 4990, compareAt: 6490, badge: "New", image: p1, hoverImage: s1,
    gallery: [p1, s1, p3, p4],
    colors: [{ name: "Nude", hex: "#E8C9A8" }, { name: "Black", hex: "#111" }, { name: "Tan", hex: "#9B7A5B" }],
    sizes: baseSizes, occasion: ["Office", "Wedding", "Party"],
    description: "A 65mm sculpted block heel in supple nappa leather. The Yasmine moves from morning meetings to candle-lit dinners with quiet ease.",
    details: baseDetails, hasAR: true, glbModelUrl: SHOE_GLB, usdzModelUrl: SHOE_USDZ,
  },
  {
    id: "p-002", slug: "alice-pointed-pump", name: "Alice Pointed Pump", category: "Heels", categorySlug: "heels",
    price: 5990, image: p2, hoverImage: s2, gallery: [p2, s2, p5],
    colors: [{ name: "Black", hex: "#111" }, { name: "Cocoa", hex: "#5C3A2E" }],
    sizes: baseSizes, occasion: ["Office", "Party"],
    description: "An 85mm stiletto with our signature elongated last. Tailored, sharp, unforgettable.",
    details: baseDetails, hasAR: true, glbModelUrl: SHOE_GLB, usdzModelUrl: SHOE_USDZ,
  },
  {
    id: "p-003", slug: "mira-kolhapuri", name: "Mira Kolhapuri", category: "Flats", categorySlug: "flats",
    price: 2790, badge: "Bestseller", image: p3, gallery: [p3, p4],
    colors: [{ name: "Tan", hex: "#9B7A5B" }, { name: "Black", hex: "#111" }],
    sizes: baseSizes, occasion: ["Daily Wear", "Travel", "Festive"],
    description: "Heritage Kolhapuri craft, reimagined. Vegetable-tanned leather, hand-braided by artisans in Maharashtra.",
    details: baseDetails, hasAR: true, glbModelUrl: SHOE_GLB, usdzModelUrl: SHOE_USDZ,
  },
  {
    id: "p-004", slug: "soft-ballet-flat", name: "Soft Ballet Flat", category: "Flats", categorySlug: "flats",
    price: 3490, image: p4, gallery: [p4, p3],
    colors: [{ name: "Cream", hex: "#F5EFE6" }, { name: "Black", hex: "#111" }],
    sizes: baseSizes, occasion: ["Daily Wear", "Travel", "Casual"],
    description: "The everyday ballet, perfected. Featherweight, foldable, endlessly elegant.",
    details: baseDetails, hasAR: true, glbModelUrl: SHOE_GLB, usdzModelUrl: SHOE_USDZ,
  },
  {
    id: "p-005", slug: "lior-gold-stiletto", name: "Lior Gold Stiletto", category: "Heels", categorySlug: "heels",
    price: 7490, compareAt: 8990, badge: "Limited", image: p5, gallery: [p5, p2],
    colors: [{ name: "Gold", hex: "#C7A97A" }, { name: "Black", hex: "#111" }],
    sizes: baseSizes, occasion: ["Wedding", "Party", "Festive"],
    description: "A 95mm metallic stiletto in liquid gold leather. Made for the moments you'll remember.",
    details: baseDetails, hasAR: true, glbModelUrl: SHOE_GLB, usdzModelUrl: SHOE_USDZ,
  },
  {
    id: "p-006", slug: "atelier-sneaker", name: "Atelier Sneaker", category: "Sneakers", categorySlug: "sneakers",
    price: 4290, image: p6, gallery: [p6, p4],
    colors: [{ name: "White", hex: "#FFF" }, { name: "Nude", hex: "#E8C9A8" }],
    sizes: baseSizes, occasion: ["Daily Wear", "Travel", "Casual"],
    description: "An Italian-leather low-top with cushioned arch support. Quiet luxury for everyday miles.",
    details: baseDetails, hasAR: true, glbModelUrl: SHOE_GLB, usdzModelUrl: SHOE_USDZ,
  },
];

export const bestSellers: Product[] = [products[2], products[0], products[5], products[3]];

export function findProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function filterProducts(opts: {
  category?: string;
  colors?: string[];
  minPrice?: number;
  maxPrice?: number;
  sizes?: number[];
  occasion?: string[];
  sort?: "featured" | "new" | "price-asc" | "price-desc";
}) {
  let list = products.slice();
  if (opts.category && !["new-arrivals", "best-sellers", "sale", "collections"].includes(opts.category)) {
    list = list.filter((p) => p.categorySlug === opts.category);
  }
  if (opts.category === "sale") list = list.filter((p) => p.compareAt);
  if (opts.category === "best-sellers") list = [products[2], products[0], products[5], products[3], products[1], products[4]];
  if (opts.colors?.length) list = list.filter((p) => p.colors?.some((c) => opts.colors!.includes(c.name)));
  if (opts.sizes?.length) list = list.filter((p) => p.sizes?.some((s) => opts.sizes!.includes(s)));
  if (opts.occasion?.length) list = list.filter((p) => p.occasion?.some((o) => opts.occasion!.includes(o)));
  if (typeof opts.minPrice === "number") list = list.filter((p) => p.price >= opts.minPrice!);
  if (typeof opts.maxPrice === "number") list = list.filter((p) => p.price <= opts.maxPrice!);
  if (opts.sort === "price-asc") list.sort((a, b) => a.price - b.price);
  if (opts.sort === "price-desc") list.sort((a, b) => b.price - a.price);
  return list;
}
