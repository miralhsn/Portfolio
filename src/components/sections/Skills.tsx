"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Eye, MessageSquare, Server, Globe, Cloud } from "lucide-react";

const skillGroups = [
  {
    category: "Machine Learning / AI",
    icon: Brain,
    color: "#6366F1",
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "SHAP", "LIME", "MLflow", "Weights & Biases"],
  },
  {
    category: "Computer Vision",
    icon: Eye,
    color: "#A855F7",
    skills: ["YOLOv8/v10", "OpenCV", "DeepSORT", "Detectron2", "Supervision", "PIL/Pillow"],
  },
  {
    category: "NLP / LLMs",
    icon: MessageSquare,
    color: "#22D3EE",
    skills: ["LangChain", "OpenAI API", "Hugging Face", "RAG", "FAISS", "Pinecone", "Transformers"],
  },
  {
    category: "Backend Engineering",
    icon: Server,
    color: "#6366F1",
    skills: ["Python", "FastAPI", "Node.js", "PostgreSQL", "Redis", "REST APIs", "Docker"],
  },
  {
    category: "Frontend Engineering",
    icon: Globe,
    color: "#A855F7",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Streamlit"],
  },
  {
    category: "Cloud / DevOps",
    icon: Cloud,
    color: "#22D3EE",
    skills: ["AWS", "GCP", "Vercel", "Docker", "GitHub Actions", "CI/CD", "Nginx"],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding" aria-label="Skills">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-xs uppercase tracking-widest text-primary/80 mb-3 font-mono">
            Skills
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            My toolkit
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.08 }}
              className="glass glass-hover rounded-2xl p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: `${group.color}18`,
                    border: `1px solid ${group.color}30`,
                  }}
                >
                  <group.icon size={16} style={{ color: group.color }} />
                </div>
                <h3 className="text-sm font-semibold text-white/85">{group.category}</h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-white/55 hover:text-white/80 hover:bg-white/8 transition-colors cursor-default font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
