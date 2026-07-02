"use client";

import { motion } from "framer-motion";
import HeadlineReveal from "@/components/motion/HeadlineReveal";
import ParticleEmitter from "./ParticleEmitter";
import { Cpu, Terminal, Layers, Globe, Server, Database } from "lucide-react";

type LogoId =
  | "python" | "cpp" | "java" | "javascript" | "typescript" | "react" | "next" | "tailwind"
  | "fastapi" | "node" | "docker" | "git" | "aws" | "linux" | "opencv" | "pytorch" | "tensorflow"
  | "sklearn" | "langchain" | "openai" | "gemini" | "anthropic" | "yolo" | "ultralytics"
  | "numpy" | "pandas" | "faiss" | "pinecone" | "chromadb" | "mongodb" | "postgres" | "vercel"
  | "supabase" | "motion" | "gsap";

interface ToolItem {
  name: string;
  category: string;
  logo: LogoId;
}

const toolsList: ToolItem[] = [
  { name: "Python", category: "ML / Backend", logo: "python" },
  { name: "C++", category: "ML Performance", logo: "cpp" },
  { name: "Java", category: "Systems Engine", logo: "java" },
  { name: "JavaScript", category: "Frontend Core", logo: "javascript" },
  { name: "TypeScript", category: "Frontend Safety", logo: "typescript" },
  { name: "React", category: "Web Interfaces", logo: "react" },
  { name: "Next.js", category: "Hybrid Framework", logo: "next" },
  { name: "Tailwind CSS", category: "Styling Token", logo: "tailwind" },
  { name: "FastAPI", category: "Asynchronous API", logo: "fastapi" },
  { name: "Node.js", category: "Evented Runtime", logo: "node" },
  { name: "Docker", category: "Containerization", logo: "docker" },
  { name: "Git", category: "Version Control", logo: "git" },
  { name: "AWS", category: "Cloud Platform", logo: "aws" },
  { name: "Linux", category: "OS / Kernel", logo: "linux" },
  { name: "OpenCV", category: "Computer Vision", logo: "opencv" },
  { name: "PyTorch", category: "Deep Learning", logo: "pytorch" },
  { name: "TensorFlow", category: "Deep Learning", logo: "tensorflow" },
  { name: "Scikit-learn", category: "Tabular pipelines", logo: "sklearn" },
  { name: "LangChain", category: "Agentic Orch.", logo: "langchain" },
  { name: "OpenAI", category: "Foundation APIs", logo: "openai" },
  { name: "Gemini", category: "Foundation APIs", logo: "gemini" },
  { name: "Anthropic", category: "Foundation APIs", logo: "anthropic" },
  { name: "YOLO", category: "Object Detection", logo: "yolo" },
  { name: "Ultralytics", category: "Vision Models", logo: "ultralytics" },
  { name: "NumPy", category: "Numerical arrays", logo: "numpy" },
  { name: "Pandas", category: "Data processing", logo: "pandas" },
  { name: "FAISS", category: "Vector search", logo: "faiss" },
  { name: "Pinecone", category: "Vector database", logo: "pinecone" },
  { name: "ChromaDB", category: "Vector database", logo: "chromadb" },
  { name: "MongoDB", category: "Document DB", logo: "mongodb" },
  { name: "PostgreSQL", category: "Relational DB", logo: "postgres" },
  { name: "Vercel", category: "Deployment", logo: "vercel" },
  { name: "Supabase", category: "Database API", logo: "supabase" },
  { name: "Framer Motion", category: "Animations", logo: "motion" },
  { name: "GSAP", category: "Animations Engine", logo: "gsap" },
];

