import { createClient } from '@/lib/supabase/server'
import { Container, Section } from '@/components/ui/Layout'
import { GlitchText } from '@/components/ui/GlitchText'
import { NeonContainer } from '@/components/ui/NeonContainer'
import { Button } from '@/components/ui/Button'
import { Users, ExternalLink, Globe, Cpu, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
    title: 'Partnered Groups | Taco\'s Nightlife',
    description: 'The clubs and communities powering the night.',
}

export default async function PartnersPage() {
    const supabase = await createClient()

    const { data: groups } = await supabase
        .from('partnered_groups')
        .select('*')
        .eq('application_status', 'approved')
        .order('name', { ascending: true })

    return (
        <div className="min-h-screen pt-24 pb-20 bg-zinc-950">
            {/* Hero Section */}
            <div className="relative h-[40vh] w-full bg-black flex items-center justify-center overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30 animate-pulse-slow" />
                <div className="relative z-10 text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-cyber-green/10 border border-cyber-green/30 mb-2 backdrop-blur-sm animate-pulse">
                        <Cpu className="w-5 h-5 text-cyber-green mr-2" />
                        <span className="text-xs font-mono text-cyber-green uppercase tracking-widest">Network Nodes</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter">
                        <GlitchText text="THE CIRCUIT" />
                    </h1>
                </div>
            </div>

            <Section>
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {groups?.map((group, i) => (
                            <NeonContainer key={group.id} glowColor="cyan" className="group h-full flex flex-col p-0 overflow-hidden bg-zinc-900 border-zinc-800 hover:border-cyber-green/50 transition-all duration-500 rounded-3xl">
                                {/* Banner Image */}
                                <div className="h-64 relative bg-black overflow-hidden">
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10" />

                                    {group.logo_url ? (
                                        <Image
                                            src={group.logo_url}
                                            alt={group.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-zinc-900 bg-[url('/grid.svg')] opacity-20">
                                            <Users className="w-20 h-20 text-zinc-700" />
                                        </div>
                                    )}

                                    {/* Floating Title */}
                                    <div className="absolute bottom-6 left-8 z-20">
                                        <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter drop-shadow-xl group-hover:text-cyber-green transition-colors">
                                            {group.name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex-1">
                                        {group.description ? (
                                            <p className="text-zinc-400 text-lg leading-relaxed mb-6 font-light">
                                                {group.description}
                                            </p>
                                        ) : (
                                            <p className="text-zinc-600 italic mb-6">No transmission received.</p>
                                        )}
                                    </div>

                                    <div className="border-t border-white/5 pt-6 flex justify-between items-center">
                                        <div className="text-xs font-mono text-zinc-500 uppercase">
                                            // Node ID: {group.id.slice(0, 8)}
                                        </div>
                                        {group.social_link && (
                                            <Button asChild variant="outline" className="border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-black transition-all">
                                                <Link href={group.social_link} target="_blank">
                                                    Connect <Globe className="w-4 h-4 ml-2" />
                                                </Link>
                                            </Button>
                                        )}
                                        {group.discord_link && (
                                            <Button asChild variant="outline" className="ml-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all">
                                                <Link href={group.discord_link} target="_blank">
                                                    Discord <MessageSquare className="w-4 h-4 ml-2" />
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </NeonContainer>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <div className="inline-block p-10 py-12 rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/30 max-w-2xl mx-auto space-y-6">
                            <h3 className="text-2xl font-bold text-white">Representative of a Group?</h3>
                            <p className="text-gray-400">
                                Join The Circuit. Apply to become a partner and manage your own events within the Tacos ecosystem.
                            </p>
                            <Button asChild variant="solid" size="lg" className="bg-white text-black hover:bg-gray-200 font-bold">
                                <Link href="/dashboard">Access Partner Dashboard</Link>
                            </Button>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    )
}
