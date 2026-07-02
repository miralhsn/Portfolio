"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Terminal, Eye, Cpu, Database, Network } from "lucide-react";
import HeadlineReveal from "@/components/motion/HeadlineReveal";
import { SlideOverCaseStudy, type CaseStudyData } from "@/components/SlideOverCaseStudy";
import TechnicalGrid from "./TechnicalGrid";

const projectsData: CaseStudyData[] = [
  {
    id: "securevision",
    name: "SecureVision",
    tagline: "Multi-camera retail surveillance system.",
    status: "Production Ready",
    shortDescription: "A real-time retail surveillance system classifying behavioral risk and tracking objects across non-overlapping streams.",
    description: "SecureVision is a high-precision, low-latency multi-camera surveillance architecture built to detect retail anomalies and non-violent crimes (shoplifting, cash-skimming, loitering). It tracks objects across overlapping and non-overlapping cameras, running inference at 30fps per stream.",
    problem: "Traditional surveillance setups rely on manual monitoring of hundreds of hours of raw footage, resulting in missed incidents, delayed responses, and high operational costs. Additionally, naive object detection generates severe false alert rates from ordinary shopper movement.",
    solution: "We engineered an end-to-end behavioral parsing pipeline that tracking shopper trajectories via DeepSORT and classifies temporal action frames using sequence model classifiers, yielding a 94% precision rate with sub-200ms latency.",
    architecture: [
      { step: "Ingest", detail: "Multi-stream RTSP feed parsing via hardware-accelerated GStreamer pipelines" },
      { step: "Detect", detail: "YOLOv10 object detection running at 30fps with GPU dynamic batching" },
      { step: "Track", detail: "DeepSORT tracking with Re-ID embeddings for camera-to-camera object handoffs" },
      { step: "Classify", detail: "LSTM behavioral classifier evaluating sequence trajectory vectors" },
      { step: "Alert", detail: "FastAPI websocket dispatcher broadcasting instant events to dashboards" }
    ],
    workflow: [
      { title: "RTSP Video Pipeline", description: "Standardizes high-resolution video inputs to a uniform 30 FPS stream for optimal model intake." },
      { title: "Object Detection Model", description: "Locates shoppers and assets using YOLOv10, cropping bounding boxes in real-time." },
      { title: "Deepsort Occlusion Handling", description: "Maintains unique identifier IDs during visual occlusions and when shoppers move between camera angles." },
      { title: "LSTM Temporal Risk Analysis", description: "Evaluates the historical sequence of spatial bounding boxes to flag anomalies." },
      { title: "PostgreSQL Webhook Queue", description: "Persists incident logs and emits WebSocket broadcast alerts immediately." }
    ],
    technicalDecisions: "Opted for YOLOv10 for local inference due to the optimal latency-accuracy curve compared to Detectron2. Selected DeepSORT over ByteTrack because of its Re-ID embeddings, which are critical for matching shoppers across non-overlapping retail blindspots.",
    challenges: "Handling concurrent, high-throughput GPU processing without bottlenecks. Achieving <200ms end-to-end alert dispatch latency. Training sequence models on highly unbalanced, sparse retail anomaly datasets.",
    results: "Deployed in 5 high-traffic retail spaces. Reached 94% precision on shoplifting alerts, and decreased total false alarm logs by 89%, saving security operators hours of manual review.",
    lessonsLearned: "Telemetry is vital: real-time GPU/CPU resource dashboards saved countless debugging hours during deployment. Clean and diverse Re-ID data is the primary bottleneck for multi-camera tracking stability.",
    techStack: ["YOLOv10", "DeepSORT", "PyTorch", "GStreamer", "FastAPI", "PostgreSQL"],
    color: "rgba(34, 197, 94, 0.05)", // Deep subtle green theme
    github: "https://github.com/miralhsn/SecureVision",
    demo: "https://github.com/miralhsn"
  },
  {
    id: "code-reviewer",
    name: "AI Code Reviewer",
    tagline: "Structured LLM-powered code review at CI/CD scale.",
    status: "Active",
    shortDescription: "An automated reviewer utilizing AST code parsing and GPT-4 function calling to provide architectural analysis on PR commits.",
    description: "AI Code Reviewer is an automated developer assistant that parses git commits at the AST (Abstract Syntax Tree) level, checks for syntax, security threats, and memory leaks, and delivers structured feedback directly to pull requests.",
    problem: "Manual peer review is a critical bottleneck in fast-moving engineering teams. Senior developers spend hours auditing style compliance, syntax errors, and standard security flaws rather than focusing on business logic and architecture.",
    solution: "Built a GitHub Action integration powered by LangChain and GPT-4. Rather than scanning files line-by-line, the system analyzes AST context chunks and outputs structured JSON review items using OpenAI Function Calling.",
    architecture: [
      { step: "Parse", detail: "AST-level language-aware file chunking to preserve semantic declarations" },
      { step: "Route", detail: "Diff classifier routing syntax, performance, and security issues to focused agents" },
      { step: "Analyze", detail: "GPT-4 inference running typed JSON schema mapping for structured output" },
      { step: "Rank", detail: "Heuristic severity engines rating anomalies from stylistic to blocking security threats" },
      { step: "Deliver", detail: "GitHub API comments dispatcher writing contextual reviews directly inside PR lines" }
    ],
    workflow: [
      { title: "PR Git Hook", description: "Triggers on Git Pull Request commits, isolating and fetching altered code files." },
      { title: "AST Parser", description: "Breaks code files down into meaningful logic trees rather than flat text blocks." },
      { title: "LangChain Orchestrator", description: "Assembles context prompts and coordinates targeted LLM calls." },
      { title: "Function Calling Engine", description: "Ensures the LLM outputs strict JSON objects adhering to a Pydantic schema." },
      { title: "PR Comment API", description: "Post comments synchronously onto the exact lines of code within the GitHub UI." }
    ],
    technicalDecisions: "Used AST-level parsing instead of line chunking to maintain semantic context for high-accuracy suggestions. Used JSON Schema function-calling constraints rather than raw text prompting, resulting in a zero-percent JSON parser failure rate.",
    challenges: "Preventing LLM hallucinations on code line references. Reducing GPT-4 context-token expenses on huge codebase checkins. Maintaining execution times low enough to prevent breaking continuous integration workflows.",
    results: "Reduced average developer review cycles by 35% across integrated repositories. Achieved a 92% security anomaly detection precision rate. Logged a 0% JSON structural parser error rate.",
    lessonsLearned: "Strict parsing schema structures are mandatory for production LLM integrations. LLMs must be fed localized AST trees, not raw file text, to avoid context-token bloat and hallucination patterns.",
    techStack: ["GPT-4", "LangChain", "FastAPI", "Pydantic", "Redis", "GitHub API"],
    color: "rgba(59, 130, 246, 0.05)", // Deep subtle blue theme
    github: "https://github.com/miralhsn/AI-Code-Reviewer",
    demo: "https://github.com/miralhsn"
  },
  {
    id: "semantic-search",
    name: "Semantic Search Platform",
    tagline: "RAG pipeline with vector retrieval and LLM synthesis.",
    status: "Active",
    shortDescription: "High-scale retrieval-augmented generation engine utilizing hybrid search and self-hosted vector indexing.",
    description: "A fast, scalable search engine designed for enterprise knowledge management. It integrates keyword search with dense vector embeddings to return contextual documents with precise citation attributions.",
    problem: "Standard keyword-matching systems (like BM25) fail when users query abstract concepts rather than matching strings. On the other hand, pure vector search is inaccurate for specialized keywords, product codes, or acronyms.",
    solution: "Designed a hybrid BM25 and vector search pipeline using FAISS indices. A reciprocal rank fusion (RRF) re-ranker merges scoring outputs before presenting retrieved context to GPT-4 to synthesize grounded answers.",
    architecture: [
      { step: "Ingest", detail: "Chunking documents with overlapping window steps to preserve cross-block logic" },
      { step: "Embed", detail: "Generating dense vectors via text-embedding-3-large at 3072 dimensions" },
      { step: "Index", detail: "Self-hosted FAISS HNSW indexes optimizing high-velocity vector lookups" },
      { step: "Retrieve", detail: "Hybrid BM25 keyword matching + vector similarity lookup with MMR re-ranking" },
      { step: "Synthesize", detail: "In-context GPT-4 prompt orchestration generating source-grounded answers" }
    ],
    workflow: [
      { title: "Document Parser", description: "Extracts and cleans raw text from PDFs, HTML files, and markdown docs." },
      { title: "Vector Embedder", description: "Generates high-dimensional semantic vectors using OpenAI embedding APIs." },
      { title: "FAISS HNSW Lookup", description: "Executes approximate nearest neighbor checks in <50ms." },
      { title: "BM25 Search", description: "Runs concurrent keyword searches in Elasticsearch/PostgreSQL." },
      { title: "RRF Re-Ranker", description: "Combines vector scores and keyword match indexes into a final ordered result set." },
      { title: "LLM Synthesizer", description: "Takes top 5 chunks to draft a cohesive response with bracketed inline citations." }
    ],
    technicalDecisions: "Implemented FAISS HNSW indexing locally rather than a cloud vector DB to minimize external API costs and ensure sub-50ms index query latency. Used MMR (Maximal Marginal Relevance) to enforce diversity and prevent duplicate information retrieval.",
    challenges: "Mitigating embedding space collapse on highly technical corpora. Implementing strict inline citation constraints on the synthesis model. Maintaining low-latency query results (<800ms) with multiple network hops.",
    results: "Delivers query answers with <800ms total latency. Achieved an NDCG@10 rank score of 0.89. Increased corporate search success rates by 87% compared to historical BM25 databases.",
    lessonsLearned: "Hybrid retrieval is mandatory for robust production search. Embedding models must be periodically fine-tuned or augmented with custom domain synonym dictionaries to capture industry-specific vocabulary.",
    techStack: ["FAISS", "OpenAI", "LangChain", "FastAPI", "Next.js", "Redis"],
    color: "rgba(234, 179, 8, 0.04)", // Deep subtle bronze/yellow theme
    github: "https://github.com/miralhsn/Semantic-Search",
    demo: "https://github.com/miralhsn"
  }
];

