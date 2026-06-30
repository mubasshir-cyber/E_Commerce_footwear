import { Link } from "react-router-dom";
import { Header } from "../../components/site/Header";
import { Footer } from "../../components/site/Footer";
import { AnnouncementBar } from "../../components/site/AnnouncementBar";
import { ProductCard } from "../../components/site/ProductCard";
import { products, bestSellers } from "../../data/products";
import hero from "../../assets/hero-main.jpg";
import craft from "../../assets/craft-story.jpg";
import editorial1 from "../../assets/editorial-1.jpg";
import editorial2 from "../../assets/editorial-2.jpg";
import catSandals from "../../assets/cat-sandals.jpg";
import catHeels from "../../assets/cat-heels.jpg";
import catFlats from "../../assets/cat-flats.jpg";
import catSneakers from "../../assets/cat-sneakers.jpg";
import catWedges from "../../assets/cat-wedges.jpg";
import catBoots from "../../assets/cat-boots.jpg";
import { Truck, RotateCcw, Lock, Award, Sparkles, Wind, Feather, Hand } from "lucide-react";


const categories = [
  { name: "Sandals", img: catSandals, to: "/shop/sandals" },
  { name: "Heels", img: catHeels, to: "/shop/heels" },
  { name: "Flats", img: catFlats, to: "/shop/flats" },
  { name: "Sneakers", img: catSneakers, to: "/shop/sneakers" },
  { name: "Wedges", img: catWedges, to: "/shop/wedges" },
  { name: "Boots", img: catBoots, to: "/shop/boots" },
];

const occasions = ["Office", "Wedding", "Travel", "Vacation", "Party", "Festive", "Daily Wear", "Casual"];
const colorChips = [
  { name: "Black", hex: "#111" },
  { name: "Nude", hex: "#E8C9A8" },
  { name: "Tan", hex: "#9B7A5B" },
  { name: "White", hex: "#F5EFE6" },
  { name: "Gold", hex: "#C7A97A" },
  { name: "Silver", hex: "#C0C0C0" },
  { name: "Pink", hex: "#E8B8B8" },
  { name: "Green", hex: "#7A8B6E" },
];

const tech = [
  { icon: Sparkles, label: "Memory Foam" },
  { icon: Feather, label: "Lightweight Sole" },
  { icon: Hand, label: "Hand-Stitched" },
  { icon: Wind, label: "Breathable Lining" },
];

