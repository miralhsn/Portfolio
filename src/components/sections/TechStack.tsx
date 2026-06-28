"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ParticleNetworkBackground } from "@/components/Backgrounds";

interface ToolItem {
  name: string;
  desc: string;
}

interface StackCategory {
  name: string;
  color: string;
  tools: ToolItem[];
}

const categories: StackCategory[] = [
  {
    name: "Machine Learning",
    color: "#6D5EF8",
    tools: [
      { name: "PyTorch", desc: "Model architecture & training" },
      { name: "Scikit-Learn", desc: "Feature prep & tabular pipelines" },
      { name: "MLflow", desc: "Model tracking & registry" },
      { name: "Weights & Biases", desc: "Training run observability" },
      { name: "SHAP / LIME", desc: "Model explanation calculations" },
    ],
  },
  {
    name: "Computer Vision",
    color: "#a855f7",
    tools: [
      { name: "YOLOv8 / v10", desc: "Object detection models" },
      { name: "OpenCV", desc: "Image manipulation & streams" },
      { name: "DeepSORT", desc: "Multi-object ID tracking" },
      { name: "Detectron2", desc: "Pixel instance segmentation" },
      { name: "Supervision", desc: "Computer vision helper utilities" },
    ],
  },
  {
    name: "LLMs",
    color: "#7EE7FF",
    tools: [
      { name: "LangChain", desc: "RAG & LLM chain orchestrations" },
      { name: "OpenAI API", desc: "Context modeling & embeddings" },
      { name: "Hugging Face", desc: "Transformers fine-tuning" },
      { name: "FAISS / Pinecone", desc: "High-scale vector retrievals" },
      { name: "Ollama", desc: "Local model serving integrations" },
    ],
  },
  {
    name: "Backend",
    color: "#f59e0b",
    tools: [
      { name: "Python / FastAPI", desc: "Main asynchronous API layer" },
      { name: "Node.js", desc: "Distributed event worker services" },
      { name: "PostgreSQL", desc: "Primary relational storage" },
      { name: "Redis", desc: "High-speed caching & queue logs" },
      { name: "Docker", desc: "Containerized environments" },
    ],
  },
  {
    name: "Frontend",
    color: "#34d399",
    tools: [
      { name: "Next.js 15", desc: "Server side rendering & frameworks" },
      { name: "TypeScript", desc: "Type-safe interface logic" },
      { name: "Tailwind CSS", desc: "Utility-first design styling" },
      { name: "Framer Motion", desc: "Premium animation layers" },
      { name: "Streamlit", desc: "ML prototype application UIs" },
    ],
  },
  {
    name: "Cloud",
    color: "#fb7185",
    tools: [
      { name: "AWS / GCP", desc: "GPU compute & storage servers" },
      { name: "Vercel", desc: "Frontend server deployments" },
      { name: "GitHub Actions", desc: "Automated CI/CD workflows" },
      { name: "Nginx", desc: "Reverse proxy & static route host" },
      { name: "Linux / Bash", desc: "Core systems administration" },
    ],
  },
];

// ─── TILT STACK CARD COMPONENT ────────────────────────────────────────
function StackCard({
  category,
  index,
  inView,
}: {
  category: StackCategory;
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative offset from card center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);

    // Rotate max 5 degrees
    const rotateX = -mouseY * 5;
    const rotateY = mouseX * 5;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`,
      transition: "transform 0.1s ease-out",
    });

    setGlowPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-out",
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#070B14]/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/[0.15]"
    >
      {/* Accent gradient bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-70"
        style={{
          background: `linear-gradient(90deg, ${category.color}, transparent)`,
        }}
      />

      {/* Floating magnetic cursor glow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute rounded-full blur-[40px] opacity-40 transition-opacity duration-300"
          style={{
            width: 120,
            height: 120,
            left: glowPosition.x - 60,
            top: glowPosition.y - 60,
            background: `radial-gradient(circle, ${category.color}, transparent)`,
          }}
        />
      )}

      {/* Category Name */}
      <p
        className="font-mono text-[10px] font-bold uppercase tracking-widest mb-6"
        style={{ color: category.color }}
      >
        {category.name}
      </p>

      {/* Tool List */}
      <div className="space-y-4 relative z-10">
        {category.tools.map((tool) => (
          <div
            key={tool.name}
            className="flex items-center justify-between gap-4 border-b border-white/[0.02] pb-2 last:border-0 last:pb-0"
          >
            <span className="text-xs font-semibold text-white">{tool.name}</span>
            <span className="font-mono text-[9px] text-slate-500 text-right">{tool.desc}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── TECH STACK SECTION ───────────────────────────────────────────────
export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="stack"
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 px-6 sm:px-10 bg-[#070B14]"
      aria-label="Technology Stack Section"
    >
      {/* Particle Network Canvas Background */}
      <ParticleNetworkBackground />

      <div className="relative z-10 mx-auto max-w-[1200px] w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-left"
        >
          <div className="font-mono text-xs uppercase tracking-widest text-[#fb7185] mb-3">
            03 // TECHNICAL TOOLKIT
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight uppercase">
            Systems Capability<span className="text-[#a855f7]">.</span>
          </h2>
        </motion.div>

        {/* Categories Grid (3 Columns Desktop, 2 Tablet, 1 Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => (
            <StackCard
              key={category.name}
              category={category}
              index={idx}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