function CardSchematic({ type }: { type: string }) {
  if (type === "securevision") {
    return (
      <svg className="w-full h-full text-[#d8d1c2]/20" viewBox="0 0 200 150" fill="none">
        <rect x="10" y="10" width="80" height="60" rx="3" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <rect x="110" y="10" width="80" height="60" rx="3" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <rect x="10" y="80" width="80" height="60" rx="3" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <rect x="110" y="80" width="80" height="60" rx="3" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="50" cy="40" r="6" stroke="#d8d1c2" strokeWidth="1" className="animate-pulse" />
        <path d="M50 25 V55 M35 40 H65" stroke="currentColor" strokeWidth="0.5" />
        <text x="60" y="35" fill="currentColor" className="text-[6px] font-mono">TRACK_ID: 981</text>
        <text x="60" y="45" fill="#22c55e" className="text-[6px] font-mono">CONF: 98.4%</text>
        <rect x="130" y="25" width="40" height="30" stroke="#d8d1c2" strokeWidth="1" />
        <line x1="130" y1="25" x2="115" y2="15" stroke="currentColor" strokeWidth="0.5" />
        <text x="133" y="38" fill="currentColor" className="text-[5px] font-mono">YOLO: PERSON</text>
      </svg>
    );
  }

  if (type === "code-reviewer") {
    return (
      <svg className="w-full h-full text-[#d8d1c2]/20" viewBox="0 0 200 150" fill="none">
        <circle cx="100" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" />
        <text x="96" y="23" fill="currentColor" className="text-[8px] font-bold font-mono">R</text>
        <line x1="100" y1="28" x2="60" y2="60" stroke="currentColor" strokeWidth="1" />
        <line x1="100" y1="28" x2="140" y2="60" stroke="currentColor" strokeWidth="1" />
        <circle cx="60" cy="68" r="8" stroke="currentColor" strokeWidth="1" />
        <circle cx="140" cy="68" r="8" stroke="#d8d1c2" strokeWidth="1.5" />
        <line x1="60" y1="76" x2="30" y2="110" stroke="currentColor" strokeWidth="0.5" />
        <line x1="60" y1="76" x2="90" y2="110" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="30" cy="118" r="6" stroke="currentColor" strokeWidth="1" />
        <circle cx="90" cy="118" r="6" stroke="currentColor" strokeWidth="1" />
        <text x="130" y="100" fill="#3b82f6" className="text-[6px] font-mono">JSON_SCHEMA: MATCH</text>
        <rect x="125" y="105" width="60" height="20" rx="2" stroke="currentColor" strokeWidth="0.5" />
        <text x="130" y="117" fill="currentColor" className="text-[5px] font-mono">Pydantic validation</text>
      </svg>
    );
  }

  return (
    <svg className="w-full h-full text-[#d8d1c2]/20" viewBox="0 0 200 150" fill="none">
      <circle cx="40" cy="40" r="1.5" fill="currentColor" />
      <circle cx="50" cy="30" r="1.5" fill="currentColor" />
      <circle cx="35" cy="55" r="1.5" fill="currentColor" />
      <circle cx="70" cy="45" r="1.5" fill="currentColor" />
      <circle cx="150" cy="110" r="1.5" fill="currentColor" />
      <circle cx="160" cy="100" r="1.5" fill="currentColor" />
      <circle cx="140" cy="120" r="1.5" fill="currentColor" />
      <path d="M45 42 C 70 80, 110 80, 150 105" stroke="#d8d1c2" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M150 105 L142 105 M150 105 L150 97" stroke="#d8d1c2" strokeWidth="1" />
      <circle cx="95" cy="75" r="14" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
      <text x="105" y="65" fill="currentColor" className="text-[5px] font-mono">FAISS ANN LIST</text>
      <text x="80" y="140" fill="currentColor" className="text-[6px] font-mono">RRF Similarity: 0.892</text>
    </svg>
  );
}

