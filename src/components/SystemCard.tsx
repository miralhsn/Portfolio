"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState } from "react";

interface SystemCardProps {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  impactMetric: string;
  color: string;
  onCardClick: (id: string) => void;
}

const cardVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
} satisfies Variants;

export function SystemCard({
  id,
  name,
  description,
  techStack,
  impactMetric,
  color,
  onCardClick,
}: SystemCardProps) {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onClick={() => onCardClick(id)}
      onMouseMove={handleMouseMove}
      className="group relative h-full cursor-pointer overflow-hidden rounded-[20px] border border-white/10 transition-all duration-300 hover:border-white/20"
      style={{
        background:
          "linear-gradient(135deg, rgba(109,94,248,0.05) 0%, rgba(126,231,255,0.02) 100%)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Magnetic glow */}
      <motion.div
        className="pointer-events-none absolute rounded-full"
        animate={{
          x: mousePosition.x - 75,
          y: mousePosition.y - 75,
        }}
        transition={{
          duration: 0.1,
          ease: [0, 0, 1, 1],
        }}
        style={{
          width: 150,
          height: 150,
          background: `radial-gradient(circle, ${color}15, transparent)`,
          filter: "blur(40px)",
        }}
      />

      {/* Accent glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[20px]"
        style={{
          background: `linear-gradient(135deg, ${color}20, transparent 70%)`,
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10 flex h-full flex-col p-6 sm:p-8">
        {/* Header */}
        <div className="mb-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            style={{ color }}
            className="mb-3 text-xs font-mono font-bold uppercase tracking-widest opacity-0 transition-opacity group-hover:opacity-100"
          >
            {id.toUpperCase()}
          </motion.div>

          <h3 className="mb-2 line-clamp-2 text-xl font-bold text-white sm:text-2xl">
            {name}
          </h3>

          <p className="line-clamp-2 text-sm leading-relaxed text-slate-400">
            {description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-4 flex flex-wrap gap-2 overflow-x-auto pb-2">
          {techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="whitespace-nowrap rounded px-2.5 py-1 text-xs font-mono font-semibold"
              style={{
                background: `${color}20`,
                border: `1px solid ${color}40`,
                color,
              }}
            >
              {tech}
            </span>
          ))}

          {techStack.length > 3 && (
            <span className="rounded px-2.5 py-1 font-mono text-xs text-slate-400">
              +{techStack.length - 3}
            </span>
          )}
        </div>

        {/* Impact */}
        <div className="mt-auto">
          <p className="mb-1 text-xs font-mono uppercase tracking-wider text-slate-500">
            Impact
          </p>

          <p
            className="text-sm font-semibold leading-snug"
            style={{ color }}
          >
            {impactMetric}
          </p>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="mt-4 flex items-center justify-between border-t border-white/10 pt-4"
        >
          <span className="text-xs uppercase tracking-wider text-slate-500">
            Click to explore
          </span>

          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="text-slate-400"
          >
            →
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}