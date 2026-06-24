"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, BookOpen, Zap, GitBranch } from "lucide-react";
import { siteConfig } from "@/lib/site";

const achievements = [
  {
    icon: BookOpen,
    category: "Research",
    title: "Non-Violent Crime Detection in Retail Environments",
    meta: "Undergraduate Thesis — 2024",
    desc: "Proposed a hybrid detection framework combining YOLO-based spatial detection with LSTM behavioral classifiers for real-time shoplifting and loitering identification.",
    color: "#6366F1",
  },
  {
    icon: Award,
    category: "Certifications",
    title: "Deep Learning Specialization",
    meta: "DeepLearning.AI — Coursera",
    desc: "Completed 5-course specialization covering neural networks, CNN architectures, sequence models, and hyperparameter optimization.",
    color: "#A855F7",
  },
  {
    icon: Zap,
    category: "Hackathon",
    title: "AI Solutions Hackathon — Top 10 Finalist",
    meta: "National University Tech Fest — 2023",
    desc: "Built an AI-powered mental health triage tool in 24 hours using GPT-3.5 and sentiment analysis; placed in the top 10 among 80+ teams.",
    color: "#22D3EE",
  },
  {
    icon: GitBranch,
    category: "Open Source",
    title: "SecureVision — Public Repository",
    meta: `GitHub — ${siteConfig.githubUrl.replace(/^https?:\/\//, "")}`,
    desc: "Open-sourced the SecureVision FYP codebase, including dataset preprocessing scripts, model training configs, and the full React dashboard.",
    color: "#6366F1",
  },
];

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="section-padding" aria-label="Achievements">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-xs uppercase tracking-widest text-primary/80 mb-3 font-mono">
            Achievements
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Recognition & work
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="glass glass-hover rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `${item.color}18`,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  <item.icon size={17} style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: item.color }}
                  >
                    {item.category}
                  </span>
                  <h3 className="font-semibold text-white mt-1 mb-1 text-sm leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/35 font-mono mb-3">{item.meta}</p>
                  <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
