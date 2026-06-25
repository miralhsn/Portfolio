"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { SystemCard } from "./SystemCard";
import { SlideOverCaseStudy } from "./SlideOverCaseStudy";

export interface SystemData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  shortDescription: string;
  techStack: string[];
  impactMetric: string;
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

interface SystemsShowcaseProps {
  systems: SystemData[];
}

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export function SystemsShowcase({
  systems,
}: SystemsShowcaseProps) {
  const [selectedSystemId, setSelectedSystemId] =
    useState<string | null>(null);

  const ref = useRef<HTMLElement>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const selectedSystem =
    systems.find((s) => s.id === selectedSystemId) ?? null;

  return (
    <section
      id="systems"
      ref={ref}
      className="section relative overflow-hidden"
    >
      {/* Background Orb 1 */}
      <motion.div
        className="absolute -left-40 -top-40 h-80 w-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(109,94,248,0.1), transparent)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1],
        }}
      />

      {/* Background Orb 2 */}
      <motion.div
        className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(126,231,255,0.08), transparent)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1],
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.6,
          }}
        >
          <div className="section-label">
            Engineering Excellence
          </div>

          <div className="mb-4">
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Systems Built
              <span style={{ color: "var(--primary)" }}>
                .
              </span>
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-relaxed text-slate-400">
            Production-grade AI systems architected for
            real-world environments. Each system represents
            deep technical decisions, architectural patterns,
            and measurable impact.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
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

        {/* Mobile Hint */}
        <motion.div
          className="mt-8 text-center lg:hidden"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
            ← Scroll to explore →
          </p>
        </motion.div>
      </div>

      {/* Case Study Panel */}
      <SlideOverCaseStudy
        isOpen={!!selectedSystem}
        data={
          selectedSystem
            ? {
                id: selectedSystem.id,
                name: selectedSystem.name,
                tagline: selectedSystem.tagline,
                description:
                  selectedSystem.description,
                problem: selectedSystem.problem,
                architecture:
                  selectedSystem.architecture,
                technicalDecisions:
                  selectedSystem.technicalDecisions,
                challenges:
                  selectedSystem.challenges,
                results: selectedSystem.results,
                lessonsLearned:
                  selectedSystem.lessonsLearned,
                stack: selectedSystem.stack,
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
}