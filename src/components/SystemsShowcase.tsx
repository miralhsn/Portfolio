"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SystemCard } from "./SystemCard";
import { SlideOverCaseStudy } from "./SlideOverCaseStudy";

interface SystemData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  shortDescription: string;
  techStack: string[];
  impactMetric: string;
  problem: string;
  architecture: Array<{ step: string; detail: string }>;
  technicalDecisions: string;
  challenges: string;
  results: string;
  lessonsLearned: string;
  fullStack: string[];
  color: string;
  github?: string;
  demo?: string;
}

interface SystemsShowcaseProps {
  systems: SystemData[];
}

export const SystemsShowcase = ({ systems }: SystemsShowcaseProps) => {
  const [selectedSystemId, setSelectedSystemId] = useState<string | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const selectedSystem = systems.find((s) => s.id === selectedSystemId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section id="systems" className="section relative overflow-hidden" ref={ref}>
      {/* Animated background orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(109,94,248,0.1), transparent)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(126,231,255,0.08), transparent)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <div className="section-label">Engineering Excellence</div>
          <div className="mb-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Systems Built<span style={{ color: "var(--primary)" }}>.</span>
            </h2>
          </div>
          <p className="text-base text-slate-400 max-w-2xl leading-relaxed">
            Production-grade AI systems architected for real-world environments. Each system
            represents deep technical decisions, architectural patterns, and measurable impact.
          </p>
        </motion.div>

        {/* Cards Grid - Responsive Layout */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {systems.map((system) => (
            <SystemCard
              key={system.id}
              id={system.id}
              name={system.name}
              description={system.shortDescription}
              techStack={system.techStack}
              impactMetric={system.impactMetric}
              color={system.color}
              onCardClick={setSelectedSystemId}
            />
          ))}
        </motion.div>

        {/* Scroll hint for mobile/tablet */}
        <motion.div
          className="mt-8 text-center lg:hidden"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">
            ← Scroll to explore →
          </p>
        </motion.div>
      </div>

      {/* Slide-over panel */}
      <SlideOverCaseStudy
        isOpen={!!selectedSystemId}
        data={
          selectedSystem
            ? {
                id: selectedSystem.id,
                name: selectedSystem.name,
                tagline: selectedSystem.tagline,
                description: selectedSystem.description,
                problem: selectedSystem.problem,
                architecture: selectedSystem.architecture,
                technicalDecisions: selectedSystem.technicalDecisions,
                challenges: selectedSystem.challenges,
                results: selectedSystem.results,
                lessonsLearned: selectedSystem.lessonsLearned,
                stack: selectedSystem.fullStack,
                color: selectedSystem.color,
                github: selectedSystem.github,
                demo: selectedSystem.demo,
              }
            : null
        }
        onClose={() => setSelectedSystemId(null)}
      />
    </section>
  );
};
