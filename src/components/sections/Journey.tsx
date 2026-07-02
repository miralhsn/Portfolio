"use client";

import { motion } from "framer-motion";
import FlowingLines from "./FlowingLines";
import HeadlineReveal from "@/components/motion/HeadlineReveal";

const timelineEvents = [
  {
    year: "2023",
    role: "ML Research & Foundations",
    company: "AI Labs",
    description: "Built and optimized computer vision models and image processing pipelines. Focused on YOLO architectures and traditional OpenCV implementations for edge hardware.",
    achievements: [
      "Optimized object detection models for low-power edge GPUs.",
      "Engineered automated feature extraction pipelines for tabular datasets.",
      "Fine-tuned deep convolutional networks for custom multi-label categorization task."
    ]
  },
  {
    year: "2024",
    role: "AI Systems Engineer",
    company: "Decentralized Systems Co.",
    description: "Designed high-throughput data processing workflows and distributed asynchronous task queues. Focused on real-time video stream ingestion.",
    achievements: [
      "Engineered hardware-accelerated GStreamer pipelines processing concurrent RTSP streams.",
      "Integrated DeepSORT Re-ID embeddings to achieve multi-camera object handoffs with low occlusion errors.",
      "Built custom FastAPI webhooks serving predictions under 200ms end-to-end latency."
    ]
  },
  {
    year: "2025 - Present",
    role: "Lead AI Architect",
    company: "Enterprise Cognitive Platforms",
    description: "Leading deployment of RAG systems, AST code analysis platforms, and agentic AI architectures. Tuning local vector index lookups and hybrid retrievers.",
    achievements: [
      "Deployed FAISS/Pinecone hybrid retrievers with BM25 keyword matching for high-scale document synthesis.",
      "Built typed JSON schema code review systems using OpenAI/Gemini APIs, reducing PR cycle latency by 35%.",
      "Architected autonomous LLM agents with secure sandboxed tool execution environments."
    ]
  }
];

export default function Journey() {
  return (
    <section
      id="journey"
      className="relative border-b hairline bg-[#090a0d] section-space overflow-hidden"
      aria-label="Engineering Journey Section"
    >
      {/* Wave animation backdrop */}
      <FlowingLines />

      {/* Smooth blend overlays */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#050608] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#090a0d] to-transparent pointer-events-none z-10" />

      <div className="site-shell relative z-10">
        <div className="editorial-grid mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-4">
            <div className="micro-label text-accent">
              04 // ENGINEERING JOURNEY
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <HeadlineReveal
              lines={[
                <span key="evolution">The System</span>,
                <span key="journey">Evolution<span className="text-accent">.</span></span>,
              ]}
            />
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="editorial-grid">
          <div className="col-span-12 md:col-span-9 md:col-start-4">
            <div className="relative border-l border-white/10 pl-6 sm:pl-10 space-y-16 py-4">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Glowing Node Marker */}
                  <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-[var(--color-accent)] bg-[#050608]">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  </div>

                  {/* Year Tag */}
                  <span className="inline-block text-xs font-mono tracking-widest text-[var(--color-accent)] border border-[var(--color-accent)]/20 px-2.5 py-1 rounded bg-[#050608] mb-3">
                    {event.year}
                  </span>

                  {/* Header Title */}
                  <h3 className="font-[var(--font-text-stack)] text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-none mb-1 text-[var(--color-text)]">
                    {event.role}
                  </h3>
                  <div className="micro-label mb-5 text-[var(--color-muted)]">
                    {event.company}
                  </div>

                  {/* Description */}
                  <p className="body-small max-w-[48rem] mb-6">
                    {event.description}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-3.5 border-t border-white/5 pt-6 max-w-[48rem]">
                    {event.achievements.map((bullet, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-[var(--color-muted)] leading-relaxed">
                        <span className="text-[var(--color-accent)] font-bold">↳</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
