"use client";

import { motion } from "framer-motion";

interface ArchStep {
  step: string;
  detail: string;
}

interface ArchitectureDiagramProps {
  steps: ArchStep[];
  color: string;
}

export const ArchitectureDiagram = ({ steps, color }: ArchitectureDiagramProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="flex flex-col gap-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {steps.map((s, i) => (
        <motion.div key={s.step} className="flex gap-4" variants={itemVariants}>
          {/* Timeline dot & line */}
          <div className="flex flex-col items-center flex-shrink-0 relative">
            <motion.div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
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
              transition={{ duration: 2, repeat: Infinity }}
            />
            {i < steps.length - 1 && (
              <div
                className="w-0.5 flex-grow min-h-[2rem] mt-1"
                style={{
                  background: `linear-gradient(to bottom, ${color}60, transparent)`,
                }}
              />
            )}
          </div>

          {/* Content */}
          <div className="pb-2 flex-grow">
            <div
              className="text-xs font-mono font-bold uppercase tracking-widest mb-1"
              style={{ color }}
            >
              {s.step}
            </div>
            <p className="text-xs leading-relaxed text-slate-400">{s.detail}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
