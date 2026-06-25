"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface ArchStep {
  step: string;
  detail: string;
}

interface ArchitectureDiagramProps {
  steps: ArchStep[];
  color: string;
}

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function ArchitectureDiagram({
  steps,
  color,
}: ArchitectureDiagramProps) {
  return (
    <motion.div
      className="flex flex-col gap-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {steps.map((s, i) => (
        <motion.div
          key={s.step}
          className="flex gap-4"
          variants={itemVariants}
        >
          <div className="relative flex flex-col items-center flex-shrink-0">
            <motion.div
              className="mt-1 h-2.5 w-2.5 rounded-full flex-shrink-0"
              style={{
                background: color,
                boxShadow: `0 0 12px ${color}80`,
              }}
              animate={{
                boxShadow: [
                  `0 0 12px ${color}80`,
                  `0 0 20px ${color}CC`,
                  `0 0 12px ${color}80`,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            {i < steps.length - 1 && (
              <div
                className="mt-1 min-h-[2rem] w-0.5 flex-grow"
                style={{
                  background: `linear-gradient(to bottom, ${color}60, transparent)`,
                }}
              />
            )}
          </div>

          <div className="flex-grow pb-2">
            <div
              className="mb-1 text-xs font-mono font-bold uppercase tracking-widest"
              style={{ color }}
            >
              {s.step}
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              {s.detail}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}