"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Systems", href: "#projects" },
  { label: "Technology", href: "#stack" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const secs = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hrs}:${mins}:${secs}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 w-[92%] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "top-3 max-w-5xl rounded-full border border-white/10 bg-black/45 backdrop-blur-md py-3 px-6 shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
            : "top-6 max-w-7xl rounded-2xl border border-white/5 bg-transparent py-4 px-8"
        }`}
      >
        <nav className="flex items-center justify-between gap-6">
          {/* Left: Brand Monogram */}
          <a
            href="#"
            aria-label="Home"
            data-cursor="OPEN"
            className="focus-ring flex items-center gap-1.5 text-sm font-extrabold tracking-tight text-white select-none"
          >
            <span>MH</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          </a>

          {/* Center Links (Hidden on Tablet/Mobile) */}
          <div className="hidden lg:flex items-center justify-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="OPEN"
                className="focus-ring group relative text-xs font-bold uppercase tracking-wider text-[var(--color-dim)] transition-colors duration-200 hover:text-white"
              >
                <span>{link.label}</span>
                <span className="absolute -bottom-1.5 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[var(--color-accent)] transition-transform duration-200 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          {/* Right: Info Cluster (Status, Clock, Resume) */}
          <div className="hidden md:flex items-center gap-6">
            {/* Availability status indicator */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-green-400 uppercase">
                Available
              </span>
            </div>

            {/* Separator line */}
            <span className="h-4 w-px bg-white/10" />

            {/* Time */}
            <div className="min-w-[64px] text-left text-xs font-mono font-bold tabular-nums text-[var(--color-dim)] select-none">
              {time || "00:00:00"}
            </div>

            {/* Resume button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10 hover:border-white/20"
            >
              <span>Resume</span>
              <Download size={10} strokeWidth={2.5} />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            data-cursor="OPEN"
            className="focus-ring flex h-9 w-9 items-center justify-center border border-white/10 rounded-full text-white hover:bg-white/5 lg:hidden"
          >
            {open ? <X size={15} strokeWidth={2} /> : <Menu size={15} strokeWidth={2} />}
          </button>
        </nav>
      </header>

      {/* Mobile navigation full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#050608] flex flex-col justify-between px-6 pb-12 pt-28 lg:hidden"
          >
            {/* Center nav links */}
            <div className="flex flex-col border-t border-white/5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/5 py-5 text-3xl font-medium tracking-tight text-white hover:text-[var(--color-accent)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Bottom info cards */}
            <div className="flex flex-col gap-6 border-t border-white/5 pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-green-400 uppercase">
                    Available
                  </span>
                </div>
                <div className="text-xs font-mono font-bold text-[var(--color-dim)]">
                  {time || "00:00:00"}
                </div>
              </div>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2.5 bg-[var(--color-accent)] py-3 px-6 rounded-full text-xs font-bold uppercase tracking-wider text-[var(--color-accent-ink)]"
              >
                <span>Download Resume</span>
                <Download size={12} strokeWidth={2.5} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
