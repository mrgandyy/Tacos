"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <div className={cn("relative inline-block", className)}>
      <span className="relative z-10">{text}</span>
      <span
        className="absolute top-0 left-0 -z-10 w-full h-full text-cyber-pink mix-blend-screen animate-glitch-1"
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        className="absolute top-0 left-0 -z-10 w-full h-full text-cyber-cyan mix-blend-screen animate-glitch-2"
        aria-hidden="true"
      >
        {text}
      </span>
    </div>
  );
}
