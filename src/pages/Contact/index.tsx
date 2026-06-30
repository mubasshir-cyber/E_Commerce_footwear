import { Header } from "../../components/site/Header";
import { Footer } from "../../components/site/Footer";
import { AnnouncementBar } from "../../components/site/AnnouncementBar";
import { Mail, MapPin, Phone } from "lucide-react";



export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main className="container-luxe py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="eyebrow">Client Care</p>
          <h1 className="mt-6 text-5xl md:text-7xl">How may we help?</h1>
          <p className="mt-8 text-muted-foreground max-w-xl">
            Our client care team is available Monday to Saturday, 10am to 7pm IST.
            We respond to all enquiries within 24 hours.
          </p>
        </div>

        <div className="mt-20 grid lg:grid-cols-[1fr_1.4fr] gap-16">
          <aside className="space-y-10">
            <Detail icon={Mail} label="Email" value="care@maisonlior.com" />
            <Detail icon={Phone} label="Phone" value="+91 22 4500 1900" />
            <Detail icon={MapPin} label="Atelier" value={"7 Kala Ghoda Lane\nMumbai 400001, India"} />
          </aside>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <Field label="First name" />
              <Field label="Last name" />
            </div>
            <Field label="Email" type="email" />
            <Field label="Subject" />
            <div>
              <label className="block text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-2">Message</label>
              <textarea rows={6} className="w-full border-b border-border bg-transparent py-2 focus:outline-none focus:border-foreground transition-colors" />
            </div>
            <button className="btn-luxe">Send Message</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Detail({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <Icon className="h-5 w-5 text-accent-hover mt-1" />
      <div>
        <p className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">{label}</p>
        <p className="mt-2 whitespace-pre-line">{value}</p>
      </div>
    </div>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="block text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-2">{label}</label>
      <input type={type} className="w-full border-b border-border bg-transparent py-2 focus:outline-none focus:border-foreground transition-colors" />
    </div>
  );
}
