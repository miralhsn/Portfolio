"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const categories = [
  {
    name: "Machine Learning",
    color: "#6366f1",
    tools: [
      { name: "PyTorch", desc: "Primary training framework" },
      { name: "Scikit-learn", desc: "Classical ML pipelines" },
      { name: "MLflow", desc: "Experiment tracking" },
      { name: "SHAP / LIME", desc: "Explainability" },
      { name: "Weights & Biases", desc: "Model observability" },
    ],
  },
  {
    name: "Computer Vision",
    color: "#a855f7",
    tools: [
      { name: "YOLOv8 / v10", desc: "Object detection" },
      { name: "OpenCV", desc: "Frame processing" },
      { name: "DeepSORT", desc: "Multi-object tracking" },
      { name: "Detectron2", desc: "Instance segmentation" },
      { name: "Supervision", desc: "CV annotation utils" },
    ],
  },
  {
    name: "NLP / LLMs",
    color: "#22d3ee",
    tools: [
      { name: "LangChain", desc: "LLM orchestration" },
      { name: "OpenAI API", desc: "GPT-4 / embeddings" },
      { name: "Hugging Face", desc: "Model hub & inference" },
      { name: "FAISS / Pinecone", desc: "Vector retrieval" },
      { name: "Transformers", desc: "Fine-tuning pipelines" },
    ],
  },
  {
    name: "Backend Systems",
    color: "#f59e0b",
    tools: [
      { name: "Python / FastAPI", desc: "Primary API layer" },
      { name: "Node.js", desc: "Event-driven services" },
      { name: "PostgreSQL", desc: "Relational storage" },
      { name: "Redis", desc: "Caching & queues" },
      { name: "Docker", desc: "Containerization" },
    ],
  },
  {
    name: "Frontend",
    color: "#34d399",
    tools: [
      { name: "Next.js", desc: "React framework" },
      { name: "TypeScript", desc: "Type-safe development" },
      { name: "Tailwind CSS", desc: "Utility-first styling" },
      { name: "Framer Motion", desc: "Animation system" },
      { name: "Streamlit", desc: "ML dashboard UIs" },
    ],
  },
  {
    name: "Cloud & DevOps",
    color: "#fb7185",
    tools: [
      { name: "AWS / GCP", desc: "Cloud infrastructure" },
      { name: "Vercel", desc: "Frontend deployment" },
      { name: "GitHub Actions", desc: "CI/CD pipelines" },
      { name: "Nginx", desc: "Reverse proxy / serving" },
      { name: "Linux / Bash", desc: "Systems administration" },
    ],
  },
];

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stack" className="section" ref={ref} aria-label="Tech Stack">
      <div className="section-label">Tech Stack</div>
      <h2 style={{ marginBottom: "0.75rem" }}>
        Tools of the trade<span style={{ color: "var(--primary)" }}>.</span>
      </h2>
      <p style={{ color: "var(--text-3)", marginBottom: "clamp(2.5rem,5vw,4rem)", maxWidth: 480 }}>
        Categorized by domain. Every tool is production-tested.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(1rem,2.5vw,1.25rem)" }}>
        {categories.map((cat, ci) => (
          <motion.div key={cat.name}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: ci * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass card-hover"
            style={{ borderRadius: "var(--r-xl)", padding: "clamp(1.25rem,3vw,1.5rem)", position: "relative", overflow: "hidden" }}>
            {/* color accent top bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${cat.color}, transparent)` }} aria-hidden="true" />
            <p style={{ fontSize: "0.7rem", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", color: cat.color, marginBottom: 16, marginTop: 4 }}>{cat.name}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {cat.tools.map(tool => (
                <div key={tool.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-1)" }}>{tool.name}</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-4)", fontFamily: "monospace", textAlign: "right", flexShrink: 0 }}>{tool.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
