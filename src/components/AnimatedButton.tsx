"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface AnimatedButtonProps {
  icon?: LucideIcon;
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent";
  size?: "sm" | "md";
  external?: boolean;
}

export const AnimatedButton = ({
  icon: Icon,
  label,
  href,
  onClick,
  variant = "secondary",
  size = "md",
  external = false,
}: AnimatedButtonProps) => {
  const baseClass = "btn-premium";
  const variantClass = variant === "accent" ? "btn-premium-accent" : "";
  const sizeClass = size === "sm" ? "px-3 py-1.5 text-sm" : "px-5 py-2.5 text-base";

  const content = (
    <>
      {Icon && <Icon size={16} />}
      <span>{label}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`${baseClass} ${variantClass} ${sizeClass}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClass} ${variantClass} ${sizeClass}`}>
      {content}
    </button>
  );
};
