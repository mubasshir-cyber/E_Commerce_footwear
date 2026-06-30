import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-32">
      <div className="container-luxe py-20 md:py-28">
        {/* Newsletter */}
        <div className="grid lg:grid-cols-2 gap-12 pb-16 border-b border-white/10">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/50">The Maison Letter</p>
            <h2 className="mt-4 text-4xl md:text-5xl text-background">
              Quiet luxury,<br/>delivered weekly.
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-sm text-white/70 max-w-md mb-6">
              New collections, intimate behind-the-scenes, and stories from our atelier. No noise.
            </p>
            <form className="flex border-b border-white/30 pb-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/50"
              />
              <button className="text-[11px] tracking-[0.2em] uppercase font-medium hover:text-accent transition-colors">
                Subscribe →
              </button>
            </form>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-16">
          <FooterCol title="Shop" links={[
            { label: "New Arrivals", to: "/shop/new-arrivals" },
            { label: "Best Sellers", to: "/shop/best-sellers" },
            { label: "Sandals", to: "/shop/sandals" },
            { label: "Heels", to: "/shop/heels" },
            { label: "Flats", to: "/shop/flats" },
            { label: "Sale", to: "/shop/sale" },
          ]} />
          <FooterCol title="House" links={[
            { label: "Our Story", to: "/about" },
            { label: "Craftsmanship", to: "/about" },
            { label: "Journal", to: "/journal" },
            { label: "Press", to: "/about" },
          ]} />
          <FooterCol title="Care" links={[
            { label: "Contact", to: "/contact" },
            { label: "Shipping", to: "/shipping" },
            { label: "Returns", to: "/returns" },
            { label: "Size Guide", to: "/size-guide" },
            { label: "FAQs", to: "/faqs" },
          ]} />
          <FooterCol title="Legal" links={[
            { label: "Privacy Policy", to: "/privacy" },
            { label: "Terms of Service", to: "/terms" },
          ]} />
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="font-serif text-2xl tracking-[0.1em]">MAISON LIOR</p>
            <p className="text-xs text-white/50 mt-2">© {new Date().getFullYear()} Maison Lior. Crafted in India. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <a aria-label="Instagram" href="#" className="p-2 hover:text-accent transition-colors"><Instagram className="h-4 w-4" /></a>
            <a aria-label="Facebook" href="#" className="p-2 hover:text-accent transition-colors"><Facebook className="h-4 w-4" /></a>
            <a aria-label="Youtube" href="#" className="p-2 hover:text-accent transition-colors"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <p className="text-[11px] tracking-[0.3em] uppercase text-white/50 mb-5">{title}</p>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-white/80 hover:text-accent transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
