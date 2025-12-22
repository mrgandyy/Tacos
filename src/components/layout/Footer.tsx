import { Container } from "@/components/ui/Layout";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/5 bg-black py-12">
            <Container>
                <div className="grid gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <Logo />
                        <p className="text-sm text-gray-400 max-w-xs">
                            Nightlife Circuit in VRChat.<br />
                            A connected series of worlds. Coordinated events. Tradition built after dark.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Explore</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/worlds" className="hover:text-brand-pink transition-colors">Worlds</Link></li>
                            <li><Link href="/events" className="hover:text-brand-pink transition-colors">Events</Link></li>
                            <li><Link href="/staff" className="hover:text-brand-pink transition-colors">Staff</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Connect</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/links" className="hover:text-brand-cyan transition-colors">Discord</Link></li>
                            <li><Link href="/links" className="hover:text-brand-cyan transition-colors">VRChat Group</Link></li>
                            <li><Link href="/links" className="hover:text-brand-cyan transition-colors">Instagram</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>&copy; {currentYear} Taco's Nightlife</li>
                            <li>Not affiliated with VRChat Inc.</li>
                        </ul>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
