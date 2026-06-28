"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, GitBranch, ShieldAlert, Award, Layers, Terminal } from "lucide-react";

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

export function SlideOverCaseStudy({ isOpen, data, onClose }: SlideOverCaseStudyProps) {
  // Listen for Escape key and lock body scrolling when open
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Slide Over Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 220 }}
            className="relative z-10 w-full sm:w-[640px] h-full bg-[#070B14] border-l border-white/[0.08] shadow-[0_0_60px_rgba(0,0,0,0.85)] flex flex-col"
          >
            {/* Header Toolbar */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.06] bg-[#070B14]/80 px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: data.color,
                    boxShadow: `0 0 10px ${data.color}`,
                  }}
                />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
                  Case Study // {data.id}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close case study panel"
                className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-2 text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                <X size={15} />
              </button>
            </div>

            {/* Scrollable Contents */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-10 scrollbar-thin">
              {/* Title & Tagline */}
              <div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight font-mono mb-2 uppercase">
                  {data.name}
                </h2>
                <p className="text-sm font-mono" style={{ color: data.color }}>
                  {data.tagline}
                </p>
              </div>

              {/* Case Study Overview */}
              <div className="rounded-2xl border border-white/[0.04] bg-white/[0.01] p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono mb-3 flex items-center gap-2">
                  <Terminal size={14} className="text-slate-500" />
                  <span>Project Overview</span>
                </h3>
                <p className="text-xs leading-relaxed text-slate-400">
                  {data.description}
                </p>
              </div>

              {/* Problem vs Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-red-500/10 bg-red-500/[0.01] p-5">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-red-400 font-mono mb-2 flex items-center gap-1.5">
                    <ShieldAlert size={12} />
                    <span>The Problem</span>
                  </h4>
                  <p className="text-[11px] leading-relaxed text-slate-400">
                    {data.problem}
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.01] p-5">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono mb-2 flex items-center gap-1.5">
                    <Award size={12} />
                    <span>The Solution</span>
                  </h4>
                  <p className="text-[11px] leading-relaxed text-slate-400">
                    {data.solution}
                  </p>
                </div>
              </div>

              {/* Architecture Steps (Linear Flow) */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono mb-6 flex items-center gap-2">
                  <Layers size={14} className="text-slate-500" />
                  <span>System Architecture</span>
                </h3>
                <div className="relative border-l border-white/[0.08] ml-3 pl-6 space-y-6">
                  {data.architecture.map((step, index) => (
                    <div key={index} className="relative">
                      {/* Bouncing bullet dot */}
                      <span
                        className="absolute -left-[30px] top-1.5 h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: data.color,
                          boxShadow: `0 0 8px ${data.color}`,
                        }}
                      />
                      <span className="font-mono text-[10px] font-bold uppercase" style={{ color: data.color }}>
                        {step.step}
                      </span>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Workflow Schema */}
              <div className="rounded-2xl border border-white/[0.04] bg-[#070B14] p-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
                  <GitBranch size={14} className="text-slate-500" />
                  <span>System Workflow</span>
                </h3>
                <div className="grid grid-cols-1 gap-2 pt-2">
                  {data.workflow.map((flow, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-lg border border-white/[0.03] bg-white/[0.01] p-3 hover:border-white/[0.08] transition-colors"
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white/[0.04] font-mono text-[9px] font-bold text-slate-400">
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-white uppercase tracking-wider font-mono">
                          {flow.title}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                          {flow.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Details grid: decisions and challenges */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono mb-2">
                    Technical Decisions
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-400">
                    {data.technicalDecisions}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono mb-2">
                    Challenges
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-400">
                    {data.challenges}
                  </p>
                </div>
              </div>

              {/* Results & Impact Card */}
              <div
                className="rounded-2xl border p-5 backdrop-blur-md"
                style={{
                  borderColor: `${data.color}30`,
                  backgroundColor: `${data.color}04`,
                }}
              >
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono mb-2" style={{ color: data.color }}>
                  Results & Impact
                </h4>
                <p className="text-xs leading-relaxed text-slate-300">
                  {data.results}
                </p>
              </div>

              {/* Lessons Learned */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono mb-2">
                  Lessons Learned
                </h4>
                <p className="text-xs leading-relaxed text-slate-400">
                  {data.lessonsLearned}
                </p>
              </div>

              {/* Complete Tech Stack badges */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono mb-3">
                  Full Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border px-3 py-1 font-mono text-[10px] font-medium"
                      style={{
                        borderColor: `${data.color}30`,
                        backgroundColor: `${data.color}08`,
                        color: data.color,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="sticky bottom-0 border-t border-white/[0.06] bg-[#070B14] px-6 py-4 flex gap-4">
              {data.github && (
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] py-3 text-xs font-semibold text-white transition-all"
                >
                  <ExternalLink size={14} />
                  <span>GitHub Repository</span>
                </a>
              )}
              {data.demo && (
                <a
                  href={data.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold text-white transition-all shadow-md"
                  style={{
                    backgroundColor: `${data.color}20`,
                    border: `1px solid ${data.color}40`,
                  }}
                >
                  <ExternalLink size={14} />
                  <span>Live Demonstration</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}