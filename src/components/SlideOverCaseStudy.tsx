"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

interface CaseStudyData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  architecture: Array<{
    step: string;
    detail: string;
  }>;
  technicalDecisions: string;
  challenges: string;
  results: string;
  lessonsLearned: string;
  stack: string[];
  color: string;
  github?: string;
  demo?: string;
}

interface SlideOverCaseStudyProps {
  isOpen: boolean;
  data: CaseStudyData | null;
  onClose: () => void;
}

const slideVariants = {
  hidden: {
    x: "100%",
  },
  visible: {
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0.55, 1] as const,
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.3,
    },
  },
} satisfies Variants;

const backdropVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
} satisfies Variants;

export function SlideOverCaseStudy({
  isOpen,
  data,
  onClose,
}: SlideOverCaseStudyProps) {
  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 bottom-0 z-50 w-full overflow-y-auto sm:w-2/3 lg:w-1/2"
            style={{
              background:
                "linear-gradient(135deg, #070B14 0%, rgba(126,231,255,0.02) 100%)",
              backdropFilter: "blur(16px)",
              borderLeft: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="sticky top-6 right-6 z-10 rounded-lg border border-white/10 bg-white/5 p-2 transition-colors hover:bg-white/10"
            >
              <X size={20} className="text-white/70 hover:text-white" />
            </motion.button>

            <div className="max-w-2xl p-8 sm:p-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <div
                  className="mb-3 text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: data.color }}
                >
                  Case Study
                </div>

                <h2 className="mb-2 text-4xl font-bold text-white">
                  {data.name}
                </h2>

                <p
                  className="text-sm font-mono opacity-80"
                  style={{ color: data.color }}
                >
                  {data.tagline}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-8 border-b border-white/10 pb-8"
              >
                <p className="text-sm leading-relaxed text-slate-300">
                  {data.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <h3 className="mb-3 text-lg font-bold text-white">Problem</h3>

                <p className="text-sm leading-relaxed text-slate-400">
                  {data.problem}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mb-8 rounded-xl border border-white/10 p-6"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(109,94,248,0.05) 0%, rgba(126,231,255,0.02) 100%)",
                }}
              >
                <h3 className="mb-6 text-lg font-bold text-white">
                  System Architecture
                </h3>

                <ArchitectureDiagram
                  steps={data.architecture}
                  color={data.color}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h3 className="mb-3 text-lg font-bold text-white">
                  Technical Decisions
                </h3>

                <p className="text-sm leading-relaxed text-slate-400">
                  {data.technicalDecisions}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mb-8"
              >
                <h3 className="mb-3 text-lg font-bold text-white">
                  Challenges
                </h3>

                <p className="text-sm leading-relaxed text-slate-400">
                  {data.challenges}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8 rounded-xl border border-white/10 p-6"
                style={{
                  background: `linear-gradient(135deg, ${data.color}15, transparent)`,
                  borderColor: `${data.color}40`,
                }}
              >
                <h3 className="mb-3 text-lg font-bold text-white">Results</h3>

                <p
                  className="text-sm font-semibold leading-relaxed"
                  style={{ color: data.color }}
                >
                  {data.results}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mb-8"
              >
                <h3 className="mb-3 text-lg font-bold text-white">
                  Lessons Learned
                </h3>

                <p className="text-sm leading-relaxed text-slate-400">
                  {data.lessonsLearned}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <h3 className="mb-4 text-lg font-bold text-white">
                  Tech Stack
                </h3>

                <div className="flex flex-wrap gap-2">
                  {data.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg px-3 py-1.5 text-xs font-mono font-semibold"
                      style={{
                        background: `${data.color}20`,
                        border: `1px solid ${data.color}40`,
                        color: data.color,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="flex gap-4 border-t border-white/10 pt-8"
              >
                {data.github && (
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    <ExternalLink size={16} />
                    View Source
                  </a>
                )}

                {data.demo && (
                  <a
                    href={data.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all"
                    style={{
                      background: `${data.color}20`,
                      border: `1px solid ${data.color}40`,
                    }}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}