function ProjectCard({
  project,
  index,
  isActive,
  onClick
}: {
  project: CaseStudyData;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    setTilt({ x: x * 15, y: -y * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      animate={{
        scale: isActive ? 1.03 : 0.94,
        opacity: isActive ? 1 : 0.45,
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col justify-between shrink-0 w-[82vw] sm:w-[45vw] lg:w-[28vw] aspect-[3/4.2] border hairline bg-[var(--color-bg-soft)] p-6 select-none cursor-none snap-center overflow-hidden group`}
      data-cursor="VIEW"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-[40px] -z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${project.color === "rgba(34, 197, 94, 0.05)" ? "#22c55e" : project.color === "rgba(59, 130, 246, 0.05)" ? "#3b82f6" : "#eab308"} 0%, transparent 60%)`,
          opacity: 0.12
        }}
      />

      <div className="absolute inset-0 border border-[var(--color-accent)] opacity-0 scale-[0.98] group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none" />

      <div className="flex items-start justify-between">
        <span className="display-type text-[4.5rem] leading-none text-white/5 group-hover:text-white/10 transition-colors duration-300">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex flex-col items-end">
          <span className="micro-label text-[9px] border border-white/10 px-2 py-0.5 rounded bg-black/30">
            {project.status}
          </span>
          <span className="text-[10px] font-mono text-[var(--color-dim)] mt-2">
            ID: {project.id}
          </span>
        </div>
      </div>

      <div className="flex-1 my-6 flex items-center justify-center overflow-hidden border border-white/5 bg-black/20 rounded p-4 relative">
        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-500">
          <CardSchematic type={project.id} />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold tracking-tight text-white mb-2 font-sans group-hover:text-[var(--color-accent)] transition-colors duration-300">
          {project.name}
        </h3>
        <p className="text-xs text-[var(--color-muted)] line-clamp-2 leading-relaxed mb-4">
          {project.shortDescription}
        </p>
        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <span className="text-[10px] font-mono text-[var(--color-dim)] truncate max-w-[70%]">
            {project.techStack.join(" // ")}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[var(--color-accent)] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
            <span>Explore</span>
            <ArrowUpRight size={10} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ activeCapability }: { activeCapability: string | null }) {
  const [selectedProject, setSelectedProject] = useState<CaseStudyData | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeThemeColor, setActiveThemeColor] = useState("rgba(5, 6, 8, 0.95)");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter projects dynamically
  const filteredProjects = activeCapability
    ? projectsData.filter((p) => {
        if (activeCapability === "Computer Vision") {
          return p.techStack.some((t) => ["YOLOv10", "DeepSORT", "PyTorch", "GStreamer", "OpenCV"].includes(t));
        }
        if (activeCapability === "LLMs") {
          return p.techStack.some((t) => ["GPT-4", "LangChain", "OpenAI", "FAISS"].includes(t));
        }
        if (activeCapability === "Backend") {
          return p.techStack.some((t) => ["FastAPI", "Redis", "PostgreSQL", "GStreamer"].includes(t));
        }
        if (activeCapability === "Frontend") {
          return p.techStack.some((t) => ["Next.js"].includes(t));
        }
        if (activeCapability === "Cloud") {
          return p.techStack.some((t) => ["GitHub API", "FastAPI"].includes(t));
        }
        if (activeCapability === "Databases") {
          return p.techStack.some((t) => ["PostgreSQL", "Redis", "FAISS"].includes(t));
        }
        return true;
      })
    : projectsData;

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;

    let cardWidth = containerWidth * 0.82;
    if (window.innerWidth >= 1024) {
      cardWidth = containerWidth * 0.28;
    } else if (window.innerWidth >= 640) {
      cardWidth = containerWidth * 0.45;
    }

    const center = scrollLeft + containerWidth / 2;
    const gap = 16;
    const step = cardWidth + gap;

    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < filteredProjects.length; i++) {
      const cardCenter = i * step + step / 2;
      const distance = Math.abs(center - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    setActiveIndex(closestIndex);
  };

  // Reset activeIndex and scroll when filter changes
  useEffect(() => {
    setActiveIndex(0);
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [activeCapability]);

  useEffect(() => {
    const selected = filteredProjects[activeIndex];
    if (selected) {
      setActiveThemeColor(selected.color);
    } else {
      setActiveThemeColor("rgba(5, 6, 8, 0.95)");
    }
  }, [activeIndex, filteredProjects]);

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-b hairline py-[var(--section-space-tight)] transition-colors duration-1000"
      style={{ backgroundColor: activeThemeColor }}
      aria-label="Projects Section"
    >
      <TechnicalGrid />

      <div className="site-shell mb-10">
        <div className="editorial-grid">
          <div className="col-span-12 md:col-span-4">
            <div className="micro-label text-accent">
              02 // SYSTEMS EXPLORER
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <HeadlineReveal
              lines={[
                <span key="production">Shipped AI</span>,
                <span key="implementations">Architectures{activeCapability ? ` / ${activeCapability}` : ""}<span className="text-accent">.</span></span>,
              ]}
            />
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden py-10">
        {filteredProjects.length > 0 ? (
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none px-[var(--grid-margin)]"
            style={{ scrollbarWidth: "none" }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isActive={index === activeIndex}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-[var(--color-dim)] font-mono text-sm">
            NO_PROJECTS_FOUND_MATCHING_SELECTED_CAPABILITY
          </div>
        )}

        {filteredProjects.length > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const container = scrollContainerRef.current;
                  if (!container) return;
                  let cardWidth = container.clientWidth * 0.82;
                  if (window.innerWidth >= 1024) cardWidth = container.clientWidth * 0.28;
                  else if (window.innerWidth >= 640) cardWidth = container.clientWidth * 0.45;

                  const step = cardWidth + 16;
                  container.scrollTo({
                    left: index * step - (container.clientWidth - cardWidth) / 2,
                    behavior: "smooth"
                  });
                  setActiveIndex(index);
                }}
                className={`h-1 transition-all duration-300 rounded-full ${
                  index === activeIndex ? "w-8 bg-[var(--color-accent)]" : "w-2 bg-white/20"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <SlideOverCaseStudy
        isOpen={!!selectedProject}
        data={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
