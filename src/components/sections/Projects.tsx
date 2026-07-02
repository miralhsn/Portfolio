"use client";

import { useCallback, useState } from "react";
import { ArrowUpRight, Terminal } from "lucide-react";
import HeadlineReveal from "@/components/motion/HeadlineReveal";
import { SlideOverCaseStudy, type CaseStudyData } from "@/components/SlideOverCaseStudy";

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
    color: "#d8d1c2",
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
    color: "#d8d1c2",
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
    color: "#d8d1c2",
    github: "https://github.com/miralhsn/Semantic-Search",
    demo: "https://github.com/miralhsn"
  }
];

function ProjectPreview({
  project,
  index,
  position,
  visible,
}: {
  project: CaseStudyData | null;
  index: number;
  position: { x: number; y: number };
  visible: boolean;
}) {
  if (!project) return null;

  return (
    <div
      className="pointer-events-none fixed z-40 hidden w-[27rem] border hairline bg-[var(--color-bg-soft)] p-5 transition-[opacity,transform] duration-300 ease-[var(--ease-out-expo)] lg:block"
      style={{
        left: position.x,
        top: position.y,
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0) scale(1)" : "translate3d(0,14px,0) scale(0.96)",
      }}
    >
      <div className="aspect-[4/3] border hairline bg-[var(--color-bg)] p-5">
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-start justify-between gap-6">
            <span className="display-type text-[6rem] leading-none text-[rgba(247,246,240,0.08)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="micro-label text-right">{project.status}</span>
          </div>
          <div>
            <p className="micro-label mb-3">{project.id}</p>
            <p className="max-w-[18rem] text-base font-semibold leading-tight text-[var(--color-text)]">
              {project.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectRow({
  project,
  index,
  onClick,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
  active,
  dimmed,
}: {
  project: CaseStudyData;
  index: number;
  onClick: () => void;
  onHoverStart: (project: CaseStudyData, index: number, e: React.MouseEvent) => void;
  onHoverMove: (e: React.MouseEvent) => void;
  onHoverEnd: () => void;
  active: boolean;
  dimmed: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={(e) => onHoverStart(project, index, e)}
      onMouseMove={onHoverMove}
      onMouseLeave={onHoverEnd}
      data-cursor="VIEW"
      className="focus-ring group grid w-full grid-cols-12 gap-4 border-t hairline py-7 text-left transition-[opacity,padding] duration-300 ease-[var(--ease-out-expo)] hover:px-3 md:py-10"
      style={{ opacity: dimmed && !active ? 0.34 : 1 }}
    >
      <div className="col-span-3 sm:col-span-2 lg:col-span-1">
        <span className="micro-label">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="col-span-9 sm:col-span-5 lg:col-span-4">
        <span className="micro-label mb-3 block">{project.id}</span>
        <h3 className="text-[clamp(2.5rem,6vw,6rem)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
          {project.name}
        </h3>
      </div>

      <div className="col-span-12 sm:col-span-5 lg:col-span-4">
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="micro-label text-accent">{project.status}</span>
          <span className="h-px w-8 bg-[var(--color-line)]" />
          <span className="body-small text-[var(--color-muted)]">{project.tagline}</span>
        </div>
        <p className="body-small max-w-[42rem]">{project.shortDescription}</p>
        <p className="mt-5 text-xs font-semibold leading-relaxed text-dim">
          {project.techStack.join(" / ")}
        </p>
      </div>

      <div className="col-span-12 flex items-end justify-between gap-4 text-sm font-bold text-[var(--color-text)] sm:col-span-12 lg:col-span-3 lg:justify-end">
        <span className="inline-flex items-center gap-2">
          <Terminal size={15} strokeWidth={1.8} />
          <span>Case Study</span>
        </span>
        <span className="inline-flex items-center gap-2 text-dim transition-colors duration-300 group-hover:text-[var(--color-text)]">
          <span>Explore â†’</span>
          <ArrowUpRight size={17} strokeWidth={1.6} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </div>
    </button>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<CaseStudyData | null>(null);
  const [activeProject, setActiveProject] = useState<CaseStudyData | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const previewProject = activeProject ?? projectsData[0];

  const updatePreviewPosition = useCallback((e: React.MouseEvent) => {
    const width = 432;
    const height = 380;
    const x = Math.min(Math.max(e.clientX + 28, 24), window.innerWidth - width - 24);
    const y = Math.min(Math.max(e.clientY - height / 2, 24), window.innerHeight - height - 24);
    setPreviewPosition({ x, y });
  }, []);

  const handleHoverStart = useCallback(
    (project: CaseStudyData, index: number, e: React.MouseEvent) => {
      setActiveProject(project);
      setActiveIndex(index);
      setPreviewVisible(true);
      updatePreviewPosition(e);
    },
    [updatePreviewPosition],
  );

  const handleHoverMove = useCallback(
    (e: React.MouseEvent) => {
      updatePreviewPosition(e);
    },
    [updatePreviewPosition],
  );

  const handleHoverEnd = useCallback(() => {
    setPreviewVisible(false);
  }, []);

  return (
    <section
      id="projects"
      className="relative border-b hairline bg-[var(--color-bg)] section-space"
      aria-label="Projects Section"
    >
      <div className="site-shell">
        <div className="editorial-grid mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-4">
            <div className="micro-label">
              02 // SHIPPED SYSTEMS
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <HeadlineReveal
              lines={[
                <span key="production">Production</span>,
                <span key="implementations">Implementations<span className="text-accent">.</span></span>,
              ]}
            />
          </div>
        </div>

        <div className="border-b hairline">
          {projectsData.map((project, idx) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={idx}
              onClick={() => setSelectedProject(project)}
              onHoverStart={handleHoverStart}
              onHoverMove={handleHoverMove}
              onHoverEnd={handleHoverEnd}
              active={activeProject?.id === project.id}
              dimmed={activeProject !== null && previewVisible}
            />
          ))}
        </div>
      </div>

      <ProjectPreview
        project={previewProject}
        index={activeIndex}
        position={previewPosition}
        visible={previewVisible}
      />

      <SlideOverCaseStudy
        isOpen={!!selectedProject}
        data={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
