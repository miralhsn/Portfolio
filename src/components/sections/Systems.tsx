"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

const systems = [
  {
    id: "securevision",
    name: "SecureVision",
    tagline: "Multi-camera retail surveillance at inference speed",
    description: "Production surveillance system that detects shoplifting, loitering, cash-skimming, and pickpocketing across multiple camera streams in real time — deployed in retail environments with active alerting.",
    architecture: [
      { step: "Ingest", detail: "Multi-stream RTSP / RTMP video ingestion via GStreamer pipelines" },
      { step: "Detect", detail: "YOLOv10 object detection at 30fps per stream with GPU batching" },
      { step: "Track", detail: "DeepSORT multi-object tracking with Re-ID embeddings across camera handoffs" },
      { step: "Classify", detail: "LSTM behavioral classifier on trajectory sequences for activity recognition" },
      { step: "Alert", detail: "Event-driven alerting via WebSocket + Postgres event log with React dashboard" },
    ],
    tradeoffs: "Chose YOLOv10 over Detectron2 for inference speed vs accuracy tradeoff. DeepSORT over ByteTrack for robust Re-ID across non-overlapping cameras.",
    outcome: "94% precision on shoplifting detection. Sub-200ms alert latency from event to dashboard notification.",
    stack: ["Python", "YOLOv10", "DeepSORT", "OpenCV", "PyTorch", "FastAPI", "PostgreSQL", "React", "WebSocket"],
    color: "#6366f1",
    github: siteConfig.githubUrl,
    demo: null,
    featured: true,
  },
  {
    id: "code-reviewer",
    name: "AI Code Reviewer",
    tagline: "LLM-powered structured code analysis at CI/CD scale",
    description: "Automated code review system using GPT-4 function calling to produce categorized, actionable feedback on correctness, security vulnerabilities, performance bottlenecks, and style — integrated into CI/CD pipelines.",
    architecture: [
      { step: "Parse", detail: "AST-level code parsing with language-aware chunking for context preservation" },
      { step: "Route", detail: "Review type routing: security, performance, correctness, style via classifier" },
      { step: "Analyze", detail: "GPT-4 with structured JSON output via function calling for typed feedback" },
      { step: "Rank", detail: "Severity scoring engine to surface critical issues over stylistic ones" },
      { step: "Deliver", detail: "Webhook delivery to GitHub PR comments + internal Slack notifications" },
    ],
    tradeoffs: "Function calling over free-form prompting for output reliability. AST chunking over line-based to preserve semantic context.",
    outcome: "Reduced manual review cycle time by ~35% in pilot. Zero hallucinated line references.",
    stack: ["Python", "OpenAI API", "LangChain", "FastAPI", "Pydantic", "Redis", "Docker", "GitHub Actions"],
    color: "#a855f7",
    github: siteConfig.githubUrl,
    demo: null,
    featured: false,
  },
  {
    id: "semantic-search",
    name: "Semantic Search Platform",
    tagline: "RAG pipeline with vector retrieval and LLM synthesis",
    description: "End-to-end retrieval-augmented generation system for enterprise document search — combining dense passage retrieval, FAISS vector indexing, and LLM-powered answer synthesis with source attribution.",
    architecture: [
      { step: "Ingest", detail: "Document chunking with overlap-aware splitting via LangChain text splitters" },
      { step: "Embed", detail: "OpenAI text-embedding-3-large for dense vector representations" },
      { step: "Index", detail: "FAISS HNSW index for approximate nearest neighbor search at scale" },
      { step: "Retrieve", detail: "Hybrid BM25 + vector retrieval with MMR re-ranking for diversity" },
      { step: "Synthesize", detail: "GPT-4 with retrieved context + source-grounded answer generation" },
    ],
    tradeoffs: "Hybrid retrieval over pure vector for sparse query robustness. FAISS over Pinecone for self-hosted cost control.",
    outcome: "< 800ms end-to-end latency. NDCG@10 of 0.89 on internal eval set.",
    stack: ["Python", "LangChain", "FAISS", "OpenAI", "FastAPI", "Next.js", "Pinecone", "PostgreSQL"],
    color: "#22d3ee",
    github: siteConfig.githubUrl,
    demo: null,
    featured: false,
  },
  {
    id: "xai-dashboard",
    name: "Explainable AI Dashboard",
    tagline: "SHAP-based model transparency for non-technical stakeholders",
    description: "Interactive interpretability platform that surfaces SHAP feature attributions, LIME explanations, and confidence breakdowns — turning black-box ML models into auditable, explainable systems.",
    architecture: [
      { step: "Wrap", detail: "Model-agnostic wrapper for sklearn, XGBoost, PyTorch models" },
      { step: "Explain", detail: "SHAP TreeExplainer + DeepExplainer for feature attribution computation" },
      { step: "Supplement", detail: "LIME local explanations for individual prediction audit trails" },
      { step: "Visualize", detail: "Plotly-based interactive charts: waterfall, beeswarm, dependence plots" },
      { step: "Export", detail: "One-click PDF audit reports with explanation snapshots" },
    ],
    tradeoffs: "SHAP over LIME as primary explainer for global consistency. Streamlit over custom React for rapid prototype-to-demo speed.",
    outcome: "Used by 3 internal teams for model audit review. Reduced stakeholder Q&A sessions by 60%.",
    stack: ["Python", "SHAP", "LIME", "Scikit-learn", "XGBoost", "Streamlit", "Plotly", "FastAPI"],
    color: "#f59e0b",
    github: siteConfig.githubUrl,
    demo: null,
    featured: false,
  },
];

