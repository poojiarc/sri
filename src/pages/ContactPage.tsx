import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Send, MessageCircle, Instagram, Facebook, Linkedin, Clock } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact — Sri Ruchi Pachallu";
  }, []);

  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello! I'm ${form.name} (${form.phone}).%0A%0A${form.message}`;
    window.open(`https://wa.me/919133912973?text=${encodeURIComponent(text).replace(/%2520/g, "%20")}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <div className="overflow-x-hidden">
      <section className="relative gradient-hero py-16 md:py-20">
        <div className="absolute inset-0 pattern-dots opacity-30" />
        <div className="relative container mx-auto px-4 text-center max-w-3xl">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Get in touch</span>
            <h1 className="mt-3 font-display text-5xl md:text-7xl font-bold">
              Let's <span className="text-gradient-spice">talk</span> pickles
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Questions, custom orders or just hungry for a recommendation? We're a message away.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <Reveal className="lg:col-span-2 space-y-4">
            {[
              { icon: Phone, title: "Call us", lines: ["9701078022", "9133912973"], href: "tel:9133912973" },
              { icon: Mail, title: "Email us", lines: ["ammamaruchulu8@gmail.com"], href: "mailto:ammamaruchulu8@gmail.com" },
              { icon: MapPin, title: "Visit us", lines: ["Hyderabad, Tilak Nagar,", "Bhag Amberpet — 500013"] },
              { icon: Clock, title: "Hours", lines: ["Monday — Sunday", "Open 24 / 7"] },
            ].map((c) => (
              <a
                key={c.title}
                href={c.href ?? "#"}
                className="block p-5 rounded-3xl bg-card border shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl gradient-spice text-primary-foreground flex items-center justify-center shrink-0 shadow-warm">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold">{c.title}</h3>
                    {c.lines.map((l) => (
                      <p key={l} className="text-sm text-muted-foreground">{l}</p>
                    ))}
                  </div>
                </div>
              </a>
            ))}

            <div className="p-5 rounded-3xl bg-card border shadow-soft">
              <h3 className="font-display text-lg font-bold">Follow us</h3>
              <div className="mt-3 flex items-center gap-3">
                <a href="https://wa.me/919133912973" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="h-11 w-11 rounded-full bg-leaf text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform">
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a href="https://instagram.com/sriruchipachallu" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-11 w-11 rounded-full gradient-spice text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" aria-label="Facebook" className="h-11 w-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" aria-label="LinkedIn" className="h-11 w-11 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:scale-110 transition-transform">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.15} className="lg:col-span-3">
            <form
              onSubmit={submit}
              className="bg-card rounded-3xl p-7 md:p-9 shadow-warm border"
            >
              <h2 className="font-display text-3xl font-bold">Send us a message</h2>
              <p className="mt-2 text-sm text-muted-foreground">Goes straight to our WhatsApp — we usually reply within minutes.</p>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-semibold">Your name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Lakshmi Devi"
                    className="mt-1 w-full px-4 py-3 rounded-xl bg-background border focus:border-primary focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold">Phone number</span>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="9XXXXXXXXX"
                    className="mt-1 w-full px-4 py-3 rounded-xl bg-background border focus:border-primary focus:outline-none"
                  />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="text-sm font-semibold">Your message</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="I'd like to order…"
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-background border focus:border-primary focus:outline-none resize-none"
                />
              </label>
              <button
                type="submit"
                className="mt-6 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:scale-105 active:scale-95 transition-transform shadow-warm"
              >
                <Send className="h-4 w-4" />
                {sent ? "Opening WhatsApp…" : "Send Message"}
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="rounded-3xl overflow-hidden shadow-warm border aspect-[16/8] bg-muted">
              <iframe
                title="Sri Ruchi Pachallu location"
                src="https://www.google.com/maps?q=Bhagya+Nagar+Colony+Amberpet+Hyderabad&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}