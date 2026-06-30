import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../components/site/Header";
import { AnnouncementBar } from "../../components/site/AnnouncementBar";
import { useCart } from "../../lib/cart";
import { useState } from "react";
import { Lock, CheckCircle2, CreditCard } from "lucide-react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const nav = useNavigate();
  const [step, setStep] = useState<"info" | "payment" | "done">("info");
  const [method, setMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const shipping = subtotal >= 2499 ? 0 : 99;
  const total = subtotal + shipping;

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1400));
    setProcessing(false);
    setStep("done");
    toast.success("Order placed — confirmation sent to your email.");
    setTimeout(() => clear(), 1500);
  };

  if (lines.length === 0 && step !== "done") {
    return (
      <div className="min-h-screen grid place-items-center px-6 text-center">
        <div>
          <p className="eyebrow">Empty bag</p>
          <h1 className="mt-4 text-4xl">Nothing to checkout</h1>
          <Link to="/shop/new-arrivals" className="btn-luxe mt-8 inline-flex">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-luxe py-24 md:py-32 text-center max-w-xl mx-auto">
          <CheckCircle2
            className="h-14 w-14 mx-auto text-accent-hover"
            strokeWidth={1.2}
          />
          <p className="eyebrow mt-8">Order Confirmed</p>
          <h1 className="mt-4 text-4xl md:text-5xl">Thank you.</h1>
          <p className="mt-4 text-muted-foreground">
            Your pair is being prepared with care. A confirmation has been sent
            to your email — expect delivery in 3–5 business days.
          </p>
          <p className="mt-6 font-serif text-2xl">
            Order #ML-{Math.floor(Math.random() * 90000 + 10000)}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button onClick={() => nav("/")} className="btn-luxe">
              Back to Home
            </button>
            <Link to="/shop/new-arrivals" className="btn-ghost-luxe">
              Continue Shopping
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        <section className="container-luxe py-10 md:py-16">
          <div className="text-center mb-10">
            <p className="eyebrow">Secure Checkout</p>
            <h1 className="mt-4 text-4xl md:text-5xl">Checkout</h1>
            <div className="mt-6 flex items-center justify-center gap-3 text-xs tracking-[0.2em] uppercase text-muted-foreground">
              <span className={step === "info" ? "text-foreground" : ""}>
                ① Information
              </span>
              <span>·</span>
              <span className={step === "payment" ? "text-foreground" : ""}>
                ② Payment
              </span>
            </div>
          </div>

          <form
            onSubmit={placeOrder}
            className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16"
          >
            <div className="space-y-10">
              {/* Contact */}
              <fieldset>
                <legend className="font-serif text-xl mb-5">Contact</legend>
                <Field
                  label="Email"
                  type="email"
                  required
                  placeholder="you@example.com"
                />
              </fieldset>

              {/* Shipping */}
              <fieldset>
                <legend className="font-serif text-xl mb-5">
                  Shipping Address
                </legend>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="First name" required />
                  <Field label="Last name" required />
                  <Field label="Address" required className="sm:col-span-2" />
                  <Field
                    label="Apartment, suite (optional)"
                    className="sm:col-span-2"
                  />
                  <Field label="City" required />
                  <Field label="State" required />
                  <Field label="Postal code" required />
                  <Field label="Phone" type="tel" required />
                </div>
              </fieldset>

              {/* Payment */}
              <fieldset>
                <legend className="font-serif text-xl mb-5 flex items-center gap-2">
                  Payment <Lock className="h-4 w-4 text-muted-foreground" />
                </legend>
                <div className="space-y-3">
                  <PaymentOption
                    id="card"
                    checked={method === "card"}
                    onChange={setMethod}
                    label="Credit / Debit Card"
                    icon={<CreditCard className="h-4 w-4" />}
                  />
                  <PaymentOption
                    id="upi"
                    checked={method === "upi"}
                    onChange={setMethod}
                    label="UPI · GPay, PhonePe, Paytm"
                  />
                  <PaymentOption
                    id="cod"
                    checked={method === "cod"}
                    onChange={setMethod}
                    label="Cash on Delivery"
                  />
                </div>
                {method === "card" && (
                  <div className="mt-5 grid sm:grid-cols-2 gap-4">
                    <Field
                      label="Card number"
                      placeholder="1234 5678 9012 3456"
                      required
                      className="sm:col-span-2"
                    />
                    <Field
                      label="Expiry (MM/YY)"
                      placeholder="06/29"
                      required
                    />
                    <Field label="CVV" placeholder="123" required />
                  </div>
                )}
                {method === "upi" && (
                  <div className="mt-5">
                    <Field label="UPI ID" placeholder="yourname@upi" required />
                  </div>
                )}
              </fieldset>

              <button
                type="submit"
                disabled={processing}
                className="btn-luxe w-full !py-5"
              >
                {processing
                  ? "Processing…"
                  : `Place Order · ₹${total.toLocaleString("en-IN")}`}
              </button>
              <p className="text-[11px] text-center text-muted-foreground">
                By placing your order you agree to our Terms & Privacy Policy.
              </p>
            </div>

            <aside className="bg-surface p-6 md:p-8 h-fit lg:sticky lg:top-28">
              <h2 className="font-serif text-xl">Order Summary</h2>
              <ul className="mt-5 space-y-4 max-h-80 overflow-y-auto pr-2">
                {lines.map((l) => (
                  <li key={l.id} className="flex gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={l.image}
                        alt={l.name}
                        className="h-16 w-14 object-cover bg-background"
                      />
                      <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-foreground text-background text-[10px] grid place-items-center">
                        {l.qty}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 text-sm">
                      <p className="truncate">{l.name}</p>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-[0.15em] mt-0.5">
                        {l.color}
                        {l.size ? ` · ${l.size}` : ""}
                      </p>
                    </div>
                    <span className="text-sm tabular-nums">
                      ₹{(l.price * l.qty).toLocaleString("en-IN")}
                    </span>
                  </li>
                ))}
              </ul>
              <dl className="mt-6 pt-6 border-t border-border space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="tabular-nums">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="tabular-nums">
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </dd>
                </div>
                <div className="flex justify-between pt-3 border-t border-border text-base font-medium">
                  <dt>Total</dt>
                  <dd className="tabular-nums">
                    ₹{total.toLocaleString("en-IN")}
                  </dd>
                </div>
              </dl>
            </aside>
          </form>
        </section>
      </main>
    </div>
  );
}

function Field({
  label,
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="block text-[11px] tracking-[0.18em] uppercase text-muted-foreground mb-2">
        {label}
      </span>
      <input
        {...rest}
        className="w-full h-12 px-4 bg-background border border-border focus:border-foreground outline-none transition-colors text-sm"
      />
    </label>
  );
}

function PaymentOption({
  id,
  checked,
  onChange,
  label,
  icon,
}: {
  id: string;
  checked: boolean;
  onChange: (v: string) => void;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <label
      className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${checked ? "border-foreground bg-background" : "border-border hover:border-foreground/50"}`}
    >
      <input
        type="radio"
        name="pay"
        value={id}
        checked={checked}
        onChange={() => onChange(id)}
        className="accent-foreground"
      />
      <span className="flex items-center gap-2 text-sm">
        {icon}
        {label}
      </span>
    </label>
  );
}
