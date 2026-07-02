"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function MagneticLink({
  href,
  children,
  className,
  cursorLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  cursorLabel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const pointerFine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnabled(pointerFine.matches && !reduceMotion.matches);

    const update = () => setEnabled(pointerFine.matches && !reduceMotion.matches);
    pointerFine.addEventListener("change", update);
    reduceMotion.addEventListener("change", update);

    return () => {
      pointerFine.removeEventListener("change", update);
      reduceMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.16;
      current.current.y += (target.current.y - current.current.y) * 0.16;

      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }

      frame.current = requestAnimationFrame(animate);
    };

    frame.current = requestAnimationFrame(animate);

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [enabled]);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!enabled || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      target.current = {
        x: (event.clientX - (rect.left + rect.width / 2)) * 0.18,
        y: (event.clientY - (rect.top + rect.height / 2)) * 0.18,
      };
    },
    [enabled],
  );

  const reset = useCallback(() => {
    target.current = { x: 0, y: 0 };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      data-cursor={cursorLabel}
      className={cn("will-change-transform", className)}
    >
      {children}
    </a>
  );
}