function TechLogo({ id }: { id: LogoId }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.65,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (id) {
    case "python":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="M20 8h6a5 5 0 0 1 5 5v5H17a5 5 0 0 0-5 5v1" />
          <path {...common} d="M20 32h-6a5 5 0 0 1-5-5v-5h14a5 5 0 0 0 5-5v-1" />
          <circle cx="23" cy="12" r="1" fill="currentColor" />
          <circle cx="17" cy="28" r="1" fill="currentColor" />
        </svg>
      );
    case "cpp":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <circle cx="20" cy="20" r="12" {...common} />
          <path {...common} d="M15 15c-3 2-3 8 0 10M25 17h4M27 15v4M30 21h4M32 19v4" />
        </svg>
      );
    case "java":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="M15 32c5 1 11 0 12-2 1-3-4-4-5-5s3-2 3-5-4-5-5-5" />
          <path {...common} d="M18 10c0-2-2-4-2-4M22 9c0-1-1-3-1-3" />
          <path {...common} d="M12 28s4 2 8 2 10-2 10-2" />
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <rect x="8" y="8" width="24" height="24" rx="2" {...common} />
          <path {...common} d="M22 28c1 0 2-1 2-2.5v-2c0-1-.5-1.5-1.5-1.5s-1.5.5-1.5 1.5M28 22c1 1 2 1.5 3 1.5s1.5-.5 1.5-1.5v-2" />
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <rect x="8" y="8" width="24" height="24" rx="2" {...common} />
          <path {...common} d="M13 14h8M17 14v12M23 24c1 1 3.5 1.5 3.5-1s-3.5-1-3.5-3 3.5-1.5 3.5 1" />
        </svg>
      );
    case "react":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <ellipse cx="20" cy="20" rx="4" ry="12" transform="rotate(30 20 20)" {...common} />
          <ellipse cx="20" cy="20" rx="4" ry="12" transform="rotate(90 20 20)" {...common} />
          <ellipse cx="20" cy="20" rx="4" ry="12" transform="rotate(150 20 20)" {...common} />
          <circle cx="20" cy="20" r="1.5" fill="currentColor" />
        </svg>
      );
    case "next":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <circle cx="20" cy="20" r="12" {...common} />
          <path {...common} d="M15 26V14l11 14V14" />
        </svg>
      );
    case "tailwind":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="M8 20c3-6 8-8 14-5 3 1.5 5 1.5 8-1" />
          <path {...common} d="M10 27c3-6 8-8 14-5 3 1.5 5 1.5 8-1" />
        </svg>
      );
    case "fastapi":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="M22 6L11 22h10l-2 12 11-16H20l2-6z" />
          <circle cx="22" cy="14" r="1" fill="currentColor" />
        </svg>
      );
    case "node":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="m20 7 12 7v12l-12 7-12-7V14l12-7Z" />
          <path {...common} d="M15 25V15l10 10V15" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="M8 21h22c0 6-5 10-12 10-6 0-9-3-10-10Z" />
          <path {...common} d="M12 17h4v4h-4zM17 17h4v4h-4zM22 17h4v4h-4zM17 12h4v4h-4zM31 18c2-1 3-1 5 0" />
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <rect x="10" y="10" width="20" height="20" rx="3" transform="rotate(45 20 20)" {...common} />
          <circle cx="20" cy="14" r="2.5" fill="currentColor" />
          <circle cx="20" cy="26" r="2.5" fill="currentColor" />
          <circle cx="26" cy="20" r="2.5" fill="currentColor" />
          <line x1="20" y1="16.5" x2="20" y2="23.5" {...common} />
          <path {...common} d="M20 20 C 23 20, 23.5 20, 23.5 20" />
        </svg>
      );
    case "aws":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="M10 26c4-1 6-4 9-4s5 2 9 4" />
          <path {...common} d="M12 28c4 3 10 4 15 2 3-1 5-3 5-3" />
          <path {...common} d="M29 27l4 4-2-4" />
        </svg>
      );
    case "linux":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="M14 29c-2-4 0-9 2-13 1-2 1-7 4-7s3 5 4 7c2 4 4 9 2 13" />
          <path {...common} d="M16 29h8" />
          <circle cx="17" cy="17" r="1" fill="currentColor" />
          <circle cx="23" cy="17" r="1" fill="currentColor" />
        </svg>
      );
    case "opencv":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <circle cx="20" cy="12" r="5" {...common} />
          <circle cx="13" cy="25" r="5" {...common} />
          <circle cx="27" cy="25" r="5" {...common} />
        </svg>
      );
    case "pytorch":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="M22 6c-2 4.2-9 9.6-9 18a9 9 0 0 0 18 0c0-4.5-2.6-7.6-5.2-10.2" />
          <circle cx="26.6" cy="6.8" r="1.5" fill="currentColor" />
        </svg>
      );
    case "tensorflow":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="M20 6l10 5.5v17L20 34l-10-5.5v-17z" />
          <path {...common} d="M20 6v28M10 11.5l10 5.5 10-5.5M10 28.5l10-5.5 10 5.5" />
        </svg>
      );
    case "sklearn":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <ellipse cx="17" cy="20" rx="9" ry="5" transform="rotate(-24 17 20)" {...common} />
          <ellipse cx="24" cy="20" rx="9" ry="5" transform="rotate(24 24 20)" {...common} />
          <path {...common} d="M12 27h16" />
        </svg>
      );
    case "langchain":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="M16 13h-2a7 7 0 0 0 0 14h5" />
          <path {...common} d="M24 27h2a7 7 0 0 0 0-14h-5" />
          <path {...common} d="M15 20h10" />
        </svg>
      );
    case "openai":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="M20 8a7 7 0 0 1 6 3.4 7 7 0 0 1 5.2 8.8 7 7 0 0 1-3.6 8.4 7 7 0 0 1-9 2.7 7 7 0 0 1-8.8-3.7 7 7 0 0 1-1-9.4A7 7 0 0 1 20 8Z" />
          <path {...common} d="M15 14.5 25 20l-10 5.5M25 14.5 15 20l10 5.5" />
        </svg>
      );
    case "gemini":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" fill="currentColor">
          <path d="M20 6c0 7.7 6.3 14 14 14-7.7 0-14 6.3-14 14 0-7.7-6.3-14-14-14 7.7 0 14-6.3 14-14z" />
        </svg>
      );
    case "anthropic":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="M12 28L20 8l8 20M15 22h10M20 8v14" />
        </svg>
      );
    case "yolo":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="M9 12V9h3M28 9h3v3M31 28v3h-3M12 31H9v-3" />
          <path {...common} d="m13 15 7 7 7-7M20 22v7" />
        </svg>
      );
    case "ultralytics":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <circle cx="20" cy="20" r="10" {...common} />
          <path {...common} d="M20 14v12M15 18h10" />
        </svg>
      );
    case "numpy":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="M10 20l10-10 10 10-10 10zM10 20h20M20 10v20" />
        </svg>
      );
    case "pandas":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <rect x="10" y="10" width="8" height="20" rx="1" {...common} />
          <rect x="22" y="14" width="8" height="16" rx="1" {...common} />
          <line x1="18" y1="20" x2="22" y2="20" {...common} />
        </svg>
      );
    case "faiss":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="M11 29V11h18M11 20h13M11 11l18 18" />
        </svg>
      );
    case "pinecone":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="M20 6l12 20H8L20 6z" />
          <circle cx="20" cy="16" r="3" fill="currentColor" />
        </svg>
      );
    case "chromadb":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <circle cx="20" cy="20" r="12" {...common} />
          <circle cx="20" cy="20" r="6" {...common} strokeDasharray="2 2" />
        </svg>
      );
    case "mongodb":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="M20 6c0 0-8 6-8 14s8 14 8 14 8-6 8-14-8-14-8-14z" />
          <path {...common} d="M20 6v28" />
        </svg>
      );
    case "postgres":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="M13 27c-2-3-3-7-2-11 1-5 5-8 10-7 5 1 8 5 8 10 0 5-2 9-6 12" />
          <path {...common} d="M20 19c3 0 6-2 6-5" />
          <circle cx="17" cy="17" r="0.5" fill="currentColor" />
          <circle cx="24" cy="17" r="0.5" fill="currentColor" />
        </svg>
      );
    case "vercel":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="m20 9 13 22H7L20 9Z" />
        </svg>
      );
    case "supabase":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="M28 20L12 30V10z" />
          <path d="M16 10L32 20L16 30z" fill="currentColor" opacity="0.3" />
        </svg>
      );
    case "motion":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <path {...common} d="M8 28 16 12h8l-8 16M24 28l8-16" />
        </svg>
      );
    case "gsap":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden="true">
          <circle cx="20" cy="20" r="10" {...common} />
          <path {...common} d="M14 20h12M20 14v12" />
        </svg>
      );
    default:
      return null;
  }
}

