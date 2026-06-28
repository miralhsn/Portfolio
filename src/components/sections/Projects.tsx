"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, GitBranch, Terminal } from "lucide-react";
import { GridLightBackground } from "@/components/Backgrounds";
import { SlideOverCaseStudy, type CaseStudyData } from "@/components/SlideOverCaseStudy";

// Project Data with complete specifications for slide-overs
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
    color: "#6D5EF8",
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
    color: "#7EE7FF",
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
    techStack: ["FAISS", "OpenAI Embeddings", "LangChain", "FastAPI", "Next.js", "Redis"],
    color: "#C084FC",
    github: "https://github.com/miralhsn/Semantic-Search",
    demo: "https://github.com/miralhsn"
  }
];

// ─── TILT CARD COMPONENT ──────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: CaseStudyData;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates from center of card (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);
    
    // Rotate max 6 degrees
    const rotateX = -mouseY * 6;
    const rotateY = mouseX * 6;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      onClick={onClick}
      // Float up and down slowly, offset by index
      animate={{
        y: [0, -6, 0],
      }}
      transition={{
        duration: 5 + index * 0.6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="project-card group relative flex flex-col justify-between h-full rounded-2xl border border-white/[0.06] bg-[#070B14]/30 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.01]"
      data-cursor="card"
    >
      {/* Glow highlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at 50% 50%, ${project.color}0a, transparent 75%)`,
        }}
      />

      <div>
        {/* Card Header (Project Title & Status Badge) */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: project.color,
                boxShadow: `0 0 8px ${project.color}`,
              }}
            />
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">
              {project.id}
            </span>
          </div>
          <span
            className="rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold border"
            style={{
              borderColor: `${project.color}30`,
              backgroundColor: `${project.color}08`,
              color: project.color,
            }}
          >
            {project.status}
          </span>
        </div>

        {/* Project Name */}
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#7EE7FF] transition-colors">
          {project.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs leading-relaxed text-slate-400 mb-6">
          {project.shortDescription}
        </p>
      </div>

      <div>
        {/* Tech Stack pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded bg-white/[0.03] border border-white/[0.05] px-2 py-0.5 font-mono text-[9px] text-slate-500 hover:text-white hover:border-[#6D5EF8]/35 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-4 border-t border-white/[0.06] pt-4 font-mono text-[10px] text-slate-500">
          <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
            <Terminal size={11} />
            <span>Case Study</span>
          </span>
          <span className="ml-auto text-[9px] text-slate-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
            Explore →
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── PROJECTS SECTION COMPONENT ──────────────────────────────────────
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<CaseStudyData | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 px-6 sm:px-10 bg-[#070B14]"
      aria-label="Projects Section"
    >
      {/* Grid Light Beam Animation */}
      <GridLightBackground />

      <div className="relative z-10 mx-auto max-w-[1200px] w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-left"
        >
          <div className="font-mono text-xs uppercase tracking-widest text-[#7EE7FF] mb-3">
            02 // SHIPPED SYSTEMS
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight uppercase">
            Production Implementations<span className="text-[#6D5EF8]">.</span>
          </h2>
        </motion.div>

        {/* Card Grid Layout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projectsData.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>
      </div>

      {/* Slide-Over Panel Details */}
      <SlideOverCaseStudy
        isOpen={!!selectedProject}
        data={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
