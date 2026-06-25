"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

interface CaseStudyData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  architecture: Array<{ step: string; detail: string }>;
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

export const SlideOverCaseStudy = ({
  isOpen,
  data,
  onClose,
}: SlideOverCaseStudyProps) => {
  if (!data) return null;

  const slideVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { duration: 0.4, ease: [0.32, 0.72, 0.55, 1] } },
    exit: { x: "100%", transition: { duration: 0.3 } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Slide-over panel */}
          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 bottom-0 w-full sm:w-2/3 lg:w-1/2 z-50 overflow-y-auto"
            style={{
              background: "linear-gradient(135deg, #070B14 0%, rgba(126,231,255,0.02) 100%)",
              backdropFilter: "blur(16px)",
              borderLeft: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Close button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="sticky top-6 right-6 z-10 p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <X size={20} className="text-white/70 hover:text-white" />
            </motion.button>

            {/* Content */}
            <div className="p-8 sm:p-10 max-w-2xl">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <div
                  className="text-xs font-mono font-bold uppercase tracking-widest mb-3"
                  style={{ color: data.color }}
                >
                  Case Study
                </div>
                <h2 className="text-4xl font-bold text-white mb-2">{data.name}</h2>
                <p
                  className="text-sm font-mono opacity-80"
                  style={{ color: data.color }}
                >
                  {data.tagline}
                </p>
              </motion.div>

              {/* Quick Overview */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-8 pb-8 border-b border-white/10"
              >
                <p className="text-sm leading-relaxed text-slate-300">
                  {data.description}
                </p>
              </motion.div>

              {/* Problem Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <h3 className="text-lg font-bold text-white mb-3">Problem</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {data.problem}
                </p>
              </motion.div>

              {/* Architecture */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mb-8 p-6 rounded-xl border border-white/10"
                style={{
                  background: `linear-gradient(135deg, rgba(109,94,248,0.05) 0%, rgba(126,231,255,0.02) 100%)`,
                }}
              >
                <h3 className="text-lg font-bold text-white mb-6">
                  System Architecture
                </h3>
                <ArchitectureDiagram
                  steps={data.architecture}
                  color={data.color}
                />
              </motion.div>

              {/* Technical Decisions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h3 className="text-lg font-bold text-white mb-3">
                  Technical Decisions
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {data.technicalDecisions}
                </p>
              </motion.div>

              {/* Challenges */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mb-8"
              >
                <h3 className="text-lg font-bold text-white mb-3">Challenges</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {data.challenges}
                </p>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8 p-6 rounded-xl border border-white/10"
                style={{
                  background: `linear-gradient(135deg, ${data.color}15, transparent)`,
                  borderColor: `${data.color}40`,
                }}
              >
                <h3 className="text-lg font-bold text-white mb-3">Results</h3>
                <p
                  className="text-sm font-semibold leading-relaxed"
                  style={{ color: data.color }}
                >
                  {data.results}
                </p>
              </motion.div>

              {/* Lessons Learned */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mb-8"
              >
                <h3 className="text-lg font-bold text-white mb-3">
                  Lessons Learned
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {data.lessonsLearned}
                </p>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <h3 className="text-lg font-bold text-white mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {data.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold"
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

              {/* Links */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="flex gap-4 pt-8 border-t border-white/10"
              >
                {data.github && (
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium text-white"
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
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium text-white"
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
};
