"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [isFinished, setIsFinished] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if user already saw the intro recently (using session storage for reload/developer comfort)
    const hasSeenIntro = sessionStorage.getItem("mh-portfolio-intro-seen");
    if (hasSeenIntro === "true") {
      onComplete();
      return;
    }

    setShouldRender(true);
  }, [onComplete]);

  const handleAnimationComplete = () => {
    sessionStorage.setItem("mh-portfolio-intro-seen", "true");
    setIsFinished(true);
    onComplete(); // Reveal home page content concurrently behind the shrinking shutter mask
  };

  if (!shouldRender) return null;

  return (
    <AnimatePresence mode="wait">
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "circle(0% at 50% 50%)",
            transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050608] overflow-hidden"
        >
          {/* Subtle background glow/grain animation */}
          <motion.div
            animate={{
              opacity: [0.03, 0.07, 0.03],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-radial-glow pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(216,209,194,0.08) 0%, transparent 70%)",
            }}
          />

          <div className="relative w-full max-w-xl px-8 flex flex-col items-center">
            {/* 1. Animated MH Monogram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <svg
                width="72"
                height="72"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#d8d1c2]"
              >
                {/* Monogram Outer Hexagon / Frame */}
                <motion.polygon
                  points="50,5 90,28 90,72 50,95 10,72 10,28"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
                {/* M Shape */}
                <motion.path
                  d="M28,68 V32 L50,54 L72,32 V68"
                  stroke="currentColor"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 1.0, ease: "easeInOut" }}
                />
                {/* H Overlap lines or inner accents */}
                <motion.path
                  d="M38,50 H62"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>

            {/* 2. Thin drawing line */}
            <div className="relative w-48 h-px bg-white/10 mb-6 overflow-hidden">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1.4, ease: "easeInOut", repeat: 0 }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#d8d1c2]/80 to-transparent"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 bg-[#d8d1c2]/20 origin-center"
              />
            </div>

            {/* 3. Text fades in */}
            <div className="text-center space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl font-bold tracking-[0.16em] text-[#f7f6f0] uppercase font-sans"
              >
                Miral Hasan
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs tracking-[0.2em] text-[#d8d1c2]/80 uppercase font-mono"
              >
                Building Production-Ready AI Systems
              </motion.p>
            </div>

            {/* Skip button for quick manual bypass */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              whileHover={{ opacity: 0.9 }}
              onClick={handleAnimationComplete}
              className="absolute bottom-[-60px] text-[10px] tracking-[0.25em] text-[#f7f6f0] uppercase font-mono border-b border-white/20 pb-0.5"
            >
              Skip Intro
            </motion.button>
          </div>

          {/* Trigger auto finish after 2.3 seconds */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.01 }}
            onAnimationComplete={() => {
              const timer = setTimeout(() => {
                handleAnimationComplete();
              }, 2100);
              return () => clearTimeout(timer);
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
