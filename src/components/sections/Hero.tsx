"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import MagneticLink from "@/components/motion/MagneticLink";
import AuroraMesh from "./AuroraMesh";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
  };

  const lineVariants = {
    hidden: { y: "115%" },
    visible: {
      y: 0,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  const descVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
        delay: 0.7,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden border-b hairline pt-28 flex items-center bg-[#050608]"
      aria-label="Hero Section"
    >
      <AuroraMesh />

      <div className="site-shell w-full pb-14 sm:pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="editorial-grid gap-y-6"
        >
          {/* Main Headline */}
          <div className="col-span-12 lg:col-span-10 lg:col-start-2">
            <h1 className="flex flex-col font-sans uppercase font-normal leading-[0.88] tracking-tight">
              {/* Line 1: Hi, I'm */}
              <span className="block overflow-hidden h-[clamp(2.5rem,8vw,6.5rem)] py-1">
                <motion.span
                  variants={lineVariants}
                  className="block text-white/50 text-[clamp(2.2rem,7vw,5.5rem)] font-light tracking-wide lowercase"
                >
                  hi, i&apos;m
                </motion.span>
              </span>
              
              {/* Line 2: Miral Hasan */}
              <span className="block overflow-hidden h-[clamp(3.8rem,13vw,10.5rem)] py-1 mt-2">
                <motion.span
                  variants={lineVariants}
                  className="block text-[clamp(3.5rem,12vw,10rem)] font-bold text-[var(--color-text)] tracking-tighter"
                >
                  Miral Hasan
                </motion.span>
              </span>
            </h1>
          </div>

          {/* Line 3: Building production-ready AI systems. */}
          <div className="col-span-12 mt-4 lg:col-span-8 lg:col-start-2 overflow-hidden py-1">
            <motion.h2
              variants={lineVariants}
              className="font-sans text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.05] tracking-tight text-[var(--color-accent)]"
            >
              building production-ready AI systems.
            </motion.h2>
          </div>

          {/* Description & Call To Action */}
          <motion.div
            variants={descVariants}
            className="col-span-12 mt-6 lg:col-span-5 lg:col-start-2 flex flex-col gap-8 md:mt-10"
          >
            <p className="body-small text-[var(--color-muted)] max-w-[36rem] leading-relaxed">
              AI Systems Engineer specializing in Computer Vision, LLMs, Agentic workflows, and scalable backend pipelines. Bridging the gap between machine learning models and high-throughput production infrastructure.
            </p>

            <div className="flex flex-wrap gap-4">
              <MagneticLink
                href="mailto:miralqureshi@gmail.com"
                cursorLabel="OPEN"
                className="focus-ring group inline-flex h-12 items-center justify-center gap-2.5 border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 text-xs font-bold uppercase tracking-wider text-[var(--color-accent-ink)] transition-transform duration-200 active:scale-[0.97]"
              >
                <Mail size={14} strokeWidth={2} />
                <span>Let&apos;s Talk</span>
              </MagneticLink>

              <MagneticLink
                href="#projects"
                cursorLabel="VIEW"
                className="focus-ring group inline-flex h-12 items-center justify-center gap-2.5 border border-white/10 px-6 text-xs font-bold uppercase tracking-wider text-[var(--color-text)] transition-colors duration-200 hover:border-white/30 active:scale-[0.97]"
              >
                <span>Featured Systems</span>
                <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-1" />
              </MagneticLink>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
