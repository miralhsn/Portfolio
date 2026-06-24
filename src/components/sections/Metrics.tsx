"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const metrics = [
  { value: "10+", label: "AI Systems Built", sub: "CV, NLP, RAG, Agentic" },
  { value: "5+", label: "CV Pipelines", sub: "Real-time detection & tracking" },
  { value: "4", label: "RAG/Search Systems", sub: "Vector DB + LLM retrieval" },
  { value: "3+", label: "Production Deployments", sub: "Serving live environments" },
];

export default function Metrics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ padding: "0 clamp(1.25rem,4vw,2rem) clamp(4rem,8vw,6rem)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ height: 1, background: "var(--border)", marginBottom: "clamp(3rem,6vw,5rem)" }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {metrics.map((m, i) => (
            <motion.div key={m.label}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass card-hover"
              style={{ borderRadius: "var(--r-xl)", padding: "clamp(1.25rem,3vw,1.75rem)" }}>
              <p style={{ fontSize: "clamp(2rem,4vw,2.75rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--text-1)", lineHeight: 1, marginBottom: 8 }}>
                {m.value}
              </p>
              <p style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--text-1)", marginBottom: 4 }}>{m.label}</p>
              <p style={{ fontSize: "0.78rem", color: "var(--text-3)", fontFamily: "monospace" }}>{m.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
