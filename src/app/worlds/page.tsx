import Link from "next/link";
import { Container, Section } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { worlds } from "@/data/worlds";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";

export default function WorldsPage() {
    return (
        <div className="min-h-screen">
            <Section className="pt-32 pb-16">
                <Container>
                    <div className="max-w-3xl mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            The Taco's <span className="text-brand-pink">World Series</span>
                        </h1>
                        <p className="text-xl text-gray-400">
                            Each venue serves a specific purpose in the night's progression.
                            From the raw energy of the Underground to the sunrise conversations at the AfterParty.
                        </p>
                    </div>

                    <div className="space-y-24">
                        {worlds.map((world, index) => (
                            <div key={world.id} id={world.id} className={`flex flex-col gap-8 md:items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>

                                {/* Image / Visual Placeholder */}
                                <div className="flex-1 w-full aspect-video rounded-2xl overflow-hidden relative group bg-gray-900 border border-white/10">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                        style={{
                                            backgroundImage: `url(${world.imageUrl})`,
                                            backgroundColor: world.color // Fallback
                                        }}
                                    >
                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    </div>

                                    <div className="absolute bottom-6 left-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <MapPin className="text-brand-pink h-4 w-4" />
                                            <span className="text-xs font-bold uppercase tracking-widest text-white/80">Venue {index + 1}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 space-y-6">
                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-2">{world.name}</h2>
                                        <div className="h-1 w-20 bg-brand-pink rounded-full mb-4" style={{ backgroundColor: world.color }} />
                                        <p className="text-lg text-gray-400 leading-relaxed">
                                            {world.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {world.bestFor.map(tag => (
                                            <Badge key={tag} variant="outline" className="text-sm py-1 px-3">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 pt-2">
                                        {world.socialLink ? (
                                            <Button variant="solid" className="gap-2" style={{ backgroundColor: world.color === '#FFFFFF' ? '#e5e5e5' : world.color, color: world.color === '#FFFFFF' ? 'black' : 'white' }} asChild>
                                                <Link href={world.socialLink} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-4 h-4" />
                                                    Launch World
                                                </Link>
                                            </Button>
                                        ) : (
                                            <Button variant="solid" className="gap-2" style={{ backgroundColor: world.color === '#FFFFFF' ? '#e5e5e5' : world.color, color: world.color === '#FFFFFF' ? 'black' : 'white' }}>
                                                <ExternalLink className="w-4 h-4" />
                                                Launch World
                                            </Button>
                                        )}
                                        <Button variant="ghost">
                                            Gallery (Coming Soon)
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Circuit Flow */}
            <Section className="bg-black/30 border-t border-white/5">
                <Container className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-12">The Circuit Flow</h3>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 opacity-70">
                        <span className="font-bold text-brand-pink">Underground</span>
                        <ArrowRight className="text-gray-600 rotate-90 md:rotate-0" />
                        <span className="font-bold text-brand-cyan">Afterdark</span>
                        <ArrowRight className="text-gray-600 rotate-90 md:rotate-0" />
                        <span className="font-bold text-brand-violet">Ascension</span>
                        <ArrowRight className="text-gray-600 rotate-90 md:rotate-0" />
                        <span className="font-bold text-white">AfterParty</span>
                    </div>
                </Container>
            </Section>
        </div>
    );
}
