"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { RadialGlowBackground } from "@/components/Backgrounds";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 px-6 sm:px-10 bg-[#070B14]"
      aria-label="Contact Section"
    >
      {/* Soft Radial Glow Background */}
      <RadialGlowBackground />

      <div className="relative z-10 mx-auto max-w-[800px] w-full text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section Indicator Label */}
          <motion.div variants={itemVariants}>
            <span className="font-mono text-xs uppercase tracking-widest text-[#6D5EF8]">
              04 // ACQUISITION & TALK
            </span>
          </motion.div>

          {/* Large CTA Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.05]"
          >
            Let&apos;s build something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D5EF8] via-[#7EE7FF] to-[#C084FC]">
              intelligent
            </span>
            .
          </motion.h2>

          {/* Short description */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base leading-relaxed text-slate-400 max-w-[500px] mx-auto"
          >
            Currently open to senior AI systems engineering roles, technical advisory, and high-signal research projects.
          </motion.p>

          {/* Elegant Interactive Contact Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 pt-6"
          >
            {/* Email */}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.01] hover:bg-[#6D5EF8]/10 hover:border-[#6D5EF8]/30 px-6 py-3.5 text-xs font-semibold text-slate-300 hover:text-white transition-all duration-300"
            >
              <Mail size={14} />
              <span>{siteConfig.contactEmail}</span>
              <ArrowUpRight size={12} className="text-slate-600 group-hover:text-white" />
            </a>

            {/* LinkedIn */}
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.01] hover:bg-[#7EE7FF]/10 hover:border-[#7EE7FF]/30 px-6 py-3.5 text-xs font-semibold text-slate-300 hover:text-white transition-all duration-300"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764 0-.973.784-1.763 1.75-1.763s1.75.79 1.75 1.763c0 .974-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
              <span>LinkedIn</span>
              <ArrowUpRight size={12} className="text-slate-600" />
            </a>

            {/* GitHub */}
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.01] hover:bg-[#C084FC]/10 hover:border-[#C084FC]/30 px-6 py-3.5 text-xs font-semibold text-slate-300 hover:text-white transition-all duration-300"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span>GitHub</span>
              <ArrowUpRight size={12} className="text-slate-600" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
