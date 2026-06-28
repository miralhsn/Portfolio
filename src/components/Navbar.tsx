"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Scroll logic to hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Live local clock updating every second
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

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/[0.06] bg-[#070B14]/40 backdrop-blur-md transition-all duration-300"
      >
        <nav className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 sm:px-10">
          {/* Logo / Initials */}
          <a
            href="#"
            className="flex items-center gap-1.5 font-mono text-sm font-bold tracking-tight text-white hover:opacity-85 transition-opacity"
            aria-label="Home"
          >
            <span>MH</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#6D5EF8]" />
          </a>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.02] border border-white/[0.04] p-1 rounded-xl">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-1.5 text-xs font-medium text-slate-400 transition-all hover:bg-white/[0.05] hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Section (Status & Clock) */}
          <div className="hidden md:flex items-center gap-6 text-xs font-mono">
            {/* Availability Indicator */}
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.03] px-3 py-1 text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              </span>
              <span>Available</span>
            </div>

            {/* Live Clock */}
            <div className="text-slate-400 tabular-nums select-none bg-white/[0.02] border border-white/[0.05] py-1 px-3 rounded-lg min-w-[76px] text-center">
              {time || "00:00:00"}
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Status dot only on mobile */}
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/[0.03]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              </span>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-slate-300 hover:text-white"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-[#070B14]/98 backdrop-blur-xl px-6 pt-24 pb-10"
          >
            <div className="flex flex-col gap-2">
              {links.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="rounded-xl border-b border-white/[0.03] py-4 px-4 text-base font-semibold text-slate-300 hover:bg-white/[0.02] hover:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Mobile Footer Status & Clock */}
            <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-6 font-mono text-xs">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Available to hire</span>
              </div>
              <div className="text-slate-400 bg-white/[0.02] border border-white/[0.05] py-1 px-3 rounded-lg">
                {time || "00:00:00"}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
