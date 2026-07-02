"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, X, ChevronRight, Play, Terminal } from "lucide-react";

export interface CaseStudyData {
  id: string;
  name: string;
  tagline: string;
  status: string;
  shortDescription: string;
  description: string;
  problem: string;
  solution: string;
  architecture: Array<{ step: string; detail: string }>;
  workflow: Array<{ title: string; description: string }>;
  technicalDecisions: string;
  challenges: string;
  results: string;
  lessonsLearned: string;
  techStack: string[];
  color: string;
  github?: string;
  demo?: string;
}

interface SlideOverCaseStudyProps {
  isOpen: boolean;
  data: CaseStudyData | null;
  onClose: () => void;
}

// Pipeline visualizer node item
function PipelineVisualizer({ architecture }: { architecture: Array<{ step: string; detail: string }> }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="border border-white/10 bg-black/40 rounded-lg p-5 my-6">
      <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[var(--color-dim)] border-b border-white/5 pb-3">
        <Terminal size={12} className="text-[var(--color-accent)] animate-pulse" />
        <span>SYSTEM_PIPELINE_INSIGHT // CLICk_NODES_TO_DEBUG</span>
      </div>

      {/* Nodes Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        {architecture.map((item, index) => (
          <div key={index} className="flex items-center">
            <button
              onClick={() => setActiveStep(index)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono transition-all duration-300 ${
                index === activeStep
                  ? "bg-[var(--color-accent)]/10 border-[var(--color-accent)] text-[var(--color-accent)] shadow-[0_0_15px_rgba(216,209,194,0.1)]"
                  : "bg-white/[0.02] border-white/10 text-[var(--color-dim)] hover:border-white/20 hover:text-white"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${index === activeStep ? "bg-[var(--color-accent)] animate-ping" : "bg-white/20"}`} />
              <span>{item.step}</span>
            </button>
            {index < architecture.length - 1 && (
              <ChevronRight size={14} className="text-white/10 mx-1 hidden sm:block" />
            )}
          </div>
        ))}
      </div>

      {/* Terminal Inspector Details */}
      <div className="bg-[#050608] border border-white/5 rounded p-4 font-mono text-xs">
        <div className="flex justify-between items-center text-[10px] text-white/30 mb-2">
          <span>CONSOLE LOG STAGE_{activeStep + 1}</span>
          <span className="text-[#22c55e]">STATUS: ACTIVE</span>
        </div>
        <p className="text-[var(--color-text)] leading-relaxed">
          <span className="text-[var(--color-accent)]">&gt; </span>
          {architecture[activeStep]?.detail}
        </p>
        <div className="mt-3 pt-3 border-t border-white/5 flex gap-4 text-[10px] text-white/20">
          <span>LATENCY: ~12ms</span>
          <span>GPU_LOAD: 22%</span>
        </div>
      </div>
    </div>
  );
}

