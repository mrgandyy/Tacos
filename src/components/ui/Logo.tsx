import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
    return (
        <Link href="/" className={cn("relative flex items-center gap-2 group", className)}>
            <div className="relative h-10 w-8 overflow-hidden">
                <Image
                    src="/branding/logo-mark.png"
                    alt="Taco's Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_8px_rgba(255,45,134,0.5)] transition-all group-hover:drop-shadow-[0_0_15px_rgba(255,45,134,0.8)]"
                    priority
                />
            </div>
            <span className="font-bold text-xl tracking-tight text-white hidden sm:block">
                TACO'S
            </span>
        </Link>
    );
}

export function LogoText({ className }: { className?: string }) {
    return (
        <div className={cn("relative h-40 w-full max-w-[300px]", className)}>
            <Image
                src="/branding/logo-full-pink.jpg"
                alt="Taco's Branding"
                fill
                className="object-contain"
            />
        </div>
    )
}
