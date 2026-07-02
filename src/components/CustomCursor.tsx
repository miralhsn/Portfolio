"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const frame = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");
  const active = label.length > 0;

  useEffect(() => {
    const pointerFine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(pointerFine.matches && !reduceMotion.matches);

    update();
    pointerFine.addEventListener("change", update);
    reduceMotion.addEventListener("change", update);

    return () => {
      pointerFine.removeEventListener("change", update);
      reduceMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: MouseEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
      setVisible(true);

      const element = event.target as HTMLElement | null;
      const cursorElement = element?.closest("[data-cursor]");
      setLabel(cursorElement?.getAttribute("data-cursor") ?? "");
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.documentElement.classList.add("has-custom-cursor");
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", () => setVisible(true));

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.22;
      current.current.y += (target.current.y - current.current.y) * 0.22;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }

      frame.current = requestAnimationFrame(animate);
    };

    frame.current = requestAnimationFrame(animate);

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-ink)] transition-[width,height,opacity,background-color,color] duration-200 ease-[var(--ease-standard)]"
      style={{
        width: active ? 72 : 8,
        height: active ? 72 : 8,
        opacity: visible ? 1 : 0,
        mixBlendMode: active ? "normal" : "difference",
      }}
    >
      {active && (
        <span className="text-[10px] font-extrabold uppercase tracking-[0.16em]">
          {label}
        </span>
      )}
    </div>
  );
}
