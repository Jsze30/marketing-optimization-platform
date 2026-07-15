'use client';
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Performance", href: "#performance" },
  { label: "Optimization", href: "#optimization" },
  { label: "ROAS", href: "#roas" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Switch to the light treatment once the pill sits over the light content
    // (roughly past the dark hero).
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div
        className={`flex w-full max-w-3xl items-center justify-between rounded-full border p-1.5 pl-5 shadow-lg backdrop-blur-xl transition-colors duration-300 ${
          scrolled
            ? "border-zinc-200 bg-white/85 shadow-black/5"
            : "border-white/10 bg-zinc-900/80 shadow-black/20"
        }`}
      >
        <span
          className={`text-sm font-semibold tracking-tight transition-colors duration-300 ${
            scrolled ? "text-zinc-900" : "text-white"
          }`}
        >
          Uplift
        </span>
        <div className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                scrolled
                  ? "text-zinc-600 hover:bg-zinc-900/5 hover:text-zinc-900"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
