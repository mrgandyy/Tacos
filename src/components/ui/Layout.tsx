import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Section({
    children,
    className,
    id
}: {
    children: ReactNode;
    className?: string;
    id?: string;
}) {
    return (
        <section id={id} className={cn("py-16 md:py-24 relative overflow-hidden", className)}>
            {children}
        </section>
    );
}

export function Container({
    children,
    className
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("mx-auto w-full max-w-7xl px-4 md:px-6", className)}>
            {children}
        </div>
    );
}