export function SlideOverCaseStudy({ isOpen, data, onClose }: SlideOverCaseStudyProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!data) return null;

  // Stagger variants for content elements
  const containerVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as any,
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    },
    exit: {
      x: "100%",
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as any
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
          {/* Overlay mask */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[rgba(5,6,8,0.8)] backdrop-blur-sm"
          />

          {/* Slide-over inspector container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 flex h-full w-full flex-col border-l hairline bg-[#090a0d] sm:w-[720px] shadow-[0_0_50px_rgba(0,0,0,0.5)] cursor-default"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-8">
              <div>
                <span className="micro-label font-mono text-[var(--color-accent)] tracking-widest">
                  inspect_product_sys // {data.id}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study panel"
                className="focus-ring flex h-10 w-10 items-center justify-center border border-white/10 text-muted transition-colors duration-200 hover:text-[var(--color-text)] hover:bg-white/5"
              >
                <X size={16} strokeWidth={1.8} />
              </button>
            </div>

            {/* Scrollable details */}
            <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8 space-y-10 scrollbar-none">
              
              {/* Product header summary */}
              <motion.div variants={itemVariants} className="pb-4">
                <span className="text-[10px] font-mono text-[var(--color-accent)] border border-[var(--color-accent)]/20 px-2 py-0.5 rounded mb-2 inline-block bg-black/30">
                  {data.status.toUpperCase()}
                </span>
                <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-sans leading-none tracking-tight">
                  {data.name}
                </h2>
                <p className="mt-3 text-base font-semibold text-[var(--color-dim)] font-mono">
                  &gt; {data.tagline}
                </p>
              </motion.div>

              {/* Section 1: Overview */}
              <motion.section variants={itemVariants} className="border-t border-white/5 pt-7">
                <h3 className="micro-label mb-3 text-white">System Overview</h3>
                <p className="body-small leading-relaxed">{data.description}</p>
              </motion.section>

              {/* Section 2: Problem & Solution */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 border-t border-white/5 md:grid-cols-2 gap-6 pt-7">
                <section>
                  <h3 className="micro-label mb-3 text-white">The Problem</h3>
                  <p className="body-small text-[var(--color-muted)] leading-relaxed">{data.problem}</p>
                </section>
                <section className="border-t border-white/5 md:border-t-0 md:border-l md:border-white/5 md:pl-6">
                  <h3 className="micro-label mb-3 text-white">The Solution</h3>
                  <p className="body-small text-[var(--color-muted)] leading-relaxed">{data.solution}</p>
                </section>
              </motion.div>

              {/* Section 3: Architecture Diagram & Pipeline Visualizer */}
              <motion.section variants={itemVariants} className="border-t border-white/5 pt-7">
                <h3 className="micro-label mb-3 text-white">Interactive Pipeline Visualizer</h3>
                <p className="body-small mb-4">Click node headers to view processing logs and stage operations:</p>
                <PipelineVisualizer architecture={data.architecture} />
              </motion.section>

              {/* Section 4: Workflow list */}
              <motion.section variants={itemVariants} className="border-t border-white/5 pt-7">
                <h3 className="micro-label mb-5 text-white">Operational Workflow</h3>
                <div className="space-y-6">
                  {data.workflow.map((flow, index) => (
                    <div key={index} className="flex gap-4 border-b border-white/5 pb-5 last:border-b-0 last:pb-0">
                      <div className="text-[var(--color-accent)] font-mono text-sm">
                        {String(index + 1).padStart(2, "0")}.
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">{flow.title}</h4>
                        <p className="body-small text-[var(--color-muted)]">{flow.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Section 5: Technical Decisions */}
              <motion.section variants={itemVariants} className="border-t border-white/5 pt-7">
                <h3 className="micro-label mb-3 text-white">Technical Decisions</h3>
                <p className="body-small leading-relaxed">{data.technicalDecisions}</p>
              </motion.section>

              {/* Section 6: Challenges */}
              <motion.section variants={itemVariants} className="border-t border-white/5 pt-7">
                <h3 className="micro-label mb-3 text-white">Engineering Challenges</h3>
                <p className="body-small leading-relaxed">{data.challenges}</p>
              </motion.section>

              {/* Section 7: Results & Impact */}
              <motion.section variants={itemVariants} className="border-t border-white/5 pt-7">
                <h3 className="micro-label mb-3 text-white">Results & Impact</h3>
                <p className="body-small leading-relaxed">{data.results}</p>
              </motion.section>

              {/* Section 8: Lessons Learned */}
              <motion.section variants={itemVariants} className="border-t border-white/5 pt-7">
                <h3 className="micro-label mb-3 text-white">Lessons Learned</h3>
                <p className="body-small leading-relaxed">{data.lessonsLearned}</p>
              </motion.section>

              {/* Section 9: Full stack listing */}
              <motion.section variants={itemVariants} className="border-t border-white/5 pt-7 pb-8">
                <h3 className="micro-label mb-3 text-white">Detailed Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {data.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono bg-white/[0.04] border border-white/5 text-[var(--color-muted)] px-2.5 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.section>

            </div>

            {/* Bottom Actions footer */}
            <div className="border-t border-white/10 px-6 py-5 sm:px-8 bg-black/40">
              <div className="flex flex-col gap-3 sm:flex-row">
                {data.github && (
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring flex-1 inline-flex items-center justify-center gap-2 border border-white/10 px-4 py-3 text-sm font-bold text-white transition-colors duration-200 hover:border-white/30 hover:bg-white/5"
                  >
                    <ExternalLink size={14} />
                    <span>View Repository</span>
                  </a>
                )}
                {data.demo && (
                  <a
                    href={data.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring flex-1 inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] px-4 py-3 text-sm font-bold text-[var(--color-accent-ink)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Play size={14} fill="currentColor" />
                    <span>Live Demonstration</span>
                  </a>
                )}
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
