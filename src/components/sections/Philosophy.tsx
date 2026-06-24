"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const beliefs = [
  {
    label: "Production-first",
    headline: "Systems must ship.",
    detail: "A model that can't be served is a research project. Every architecture decision I make is filtered through: 'Can this run reliably in production?'",
    index: "01",
  },
  {
    label: "Observability over assumptions",
    headline: "Instrument everything.",
    detail: "AI systems fail silently. I build with logging, tracing, and metric collection from day one — not as an afterthought.",
    index: "02",
  },
  {
    label: "Systems thinking",
    headline: "Models are components.",
    detail: "The model is 20% of the system. I focus on data pipelines, serving infrastructure, feedback loops, and failure modes.",
    index: "03",
  },
  {
    label: "Simplicity over cleverness",
    headline: "The best solution is the one that fails least.",
    detail: "I reach for well-understood tools before novel ones. Complexity is a cost — paid in debugging, maintenance, and onboarding.",
    index: "04",
  },
];

export default function Philosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="philosophy" ref={ref} style={{ background: "var(--surface-1)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="section">
        <div className="section-label">Engineering Philosophy</div>
        <h2 style={{ marginBottom: "clamp(2rem,4vw,3.5rem)" }}>
          How I think about systems<span style={{ color: "var(--primary)" }}>.</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "clamp(1rem,2.5vw,1.25rem)" }}>
          {beliefs.map((b, i) => (
            <motion.div key={b.index}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ position: "relative", padding: "clamp(1.25rem,3vw,1.75rem)", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", transition: "border-color 0.25s, transform 0.25s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hi)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              <span style={{ position: "absolute", top: "clamp(1rem,2vw,1.25rem)", right: "clamp(1rem,2vw,1.25rem)", fontFamily: "monospace", fontSize: "0.7rem", color: "var(--text-4)" }}>{b.index}</span>
              <p style={{ fontSize: "0.7rem", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--primary)", marginBottom: 10 }}>{b.label}</p>
              <h4 style={{ color: "var(--text-1)", marginBottom: 10, lineHeight: 1.35 }}>{b.headline}</h4>
              <p style={{ fontSize: "0.86rem", color: "var(--text-3)", lineHeight: 1.7 }}>{b.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
