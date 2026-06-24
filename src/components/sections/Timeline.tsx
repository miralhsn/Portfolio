"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const events = [
  {
    period: "2020",
    title: "Started CS at FAST-NUCES",
    detail: "Enrolled in Computer Science at FAST National University of Computer & Emerging Sciences — built the foundations in algorithms, systems, and mathematics.",
    color: "#6366f1",
  },
  {
    period: "2022",
    title: "First Computer Vision work",
    detail: "Built real-time object detection prototypes using YOLOv5 and OpenCV. Discovered the power of applying deep learning to visual data at inference speed.",
    color: "#a855f7",
  },
  {
    period: "2023",
    title: "Explainable AI & LLM systems",
    detail: "Designed SHAP-based model interpretability tools. Started building with LangChain and OpenAI APIs — exploring RAG, agents, and structured LLM output.",
    color: "#22d3ee",
  },
  {
    period: "2024",
    title: "Production AI deployments",
    detail: "Deployed SecureVision surveillance system to retail environments. Built and shipped multiple AI-powered products from model to API to production frontend.",
    color: "#34d399",
  },
  {
    period: "Now",
    title: "AI Systems Engineer",
    detail: "Focused on building production-grade AI systems — from computer vision pipelines to LLM orchestration — and looking for the right team to build with.",
    color: "#f59e0b",
    current: true,
  },
];

export default function Timeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="journey" ref={ref} style={{ background: "var(--surface-1)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="section">
        <div className="section-label">Journey</div>
        <h2 style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
          How I got here<span style={{ color: "var(--primary)" }}>.</span>
        </h2>

        <div style={{ maxWidth: 680, position: "relative" }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: 3, top: 12, bottom: 12, width: 1, background: "var(--border)" }} aria-hidden="true" />

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1.75rem,4vw,2.5rem)", paddingLeft: "clamp(1.5rem,4vw,2.5rem)" }}>
            {events.map((ev, i) => (
              <motion.div key={ev.period}
                initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ position: "relative" }}>
                {/* Dot */}
                <div style={{
                  position: "absolute", left: "clamp(-1.9rem,-5vw,-2.4rem)", top: 4,
                  width: 8, height: 8, borderRadius: "50%", border: `2px solid ${ev.color}`,
                  background: ev.current ? ev.color : "var(--bg)",
                }} aria-hidden="true" />

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "0.75rem", fontWeight: 600, color: ev.color, letterSpacing: "0.06em" }}>{ev.period}</span>
                    {ev.current && (
                      <span style={{ fontSize: "0.65rem", fontFamily: "monospace", padding: "2px 8px", borderRadius: 99, background: `${ev.color}18`, border: `1px solid ${ev.color}40`, color: ev.color }}>
                        Current
                      </span>
                    )}
                  </div>
                  <h4 style={{ color: "var(--text-1)", marginBottom: 6 }}>{ev.title}</h4>
                  <p style={{ fontSize: "0.86rem", color: "var(--text-3)", lineHeight: 1.7 }}>{ev.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
