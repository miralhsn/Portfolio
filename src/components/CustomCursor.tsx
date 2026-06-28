"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hoverState, setHoverState] = useState<"default" | "hover" | "card">("default");
  
  // Track cursor position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the main cursor ring
  const springConfig = { damping: 30, stiffness: 220, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Springs for trail particles (increasing damping for lag effect)
  const trail1X = useSpring(mouseX, { damping: 40, stiffness: 180, mass: 1 });
  const trail1Y = useSpring(mouseY, { damping: 40, stiffness: 180, mass: 1 });

  const trail2X = useSpring(mouseX, { damping: 50, stiffness: 140, mass: 1.2 });
  const trail2Y = useSpring(mouseY, { damping: 50, stiffness: 140, mass: 1.2 });

  useEffect(() => {
    // Enable only on desktop devices with a precise pointer
    const media = window.matchMedia("(pointer: fine)");
    setEnabled(media.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setEnabled(e.matches);
    };
    media.addEventListener("change", handleMediaChange);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Detect hovering over cards
      if (target.closest("[data-cursor='card']") || target.closest(".project-card")) {
        setHoverState("card");
      } 
      // Detect hovering over links, buttons, or custom interactives
      else if (
        target.closest("a") || 
        target.closest("button") || 
        target.closest("[role='button']") ||
        target.closest("[data-cursor='pointer']") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setHoverState("hover");
      } else {
        setHoverState("default");
      }
    };

    if (media.matches) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseover", handleMouseOver, { passive: true });
    }

    return () => {
      media.removeEventListener("change", handleMediaChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  // Render cursor styling variables
  const cursorDimensions = {
    default: { width: 32, height: 32, border: "1px solid rgba(126, 231, 255, 0.4)", bg: "rgba(126, 231, 255, 0.02)" },
    hover: { width: 54, height: 54, border: "1px solid rgba(109, 94, 248, 0.6)", bg: "rgba(109, 94, 248, 0.08)" },
    card: { width: 80, height: 80, border: "1px solid rgba(192, 132, 252, 0.7)", bg: "rgba(192, 132, 252, 0.08)" },
  }[hoverState];

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Dynamic dynamic cursor ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorDimensions.width,
          height: cursorDimensions.height,
          backgroundColor: cursorDimensions.bg,
          border: cursorDimensions.border,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative flex items-center justify-center rounded-full shadow-[0_0_20px_rgba(109,94,248,0.1)]"
      >
        {/* Render indicator text for project cards */}
        {hoverState === "card" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#C084FC]"
          >
            Explore
          </motion.span>
        )}
      </motion.div>

      {/* Central core dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hoverState === "default" ? 1 : 0.6,
          backgroundColor: hoverState === "card" ? "#C084FC" : hoverState === "hover" ? "#6D5EF8" : "#7EE7FF",
        }}
        className="absolute h-1.5 w-1.5 rounded-full shadow-[0_0_8px_rgba(126,231,255,0.8)]"
      />

      {/* Trail particle 1 */}
      <motion.div
        style={{
          x: trail1X,
          y: trail1Y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: hoverState === "card" ? 0.8 : 0.4,
          scale: hoverState === "card" ? 1.2 : 0.8,
        }}
        className="absolute h-1 w-1 rounded-full bg-[#6D5EF8]/60 blur-[0.5px]"
      />

      {/* Trail particle 2 */}
      <motion.div
        style={{
          x: trail2X,
          y: trail2Y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: hoverState === "card" ? 0.5 : 0.2,
          scale: hoverState === "card" ? 1 : 0.6,
        }}
        className="absolute h-1 w-1 rounded-full bg-[#C084FC]/40 blur-[1px]"
      />

      {/* CSS Override Block to Hide Default Cursor */}
      <style jsx global>{`
        @media (pointer: fine) {
          body, a, button, [role="button"], select, input, textarea, .card-hover, .btn-premium {
            cursor: none !important;
          }
        }
      `}</style>
    </div>
  );
}
