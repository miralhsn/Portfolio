"use client";

import { useEffect, useRef } from "react";

export default function FlowingLines() {
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

    let phase = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Background
      ctx.fillStyle = "#090a0d"; // soft dark color for journey background
      ctx.fillRect(0, 0, width, height);

      phase += 0.003;

      // Draw flowing lines (3 overlapping waves)
      const waveCount = 3;
      const colors = [
        "rgba(216, 209, 194, 0.04)",
        "rgba(216, 209, 194, 0.08)",
        "rgba(216, 209, 194, 0.06)",
      ];

      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        ctx.strokeStyle = colors[w];
        ctx.lineWidth = 1.5 - w * 0.3;

        // Custom frequency/amplitude per wave
        const amplitude = 30 + w * 15;
        const frequency = 0.002 + w * 0.001;

        for (let x = 0; x < width; x += 10) {
          const y =
            height / 2 +
            Math.sin(x * frequency + phase * (w + 1)) * amplitude +
            Math.cos(x * 0.001 - phase * 0.5) * (amplitude * 0.5);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

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
