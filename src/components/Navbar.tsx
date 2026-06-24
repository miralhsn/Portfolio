"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Link, Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site";

const links = [
  { label: "Systems", href: "#systems" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Stack", href: "#stack" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25,0.46,0.45,0.94] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
          background: scrolled ? "rgba(6,8,17,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <nav style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2rem)", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }} aria-label="Home">
            <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-1)", letterSpacing: "-0.01em" }}>
              miral<span style={{ color: "var(--primary)" }}>.</span>hasan
            </span>
          </a>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="hidden md:flex">
            {links.map(l => (
              <a key={l.href} href={l.href} style={{ padding: "6px 14px", fontSize: "0.82rem", color: "var(--text-3)", textDecoration: "none", borderRadius: 8, transition: "color 0.2s, background 0.2s" }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = "var(--text-1)"; (e.target as HTMLElement).style.background = "var(--surface-2)"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = "var(--text-3)"; (e.target as HTMLElement).style.background = "transparent"; }}>
                {l.label}
              </a>
            ))}
          </div>

          {/* Social + CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="hidden md:flex">
            {[
              { href: siteConfig.githubUrl, Icon: ExternalLink, label: "GitHub" },
              { href: siteConfig.linkedinUrl, Icon: Link, label: "LinkedIn" },
            ].map(({ href, Icon, label }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{ width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, color: "var(--text-3)", transition: "color 0.2s, background 0.2s", textDecoration: "none" }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = "var(--text-1)"; (e.target as HTMLElement).style.background = "var(--surface-2)"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = "var(--text-3)"; (e.target as HTMLElement).style.background = "transparent"; }}>
                <Icon size={16} />
              </a>
            ))}
            <a href="#contact" style={{ marginLeft: 4, padding: "7px 18px", background: "var(--primary)", color: "#fff", fontSize: "0.82rem", fontWeight: 600, borderRadius: 9, textDecoration: "none", transition: "opacity 0.2s, transform 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              Let&apos;s talk
            </a>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu"
            style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, background: "var(--surface-1)", border: "1px solid var(--border)", color: "var(--text-2)", cursor: "pointer" }}>
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(6,8,17,0.97)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", display: "flex", flexDirection: "column", paddingTop: 80, paddingLeft: "clamp(1.25rem,6vw,2.5rem)", paddingRight: "clamp(1.25rem,6vw,2.5rem)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {links.map((l, i) => (
                <motion.a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  style={{ padding: "14px 16px", fontSize: "1.15rem", fontWeight: 500, color: "var(--text-2)", textDecoration: "none", borderRadius: 10, borderBottom: "1px solid var(--border)" }}>
                  {l.label}
                </motion.a>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
              <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 0", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-2)", fontSize: "0.9rem", textDecoration: "none" }}>
                <ExternalLink size={16} /> GitHub
              </a>
              <a href={`mailto:${siteConfig.contactEmail}`}
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 0", background: "var(--primary)", borderRadius: 10, color: "#fff", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}>
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
