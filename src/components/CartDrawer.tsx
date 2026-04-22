import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, User, Phone, MapPin } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const WHATSAPP_NUMBER = "919133912973";

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+()\-\s]{10,16}$/, "Enter a valid phone number"),
  address: z.string().trim().min(10, "Enter your delivery address").max(240, "Address is too long"),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;
type CheckoutErrors = Partial<Record<keyof CheckoutValues, string>>;

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, total, clear } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<CheckoutErrors>({});

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const validateField = (field: keyof CheckoutValues, value: string) => {
    const result = checkoutSchema.shape[field].safeParse(value);
    setErrors((prev) => ({
      ...prev,
      [field]: result.success ? undefined : result.error.issues[0]?.message,
    }));
  };

  const checkout = () => {
    if (items.length === 0) return;
    const parsed = checkoutSchema.safeParse({ name, phone, address });

    if (!parsed.success) {
      const nextErrors: CheckoutErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof CheckoutValues;
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      toast.error("Please complete your delivery details.");
      return;
    }

    const values = parsed.data;
    const lines = items.map(
      (i, idx) =>
        `${idx + 1}. ${i.name} (${i.size}) × ${i.quantity} = ₹${i.price * i.quantity}`,
    );
    const raw =
      `🌶️ *New Order — Sri Ruchi Pachallu* 🌶️\n\n` +
      `*Customer Details*\n` +
      `👤 Name: ${values.name}\n` +
      `📞 Phone: ${values.phone}\n` +
      `📍 Address: ${values.address}\n\n` +
      `*Order*\n` +
      lines.join("\n") +
      `\n\n*Total: ₹${total}*\n\nPlease confirm availability and delivery.`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(raw)}`,
      "_blank",
    );
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
            className="fixed top-0 right-0 bottom-0 z-[70] flex w-full max-w-[100vw] flex-col bg-background shadow-warm sm:w-[520px] lg:w-[620px]"
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

            <div className="flex-1 overflow-y-auto p-5">
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
                <div className="space-y-5">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-3 rounded-2xl border bg-card p-3 shadow-soft"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="truncate text-sm font-semibold leading-tight">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.size}</p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              aria-label="Remove"
                              className="text-muted-foreground transition-colors hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="inline-flex items-center rounded-full bg-muted">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 hover:text-primary"
                                aria-label="Decrease"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-7 px-2 text-center text-sm font-semibold">
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
                    ))}
                  </div>

                  <div className="border-t bg-card/60 pt-5 backdrop-blur-sm">
                    <div className="rounded-2xl border bg-background/85 p-4 shadow-soft space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-lg font-bold text-foreground">Delivery details</p>
                          <p className="text-xs text-muted-foreground">These details will be included in your WhatsApp order.</p>
                        </div>
                        <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                          {itemCount} item{itemCount > 1 ? "s" : ""}
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="space-y-1.5">
                          <span className="text-xs font-medium text-muted-foreground">Full name</span>
                          <div className="relative">
                            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              type="text"
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                                if (errors.name) validateField("name", e.target.value);
                              }}
                              onBlur={(e) => validateField("name", e.target.value)}
                              placeholder="Your full name"
                              maxLength={80}
                              className="h-11 rounded-xl border-input bg-background pl-9"
                              aria-invalid={Boolean(errors.name)}
                            />
                          </div>
                          {errors.name && <p className="text-[11px] text-destructive">{errors.name}</p>}
                        </label>

                        <label className="space-y-1.5">
                          <span className="text-xs font-medium text-muted-foreground">Phone number</span>
                          <div className="relative">
                            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              type="tel"
                              inputMode="tel"
                              value={phone}
                              onChange={(e) => {
                                const next = e.target.value.replace(/[^0-9+()\-\s]/g, "");
                                setPhone(next);
                                if (errors.phone) validateField("phone", next);
                              }}
                              onBlur={(e) => validateField("phone", e.target.value)}
                              placeholder="Phone number"
                              maxLength={16}
                              className="h-11 rounded-xl border-input bg-background pl-9"
                              aria-invalid={Boolean(errors.phone)}
                            />
                          </div>
                          {errors.phone && <p className="text-[11px] text-destructive">{errors.phone}</p>}
                        </label>
                      </div>

                      <label className="block space-y-1.5">
                        <span className="text-xs font-medium text-muted-foreground">Delivery address</span>
                        <div className="relative">
                          <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Textarea
                            value={address}
                            onChange={(e) => {
                              setAddress(e.target.value);
                              if (errors.address) validateField("address", e.target.value);
                            }}
                            onBlur={(e) => validateField("address", e.target.value)}
                            placeholder="House / street / area / landmark"
                            rows={3}
                            maxLength={240}
                            className="min-h-[88px] resize-none rounded-xl border-input bg-background pl-9"
                            aria-invalid={Boolean(errors.address)}
                          />
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          {errors.address ? (
                            <p className="text-[11px] text-destructive">{errors.address}</p>
                          ) : (
                            <p className="text-[11px] text-muted-foreground">Add a complete address for faster confirmation.</p>
                          )}
                          <p className="text-[11px] text-muted-foreground">{address.length}/240</p>
                        </div>
                      </label>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Subtotal</span>
                      <span className="font-display text-2xl font-bold text-primary">₹{total}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your details & order are sent directly via WhatsApp for confirmation.
                    </p>
                    <button
                      onClick={checkout}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-leaf py-3.5 text-sm font-semibold text-primary-foreground shadow-warm transition-transform hover:scale-[1.01] active:scale-95"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      Checkout via WhatsApp
                    </button>
                    <button
                      onClick={clear}
                      className="w-full py-2 text-xs text-muted-foreground transition-colors hover:text-destructive"
                    >
                      Clear cart
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}