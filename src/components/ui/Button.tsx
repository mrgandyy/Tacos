import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-pink disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    {
        variants: {
            variant: {
                solid: "bg-cyber-pink text-white hover:bg-cyber-pink/90 hover:shadow-[0_0_15px_rgba(255,45,134,0.5)]",
                outline: "border border-cyber-cyan/50 bg-transparent text-cyber-cyan hover:bg-cyber-cyan/10 hover:border-cyber-cyan hover:shadow-[0_0_10px_rgba(56,214,255,0.3)]",
                ghost: "hover:bg-white/10 text-white hover:text-cyber-pink",
                glow: "bg-cyber-violet text-white hover:bg-cyber-violet/90 shadow-[0_0_20px_rgba(189,0,255,0.4)] hover:shadow-[0_0_30px_rgba(189,0,255,0.6)]"
            },
            size: {
                sm: "h-8 px-3 text-xs",
                md: "h-10 px-6 py-2 text-sm",
                lg: "h-12 px-8 text-base",
                icon: "h-10 w-10" // Adding icon size just in case, typical in shadcn
            },
        },
        defaultVariants: {
            variant: "solid",
            size: "md",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
