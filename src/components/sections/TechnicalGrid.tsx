"use client";

import { useEffect, useRef } from "react";

export default function TechnicalGrid() {
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

    // Blinking nodes data
    const nodes: Array<{ x: number; y: number; speed: number; phase: number; size: number }> = [];
    for (let i = 0; i < 15; i++) {
      nodes.push({
        x: Math.random(),
        y: Math.random(),
        speed: 0.2 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
        size: 1 + Math.random() * 2,
      });
    }

    let offset = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep dark background
      ctx.fillStyle = "#050608";
      ctx.fillRect(0, 0, width, height);

      // Grid line configuration
      const gridSize = 80;
      ctx.strokeStyle = "rgba(216, 209, 194, 0.04)";
      ctx.lineWidth = 1;

      // Scroll speed offset
      offset = (offset + 0.15) % gridSize;

      // Draw vertical grid lines
      for (let x = offset; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw horizontal grid lines
      for (let y = offset; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw blinking technical nodes/points
      nodes.forEach((node) => {
        const nx = node.x * width;
        // Shift Y position slightly over time to move along with the grid
        const ny = (node.y * height + offset * 0.5) % height;

        node.phase += 0.02 * node.speed;
        const opacity = 0.08 + Math.abs(Math.sin(node.phase)) * 0.25;

        // Glow circle
        ctx.beginPath();
        ctx.arc(nx, ny, node.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(216, 209, 194, ${opacity * 0.3})`;
        ctx.fill();

        // Core point
        ctx.beginPath();
        ctx.arc(nx, ny, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(216, 209, 194, ${opacity})`;
        ctx.fill();

        // Technical coordinates text near node
        ctx.fillStyle = `rgba(216, 209, 194, ${opacity * 0.5})`;
        ctx.font = "7px Courier New, monospace";
        ctx.fillText(`[${Math.round(nx)}, ${Math.round(ny)}]`, nx + 8, ny + 3);
      });

      // Technical HUD circle graphics on the edges
      ctx.strokeStyle = "rgba(216, 209, 194, 0.03)";
      ctx.beginPath();
      ctx.arc(width - 150, 200, 100, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(width - 150, 200, 105, 0, Math.PI * 0.5);
      ctx.stroke();

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
