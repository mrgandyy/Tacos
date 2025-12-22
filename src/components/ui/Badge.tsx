import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outline' | 'neon-pink' | 'neon-cyan';
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const variants = {
        default: "border-transparent bg-white/10 text-white hover:bg-white/20",
        outline: "text-foreground",
        "neon-pink": "border-transparent bg-cyber-pink/20 text-cyber-pink border border-cyber-pink/50 shadow-[0_0_10px_rgba(255,0,255,0.3)]",
        "neon-cyan": "border-transparent bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/50 shadow-[0_0_10px_rgba(0,255,255,0.3)]",
    }

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                variants[variant],
                className
            )}
            {...props}
        />
    )
}

export { Badge }
