import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const size = product.sizes[sizeIdx];

  const add = () => {
    addItem({
      id: `${product.id}-${size.label}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      size: size.label,
      price: size.price,
      quantity: qty,
    });
    setQty(1);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group bg-card rounded-3xl overflow-hidden border shadow-soft hover:shadow-warm transition-shadow flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wide shadow-warm">
            {product.badge}
          </span>
        )}
        <span
          className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${
            product.category === "veg"
              ? "bg-leaf/15 text-leaf"
              : "bg-primary/15 text-primary"
          }`}
        >
          {product.category === "veg" ? "Veg" : "Non-Veg"}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display text-xl font-bold leading-tight">{product.name}</h3>
        {product.telugu && (
          <p className="text-sm text-muted-foreground mt-0.5">{product.telugu}</p>
        )}
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.sizes.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setSizeIdx(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                i === sizeIdx
                  ? "bg-primary text-primary-foreground border-primary shadow-soft"
                  : "bg-background border-border hover:border-primary/40"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-5 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold text-primary">₹{size.price}</span>
            <span className="text-xs text-muted-foreground">/ {size.label}</span>
          </div>
          <div className="inline-flex items-center bg-muted rounded-full">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="p-1.5 hover:text-primary"
              aria-label="Decrease"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="px-2 text-sm font-semibold w-6 text-center">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="p-1.5 hover:text-primary"
              aria-label="Increase"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <button
          onClick={add}
          className="mt-4 w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all shadow-soft hover:shadow-warm"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}