function LogoRail({ items, reverse = false }: { items: ToolItem[]; reverse?: boolean }) {
  const repeated = [...items, ...items, ...items]; // Repeat 3 times for completely seamless loop on huge resolutions

  return (
    <div className="logo-rail border-y border-white/5 relative overflow-hidden" aria-label="Technology logo slider">
      <div className={`logo-track ${reverse ? "logo-track-reverse" : ""} flex gap-0`}>
        {repeated.map((tool, index) => (
          <div
            className="logo-item group relative flex items-center gap-4 min-w-[14rem] border-r border-white/5 p-5 cursor-default hover:bg-white/[0.02] transition-all"
            key={`${tool.name}-${index}`}
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-radial-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                 style={{ background: "radial-gradient(circle, rgba(216, 209, 194, 0.04) 0%, transparent 70%)" }} />

            <span className="logo-mark w-10 h-10 flex items-center justify-center text-[var(--color-accent)] transform group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(216,209,194,0.3)] transition-all duration-300">
              <TechLogo id={tool.logo} />
            </span>
            <div className="flex flex-col min-w-0">
              <span className="logo-name text-sm font-bold text-white leading-none mb-1">{tool.name}</span>
              <span className="logo-meta text-[9px] font-mono tracking-wider text-[var(--color-dim)] uppercase">{tool.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const capabilityCards = [
  {
    name: "Computer Vision",
    icon: Cpu,
    desc: "Real-time edge streams, object tracking, and behavioral state classifiers.",
    projects: ["SecureVision"],
    stats: "30fps Multi-stream Ingest"
  },
  {
    name: "LLMs",
    icon: Terminal,
    desc: "Structured function calling pipelines, RAG, and context AST orchestrators.",
    projects: ["AI Code Reviewer", "Semantic Search Platform"],
    stats: "Zero-error JSON Schemas"
  },
  {
    name: "Backend",
    icon: Server,
    desc: "High-scale asynchronous task workers, API layers, and caching mechanics.",
    projects: ["SecureVision", "AI Code Reviewer", "Semantic Search Platform"],
    stats: "Sub-200ms API dispatch"
  },
  {
    name: "Frontend",
    icon: Globe,
    desc: "Polished reactive UI dashboards, scroll engines, and high-performance WebGL.",
    projects: ["Semantic Search Platform"],
    stats: "Vite, Next.js, Framer Motion"
  },
  {
    name: "Cloud",
    icon: Layers,
    desc: "Containerized runners, serverless edge, and programmatic CI/CD integration.",
    projects: ["AI Code Reviewer"],
    stats: "GitHub Actions scaling"
  },
  {
    name: "Databases",
    icon: Database,
    desc: "Vector embeddings indexers, memory cache stores, and relational schema optimization.",
    projects: ["SecureVision", "Semantic Search Platform"],
    stats: "FAISS local indexing & lookup"
  }
];

export default function TechStack({
  activeCapability,
  setActiveCapability
}: {
  activeCapability: string | null;
  setActiveCapability: (cap: string | null) => void;
}) {
  const midPoint = Math.floor(toolsList.length / 2);
  const firstRail = toolsList.slice(0, midPoint);
  const secondRail = toolsList.slice(midPoint);

  return (
    <section
      id="stack"
      className="relative border-b hairline bg-[#050608] section-space overflow-hidden"
      aria-label="Technology Stack Section"
    >
      {/* Background Particles backdrop */}
      <ParticleEmitter />

      <div className="site-shell relative z-10">
        <div className="editorial-grid mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-4">
            <div className="micro-label text-accent">
              03 // TECHNICAL TOOLKIT
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <HeadlineReveal
              lines={[
                <span key="systems">Continuous</span>,
                <span key="capability">Capabilities<span className="text-accent">.</span></span>,
              ]}
            />
          </div>
        </div>

        {/* Double looping marquees */}
        <div className="space-y-6 my-12 relative">
          {/* Subtle edge fades via absolute gradient layers */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050608] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050608] to-transparent z-10 pointer-events-none" />

          <LogoRail items={firstRail} />
          <LogoRail items={secondRail} reverse />
        </div>

        {/* Capability Cards Section */}
        <div className="mt-20">
          <div className="editorial-grid mb-8">
            <div className="col-span-12">
              <h3 className="text-xl font-bold font-sans tracking-tight text-white mb-2">Capability Dimensions</h3>
              <p className="body-small">Select a core competency below to filter which production systems leverage these stacks:</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {capabilityCards.map((cap) => {
              const Icon = cap.icon;
              const isSelected = activeCapability === cap.name;

              return (
                <button
                  key={cap.name}
                  onClick={() => {
                    if (isSelected) {
                      setActiveCapability(null); // Reset filter
                    } else {
                      setActiveCapability(cap.name);
                    }
                  }}
                  className={`text-left p-6 border rounded-lg transition-all duration-300 flex flex-col justify-between h-56 select-none relative overflow-hidden group ${
                    isSelected
                      ? "bg-[var(--color-accent)]/10 border-[var(--color-accent)] shadow-[0_0_20px_rgba(216,209,194,0.08)]"
                      : "bg-white/[0.01] border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Subtle active border glow */}
                  <div className="absolute inset-0 border border-[var(--color-accent)] opacity-0 scale-[0.98] group-hover:opacity-50 group-hover:scale-100 transition-all duration-300 pointer-events-none" />

                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-2.5 rounded border transition-colors ${
                        isSelected ? "border-[var(--color-accent)] text-[var(--color-accent)]" : "border-white/10 text-white/50 group-hover:text-white"
                      }`}>
                        <Icon size={18} />
                      </div>
                      <span className="font-mono text-[9px] text-white/30 border border-white/5 px-2 py-0.5 rounded uppercase">
                        {cap.stats}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-2 font-sans group-hover:text-[var(--color-accent)] transition-colors">
                      {cap.name}
                    </h4>
                    <p className="text-xs text-[var(--color-muted)] leading-relaxed line-clamp-2">
                      {cap.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[var(--color-dim)]">
                    <span>USED_IN: {cap.projects.length} SYSTEMS</span>
                    <span className={`transition-transform duration-300 ${isSelected ? "text-[var(--color-accent)]" : "group-hover:translate-x-1"}`}>
                      {isSelected ? "ACTIVE_FILTER_ON // CLICK_TO_RESET" : "CLICK_TO_FILTER →"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
