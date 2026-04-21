import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Package, Gift, Clock, Leaf, Flame, ShieldCheck, MapPin, Heart, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Sri Ruchi Pachallu" },
      { name: "description", content: "Veg & non-veg pickles, fresh batches, fast delivery, bulk orders, and combo offers from Sri Ruchi Pachallu." },
      { property: "og:title", content: "Services — Sri Ruchi Pachallu" },
      { property: "og:description", content: "Homemade pickles, fast delivery, bulk orders and combo offers." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: Leaf, title: "Veg & Non-Veg Pickles", desc: "From mango avakaya to chicken & mutton pickles — a wide variety to suit every palate." },
  { icon: Sparkles, title: "Freshly Prepared Batches", desc: "Every jar is freshly prepared on demand. No long-stored stock — always fresh, always flavorful." },
  { icon: Flame, title: "Andhra & Telangana Taste", desc: "Bold, fiery, traditional regional recipes with authentic spice blends." },
  { icon: ShieldCheck, title: "No Preservatives", desc: "Only natural ingredients — oil, salt and spices. Pure homemade goodness, no chemicals." },
  { icon: Truck, title: "Fast & Safe Delivery", desc: "Carefully packed in leak-proof jars and shipped quickly across India." },
  { icon: MapPin, title: "Local Delivery Available", desc: "Same-day or next-day local delivery for nearby Hyderabad areas." },
  { icon: Package, title: "Bulk Orders Accepted", desc: "Special pricing on weddings, festivals and corporate gifting orders." },
  { icon: Gift, title: "Combo Offers", desc: "Special discounts when you order multiple varieties together." },
];

export default function ServicesPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="relative gradient-hero py-16 md:py-24">
        <div className="absolute inset-0 pattern-dots opacity-30" />
        <div className="relative container mx-auto px-4 text-center max-w-3xl">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">What we do</span>
            <h1 className="mt-3 font-display text-5xl md:text-7xl font-bold">
              Our <span className="text-gradient-spice">Services</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We don't just sell pickles — we deliver taste, trust, and tradition
              right to your home.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 4) * 0.06}>
                <div className="group h-full bg-card rounded-3xl p-6 border shadow-soft hover:shadow-warm hover:-translate-y-2 transition-all">
                  <div className="h-14 w-14 rounded-2xl gradient-spice flex items-center justify-center text-primary-foreground shadow-warm group-hover:rotate-6 group-hover:scale-110 transition-transform">
                    <s.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl gradient-spice text-primary-foreground p-10 md:p-16 text-center shadow-warm">
              <div className="absolute inset-0 pattern-dots opacity-20" />
              <Heart className="relative mx-auto h-10 w-10 mb-4 fill-current" />
              <h2 className="relative font-display text-3xl md:text-5xl font-bold">
                Hours: Open <span className="underline decoration-wavy decoration-secondary">24/7</span>, all week
              </h2>
              <p className="relative mt-4 text-primary-foreground/90 max-w-xl mx-auto">
                Order any time — we're always ready to deliver homemade goodness.
              </p>
              <div className="relative mt-7 flex flex-wrap justify-center gap-3">
                <Link to="/products" className="px-7 py-3 rounded-full bg-background text-primary font-semibold hover:scale-105 transition-transform shadow-soft">
                  Browse Pickles
                </Link>
                <Link to="/contact" className="px-7 py-3 rounded-full border-2 border-primary-foreground/40 hover:bg-primary-foreground/10 font-semibold transition-colors">
                  Talk to Us
                </Link>
              </div>
              <div className="relative mt-6 inline-flex items-center gap-2 text-sm text-primary-foreground/80">
                <Clock className="h-4 w-4" />
                Monday — Sunday • 24 / 7
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}