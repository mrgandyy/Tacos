"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Layout";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

const navLinks = [
    { href: "/worlds", label: "Worlds" },
    { href: "/events", label: "Events" },
    { href: "/staff", label: "Staff" },
    { href: "/about", label: "About" },
    { href: "/links", label: "Links" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                scrolled ? "bg-black/60 backdrop-blur-xl border-white/5 py-2" : "bg-transparent py-4"
            )}
        >
            <Container>
                <div className="flex items-center justify-between">
                    <Logo />

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-brand-pink",
                                    pathname === link.href ? "text-brand-pink drop-shadow-[0_0_5px_rgba(255,45,134,0.5)]" : "text-gray-300"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        {/* CTA placeholder, maybe Discord? */}
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/links">Connect</Link>
                        </Button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </Container>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-brand-dark border-b border-white/10 p-4 flex flex-col gap-4 animate-in slide-in-from-top-5 fade-in">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-lg font-medium p-2 rounded-md hover:bg-white/5",
                                pathname === link.href ? "text-brand-pink" : "text-gray-300"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Button variant="solid" className="mt-4 w-full" asChild>
                        <Link href="/links">Connect</Link>
                    </Button>
                </div>
            )}
        </nav>
    );
}
