"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Brain, Code, Cpu, LineChart } from "lucide-react";
import { WaveBackground } from "@/components/Backgrounds";

const philosophy = [
  {
    icon: Cpu,
    title: "Production-First",
    desc: "A model that can't be served is just a prototype. Every model choice, optimization, and parameter is filtered through real-world system latency and serving costs.",
  },
  {
    icon: LineChart,
    title: "Observability Built-In",
    desc: "AI systems fail silently. I build with comprehensive logging, telemetry, vector analytics, and drift monitoring from day one—never as an afterthought.",
  },
  {
    icon: Brain,
    title: "Systems Thinking",
    desc: "The model is only 20% of the architecture. I focus on high-throughput data pipelines, GPU/CPU scaling limits, feedback loops, and robust caching layers.",
  },
];

const stats = [
  { value: "15+", label: "Projects Built" },
  { value: "8+", label: "Systems Deployed" },
  { value: "30+", label: "Technologies Mastered" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 px-6 sm:px-10 bg-[#070B14]"
      aria-label="About Section"
    >
      {/* Wave Background Animation */}
      <WaveBackground />

      <div className="relative z-10 mx-auto max-w-[1200px] w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-left"
        >
          <div className="font-mono text-xs uppercase tracking-widest text-[#6D5EF8] mb-3">
            01 // PROFILE & PHILOSOPHY
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight uppercase">
            What I Build & How I Think<span className="text-[#7EE7FF]">.</span>
          </h2>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16"
        >
          {/* Left Column: Biography (What I build & how I think) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-6 text-slate-300">
            <h3 className="text-xl font-semibold text-white font-mono uppercase tracking-wide">
              Engineering AI for reliability
            </h3>
            
            <p className="text-slate-400 leading-relaxed text-sm">
              I am an AI Systems Engineer who focuses on translating bleeding-edge machine learning research into production-grade systems. I bridge the gap between academic models and robust, scalable backend architectures.
            </p>
            
            <p className="text-slate-400 leading-relaxed text-sm">
              My engineering philosophy centers around simplicity and performance. Rather than deploying complex architectures by default, I opt for the simplest mechanism that meets the latency, cost, and reliability criteria of a production environment.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 text-center backdrop-blur-md"
                >
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-slate-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Philosophy details */}
          <motion.div variants={itemVariants} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-1 gap-4">
            {philosophy.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative rounded-2xl border border-white/[0.06] bg-[#070B14]/40 p-6 transition-all duration-300 hover:border-[#6D5EF8]/40 hover:bg-white/[0.02]"
                >
                  {/* Decorative corner indicator */}
                  <div className="absolute top-4 right-6 font-mono text-[9px] text-slate-600">
                    0{idx + 1}
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-[#7EE7FF] group-hover:text-white group-hover:border-[#6D5EF8]/30 group-hover:bg-[#6D5EF8]/10 transition-colors">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs leading-relaxed text-slate-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
