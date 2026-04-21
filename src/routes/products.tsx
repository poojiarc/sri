import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { products, type Category } from "@/data/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Our Pickles — Sri Ruchi Pachallu" },
      { name: "description", content: "Browse all veg & non-veg homemade pickles. Available in 250g, 500g and 1kg jars." },
      { property: "og:title", content: "Our Pickles — Sri Ruchi Pachallu" },
      { property: "og:description", content: "Veg & non-veg Andhra pickles in 250g, 500g, 1kg. Order via WhatsApp." },
    ],
  }),
  component: ProductsPage,
});

const filters: { label: string; value: "all" | Category }[] = [
  { label: "All", value: "all" },
  { label: "Veg", value: "veg" },
  { label: "Non-Veg", value: "non-veg" },
];

function ProductsPage() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    return products.filter((p) => {
      if (filter !== "all" && p.category !== filter) return false;
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [filter, query]);

  return (
    <div className="overflow-x-hidden">
      <section className="relative pt-12 pb-10 gradient-hero">
        <div className="absolute inset-0 pattern-dots opacity-30" />
        <div className="relative container mx-auto px-4 text-center">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Our Collection</span>
            <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold">
              All <span className="text-gradient-spice">Pickles</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Pick your favorite jar. Choose a size. Add to cart. Checkout via WhatsApp — it's that simple.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          {/* Filter bar */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 justify-between glass rounded-2xl p-3 shadow-soft mb-10">
              <div className="flex items-center gap-2">
                {filters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      filter === f.value
                        ? "bg-primary text-primary-foreground shadow-warm"
                        : "hover:bg-primary/10"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="relative flex-1 min-w-[220px] max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pickles…"
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-background border focus:border-primary focus:outline-none text-sm"
                />
              </div>
            </div>
          </Reveal>

          {list.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No pickles match your search.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {list.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 0.06}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}