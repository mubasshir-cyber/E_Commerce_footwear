import { Link } from "react-router-dom";
import { Header } from "../../components/site/Header";
import { Footer } from "../../components/site/Footer";
import { AnnouncementBar } from "../../components/site/AnnouncementBar";
import craft from "../../assets/craft-story.jpg";
import editorial1 from "../../assets/editorial-1.jpg";
import editorial2 from "../../assets/editorial-2.jpg";


export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        <section className="container-luxe py-24 md:py-40 text-center">
          <p className="eyebrow">Maison Lior · Est. 2024</p>
          <h1 className="mt-6 text-5xl md:text-7xl xl:text-8xl leading-[1.02] max-w-4xl mx-auto">
            We make<br/><em className="font-normal">quiet luxury</em><br/>for women who walk far.
          </h1>
          <p className="mt-10 max-w-xl mx-auto text-muted-foreground leading-relaxed">
            Maison Lior was founded on a single belief — that craftsmanship is the truest
            luxury. Every pair is shaped slowly, in India, by hands that have been doing this
            for a lifetime.
          </p>
        </section>

        <section className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <img src={craft} alt="Inside the Maison Lior atelier" className="absolute inset-0 h-full w-full object-cover" />
        </section>

        <section className="container-luxe py-24 md:py-32 grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">The Philosophy</p>
            <h2 className="mt-4 text-4xl md:text-5xl">A slower way to make shoes.</h2>
          </div>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              In a world that moves quickly, we have chosen to move slowly. Each pair of
              Maison Lior shoes takes twenty-three days to make. We work with full-grain
              leathers sourced from family-run tanneries, and we will not cut a corner — not
              one — to make this faster.
            </p>
            <p>
              Our atelier sits in a quiet pocket of Mumbai. There are forty-six artisans
              there. They are paid above market, they are looked after, and their names live
              on the inside of every shoe we ship.
            </p>
            <p>
              We design for the woman who walks. To meetings, to weddings, to the corner
              shop, around the world. We design for the way she actually lives — and we
              design pairs that will be there for years, not seasons.
            </p>
          </div>
        </section>

        <section className="bg-surface py-24 md:py-32">
          <div className="container-luxe grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <img src={editorial2} alt="" className="aspect-[4/5] w-full object-cover" />
            <div>
              <p className="eyebrow">Our Promise</p>
              <h2 className="mt-4 text-4xl md:text-5xl">Three things we will never do.</h2>
              <ul className="mt-10 space-y-8">
                {[
                  ["Cut on craft", "Every pair is hand-stitched. Glue alone is never enough."],
                  ["Source carelessly", "We know every tannery, every farm, every artisan."],
                  ["Chase trends", "We design for ten years, not ten weeks."],
                ].map(([t, d]) => (
                  <li key={t} className="border-t border-border pt-6">
                    <h3 className="font-serif text-2xl">{t}</h3>
                    <p className="mt-2 text-muted-foreground">{d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="container-luxe py-24 md:py-32 text-center">
          <p className="eyebrow">Begin</p>
          <h2 className="mt-4 text-4xl md:text-6xl">Find your first pair.</h2>
          <div className="mt-10">
            <Link to="/shop/new-arrivals" className="btn-luxe">Discover Collection</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
