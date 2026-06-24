"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink, Eye, Code2, BarChart2, Search } from "lucide-react";
import { siteConfig } from "@/lib/site";

const projects = [
  {
    title: "SecureVision",
    tagline: "Multi-camera AI surveillance for non-violent crime detection",
    description:
      "Production-grade retail security system powered by real-time object detection, DeepSORT multi-object tracking, and AI behavior classification — detecting shoplifting, loitering, and cash-skimming with live alerts.",
    icon: Eye,
    color: "#6366F1",
    stack: ["Python", "YOLOv10", "DeepSORT", "OpenCV", "FastAPI", "React", "PostgreSQL"],
    github: siteConfig.githubUrl,
    demo: null,
    badge: "Featured",
  },
  {
    title: "AI Code Reviewer",
    tagline: "LLM-powered automated code review system",
    description:
      "Structured code analysis pipeline using GPT-4 function calling to generate categorized feedback on correctness, security, performance, and style — integrated with a REST API backend for CI/CD hooks.",
    icon: Code2,
    color: "#A855F7",
    stack: ["Python", "OpenAI API", "FastAPI", "Pydantic", "LangChain", "Docker"],
    github: siteConfig.githubUrl,
    demo: null,
    badge: null,
  },
  {
    title: "Explainable AI Dashboard",
    tagline: "SHAP-based model interpretability platform",
    description:
      "Interactive web platform that surfaces SHAP feature attributions, LIME explanations, and model confidence breakdowns — making black-box ML models auditable for non-technical stakeholders.",
    icon: BarChart2,
    color: "#22D3EE",
    stack: ["Python", "SHAP", "LIME", "Scikit-learn", "Streamlit", "Plotly"],
    github: siteConfig.githubUrl,
    demo: null,
    badge: null,
  },
  {
    title: "Semantic Search Platform",
    tagline: "RAG-based enterprise search with vector embeddings",
    description:
      "End-to-end retrieval-augmented generation pipeline combining dense passage retrieval, FAISS vector indexing, and LLM-powered answer synthesis for high-precision document search at scale.",
    icon: Search,
    color: "#6366F1",
    stack: ["Python", "LangChain", "FAISS", "OpenAI", "FastAPI", "Next.js", "Pinecone"],
    github: siteConfig.githubUrl,
    demo: null,
    badge: null,
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding" aria-label="Projects">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-xs uppercase tracking-widest text-primary/80 mb-3 font-mono">
            Projects
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Things I&apos;ve shipped
          </h2>
          <p className="text-white/45 max-w-md mx-auto">
            Production systems, research prototypes, and tools built to solve real problems.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="glass glass-hover rounded-2xl p-6 flex flex-col group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${proj.color}18`,
                    border: `1px solid ${proj.color}30`,
                  }}
                >
                  <proj.icon size={20} style={{ color: proj.color }} />
                </div>
                {proj.badge && (
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      background: `${proj.color}18`,
                      color: proj.color,
                      border: `1px solid ${proj.color}30`,
                    }}
                  >
                    {proj.badge}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold text-white mb-1">{proj.title}</h3>
              <p className="text-xs text-white/40 mb-3 font-mono">{proj.tagline}</p>
              <p className="text-sm text-white/55 leading-relaxed mb-5 flex-1">
                {proj.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {proj.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded-lg bg-white/5 text-white/50 border border-white/8 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/6">
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/90 transition-colors"
                  aria-label={`${proj.title} on GitHub`}
                >
                  <Github size={14} /> Source
                </a>
                {proj.demo ? (
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/90 transition-colors"
                  >
                    <ExternalLink size={14} /> Live demo
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-xs text-white/25 cursor-default">
                    <ExternalLink size={12} /> Demo soon
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