function ArchFlow({ steps, color }: { steps: typeof systems[0]["architecture"]; color: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {steps.map((s, i) => (
        <div key={s.step} style={{ display: "flex", gap: 12, position: "relative" }}>
          {/* Line */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", border: `2px solid ${color}`, background: "var(--bg)", flexShrink: 0, marginTop: 4 }} />
            {i < steps.length - 1 && <div style={{ width: 1, flexGrow: 1, minHeight: 20, background: "var(--border)", marginTop: 2 }} />}
          </div>
          <div style={{ paddingBottom: i < steps.length - 1 ? 12 : 0 }}>
            <span style={{ fontSize: "0.7rem", fontFamily: "monospace", fontWeight: 600, color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.step}</span>
            <p style={{ fontSize: "0.82rem", color: "var(--text-3)", margin: "2px 0 0", lineHeight: 1.55 }}>{s.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Systems() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="systems" className="section" ref={ref} aria-label="Systems">
      <div className="section-label">Systems Built</div>
      <h2 style={{ marginBottom: "1rem" }}>
        Engineering case studies<span style={{ color: "var(--primary)" }}>.</span>
      </h2>
      <p style={{ color: "var(--text-3)", maxWidth: 520, marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
        Each system is documented from architecture decisions to production outcomes.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1.25rem,3vw,1.75rem)" }}>
        {systems.map((sys, i) => (
          <motion.article key={sys.id}
            initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass card-hover"
            style={{ borderRadius: "var(--r-2xl)", padding: "clamp(1.5rem,4vw,2.25rem)", position: "relative", overflow: "hidden" }}>

            {/* Accent stripe */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${sys.color}, transparent)`, borderRadius: "var(--r-2xl) var(--r-2xl) 0 0" }} aria-hidden="true" />

            {sys.featured && (
              <span style={{ position: "absolute", top: 20, right: 20, fontSize: "0.68rem", fontFamily: "monospace", fontWeight: 600, padding: "3px 10px", borderRadius: 99, background: "var(--primary-dim)", border: "1px solid var(--border-hi)", color: "var(--primary)" }}>
                Featured
              </span>
            )}

            {/* Top row */}
            <div style={{ marginBottom: "clamp(1rem,2.5vw,1.5rem)" }}>
              <h3 style={{ marginBottom: 4 }}>{sys.name}</h3>
              <p style={{ fontSize: "0.85rem", color: sys.color, fontFamily: "monospace", marginBottom: 12 }}>{sys.tagline}</p>
              <p style={{ fontSize: "0.9rem", color: "var(--text-2)", lineHeight: 1.7, maxWidth: 680 }}>{sys.description}</p>
            </div>

            {/* Architecture + Outcomes — responsive grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "clamp(1rem,3vw,1.5rem)", marginBottom: "clamp(1rem,2.5vw,1.5rem)" }}>
              {/* Architecture */}
              <div style={{ background: "var(--surface-1)", borderRadius: "var(--r-lg)", padding: "clamp(1rem,2.5vw,1.25rem)", border: "1px solid var(--border)" }}>
                <p style={{ fontSize: "0.7rem", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-4)", marginBottom: 16 }}>
                  Data Flow
                </p>
                <ArchFlow steps={sys.architecture} color={sys.color} />
              </div>

              {/* Decisions + Outcome */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ background: "var(--surface-1)", borderRadius: "var(--r-lg)", padding: "clamp(1rem,2.5vw,1.25rem)", border: "1px solid var(--border)", flex: 1 }}>
                  <p style={{ fontSize: "0.7rem", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-4)", marginBottom: 10 }}>
                    Key Tradeoffs
                  </p>
                  <p style={{ fontSize: "0.83rem", color: "var(--text-3)", lineHeight: 1.65 }}>{sys.tradeoffs}</p>
                </div>
                <div style={{ background: "var(--surface-1)", borderRadius: "var(--r-lg)", padding: "clamp(1rem,2.5vw,1.25rem)", border: "1px solid var(--border)" }}>
                  <p style={{ fontSize: "0.7rem", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-4)", marginBottom: 10 }}>
                    Outcome
                  </p>
                  <p style={{ fontSize: "0.83rem", color: "var(--text-2)", lineHeight: 1.65, fontWeight: 500 }}>{sys.outcome}</p>
                </div>
              </div>
            </div>

            {/* Footer: stack + links */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, paddingTop: "clamp(0.75rem,2vw,1rem)", borderTop: "1px solid var(--border)" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {sys.stack.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                <a href={sys.github} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "var(--surface-2)", border: "1px solid var(--border-md)", borderRadius: 8, color: "var(--text-2)", fontSize: "0.8rem", fontWeight: 500, textDecoration: "none", transition: "color 0.2s, border-color 0.2s" }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.color = "var(--text-1)"; el.style.borderColor = "var(--border-hi)"; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.color = "var(--text-2)"; el.style.borderColor = "var(--border-md)"; }}>
                  <ExternalLink size={13} /> Source
                </a>
                {sys.demo ? (
                  <a href={sys.demo} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", background: sys.color, borderRadius: 8, color: "#fff", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}>
                    <ExternalLink size={13} /> Live
                  </a>
                ) : (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "var(--surface-1)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-4)", fontSize: "0.78rem" }}>
                    <ArrowUpRight size={12} /> Demo soon
                  </span>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
