import logo from "@/assets/logo.jpg";
import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-secondary/40 blur-md group-hover:blur-lg transition-all" />
        <img
          src={logo}
          alt="Sri Ruchi Pachallu"
          width={48}
          height={48}
          className="relative h-12 w-12 rounded-full object-cover ring-2 ring-secondary/60 shadow-soft transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-display text-lg font-bold text-primary">Sri Ruchi</span>
        <span className="font-display text-sm font-semibold text-foreground/70 -mt-1">Pachallu</span>
      </div>
    </Link>
  );
}