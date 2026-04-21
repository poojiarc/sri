import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  const href = `https://wa.me/919133912973?text=${encodeURIComponent(
    "Hello Sri Ruchi Pachallu! I'd like to know more about your homemade pickles.",
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping" />
      <span className="relative flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-warm animate-bounce-soft group-hover:scale-110 transition-transform">
        <MessageCircle className="h-7 w-7" />
      </span>
    </a>
  );
}