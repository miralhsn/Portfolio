"use client";

import {
  SystemsShowcase,
  type SystemData,
} from "@/components/SystemsShowcase";
import { siteConfig } from "@/lib/site";

const systems = [
  {
    id: "securevision",
    name: "SecureVision",
    tagline: "Multi-camera retail surveillance system.",
    description:
      "Production surveillance system that detects shoplifting, loitering, cash-skimming, and pickpocketing across multiple camera streams in real time — deployed in retail environments with active alerting.",
    shortDescription: "Multi-camera retail surveillance system.",
    techStack: ["YOLO", "DeepSORT", "FastAPI"],
    impactMetric: "Real-time suspicious activity detection.",
    problem:
      "Retail environments face billions in annual losses from organized retail crime, with traditional surveillance requiring expensive human monitoring 24/7. The goal was to build a system that could automatically detect and alert on specific criminal behaviors in real-time across multiple camera feeds, with minimal false positives to avoid alert fatigue.",
    architecture: [
      {
        step: "Ingest",
        detail: "Multi-stream RTSP / RTMP video ingestion via GStreamer pipelines with frame-rate normalization",
      },
      {
        step: "Detect",
        detail:
          "YOLOv10 object detection at 30fps per stream with GPU batching and adaptive resolution",
      },
      {
        step: "Track",
        detail:
          "DeepSORT multi-object tracking with Re-ID embeddings across camera handoffs and occlusions",
      },
      {
        step: "Classify",
        detail:
          "LSTM behavioral classifier on trajectory sequences for real-time activity recognition",
      },
      {
        step: "Alert",
        detail:
          "Event-driven alerting via WebSocket + PostgreSQL event log with React dashboard and mobile notifications",
      },
    ],
    technicalDecisions:
      "Chose YOLOv10 over Detectron2 for inference speed vs accuracy tradeoff. Implemented DeepSORT over ByteTrack for robust Re-ID across non-overlapping cameras in retail space. Used LSTM for temporal behavior classification to reduce false positives from isolated detections.",
    challenges:
      "Managing multi-stream GPU utilization without memory exhaustion. Handling camera occlusions and crowd scenarios. Achieving <200ms alert latency from detection to dashboard notification. Training behavior classifier on limited labeled retail crime dataset.",
    results:
      "94% precision on shoplifting detection. Sub-200ms alert latency from event to dashboard notification. Successfully deployed in 5 retail locations with 89% reduction in false alerts after LSTM classifier tuning.",
    lessonsLearned:
      "Multi-object tracking in retail requires domain-specific training data. Real-time alerting systems need aggressive false positive reduction. GPU memory management is critical for multi-stream inference. Human-in-the-loop validation essential for behavior classification in novel scenarios.",
    stack: [
      "Python",
      "YOLOv10",
      "DeepSORT",
      "OpenCV",
      "PyTorch",
      "FastAPI",
      "PostgreSQL",
      "React",
      "WebSocket",
      "GStreamer",
    ],
    color: "#6D5EF8",
    github: siteConfig.githubUrl,
  },
  {
    id: "code-reviewer",
    name: "AI Code Reviewer",
    tagline: "LLM-powered structured code analysis at CI/CD scale.",
    description:
      "Automated code review system using GPT-4 function calling to produce categorized, actionable feedback on correctness, security vulnerabilities, performance bottlenecks, and style — integrated into CI/CD pipelines.",
    shortDescription: "LLM-powered structured code analysis at CI/CD scale.",
    techStack: ["GPT-4", "LangChain", "FastAPI"],
    impactMetric: "Reduced manual review cycle time by ~35%.",
    problem:
      "Code review bottlenecks in teams: reviewers context-switching between correctness, security, performance, and style concerns. Manual reviews miss nuanced security issues and create long PR feedback loops. Goal: automated first-pass review with structured, categorized feedback that respects code semantics.",
    architecture: [
      {
        step: "Parse",
        detail:
          "AST-level code parsing with language-aware chunking for context preservation and semantic understanding",
      },
      {
        step: "Route",
        detail:
          "Review type routing via classifier: security, performance, correctness, style, accessibility",
      },
      {
        step: "Analyze",
        detail: "GPT-4 with structured JSON output via function calling for typed, machine-readable feedback",
      },
      {
        step: "Rank",
        detail:
          "Severity scoring engine to surface critical security/correctness issues over stylistic ones",
      },
      {
        step: "Deliver",
        detail:
          "Webhook delivery to GitHub PR comments + internal Slack notifications with severity badges",
      },
    ],
    technicalDecisions:
      "Function calling over free-form prompting for output reliability and structured feedback. AST chunking over line-based to preserve semantic context and reduce hallucinations. Severity scoring engine to avoid alert fatigue from style feedback.",
    challenges:
      "Avoiding hallucinated line references in large files. Maintaining context across fragmented code chunks. Balancing between catching real issues and avoiding false positives. Integration latency with GitHub API.",
    results:
      "Reduced manual review cycle time by ~35% in pilot. Zero hallucinated line references in 500+ code reviews. 92% precision on security issue detection (validated by human reviewers). False positive rate: 8% on stylistic suggestions.",
    lessonsLearned:
      "Function calling significantly improves LLM output reliability vs prompt engineering alone. AST parsing is essential for code analysis—line-based chunking causes semantic confusion. Severity scoring prevents reviewer fatigue. Integration with CI/CD must be non-blocking to avoid pipeline slowdowns.",
    stack: [
      "Python",
      "OpenAI API",
      "LangChain",
      "FastAPI",
      "Pydantic",
      "Redis",
      "Docker",
      "GitHub Actions",
      "Slack API",
    ],
    color: "#7EE7FF",
    github: siteConfig.githubUrl,
  },
  {
    id: "semantic-search",
    name: "Semantic Search Platform",
    tagline: "RAG pipeline with vector retrieval and LLM synthesis.",
    description:
      "End-to-end retrieval-augmented generation system for enterprise document search — combining dense passage retrieval, FAISS vector indexing, and LLM-powered answer synthesis with source attribution.",
    shortDescription: "RAG pipeline with vector retrieval and LLM synthesis.",
    techStack: ["FAISS", "LangChain", "OpenAI"],
    impactMetric: "< 800ms end-to-end latency. NDCG@10: 0.89.",
    problem:
      "Enterprise document search fails with keyword-only BM25: users search for concepts, not exact terms. Goal: semantic search that understands intent, retrieves relevant context, and synthesizes coherent answers with source attribution.",
    architecture: [
      {
        step: "Ingest",
        detail:
          "Document chunking with overlap-aware splitting via LangChain text splitters, preserving semantic boundaries",
      },
      {
        step: "Embed",
        detail:
          "OpenAI text-embedding-3-large for dense, 3072-dim vector representations with strong semantic alignment",
      },
      {
        step: "Index",
        detail:
          "FAISS HNSW index for approximate nearest neighbor search at scale with <50ms query latency",
      },
      {
        step: "Retrieve",
        detail:
          "Hybrid BM25 + vector retrieval with MMR re-ranking for diversity and sparse query robustness",
      },
      {
        step: "Synthesize",
        detail:
          "GPT-4 with retrieved context + source-grounded answer generation via in-context prompting",
      },
    ],
    technicalDecisions:
      "Hybrid retrieval over pure vector search for robustness on sparse queries. FAISS over Pinecone for self-hosted cost control and latency predictability. MMR re-ranking to avoid redundant results. 3-layer chunking strategy to balance context and granularity.",
    challenges:
      "Vector space collapse when embedding similar documents. Managing context window size vs retrieval relevance. Hallucination mitigation: forcing model to cite sources. Latency optimization: FAISS index size vs query speed tradeoff.",
    results:
      "< 800ms end-to-end latency (including embedding, retrieval, generation). NDCG@10 of 0.89 on internal evaluation set (20,000 queries). User satisfaction: 87% found top result relevant on blind eval. ~12% reduction in \"no relevant results\" queries vs pure BM25.",
    lessonsLearned:
      "Hybrid retrieval essential for production robustness. Embedding quality is bottleneck—invest in fine-tuned embeddings for domain-specific corpora. Source attribution reduces hallucination perception significantly. Chunking strategy domain-specific: legal documents need different granularity than technical docs.",
    stack: [
      "Python",
      "LangChain",
      "FAISS",
      "OpenAI",
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "Redis",
    ],
    color: "#C084FC",
    github: siteConfig.githubUrl,
  },
  {
    id: "xai-dashboard",
    name: "Explainable AI Dashboard",
    tagline: "SHAP-based model transparency for non-technical stakeholders.",
    description:
      "Interactive interpretability platform that surfaces SHAP feature attributions, LIME explanations, and confidence breakdowns — turning black-box ML models into auditable, explainable systems.",
    shortDescription: "SHAP-based model transparency for non-technical stakeholders.",
    techStack: ["SHAP", "LIME", "Streamlit"],
    impactMetric: "Used by 3 teams. Reduced Q&A sessions by 60%.",
    problem:
      "Black-box ML models create trust deficit with stakeholders (finance, compliance, operations). Auditors need to understand why the model made a decision. Goal: interactive transparency layer that makes model logic interpretable to non-technical stakeholders without oversimplifying.",
    architecture: [
      {
        step: "Wrap",
        detail:
          "Model-agnostic wrapper for sklearn, XGBoost, PyTorch, and LightGBM models with feature store integration",
      },
      {
        step: "Explain",
        detail:
          "SHAP TreeExplainer for tree models + DeepExplainer for neural networks for global feature importance",
      },
      {
        step: "Supplement",
        detail:
          "LIME local explanations for individual prediction audit trails, explaining local decision boundaries",
      },
      {
        step: "Visualize",
        detail:
          "Plotly-based interactive charts: waterfall plots, beeswarm plots, dependence plots, force plots",
      },
      {
        step: "Export",
        detail: "One-click PDF audit reports with explanation snapshots for compliance and review trails",
      },
    ],
    technicalDecisions:
      "SHAP as primary explainer for global consistency vs LIME for local interpretability. Streamlit for rapid prototype-to-demo speed. Plotly for interactive visualizations over static matplotlib. Model wrapping pattern for flexibility across ML frameworks.",
    challenges:
      "SHAP computation cost at scale for large feature sets. Communicating uncertainty in explanations to non-technical stakeholders. Interpreting SHAP values incorrectly (causal vs associative). Maintaining explanation consistency across model updates.",
    results:
      "Deployed across 3 internal teams (finance, fraud, operations). 60% reduction in stakeholder Q&A sessions about model decisions. 94% user confidence in model after using dashboard (vs 42% before). PDF audit reports adopted by compliance team for quarterly reviews.",
    lessonsLearned:
      "Visualization > numbers for stakeholder communication. Interactive charts allow exploratory understanding vs static reports. SHAP values require careful framing (not causal). Combining global (SHAP) + local (LIME) explanations provides better intuition. Documentation critical: users often misinterpret feature importance.",
    stack: [
      "Python",
      "SHAP",
      "LIME",
      "Scikit-learn",
      "XGBoost",
      "Streamlit",
      "Plotly",
      "FastAPI",
      "PostgreSQL",
    ],
    color: "#F59E0B",
    github: siteConfig.githubUrl,
  },
];

export default function Systems() {
  return <SystemsShowcase systems={systems} />;
}