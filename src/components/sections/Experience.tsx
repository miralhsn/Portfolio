"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    role: "AI/ML Engineer Intern",
    org: "Tech Startup — AI Products Division",
    period: "Jun 2024 – Sep 2024",
    type: "Internship",
    bullets: [
      "Built a computer vision pipeline for real-time anomaly detection using YOLOv8, achieving 94% precision on retail footage.",
      "Designed and deployed a RAG-based internal knowledge assistant serving 200+ daily queries.",
      "Reduced ML inference latency by 40% through model quantization and async batching.",
    ],
  },
  {
    role: "Final Year Project Lead",
    org: "University — SecureVision",
    period: "Sep 2023 – Present",
    type: "Academic",
    bullets: [
      "Architected SecureVision: a multi-camera AI surveillance system for non-violent crime detection.",
      "Integrated YOLO-based tracking, behavior classification, and a real-time alert dashboard.",
      "Led team of 3 through full product lifecycle: ideation, documentation, development, and deployment.",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    org: "Independent Clients",
    period: "Jan 2023 – Aug 2023",
    type: "Freelance",
    bullets: [
      "Delivered 5+ web applications using React, Node.js, and PostgreSQL for SME clients.",
      "Integrated payment gateways and third-party APIs, cutting client onboarding time by 30%.",
    ],
  },
  {
    role: "Teaching Assistant — Data Structures",
    org: "University CS Department",
    period: "Sep 2022 – Jan 2023",
    type: "Academic",
    bullets: [
      "Supported 60+ students in understanding algorithms, complexity analysis, and C++ implementation.",
      "Designed weekly coding challenges adopted by 3 course sections.",
    ],
  },
];

const typeColors: Record<string, string> = {
  Internship: "#6366F1",
  Academic: "#22D3EE",
  Freelance: "#A855F7",
};

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding" aria-label="Experience">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-xs uppercase tracking-widest text-primary/80 mb-3 font-mono">
            Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Where I&apos;ve worked
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-highlight/20 to-transparent hidden sm:block" />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                className="sm:pl-16 relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-4 top-5 w-4 h-4 rounded-full border-2 hidden sm:block"
                  style={{
                    background: `${typeColors[exp.type] ?? "#6366F1"}20`,
                    borderColor: typeColors[exp.type] ?? "#6366F1",
                  }}
                />

                <div className="glass glass-hover rounded-2xl p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-semibold text-white mb-1">{exp.role}</h3>
                      <p className="text-sm text-white/50">{exp.org}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span
                        className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{
                          background: `${typeColors[exp.type] ?? "#6366F1"}15`,
                          color: typeColors[exp.type] ?? "#6366F1",
                          border: `1px solid ${typeColors[exp.type] ?? "#6366F1"}30`,
                        }}
                      >
                        {exp.type}
                      </span>
                      <span className="text-xs text-white/35 font-mono">{exp.period}</span>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-white/55">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
