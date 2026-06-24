"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Eye, Database, Code2 } from "lucide-react";

const stats = [
  { label: "Projects Built", value: "15+", color: "#6366F1" },
  { label: "AI Systems Deployed", value: "8+", color: "#A855F7" },
  { label: "Technologies Used", value: "30+", color: "#22D3EE" },
];

const focuses = [
  {
    icon: Eye,
    title: "Computer Vision",
    desc: "Real-time object detection, multi-camera tracking, and video analytics using YOLO architectures and OpenCV.",
    color: "#6366F1",
  },
  {
    icon: Brain,
    title: "LLM Applications",
    desc: "Production RAG systems, LLM-powered agents, structured output generation, and prompt engineering at scale.",
    color: "#A855F7",
  },
  {
    icon: Database,
    title: "Semantic Search",
    desc: "Vector databases, dense embeddings, and retrieval-augmented pipelines using FAISS and Pinecone.",
    color: "#22D3EE",
  },
  {
    icon: Code2,
    title: "Full-Stack AI Products",
    desc: "End-to-end AI-powered products from ML model to production API to interactive frontend dashboard.",
    color: "#6366F1",
  },
];

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="glass glass-hover rounded-2xl p-6 text-center"
    >
      <p className="text-4xl font-bold mb-2" style={{ color }}>
        {value}
      </p>
      <p className="text-sm text-white/50">{label}</p>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" aria-label="About">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-xs uppercase tracking-widest text-primary/80 mb-3 font-mono">
            About
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Engineering AI that ships
          </h2>
          <p className="max-w-xl mx-auto text-white/50 leading-relaxed">
            I design and build AI systems that go beyond research — focusing on production
            reliability, model explainability, and real-world impact from day one.
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Focus areas */}
        <div className="grid sm:grid-cols-2 gap-4">
          {focuses.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="glass glass-hover rounded-2xl p-6"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}
              >
                <item.icon size={18} style={{ color: item.color }} />
              </div>
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
