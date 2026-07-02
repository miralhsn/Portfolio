"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Systems", href: "#projects" },
  { label: "Stack", href: "#stack" },
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
    const handleScroll = () => setScrolled(window.scrollY > 32);
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
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled ? "border-[var(--color-line)] bg-[rgba(5,6,8,0.88)]" : "border-transparent bg-transparent"
        }`}
      >
        <nav className="site-shell grid h-20 grid-cols-[1fr_auto_1fr] items-center">
          <a
            href="#"
            aria-label="Home"
            data-cursor="OPEN"
            className="focus-ring flex w-fit items-center gap-2 text-sm font-extrabold tracking-tight text-[var(--color-text)]"
          >
            <span>MH</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          </a>

          <div className="hidden items-center justify-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="OPEN"
                className="focus-ring group relative text-xs font-bold text-muted transition-colors duration-200 hover:text-[var(--color-text)]"
              >
                <span>{link.label}</span>
                <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-[var(--color-accent)] transition-transform duration-200 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <div className="hidden justify-self-end md:block">
            <div className="min-w-[76px] text-right text-xs font-bold tabular-nums text-dim">
              {time || "00:00:00"}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            data-cursor="OPEN"
            className="focus-ring col-start-3 flex h-10 w-10 items-center justify-center justify-self-end border hairline text-[var(--color-text)] md:hidden"
          >
            {open ? <X size={18} strokeWidth={1.8} /> : <Menu size={18} strokeWidth={1.8} />}
          </button>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-[var(--color-bg)] px-[var(--grid-margin)] pb-10 pt-28 md:hidden">
          <div className="flex flex-col border-t hairline">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b hairline py-5 text-4xl font-normal text-[var(--color-text)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-end border-t hairline pt-6 text-xs font-bold text-muted">
            <div>{time || "00:00:00"}</div>
          </div>
        </div>
      )}
    </>
  );
}
