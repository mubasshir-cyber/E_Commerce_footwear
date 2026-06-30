const items = [
  "Complimentary shipping on orders over ₹2,499",
  "Easy 15-day returns",
  "Cash on delivery available",
  "Premium gift packaging",
  "Crafted in India",
];

export function AnnouncementBar() {
  return (
    <div className="border-b border-border bg-foreground text-background overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2.5">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i} className="mx-10 text-[11px] tracking-[0.22em] uppercase font-medium opacity-90">
            {t} <span className="ml-10 opacity-40">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
