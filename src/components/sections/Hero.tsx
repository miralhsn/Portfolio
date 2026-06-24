"use client";
import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { siteConfig } from "@/lib/site";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] } },
});

const pills = ["Computer Vision", "NLP", "RAG", "Agentic AI", "Scalable Backend"];

export default function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }} aria-label="Hero">

      {/* Grid background */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.35 }} aria-hidden="true" />

      {/* Glow orbs */}
      <div className="orb" style={{ width: "clamp(300px,40vw,560px)", height: "clamp(300px,40vw,560px)", top: "5%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)" }} aria-hidden="true" />
      <div className="orb" style={{ width: 320, height: 320, bottom: "15%", right: "-5%", background: "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)" }} aria-hidden="true" />

      {/* Vignette */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, var(--bg) 100%)", pointerEvents: "none" }} aria-hidden="true" />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "120px clamp(1.25rem,5vw,2rem) 80px", textAlign: "center" }}>

        {/* Eyebrow */}
        <motion.div variants={fadeUp(0)} initial="hidden" animate="visible"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 99, background: "var(--surface-2)", border: "1px solid var(--border-md)", marginBottom: 32 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", display: "block", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "var(--text-2)", letterSpacing: "0.06em" }}>Open to senior AI engineering roles</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={fadeUp(0.08)} initial="hidden" animate="visible" className="text-gradient"
          style={{ marginBottom: "1.25rem" }}>
          Building production-grade<br />AI systems.
        </motion.h1>

        {/* Pills row */}
        <motion.div variants={fadeUp(0.16)} initial="hidden" animate="visible"
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 28 }}>
          {pills.map((p, i) => (
            <span key={p} style={{ fontSize: "0.78rem", fontFamily: "monospace", color: i % 2 === 0 ? "var(--accent)" : "var(--violet)", opacity: 0.85 }}>
              {p}{i < pills.length - 1 && <span style={{ margin: "0 4px", color: "var(--text-4)" }}>•</span>}
            </span>
          ))}
        </motion.div>

        {/* Subtext */}
        <motion.p variants={fadeUp(0.22)} initial="hidden" animate="visible"
          style={{ fontSize: "clamp(1rem,2.5vw,1.15rem)", color: "var(--text-2)", maxWidth: 560, margin: "0 auto 48px", lineHeight: 1.7 }}>
          I design and deploy AI systems that operate in real-world environments — from multi-camera surveillance to LLM-powered search, shipped to production.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp(0.3)} initial="hidden" animate="visible"
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          <a href="#systems"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: "var(--primary)", color: "#fff", fontWeight: 600, fontSize: "0.9rem", borderRadius: 11, textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 12px 40px rgba(99,102,241,0.35)"; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}>
            View Systems <ArrowRight size={16} />
          </a>
          <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", background: "var(--surface-2)", border: "1px solid var(--border-md)", color: "var(--text-2)", fontWeight: 500, fontSize: "0.9rem", borderRadius: 11, textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.color = "var(--text-1)"; el.style.borderColor = "var(--border-hi)"; el.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.color = "var(--text-2)"; el.style.borderColor = "var(--border-md)"; el.style.transform = "translateY(0)"; }}>
            <Github size={16} /> GitHub
          </a>
          <a href="#contact"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", background: "var(--surface-1)", border: "1px solid var(--border)", color: "var(--text-3)", fontWeight: 500, fontSize: "0.9rem", borderRadius: 11, textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-1)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}>
            Contact
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }} aria-hidden="true">
        <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-4)", fontFamily: "monospace" }}>Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
          style={{ width: 1, height: 36, background: "linear-gradient(to bottom, var(--primary), transparent)" }} />
      </motion.div>
    </section>
  );
}
