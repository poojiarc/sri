import { Link } from "@tanstack/react-router";
import { Heart, Phone, Mail, MapPin, Instagram, Youtube, Home, Info, Sparkles, ShoppingBag, Truck, Leaf, Flame } from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Footer() {
  return (
    <footer className="mt-20 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-20" />
      <div className="relative container mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="bg-cream/95 inline-block rounded-2xl p-3">
              <Logo />
            </div>
            <p className="mt-4 text-sm text-primary-foreground/80 leading-relaxed">
              Authentic Andhra & Telangana homemade pickles — crafted with love,
              hygiene, and traditional family recipes.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href="https://wa.me/919133912973" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="h-9 w-9 rounded-full bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground transition-all flex items-center justify-center">
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/sriruchipachallu?igsh=Y3AycnN0dDB5bncw" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-9 w-9 rounded-full bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground transition-all flex items-center justify-center">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://youtube.com/@sriruchipachalu?si=4xQw1aA0lmDQr0-t" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="h-9 w-9 rounded-full bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground transition-all flex items-center justify-center">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/", label: "Home", icon: Home },
                { to: "/about", label: "About", icon: Info },
                { to: "/services", label: "Services", icon: Sparkles },
                { to: "/products", label: "Products", icon: ShoppingBag },
                { to: "/contact", label: "Contact", icon: Phone },
              ].map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link to={to} className="flex items-center gap-2 text-primary-foreground/80 hover:text-secondary transition-colors">
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2"><Leaf className="h-4 w-4 text-secondary" /> Veg & Non-Veg Pickles</li>
              <li className="flex items-center gap-2"><Flame className="h-4 w-4 text-secondary" /> Andhra & Telangana Taste</li>
              <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-secondary" /> Fast & Safe Delivery</li>
              <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-secondary" /> Bulk Orders Welcome</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Reach Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-secondary shrink-0" />
                <a href="tel:9701078022" className="hover:text-secondary transition-colors">
                  9701078022, 9133912973
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-secondary shrink-0" />
                <a href="mailto:ammamaruchulu8@gmail.com" className="hover:text-secondary transition-colors break-all">
                  ammamaruchulu8@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-secondary shrink-0" />
                <span>Hyderabad, Tilak Nagar, Bhag Amberpet — 500013</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 mt-10 text-center">
          <div className="flex justify-center items-center gap-1 text-sm text-primary-foreground/50 mb-2 flex-wrap">
            Made with <Heart className="inline h-4 w-4 text-red-400 mx-1 fill-current" /> by
            <a
              href="https://staffarc.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-secondary hover:underline ml-1"
            >
              <img
                src="https://www.staffarc.in/images/Staffarc-logo.png"
                alt="StaffArc logo"
                className="h-5 w-5 object-contain"
              />
              StaffArc
            </a>
          </div>
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Sri Ruchi Pachallu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}