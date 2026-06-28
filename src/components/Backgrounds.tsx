"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue } from "framer-motion";

// ─── HERO: AURORA BACKGROUND ─────────────────────────────────────────
export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#070B14] pointer-events-none" aria-hidden="true">
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 grid-bg opacity-[0.15]" />
      
      {/* Morphing aurora blobs */}
      <div className="absolute inset-0 filter blur-[100px] opacity-30 mix-blend-screen">
        <motion.div
          animate={{
            x: ["-20%", "20%", "-10%"],
            y: ["-20%", "10%", "20%"],
            scale: [1, 1.2, 0.9],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#6D5EF8] to-[#C084FC]"
        />
        <motion.div
          animate={{
            x: ["20%", "-10%", "10%"],
            y: ["20%", "-10%", "-20%"],
            scale: [1.1, 0.8, 1.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-[#7EE7FF] to-[#6D5EF8]"
        />
        <motion.div
          animate={{
            x: ["-10%", "30%", "-20%"],
            y: ["40%", "-30%", "10%"],
            scale: [0.9, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-[#C084FC] to-[#7EE7FF]"
        />
      </div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070B14]/60 to-[#070B14]" />
    </div>
  );
}

// ─── ABOUT: WAVE BACKGROUND ──────────────────────────────────────────
export function WaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#070B14] pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 opacity-[0.03] grid-bg" />
      
      <svg className="absolute bottom-0 w-full h-[60%] min-h-[300px] text-white" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M0 40C240 60 480 20 720 40C960 60 1200 20 1440 40V74H0V40Z"
          fill="url(#wave-grad-1)"
          opacity="0.05"
          animate={{
            d: [
              "M0 40C240 60 480 20 720 40C960 60 1200 20 1440 40V74H0V40Z",
              "M0 45C240 25 480 55 720 35C960 15 1200 45 1440 25V74H0V45Z",
              "M0 40C240 60 480 20 720 40C960 60 1200 20 1440 40V74H0V40Z"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.path
          d="M0 25C240 5 480 45 720 25C960 5 1200 35 1440 15V74H0V25Z"
          fill="url(#wave-grad-2)"
          opacity="0.03"
          animate={{
            d: [
              "M0 25C240 5 480 45 720 25C960 5 1200 35 1440 15V74H0V25Z",
              "M0 20C240 40 480 10 720 30C960 50 1200 15 1440 35V74H0V20Z",
              "M0 25C240 5 480 45 720 25C960 5 1200 35 1440 15V74H0V25Z"
            ]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <defs>
          <linearGradient id="wave-grad-1" x1="720" y1="0" x2="720" y2="74" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6D5EF8" />
            <stop offset="1" stopColor="#070B14" />
          </linearGradient>
          <linearGradient id="wave-grad-2" x1="720" y1="0" x2="720" y2="74" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7EE7FF" />
            <stop offset="1" stopColor="#070B14" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Background ambient orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-500/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full" />
    </div>
  );
}

// ─── PROJECTS: GRID LIGHT BEAMS ──────────────────────────────────────
export function GridLightBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#070B14] pointer-events-none" aria-hidden="true">
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-bg opacity-25" />
      
      {/* Moving beams */}
      <div className="absolute inset-0">
        {/* Horizontal beam */}
        <motion.div
          animate={{
            y: ["0%", "100%"]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#7EE7FF]/35 to-transparent blur-[2px]"
        />

        {/* Vertical beam 1 */}
        <motion.div
          animate={{
            x: ["0%", "100%"]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 1
          }}
          className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#6D5EF8]/25 to-transparent blur-[2px]"
        />

        {/* Vertical beam 2 */}
        <motion.div
          animate={{
            x: ["100%", "0%"]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
            delay: 4
          }}
          className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#C084FC]/25 to-transparent blur-[2px]"
        />
      </div>

      {/* Fade overlay edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070B14] via-transparent to-[#070B14] opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-transparent to-[#070B14] opacity-90" />
    </div>
  );
}

// ─── STACK: PARTICLES CONNECTED WITH SUBTLE LINES ─────────────────────
export function ParticleNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    // Particle density based on screen width
    const particleCount = Math.min(Math.floor(width / 24), 60);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Mouse positions tracking
    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.parentElement?.addEventListener("mousemove", handleMouseMove);
    canvas.parentElement?.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.12;
            ctx.strokeStyle = `rgba(126, 231, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        const mouseDist = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
        if (mouseDist < 120) {
          const alpha = (1 - mouseDist / 120) * 0.25;
          ctx.strokeStyle = `rgba(109, 94, 248, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.fillStyle = "rgba(248, 250, 252, 0.4)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Update positions
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      canvas.parentElement?.removeEventListener("mousemove", handleMouseMove);
      canvas.parentElement?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
      style={{ mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
}

// ─── CONTACT: SOFT RADIAL GLOW ────────────────────────────────────────
export function RadialGlowBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Ambient center glow coordinates combined with cursor coordinates
  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(109, 94, 248, 0.05),
      transparent 80%
    )
  `;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#070B14] pointer-events-none" aria-hidden="true">
      {/* Pulse central ambient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#6D5EF8] to-[#7EE7FF] opacity-[0.03] filter blur-[120px]"
        animate={{
          scale: [0.9, 1.15, 0.9],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Mouse tracking radial glow */}
      {mounted && <motion.div className="absolute inset-0 z-0" style={{ background }} />}
      <div className="absolute inset-0 opacity-[0.02] grid-bg" />
    </div>
  );
}
