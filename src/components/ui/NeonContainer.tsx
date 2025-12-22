import React from "react";
import { cn } from "@/lib/utils";

interface NeonContainerProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: "pink" | "cyan" | "violet";
}

export function NeonContainer({ children, className, glowColor = "cyan" }: NeonContainerProps) {
    const borderColor = {
        pink: "border-cyber-pink shadow-[0_0_10px_var(--color-cyber-pink),inset_0_0_5px_var(--color-cyber-pink)]",
        cyan: "border-cyber-cyan shadow-[0_0_10px_var(--color-cyber-cyan),inset_0_0_5px_var(--color-cyber-cyan)]",
        violet: "border-cyber-violet shadow-[0_0_10px_var(--color-cyber-violet),inset_0_0_5px_var(--color-cyber-violet)]",
    };

    return (
        <div
            className={cn(
                "relative rounded-lg border bg-brand-dark/80 backdrop-blur-sm p-6",
                borderColor[glowColor],
                className
            )}
        >
            {/* Corner Accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white/50" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white/50" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white/50" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white/50" />

            {children}
        </div>
    );
}
