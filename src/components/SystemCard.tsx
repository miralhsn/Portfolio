"use client";

import { motion } from "framer-motion";
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

export const SystemCard = ({
  id,
  name,
  description,
  techStack,
  impactMetric,
  color,
  onCardClick,
}: SystemCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
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
        background: `linear-gradient(135deg, rgba(109,94,248,0.05) 0%, rgba(126,231,255,0.02) 100%)`,
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Magnetic glow effect */}
      <motion.div
        className="pointer-events-none absolute rounded-full"
        animate={{
          x: mousePosition.x - 75,
          y: mousePosition.y - 75,
        }}
        transition={{ duration: 0.1, ease: "linear" }}
        style={{
          width: 150,
          height: 150,
          background: `radial-gradient(circle, ${color}15, transparent)`,
          filter: "blur(40px)",
        }}
      />

      {/* Accent border glow */}
      <motion.div
        className="absolute inset-0 rounded-[20px] pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${color}20, transparent 70%)`,
          opacity: 0,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <motion.div
            style={{ color }}
            className="text-xs font-mono font-bold uppercase tracking-widest mb-3 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            {id.toUpperCase()}
          </motion.div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 line-clamp-2">
            {name}
          </h3>

          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Tech Stack - Horizontal scroll on mobile */}
        <div className="mb-4 flex flex-wrap gap-2 overflow-x-auto pb-2">
          {techStack.slice(0, 3).map((tech) => (
            <motion.span
              key={tech}
              className="px-2.5 py-1 rounded text-xs font-mono font-semibold whitespace-nowrap"
              style={{
                background: `${color}20`,
                border: `1px solid ${color}40`,
                color: color,
              }}
              whileHover={{
                background: `${color}30`,
                borderColor: `${color}60`,
              }}
            >
              {tech}
            </motion.span>
          ))}
          {techStack.length > 3 && (
            <span className="px-2.5 py-1 rounded text-xs text-slate-400 font-mono">
              +{techStack.length - 3}
            </span>
          )}
        </div>

        {/* Impact Metric - grows to fill space */}
        <div className="mt-auto">
          <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">
            Impact
          </p>
          <p
            className="text-sm font-semibold leading-snug"
            style={{ color }}
          >
            {impactMetric}
          </p>
        </div>

        {/* Footer interaction hint */}
        <motion.div
          className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-xs text-slate-500 uppercase tracking-wider">
            Click to explore
          </span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-slate-400"
          >
            →
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
