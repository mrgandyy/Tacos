import Link from "next/link";
import { Container, Section } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { socialLinks } from "@/data/links";
import { ExternalLink, Mail } from "lucide-react";
import { LogoText } from "@/components/ui/Logo";

export default function LinksPage() {
    return (
        <div className="min-h-screen flex items-center justify-center py-20">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-pink/10 to-brand-dark z-0" />

            <Container className="relative z-10 max-w-md">
                <div className="text-center mb-12 space-y-4">
                    <div className="flex justify-center">
                        <LogoText className="h-24 md:h-32 w-auto" />
                    </div>
                    <p className="text-xl font-medium text-white">Connect with Taco's</p>
                    <p className="text-sm text-gray-400">Everything you need, all in one place.</p>
                </div>

                <div className="space-y-4">
                    {socialLinks.map((link) => (
                        <Button
                            key={link.id}
                            variant="outline"
                            size="lg"
                            className="w-full justify-between h-16 text-lg border-white/20 hover:border-brand-pink hover:bg-white/5"
                            style={{ borderColor: link.color ? `${link.color}50` : undefined }}
                            asChild
                        >
                            <Link href={link.url} target="_blank">
                                <span className="flex items-center gap-3">
                                    {/* Icon placeholder could go here */}
                                    {link.platform}
                                </span>
                                <span className="text-sm font-normal opacity-70">
                                    {link.label} <ExternalLink className="inline-block w-4 h-4 ml-2" />
                                </span>
                            </Link>
                        </Button>
                    ))}

                    <div className="pt-8 border-t border-white/10 mt-8">
                        <h3 className="text-center text-white font-bold mb-4">Contact Us</h3>
                        <Button variant="ghost" className="w-full" asChild>
                            <Link href="mailto:contact@tacos.vr">
                                <Mail className="w-4 h-4 mr-2" /> contact@tacos.vr
                            </Link>
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}
