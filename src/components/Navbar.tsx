import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, Info, Sparkles, ShoppingBag, Phone, ShoppingCart, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: Info },
  { to: "/services", label: "Services", icon: Sparkles },
  { to: "/products", label: "Products", icon: ShoppingBag },
  { to: "/contact", label: "Contact", icon: Phone },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, setIsOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 transition-all duration-500 ${
            scrolled ? "glass shadow-soft" : "bg-transparent"
          }`}
        >
          <Logo />

          <nav className="hidden lg:flex items-center gap-1">
            {links.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className="group relative px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                  <span
                    className={`absolute left-4 right-4 -bottom-0.5 h-0.5 rounded-full bg-primary origin-left transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open cart"
              className="relative p-2.5 rounded-full bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-transform shadow-warm"
            >
              <ShoppingCart className="h-5 w-5" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-secondary text-secondary-foreground text-[11px] font-bold flex items-center justify-center"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              onClick={() => setMobileOpen((s) => !s)}
              aria-label="Menu"
              className="lg:hidden p-2.5 rounded-full glass shadow-soft"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 glass rounded-2xl p-3 shadow-warm"
            >
              {links.map(({ to, label, icon: Icon }) => {
                const active = location.pathname === to;

                return (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      active ? "bg-primary/10 text-primary" : "hover:bg-primary/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}