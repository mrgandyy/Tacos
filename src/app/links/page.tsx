import { useState } from "react";
import Link from "next/link";
import { Container, Section } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { socialLinks } from "@/data/links";
import { ExternalLink, Mail, Send, Loader2 } from "lucide-react";
import { LogoText } from "@/components/ui/Logo";
import { motion } from "framer-motion";

export default function LinksPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Failed to send message');

            setSubmitStatus('success');
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error(error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-20">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-pink/10 to-brand-dark z-0" />

            <Container className="relative z-10 max-w-md w-full">
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
                        <h3 className="text-center text-white font-bold mb-6 flex items-center justify-center gap-2">
                            <Mail className="w-5 h-5 text-brand-pink" /> Contact Us
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4 bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm text-gray-400">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-pink transition-colors"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm text-gray-400">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-pink transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm text-gray-400">Message</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    required
                                    rows={4}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-pink transition-colors resize-none"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-brand-pink hover:bg-brand-pink/80 text-white font-bold"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                                ) : (
                                    <><Send className="w-4 h-4 mr-2" /> Send Message</>
                                )}
                            </Button>

                            {submitStatus === 'success' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-green-400 text-sm text-center bg-green-400/10 p-2 rounded"
                                >
                                    Message sent successfully! We'll be in touch.
                                </motion.p>
                            )}

                            {submitStatus === 'error' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-400 text-sm text-center bg-red-400/10 p-2 rounded"
                                >
                                    Failed to send message. Please try again later.
                                </motion.p>
                            )}
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
}
