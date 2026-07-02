"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { Children, useRef } from "react";
import { cn } from "@/lib/utils";

export default function HeadlineReveal({
  as: Tag = "h2",
  lines,
  className,
  immediate = false,
}: {
  as?: "h1" | "h2" | "h3";
  lines: React.ReactNode[];
  className?: string;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const reduceMotion = useReducedMotion();
  const visible = immediate || inView || reduceMotion;
  const keyedLines = Children.toArray(lines);

  return (
    <Tag ref={ref} className={cn(className)}>
      {keyedLines.map((line, index) => (
        <span className="reveal-line" key={index}>
          <motion.span
            initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
            animate={visible ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.7,
              delay: immediate ? index * 0.08 : index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
