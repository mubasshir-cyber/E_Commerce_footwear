import { Link } from "react-router-dom";
import { Header } from "../../components/site/Header";
import { Footer } from "../../components/site/Footer";
import { AnnouncementBar } from "../../components/site/AnnouncementBar";
import { useCart } from "../../lib/cart";
import { products } from "../../data/products";
import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Package,
  Heart,
  LogOut,
  MapPin,
  User as UserIcon,
} from "lucide-react";
import { toast } from "sonner";

interface Profile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  avatar: string;
}

const DEFAULT: Profile = {
  name: "Priya Sharma",
  email: "priya@example.com",
  phone: "+91 98xxxxxxx0",
  address: "12, Linking Road",
  city: "Mumbai",
  pincode: "400050",
  avatar: "",
};

const TABS = [
  { id: "profile", label: "Profile", icon: UserIcon },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
] as const;

export default function AccountPage() {
  const { wishlist, toggleWish } = useCart();
  const [profile, setProfile] = useState<Profile>(DEFAULT);
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("profile");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const p = localStorage.getItem("ml.profile.v1");
      if (p) setProfile({ ...DEFAULT, ...JSON.parse(p) });
    } catch {}
    if (typeof window !== "undefined" && window.location.hash) {
      const h = window.location.hash.replace("#", "");
      if (TABS.some((t) => t.id === h)) setTab(h as typeof tab);
    }
  }, []);

  const save = (next: Profile) => {
    setProfile(next);
    localStorage.setItem("ml.profile.v1", JSON.stringify(next));
  };

  const handleAvatar = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => save({ ...profile, avatar: reader.result as string });
    reader.readAsDataURL(file);
  };

  const wished = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main className="container-luxe py-10 md:py-16">
        <p className="eyebrow">My Account</p>
        <h1 className="mt-3 text-4xl md:text-5xl">
          Welcome back{profile.name ? `, ${profile.name.split(" ")[0]}` : ""}
        </h1>

        <div className="mt-10 grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-14">
          {/* Sidebar */}
          <aside>
            <div className="flex items-center gap-4 p-5 bg-surface">
              <div className="relative h-14 w-14 rounded-full bg-foreground/10 overflow-hidden grid place-items-center shrink-0">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserIcon className="h-6 w-6 text-foreground/40" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">
                  {profile.name || "Guest"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {profile.email}
                </p>
              </div>
            </div>
            <nav className="mt-4 flex lg:flex-col gap-1 overflow-x-auto">
              {TABS.map((t) => {
                const Icon = t.icon;
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm tracking-wide shrink-0 transition-colors ${active ? "bg-foreground text-background" : "hover:bg-surface"}`}
                  >
                    <Icon className="h-4 w-4" /> {t.label}
                    {t.id === "wishlist" && wished.length > 0 && (
                      <span className="ml-auto text-[10px] bg-background/20 px-1.5 rounded-full tabular-nums">
                        {wished.length}
                      </span>
                    )}
                  </button>
                );
              })}
              <button
                onClick={() => toast.success("Signed out")}
                className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground mt-2 shrink-0"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </nav>
          </aside>

          {/* Content */}
          <section>
            {tab === "profile" && (
              <div>
                <h2 className="font-serif text-2xl">Personal details</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Saved locally to your device.
                </p>

                <div className="mt-8 flex items-center gap-5">
                  <div className="relative h-24 w-24 rounded-full bg-surface overflow-hidden grid place-items-center">
                    {profile.avatar ? (
                      <img
                        src={profile.avatar}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserIcon className="h-10 w-10 text-foreground/30" />
                    )}
                  </div>
                  <div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleAvatar(f);
                      }}
                    />
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="btn-ghost-luxe inline-flex"
                    >
                      <Camera className="h-4 w-4" /> Change photo
                    </button>
                    {profile.avatar && (
                      <button
                        onClick={() => save({ ...profile, avatar: "" })}
                        className="ml-2 text-xs text-muted-foreground underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast.success("Profile saved");
                  }}
                  className="mt-10 grid sm:grid-cols-2 gap-5"
                >
                  <Field
                    label="Full name"
                    value={profile.name}
                    onChange={(v) => save({ ...profile, name: v })}
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={profile.email}
                    onChange={(v) => save({ ...profile, email: v })}
                  />
                  <Field
                    label="Phone"
                    value={profile.phone}
                    onChange={(v) => save({ ...profile, phone: v })}
                  />
                  <Field
                    label="Pincode"
                    value={profile.pincode}
                    onChange={(v) => save({ ...profile, pincode: v })}
                  />
                  <Field
                    label="Address"
                    value={profile.address}
                    onChange={(v) => save({ ...profile, address: v })}
                    className="sm:col-span-2"
                  />
                  <Field
                    label="City"
                    value={profile.city}
                    onChange={(v) => save({ ...profile, city: v })}
                  />
                  <div className="sm:col-span-2">
                    <button className="btn-luxe">Save changes</button>
                  </div>
                </form>
              </div>
            )}

            {tab === "orders" && (
              <div>
                <h2 className="font-serif text-2xl">Your orders</h2>
                <div className="mt-8 border border-dashed border-border p-10 text-center">
                  <Package className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    No orders yet. Your purchases will appear here.
                  </p>
                  <Link
                    to="/shop/new-arrivals"
                    className="btn-luxe mt-6 inline-flex"
                  >
                    Start shopping
                  </Link>
                </div>
              </div>
            )}

            {tab === "wishlist" && (
              <div id="wishlist">
                <h2 className="font-serif text-2xl">Saved styles</h2>
                {wished.length === 0 ? (
                  <div className="mt-8 border border-dashed border-border p-10 text-center">
                    <Heart className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      Your wishlist is empty.
                    </p>
                  </div>
                ) : (
                  <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {wished.map((p) => (
                      <div key={p.id} className="group">
                        <Link
                          to={`/product/${p.slug}`}
                          className="block aspect-[4/5] bg-surface overflow-hidden"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </Link>
                        <div className="mt-3 flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm truncate">{p.name}</p>
                            <p className="text-xs text-muted-foreground tabular-nums">
                              ₹{p.price.toLocaleString("en-IN")}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleWish(p.id)}
                            aria-label="Remove"
                            className="text-xs underline text-muted-foreground"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "addresses" && (
              <div>
                <h2 className="font-serif text-2xl">Saved addresses</h2>
                <div className="mt-8 border border-border p-6">
                  <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    Default
                  </p>
                  <p className="mt-3 font-medium">{profile.name}</p>
                  <p className="text-sm text-foreground/80">
                    {profile.address}, {profile.city} {profile.pincode}
                  </p>
                  <p className="text-sm text-foreground/80">{profile.phone}</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[11px] tracking-[0.18em] uppercase text-muted-foreground mb-2">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 px-4 border border-border bg-background focus:border-foreground outline-none text-sm transition-colors"
      />
    </label>
  );
}
