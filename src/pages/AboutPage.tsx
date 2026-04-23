import { useEffect } from "react";
import { Heart, Leaf, ShieldCheck, Sparkles, Flame, Users } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import aboutImg from "@/assets/about-process.jpg";
import spices from "@/assets/spices-banner.jpg";
import hero1 from "@/assets/hero-pickle-1.jpg";
import hero3 from "@/assets/hero-pickle-3.jpg";

export default function AboutPage() {
  useEffect(() => {
    document.title = "About — Sri Ruchi Pachallu";
  }, []);

  return (
    <div className="overflow-x-hidden">
      <section className="relative gradient-hero py-16 md:py-24">
        <div className="absolute inset-0 pattern-dots opacity-30" />
        <div className="relative container mx-auto px-4 text-center max-w-3xl">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Our Story</span>
            <h1 className="mt-3 font-display text-5xl md:text-7xl font-bold leading-tight">
              A tradition of <span className="text-gradient-spice">taste</span>,
              you can trust.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Sri Ruchi Pachallu — homemade pickles crafted the way grandmothers
              have been making them for generations. No shortcuts, no preservatives,
              just love sealed in every jar.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-3 bg-secondary/40 rounded-3xl -rotate-2" />
              <img src={aboutImg} alt="Hands preparing pickle" loading="lazy" className="relative w-full rounded-3xl shadow-warm" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="font-display text-4xl font-bold">
              Born in a <em className="text-gradient-spice not-italic">home kitchen</em>.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Sri Ruchi Pachallu is a homemade pickle brand dedicated to bringing
              authentic Andhra flavors to your plate. We prepare every pickle
              with fresh ingredients, traditional recipes, and a touch of
              homemade love.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our goal is to deliver quality, taste, and trust in every jar.
              From spicy non-veg pickles to delicious veg varieties, we ensure
              hygiene, freshness, and rich flavor in every batch.
            </p>
            <p className="mt-4 text-foreground font-semibold">
              At Sri Ruchi Pachallu, it's not just food… it's a tradition of
              taste you can trust.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">The Process</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
              From spice to <span className="text-gradient-spice">jar</span>.
            </h2>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Hand-picked ingredients", desc: "Fresh seasonal vegetables, premium meats and farm-fresh spices sourced locally." },
              { step: "02", title: "Traditional recipes", desc: "Family recipes passed down generations — exact ratios of mustard, fenugreek, chili and oil." },
              { step: "03", title: "Small batch, big love", desc: "Each batch is hand-mixed and bottled fresh. No preservatives, no shortcuts, no compromises." },
            ].map((p, i) => (
              <Reveal key={p.step} delay={i * 0.1}>
                <div className="h-full bg-card rounded-3xl p-7 border shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all">
                  <span className="font-display text-5xl font-black text-gradient-spice">{p.step}</span>
                  <h3 className="mt-3 font-display text-2xl font-bold">{p.title}</h3>
                  <p className="mt-3 text-muted-foreground">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">What we believe</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
              Pure <span className="text-gradient-spice">ingredients</span>,
              honest flavors.
            </h2>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { icon: Leaf, title: "Natural Always", desc: "Only farm-fresh produce and natural spices." },
                { icon: Flame, title: "Bold Andhra Taste", desc: "Authentic regional flavors in every spoon." },
                { icon: ShieldCheck, title: "Hygiene First", desc: "Spotless kitchens, sanitized utensils." },
                { icon: Heart, title: "Made with Love", desc: "Each jar packed with care, not machinery." },
                { icon: Sparkles, title: "Zero Preservatives", desc: "Only oil, salt and traditional spices." },
                { icon: Users, title: "Family Recipes", desc: "Cherished, time-tested grandmother recipes." },
              ].map((v) => (
                <div key={v.title} className="p-5 rounded-2xl bg-card border shadow-soft hover:shadow-warm transition-shadow">
                  <v.icon className="h-7 w-7 text-primary" />
                  <h3 className="mt-3 font-display text-lg font-bold">{v.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{v.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              <img src={hero1} alt="Mango pickle" loading="lazy" className="rounded-3xl shadow-warm aspect-[3/4] object-cover" />
              <img src={spices} alt="Spices" loading="lazy" className="rounded-3xl shadow-warm aspect-[3/4] object-cover mt-8" />
              <img src={hero3} alt="Gongura" loading="lazy" className="rounded-3xl shadow-warm aspect-[3/4] object-cover -mt-4" />
              <img src={aboutImg} alt="Process" loading="lazy" className="rounded-3xl shadow-warm aspect-[3/4] object-cover mt-4" />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}