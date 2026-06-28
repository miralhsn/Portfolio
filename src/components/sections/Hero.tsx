"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { AuroraBackground } from "@/components/Backgrounds";

// ─── MAGNETIC BUTTON COMPONENT ────────────────────────────────────────
function MagneticButton({
  children,
  className = "",
  href,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Snaps the button 30% towards the cursor coordinate
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const buttonContent = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="w-full h-full flex items-center justify-center"
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className={className}>
        {buttonContent}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {buttonContent}
    </button>
  );
}

// ─── HERO COMPONENT ──────────────────────────────────────────────────
export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 sm:px-10"
      aria-label="Hero Section"
    >
      {/* Dynamic Aurora Mesh Background */}
      <AuroraBackground />

      {/* Main Content Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center text-center max-w-[900px] mt-10"
      >
        {/* Eyebrow Status */}
        <motion.div
          variants={itemVariants}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#7EE7FF] animate-pulse" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-300">
            Available for Senior Roles
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl mb-4 font-sans uppercase"
          style={{ letterSpacing: "-0.03em" }}
        >
          hi, i am <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D5EF8] via-[#7EE7FF] to-[#C084FC]">miral hasan</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.h2
          variants={itemVariants}
          className="text-lg sm:text-2xl font-medium tracking-tight text-slate-300 mb-6 max-w-2xl font-mono uppercase"
        >
          building production-ready AI systems
        </motion.h2>

        {/* Small Description */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base leading-relaxed text-slate-400 max-w-[580px] mb-12"
        >
          AI Software Engineer focused on Computer Vision, LLMs, Agentic AI, Semantic Search, Explainable AI and scalable backend systems.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Let's Talk */}
          <MagneticButton
            href="mailto:miralqureshi@gmail.com"
            className="w-full sm:w-auto h-12 rounded-xl bg-gradient-to-r from-[#6D5EF8] to-[#7EE7FF] text-white text-xs font-semibold px-8 py-3 shadow-[0_0_30px_rgba(109,94,248,0.25)] hover:shadow-[0_0_40px_rgba(109,94,248,0.4)] transition-all duration-300 flex items-center justify-center gap-2 border border-white/10"
          >
            <Mail size={14} />
            <span>Let&apos;s Talk</span>
          </MagneticButton>

          {/* View Work */}
          <MagneticButton
            href="#projects"
            className="w-full sm:w-auto h-12 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] text-slate-300 hover:text-white text-xs font-semibold px-8 py-3 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>View Work</span>
            <ArrowRight size={14} />
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-500">
          Scroll
        </span>
        <div className="flex h-10 w-[18px] justify-center rounded-full border border-white/[0.15] bg-white/[0.02] p-1">
          <motion.div
            animate={{
              y: [0, 16, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-1.5 w-1.5 rounded-full bg-[#7EE7FF]"
          />
        </div>
      </motion.div>
    </section>
  );
}
