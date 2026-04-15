"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonColorfulProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export function ButtonColorful({
  className,
  label = "Get Started",
  ...props
}: ButtonColorfulProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center",
        "px-8 py-3 rounded-full",
        "text-sm font-medium tracking-wide",
        "text-[#f7f5f1]",
        "bg-[#0d0907]",
        "transition-all duration-300",
        "group",
        className
      )}
      {...props}
    >
      {/* Animated gradient border */}
      <span
        className={cn(
          "absolute inset-0 rounded-full",
          "bg-gradient-to-r from-[#7a2e0e] via-[#3b1f6b] to-[#5c1a1a]",
          "opacity-70 blur-[2px]",
          "transition-opacity duration-300",
          "group-hover:opacity-100"
        )}
      />

      {/* Inner background */}
      <span
        className={cn(
          "absolute inset-[1.5px] rounded-full",
          "bg-[#0d0907]",
          "transition-opacity duration-300"
        )}
      />

      {/* Gradient shimmer on hover */}
      <span
        className={cn(
          "absolute inset-[1.5px] rounded-full",
          "bg-gradient-to-r from-[#7a2e0e] via-[#3b1f6b] to-[#5c1a1a]",
          "opacity-0 group-hover:opacity-10",
          "transition-opacity duration-300"
        )}
      />

      {/* Label */}
      <span className="relative z-10">{label}</span>
    </button>
  );
}
