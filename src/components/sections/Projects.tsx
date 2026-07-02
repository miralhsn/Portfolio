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
    color: "rgba(34, 197, 94, 0.04)", // Subtle Green
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
    color: "rgba(59, 130, 246, 0.04)", // Subtle Blue
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
    color: "rgba(234, 179, 8, 0.03)", // Subtle Bronze
    github: "https://github.com/miralhsn/Semantic-Search",
    demo: "https://github.com/miralhsn"
  },
  {
    id: "explainable-ai",
    name: "Explainable AI Engine",
    tagline: "Visualizing complex model prediction features.",
    status: "Active",
    shortDescription: "An inference explanation engine rendering SHAP and LIME values as interactive visual dependency trees and feature maps.",
    description: "Explainable AI System provides real-time explanations for deep neural networks, computing feature attributions and rendering visual logic flow diagram decision paths.",
    problem: "Black-box AI models make critical decisions in medical, financial, and security domains without audit trails, leading to compliance failures, hidden biases, and difficulty debugging silent model degradation.",
    solution: "Developed a distributed feature attribution service running SHAP kernel estimators and LIME locally. Wrapped outputs in responsive D3.js force-directed graphs and decision trees for human-in-the-loop review.",
    architecture: [
      { step: "Compute", detail: "Calculate SHAP/LIME attribution vectors on GPU during batch inference" },
      { step: "Map", detail: "Generate local explanation graphs representing feature weights" },
      { step: "Verify", detail: "Run counterfactual consistency tests on local models" },
      { step: "Render", detail: "Visualize feature dependency trees dynamically in client UI dashboard" }
    ],
    workflow: [
      { title: "Model Inference Log", description: "Captures inputs and predictions from deep tabular/neural models." },
      { title: "Attribution Generator", description: "Runs background workers calculating cooperative game theory Shapley values." },
      { title: "Decision Tree Builder", description: "Extracts decision node bounds and builds hierarchical JSON structures." },
      { title: "D3 Visualizer Engine", description: "Maps nodes to relative screen positions with interactive drag and zoom settings." }
    ],
    technicalDecisions: "Selected local SHAP calculations on server clusters over cloud APIs to maintain strict compliance data privacy boundaries. Implemented custom D3 layouts for smooth graph nodes rendering compared to static images.",
    challenges: "Reducing computational costs of Shapley kernel iterations to achieve <1.2s explanation limits. Managing nested JSON representations for multi-depth decision paths. Rendering thousands of chart elements without frame drops.",
    results: "De-obfuscated credit risk models for 3 enterprise client systems. Reduced model debugging cycles by 48%. Met regulatory audit criteria with 100% compliance transparency logs.",
    lessonsLearned: "Explainability should be integrated at training time, not just post-hoc. Background cache keys for identical input attributions saves 80% redundant CPU compute overloads.",
    techStack: ["SHAP", "LIME", "Python", "FastAPI", "React", "D3.js"],
    color: "rgba(168, 85, 247, 0.03)", // Subtle Purple
    github: "https://github.com/miralhsn/Explainable-AI",
    demo: "https://github.com/miralhsn"
  }
];

