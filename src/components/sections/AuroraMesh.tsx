"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function AuroraMesh() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Layer 1: Fast tracking spring
  const spring1X = useSpring(mouseX, { stiffness: 80, damping: 30 });
  const spring1Y = useSpring(mouseY, { stiffness: 80, damping: 30 });

  // Layer 2: Slow tracking spring (creates dynamic lag spacing)
  const spring2X = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const spring2Y = useSpring(mouseY, { stiffness: 40, damping: 20 });

  // Layer 3: Ultra slow drift
  const spring3X = useSpring(mouseX, { stiffness: 20, damping: 15 });
  const spring3Y = useSpring(mouseY, { stiffness: 20, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 overflow-hidden bg-[#050608]"
    >
      {/* Layer 1: Primary Warm Amber/Bronze Aura */}
      <motion.div
        className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full blur-[120px] opacity-[0.15] pointer-events-none"
        style={{
          left: spring1X,
          top: spring1Y,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, #d8d1c2 0%, rgba(216,209,194,0.3) 50%, transparent 100%)",
        }}
      />

      {/* Layer 2: Secondary Slate Indigo Aura (Different tracking rate for liquid feel) */}
      <motion.div
        className="absolute w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] rounded-full blur-[140px] opacity-[0.12] pointer-events-none"
        style={{
          left: spring2X,
          top: spring2Y,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, #3b82f6 0%, rgba(59,130,246,0.1) 60%, transparent 100%)",
        }}
      />

      {/* Layer 3: Accent Green/Emerald Aura (Soft edge glow) */}
      <motion.div
        className="absolute w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px] opacity-[0.08] pointer-events-none"
        style={{
          left: spring3X,
          top: spring3Y,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, #22c55e 0%, rgba(34,197,94,0.1) 50%, transparent 100%)",
        }}
      />

      {/* Static background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[65%] h-[65%] rounded-full bg-gradient-to-br from-[#d8d1c2]/5 via-transparent to-transparent blur-[130px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-gradient-to-tl from-[#3b82f6]/4 via-transparent to-transparent blur-[130px]" />

      {/* Technical coordinate grids */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(247, 246, 240, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(247, 246, 240, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
