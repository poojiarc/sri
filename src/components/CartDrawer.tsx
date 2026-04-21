import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const WHATSAPP_NUMBER = "919133912973";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, total, clear } = useCart();

  const checkout = () => {
    if (items.length === 0) return;
    const lines = items.map(
      (i, idx) =>
        `${idx + 1}. ${i.name} (${i.size}) × ${i.quantity} = ₹${i.price * i.quantity}`,
    );
    const message =
      `🌶️ *New Order — Sri Ruchi Pachallu* 🌶️%0A%0A` +
      lines.join("%0A") +
      `%0A%0A*Total: ₹${total}*%0A%0APlease confirm availability and delivery details.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-[60]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] z-[70] bg-background shadow-warm flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b">
              <div>
                <h3 className="font-display text-2xl font-bold text-primary">Your Cart</h3>
                <p className="text-xs text-muted-foreground">
                  {items.length === 0 ? "Empty for now" : `${items.length} item${items.length > 1 ? "s" : ""}`}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-20">
                  <div className="h-20 w-20 rounded-full bg-secondary/40 flex items-center justify-center">
                    <ShoppingBag className="h-10 w-10 text-primary" />
                  </div>
                  <p className="font-display text-xl">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Pick a jar of homemade goodness from our pickles collection.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-3 bg-card rounded-2xl p-3 shadow-soft border"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-sm leading-tight truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.size}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove"
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center bg-muted rounded-full">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:text-primary"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-2 text-sm font-semibold w-7 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:text-primary"
                            aria-label="Increase"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="font-bold text-primary">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t p-5 space-y-3 bg-card/40">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="font-display text-2xl font-bold text-primary">₹{total}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Orders are confirmed via WhatsApp. Delivery & payment details on chat.
                </p>
                <button
                  onClick={checkout}
                  className="w-full py-3.5 rounded-full bg-[#25D366] text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-transform shadow-warm"
                >
                  <MessageCircle className="h-5 w-5" />
                  Checkout via WhatsApp
                </button>
                <button
                  onClick={clear}
                  className="w-full py-2 text-xs text-muted-foreground hover:text-destructive transition-colors"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}