const reviews = [
  { name: "Anika K.", city: "Mumbai", text: "The most comfortable heels I've ever owned. They feel made for me — and they look extraordinary.", rating: 5 },
  { name: "Sara M.", city: "Delhi", text: "From the packaging to the leather, every detail whispers luxury. I haven't taken them off in weeks.", rating: 5 },
  { name: "Diya R.", city: "Bengaluru", text: "Replaced my international designer pair with Maison Lior. Better fit, better craft, half the price.", rating: 5 },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        {/* HERO */}
        <section className="relative">
          <div className="grid lg:grid-cols-[1.1fr_1fr] lg:min-h-[88vh]">
            <div className="relative overflow-hidden bg-surface order-2 lg:order-1 aspect-[4/5] lg:aspect-auto">
              <img src={hero} alt="Maison Lior summer edit — woman in cream silk dress with tan strappy heels" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="flex items-center px-5 md:px-16 py-14 md:py-20 lg:py-0 order-1 lg:order-2 bg-background">
              <div className="max-w-lg animate-fade-up">
                <p className="eyebrow">Summer Edit · 2026</p>
                <h1 className="mt-4 md:mt-6 font-serif text-[2.5rem] sm:text-5xl md:text-6xl xl:text-7xl leading-[1.05] tracking-[-0.02em]">
                  Walk<br/>
                  <em className="font-normal">beautiful.</em><br/>
                  Crafted for every<br/>
                  journey.
                </h1>
                <p className="mt-5 md:mt-8 text-sm md:text-base text-muted-foreground max-w-md leading-relaxed">
                  A new chapter in luxury Indian footwear. Soft Italian leathers, hand-finished
                  in our Mumbai atelier — designed to move with you, beautifully.
                </p>
                <div className="mt-7 md:mt-10 flex flex-wrap gap-3">
                  <Link to="/shop/new-arrivals" className="btn-luxe">Discover Collection</Link>
                  <Link to="/about" className="btn-ghost-luxe">Our Story</Link>
                </div>
                <div className="mt-8 md:mt-12 flex items-center gap-6 md:gap-8 text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                  <span>★ 4.9 · 24,000+ reviews</span>
                  <span className="hidden md:inline">Made in India</span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* SHOP BY CATEGORY */}
        <section className="container-luxe py-16 md:py-28">
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <p className="eyebrow">The Edit</p>
              <h2 className="mt-4 text-4xl md:text-5xl">Shop by silhouette</h2>
            </div>
            <Link to="/shop/new-arrivals" className="link-underline hidden md:inline-flex">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-5">
            {categories.map((c, i) => (
              <Link key={c.name} to={c.to} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-surface relative">
                  <img src={c.img} alt={c.name} loading={i < 3 ? "eager" : "lazy"} className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" />
                </div>
                <p className="mt-4 text-center text-sm tracking-[0.1em]">{c.name}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* EDITORIAL SPLIT */}
        <section className="bg-surface py-16 md:py-28">
          <div className="container-luxe grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={editorial1} alt="Editorial — golden hour, tan block heel" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div>
              <p className="eyebrow">Maison Story</p>
              <h2 className="mt-6 text-4xl md:text-5xl xl:text-6xl leading-[1.05]">
                Made to move<br/><em className="font-normal">beautifully.</em>
              </h2>
              <p className="mt-8 text-muted-foreground leading-relaxed max-w-md">
                Each pair is shaped over twenty-three days by master cordwainers in our
                Mumbai atelier. Soft full-grain leathers, hand-stitched constructions, and a
                memory-foam footbed engineered for the way she actually walks — long, freely,
                without compromise.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                <Stat n="23" label="Days per pair" />
                <Stat n="46" label="Craftsmen" />
                <Stat n="100%" label="Made in India" />
              </div>
              <div className="mt-10">
                <Link to="/about" className="link-underline">Read the story →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* NEW ARRIVALS */}
        <section className="container-luxe py-16 md:py-28">
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <p className="eyebrow">Just In</p>
              <h2 className="mt-4 text-4xl md:text-5xl">New arrivals</h2>
            </div>
            <Link to="/shop/new-arrivals" className="link-underline hidden md:inline-flex">Shop All</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.slice(0, 4).map((p) => <ProductCard key={p.name} p={p} />)}
          </div>
        </section>

        {/* CRAFT FILM */}
        <section className="relative">
          <div className="relative aspect-[16/10] md:aspect-[21/9] overflow-hidden">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay muted loop playsInline poster={craft}
            >
              <source src="https://cdn.coverr.co/videos/coverr-walking-in-high-heels-3331/1080p.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
            <div className="absolute inset-0 flex items-center">
              <div className="container-luxe text-background">
                <p className="text-[11px] tracking-[0.3em] uppercase opacity-80">Inside the Atelier</p>
                <h2 className="mt-4 text-4xl md:text-6xl xl:text-7xl max-w-2xl leading-[1.05] text-background">
                  The hand behind<br/>every step.
                </h2>
                <Link to="/about" className="mt-10 inline-flex btn-ghost-luxe border-white text-white hover:!bg-white hover:!text-foreground">
                  Watch the Film
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BEST SELLERS */}
        <section className="container-luxe py-16 md:py-28">
          <div className="text-center mb-16">
            <p className="eyebrow">Loved by 24,000+</p>
            <h2 className="mt-4 text-4xl md:text-5xl">Best sellers</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {bestSellers.map((p) => <ProductCard key={p.name} p={p} />)}
          </div>
          <div className="text-center mt-12">
            <Link to="/shop/best-sellers" className="btn-ghost-luxe">Explore Best Sellers</Link>
          </div>
        </section>

        {/* SHOP BY OCCASION */}
        <section className="bg-surface py-16 md:py-28">
          <div className="container-luxe">
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
              <div>
                <p className="eyebrow">Find Your Pair</p>
                <h2 className="mt-4 text-4xl md:text-5xl xl:text-6xl">
                  Dressed for<br/><em className="font-normal">every moment.</em>
                </h2>
                <p className="mt-6 text-muted-foreground max-w-md">
                  From the boardroom to the beach, from quiet weekends to luminous weddings —
                  one wardrobe, infinite occasions.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {occasions.map((o) => (
                  <Link
                    key={o}
                    to="/shop/collections"
                    className="aspect-square bg-background border border-border flex items-center justify-center text-center hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-500 group"
                  >
                    <span className="font-serif text-xl group-hover:scale-105 transition-transform">{o}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SHOP BY COLOR */}
        <section className="container-luxe py-16 md:py-28">
          <div className="text-center mb-16">
            <p className="eyebrow">Curate Your Palette</p>
            <h2 className="mt-4 text-4xl md:text-5xl">Shop by color</h2>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {colorChips.map((c) => (
              <Link key={c.name} to="/shop/new-arrivals" className="group text-center">
                <div className="aspect-square rounded-full border border-border overflow-hidden mx-auto max-w-[88px] group-hover:scale-105 transition-transform duration-500" style={{ background: c.hex }} />
                <p className="mt-3 text-[11px] tracking-[0.18em] uppercase">{c.name}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* COMFORT TECH */}
        <section className="bg-foreground text-background py-16 md:py-28">
          <div className="container-luxe">
            <div className="text-center mb-16">
              <p className="text-[11px] tracking-[0.3em] uppercase text-white/60">Engineered Comfort</p>
              <h2 className="mt-4 text-4xl md:text-5xl text-background">Beauty you can wear all day.</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
              {tech.map(({ icon: Icon, label }) => (
                <div key={label} className="text-center">
                  <div className="mx-auto h-16 w-16 rounded-full border border-white/20 grid place-items-center">
                    <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                  </div>
                  <p className="mt-5 text-sm tracking-[0.1em]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDITORIAL 2 */}
        <section className="container-luxe py-16 md:py-28">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
            <div>
              <p className="eyebrow">The Evening Edit</p>
              <h2 className="mt-4 text-4xl md:text-5xl xl:text-6xl leading-[1.05]">
                A heel that<br/>holds the room.
              </h2>
              <p className="mt-8 text-muted-foreground max-w-md">
                Twelve silhouettes designed for the moments that matter. Soft on the foot,
                striking on the floor.
              </p>
              <Link to="/shop/heels" className="mt-10 inline-flex btn-luxe">Shop Heels</Link>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden bg-surface order-first lg:order-last">
              <img src={editorial2} alt="Black stiletto on marble floor" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="bg-surface py-16 md:py-28">
          <div className="container-luxe">
            <div className="text-center mb-16">
              <p className="eyebrow">Voices · 4.9 ★</p>
              <h2 className="mt-4 text-4xl md:text-5xl">Worn by women we admire.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {reviews.map((r) => (
                <figure key={r.name} className="bg-background p-8 md:p-10">
                  <div className="text-rating mb-4 tracking-[0.3em]">★★★★★</div>
                  <blockquote className="font-serif text-xl leading-relaxed">"{r.text}"</blockquote>
                  <figcaption className="mt-8 text-sm">
                    <p className="font-medium">{r.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 tracking-[0.1em] uppercase">Verified · {r.city}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="container-luxe py-16 md:py-28">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center">
            {[
              { Icon: Truck, t: "Complimentary Shipping", d: "On orders ₹2,499+" },
              { Icon: RotateCcw, t: "Easy 15-Day Returns", d: "Quietly, no questions" },
              { Icon: Lock, t: "Secure Checkout", d: "256-bit encryption" },
              { Icon: Award, t: "Quality Promise", d: "100% hand inspected" },
            ].map(({ Icon, t, d }) => (
              <div key={t}>
                <Icon className="mx-auto h-7 w-7 text-accent-hover" strokeWidth={1.5} />
                <h3 className="mt-5 text-sm font-medium tracking-[0.1em] uppercase">{t}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRESS */}
        <section className="border-y border-border py-12">
          <div className="container-luxe">
            <p className="text-center text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-8">As Featured In</p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-20">
              {["VOGUE", "ELLE", "HARPER'S BAZAAR", "LIFESTYLE ASIA", "GRAZIA"].map((p) => (
                <span key={p} className="font-serif text-xl md:text-2xl tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors">{p}</span>
              ))}
            </div>
          </div>
        </section>

        {/* INSTAGRAM */}
        <section className="container-luxe py-16 md:py-28">
          <div className="text-center mb-12">
            <p className="eyebrow">@maisonlior</p>
            <h2 className="mt-4 text-4xl md:text-5xl">Styled by you.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
            {[editorial1, catSandals, hero, catHeels, editorial2, catWedges].map((src, i) => (
              <a key={i} href="#" className="block aspect-square overflow-hidden bg-surface group">
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <p className="font-serif text-3xl md:text-4xl">{n}</p>
      <p className="mt-1 text-[11px] tracking-[0.18em] uppercase text-muted-foreground">{label}</p>
    </div>
  );
}
