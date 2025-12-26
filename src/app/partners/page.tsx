import { createClient } from '@/lib/supabase/server'
import { Container, Section } from '@/components/ui/Layout'
import { GlitchText } from '@/components/ui/GlitchText'
import { NeonContainer } from '@/components/ui/NeonContainer'
import { Button } from '@/components/ui/Button'
import { Users, ExternalLink, Globe } from 'lucide-react'
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
        <div className="min-h-screen pt-20 pb-20">
            <Section>
                <Container>
                    <div className="text-center mb-16 space-y-4">
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase">
                            <span className="text-cyber-green block text-lg font-bold tracking-widest mb-2">The Circuit</span>
                            <GlitchText text="PARTNERED GROUPS" />
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Collaborative forces bringing unique vibes to the ecosystem.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {groups?.map((group) => (
                            <NeonContainer key={group.id} glowColor="cyan" className="group h-full flex flex-col p-0 overflow-hidden">
                                <div className="h-48 relative bg-black/50 overflow-hidden">
                                    {group.logo_url ? (
                                        <Image src={group.logo_url} alt={group.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-zinc-900 border-b border-white/5">
                                            <Users className="w-12 h-12 text-zinc-700" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                                    <div className="absolute bottom-4 left-6">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-cyber-green transition-colors drop-shadow-lg">
                                            {group.name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    {group.description && (
                                        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                                            {group.description}
                                        </p>
                                    )}

                                    <div className="flex gap-2 mt-auto">
                                        {group.social_link && (
                                            <Button asChild size="sm" variant="outline" className="w-full border-zinc-700 hover:border-cyber-green hover:text-cyber-green">
                                                <Link href={group.social_link} target="_blank">
                                                    <Globe className="w-3 h-3 mr-2" /> Connect
                                                </Link>
                                            </Button>
                                        )}
                                        {/* Placeholder for future specific page */}
                                    </div>
                                </div>
                            </NeonContainer>
                        ))}

                        <div className="col-span-1 md:col-span-2 lg:col-span-3">
                            <div className="mt-12 p-8 rounded-2xl border border-white/5 bg-white/5 text-center space-y-4">
                                <h3 className="text-xl font-bold text-white">Representative of a Group?</h3>
                                <p className="text-gray-400 max-w-xl mx-auto">
                                    Apply to become a partner and manage your own events within the Tacos ecosystem.
                                </p>
                                <Button asChild variant="solid" className="bg-cyber-cyan text-black hover:bg-cyber-cyan/90">
                                    <Link href="/dashboard">Access Partner Dashboard</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    )
}
