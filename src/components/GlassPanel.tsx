"use client";

import { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  variant?: "sm" | "md" | "premium";
}

export const GlassPanel = ({ children, className = "", variant = "md" }: GlassPanelProps) => {
  const variantClass = {
    sm: "glass",
    md: "glass-md",
    premium: "glass-premium",
  }[variant];

  return (
    <div className={`${variantClass} rounded-[var(--r-xl)] ${className}`}>
      {children}
    </div>
  );
};
