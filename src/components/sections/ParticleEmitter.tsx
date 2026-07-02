"use client";

import { useEffect, useRef } from "react";

export default function ParticleEmitter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const particleCount = 40;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
    }> = [];

    const createParticle = (isInit = false) => {
      return {
        x: Math.random() * width,
        y: isInit ? Math.random() * height : height + 10,
        size: 0.5 + Math.random() * 1.5,
        speedY: -(0.2 + Math.random() * 0.5),
        speedX: (Math.random() - 0.5) * 0.15,
        opacity: 0.1 + Math.random() * 0.4,
        fadeSpeed: 0.0005 + Math.random() * 0.001,
      };
    };

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true));
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Dark background
      ctx.fillStyle = "#050608";
      ctx.fillRect(0, 0, width, height);

      // Draw particles
      particles.forEach((p, index) => {
        p.y += p.speedY;
        p.x += p.speedX;

        // Draw glowing particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(216, 209, 194, ${p.opacity})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "#d8d1c2";
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Respawn if off screen or fully faded
        if (p.y < -10 || p.x < -10 || p.x > width + 10) {
          particles[index] = createParticle(false);
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 w-full h-full pointer-events-none"
    />
  );
}