function CardSchematic({ type }: { type: string }) {
  if (type === "securevision") {
    return (
      <div className="relative w-full h-full overflow-hidden">
        {/* Cam grids overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(34,197,94,0.06)_1.5px,transparent_1.5px)] bg-[size:12px_12px]" />
        
        <svg className="w-full h-full text-green-500/10" viewBox="0 0 200 150" fill="none">
          {/* Cameras Grid */}
          <rect x="8" y="8" width="88" height="62" rx="4" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="104" y="8" width="88" height="62" rx="4" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="8" y="80" width="88" height="62" rx="4" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="104" y="80" width="88" height="62" rx="4" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />

          {/* Bounding box brackets */}
          <path d="M40,25 h8 V33 M80,25 h-8 V33 M40,55 h8 V47 M80,55 h-8 V47" stroke="#22c55e" strokeWidth="1.5" />
          <circle cx="60" cy="40" r="5" stroke="#22c55e" strokeWidth="1.5" />

          {/* Camera overlay text */}
          <text x="14" y="20" fill="currentColor" className="text-[6px] font-mono font-bold uppercase">CAM_01 // INFERENCE</text>
          <text x="14" y="28" fill="#22c55e" className="text-[6px] font-mono">OBJECT: SHOPPER_08</text>
          
          <rect x="120" y="20" width="56" height="38" rx="2" stroke="currentColor" strokeWidth="0.75" />
          <text x="124" y="32" fill="#22c55e" className="text-[5px] font-mono">YOLO: BBOX</text>

          {/* Blinking record light */}
          <circle cx="180" cy="18" r="2.5" fill="#ef4444" className="animate-pulse" />
          <text x="160" y="20" fill="#ef4444" className="text-[5.5px] font-mono font-bold">REC</text>

          {/* Scrolling Scanning laser */}
          <line x1="8" y1="0" x2="192" y2="0" stroke="#22c55e" strokeWidth="1.5" opacity="0.8">
            <animate attributeName="y1" values="8;142;8" dur="5s" repeatCount="indefinite" />
            <animate attributeName="y2" values="8;142;8" dur="5s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>
    );
  }

  if (type === "code-reviewer") {
    return (
      <div className="relative w-full h-full overflow-hidden p-2 rounded bg-black/45 border border-white/5 font-mono text-[7px] text-white/40 flex flex-col justify-between">
        {/* Terminal Header */}
        <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2 select-none">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
            <span className="h-2 w-2 rounded-full bg-[#eab308]" />
            <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
          </div>
          <span className="text-[6px] text-white/20">AST_PARSER_IDE // Reviewer.tsx</span>
        </div>
        
        {/* Animated Code Terminal */}
        <div className="flex-1 space-y-2 select-none overflow-hidden relative">
          <div className="text-blue-400">&gt; npx next lint --dir src</div>
          
          <div className="border-l border-red-500/40 pl-2 bg-red-500/5 py-1">
            <div className="text-red-400 font-bold">LINT_WARN: UNUSED_DECLARATION</div>
            <div>- const secret_key = process.env.JWT_SECRET;</div>
          </div>

          <div className="border-l border-green-500/40 pl-2 bg-green-500/5 py-1">
            <div className="text-green-400 font-bold">AST_OPTIMIZE: SECURE_TOKEN</div>
            <div>+ const secret_key = await load_kms_secret();</div>
          </div>

          <div className="text-white/60">
            <span>&gt; compiling modules</span>
            <span className="inline-block w-1.5 h-3 ml-1 bg-white/60 align-middle animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "semantic-search") {
    return (
      <div className="relative w-full h-full overflow-hidden">
        {/* Gradient Mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/5 via-transparent to-transparent pointer-events-none" />

        <svg className="w-full h-full text-yellow-500/10" viewBox="0 0 200 150" fill="none">
          {/* Connecting lines */}
          <g stroke="currentColor" strokeWidth="1">
            {/* Input query node to cluster connectors */}
            <path d="M20,75 L60,40" strokeDasharray="3 3" />
            <path d="M20,75 L60,110" />
            <path d="M60,40 L120,40" />
            <path d="M60,40 L120,75" />
            <path d="M60,110 L120,75" />
            <path d="M60,110 L120,110" strokeDasharray="2 2" />
            <path d="M120,75 L180,75" strokeWidth="1.5" stroke="#eab308" />
          </g>

          {/* Animated flowing particles along lines */}
          <circle cx="20" cy="75" r="2.5" fill="#eab308">
            <animateMotion dur="4s" repeatCount="indefinite" path="M20,75 L60,40 L120,75 L180,75" />
          </circle>
          <circle cx="20" cy="75" r="2.5" fill="currentColor">
            <animateMotion dur="5.5s" repeatCount="indefinite" path="M20,75 L60,110 L120,75" />
          </circle>

          {/* Interactive nodes */}
          <circle cx="20" cy="75" r="5.5" stroke="#eab308" strokeWidth="1.5" fill="#050608" />
          <circle cx="60" cy="40" r="5" stroke="currentColor" strokeWidth="1" fill="#050608" />
          <circle cx="60" cy="110" r="5" stroke="currentColor" strokeWidth="1" fill="#050608" />
          <circle cx="120" cy="40" r="5" stroke="currentColor" strokeWidth="1" fill="#050608" />
          <circle cx="120" cy="75" r="6" stroke="#eab308" strokeWidth="1.5" fill="#050608" />
          <circle cx="120" cy="110" r="5" stroke="currentColor" strokeWidth="1" fill="#050608" />
          <circle cx="180" cy="75" r="5.5" stroke="#eab308" strokeWidth="1.5" fill="#eab308" />

          {/* Node Labels */}
          <text x="12" y="65" fill="#eab308" className="text-[5px] font-mono uppercase">QUERY_INPUT</text>
          <text x="105" y="90" fill="currentColor" className="text-[5.5px] font-mono">SIMILARITY: 0.89</text>
          <text x="156" y="67" fill="#eab308" className="text-[5px] font-mono uppercase font-bold">RAG_OUT</text>
        </svg>
      </div>
    );
  }

  // explainable-ai
  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col justify-between p-1 bg-black/10 rounded">
      <svg className="w-full h-[65%] text-purple-500/10" viewBox="0 0 200 90" fill="none">
        {/* Decision trees */}
        <circle cx="100" cy="14" r="5.5" stroke="#a855f7" strokeWidth="1.5" fill="#050608" />
        <line x1="96" y1="18" x2="60" y2="44" stroke="currentColor" strokeWidth="1" />
        <line x1="104" y1="18" x2="140" y2="44" stroke="currentColor" strokeWidth="1" />

        <circle cx="60" cy="48" r="5" stroke="currentColor" strokeWidth="1" fill="#050608" />
        <circle cx="140" cy="48" r="5" stroke="#a855f7" strokeWidth="1.25" fill="#050608" />

        <line x1="60" y1="53" x2="40" y2="76" stroke="currentColor" strokeWidth="0.75" />
        <line x1="60" y1="53" x2="80" y2="76" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />

        <circle cx="40" cy="80" r="4" stroke="currentColor" strokeWidth="1" fill="#050608" />
        <circle cx="80" cy="80" r="4" stroke="currentColor" strokeWidth="1" fill="#050608" />

        <line x1="140" y1="53" x2="120" y2="76" stroke="currentColor" strokeWidth="0.75" />
        <line x1="140" y1="53" x2="160" y2="76" stroke="#a855f7" strokeWidth="1" />

        <circle cx="120" cy="80" r="4" stroke="currentColor" strokeWidth="1" fill="#050608" />
        <circle cx="160" cy="80" r="4.5" stroke="#a855f7" strokeWidth="1.5" fill="#a855f7" />

        <text x="145" y="42" fill="#a855f7" className="text-[5.5px] font-mono uppercase font-bold animate-pulse">SHAP_SPLIT</text>
      </svg>

      {/* Feature attribution charts */}
      <div className="h-[30%] border-t border-white/5 bg-black/10 p-2 flex flex-col justify-center gap-1.5 font-mono text-[5.5px]">
        <div className="flex items-center gap-2">
          <span className="text-white/30 w-16">Feature 01:</span>
          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} whileInView={{ width: "80%" }} transition={{ duration: 1.2, ease: "easeOut" }} className="h-full bg-green-500/40" />
          </div>
          <span className="text-green-400 font-bold">+0.42</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/30 w-16">Feature 02:</span>
          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} whileInView={{ width: "55%" }} transition={{ duration: 1.2, ease: "easeOut" }} className="h-full bg-red-500/40" />
          </div>
          <span className="text-red-400 font-bold">-0.28</span>
        </div>
      </div>
    </div>
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
        scale: isActive ? 1.04 : 0.92,
        opacity: isActive ? 1 : 0.38,
        y: [0, -8, 0],
      }}
      transition={{
        scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 5.5, ease: "easeInOut", repeat: Infinity, delay: index * 0.45 }
      }}
      className="relative flex flex-col justify-between shrink-0 w-[82vw] sm:w-[45vw] lg:w-[28vw] aspect-[3/4.2] border border-white/10 hover:border-white/20 bg-[var(--color-bg-soft)] p-6 select-none cursor-none snap-center overflow-hidden group shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
      data-cursor="VIEW"
    >
      {/* Visual background gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.015] to-transparent pointer-events-none" />

      {/* Dynamic Hover Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-[40px] -z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${
            project.id === "securevision"
              ? "#22c55e"
              : project.id === "code-reviewer"
              ? "#3b82f6"
              : project.id === "semantic-search"
              ? "#eab308"
              : "#a855f7"
          } 0%, transparent 60%)`,
          opacity: 0.14
        }}
      />

      {/* Hover border draw */}
      <div className="absolute inset-0 border border-[var(--color-accent)] opacity-0 scale-[0.98] group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none" />

      {/* Card Header */}
      <div className="flex items-start justify-between">
        <span className="display-type text-[4.5rem] leading-none text-white/5 group-hover:text-white/10 transition-colors duration-300">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex flex-col items-end">
          <span className="micro-label text-[9px] border border-white/10 px-2.5 py-0.5 rounded bg-black/30">
            {project.status}
          </span>
          <span className="text-[9px] font-mono text-[var(--color-dim)] mt-2">
            ID: {project.id}
          </span>
        </div>
      </div>

      {/* Schematic animation layer */}
      <div className="flex-1 my-6 flex items-center justify-center overflow-hidden border border-white/5 bg-black/25 rounded p-4 relative">
        <div className="w-full h-full transform group-hover:scale-[1.03] transition-transform duration-500">
          <CardSchematic type={project.id} />
        </div>
      </div>

      {/* Info Block (Expands metadata slightly on hover) */}
      <div className="relative">
        <h3 className="text-xl font-bold tracking-tight text-white mb-2 font-sans group-hover:text-[var(--color-accent)] transition-colors duration-300">
          {project.name}
        </h3>
        
        {/* Supporting description */}
        <p className="text-xs text-[var(--color-muted)] line-clamp-2 leading-relaxed mb-4">
          {project.shortDescription}
        </p>

        {/* Dynamic metadata appearing on hover */}
        <div className="h-0 opacity-0 group-hover:h-5 group-hover:opacity-100 transition-all duration-300 overflow-hidden text-[9px] font-mono text-[var(--color-accent)]/80">
          SYSTEM_TYPE: DEEP_LEARNING_PIPELINE
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-1">
          <span className="text-[9px] font-mono text-[var(--color-dim)] truncate max-w-[70%]">
            {project.techStack.join(" // ")}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[var(--color-accent)] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
            <span>Inspect</span>
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

  // Filter projects dynamically based on capability
  const filteredProjects = activeCapability
    ? projectsData.filter((p) => {
        if (activeCapability === "Computer Vision") {
          return p.techStack.some((t) => ["YOLOv10", "DeepSORT", "PyTorch", "GStreamer", "OpenCV"].includes(t));
        }
        if (activeCapability === "LLMs") {
          return p.techStack.some((t) => ["GPT-4", "LangChain", "OpenAI", "FAISS"].includes(t));
        }
        if (activeCapability === "Backend") {
          return p.techStack.some((t) => ["FastAPI", "Redis", "PostgreSQL", "GStreamer", "Python"].includes(t));
        }
        if (activeCapability === "Frontend") {
          return p.techStack.some((t) => ["Next.js", "React", "D3.js"].includes(t));
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
      className="relative overflow-hidden border-b hairline py-[var(--section-space-tight)] transition-colors duration-1000 bg-[#050608]"
      style={{ backgroundColor: activeThemeColor }}
      aria-label="Systems Explorer Section"
    >
      <TechnicalGrid />

      {/* Smooth blend overlays */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#050608] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050608] to-transparent pointer-events-none z-10" />

      <div className="site-shell mb-10 relative z-10">
        <div className="editorial-grid">
          <div className="col-span-12 md:col-span-4">
            <div className="micro-label text-accent">
              02 // SYSTEMS EXPLORER
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <HeadlineReveal
              lines={[
                <span key="production">Featured</span>,
                <span key="implementations">Systems{activeCapability ? ` / ${activeCapability}` : ""}<span className="text-accent">.</span></span>,
              ]}
            />
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden py-10 z-10">
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
            NO_SYSTEMS_FOUND_MATCHING_SELECTED_CAPABILITY
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
