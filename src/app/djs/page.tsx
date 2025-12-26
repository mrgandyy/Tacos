import { createClient } from '@/lib/supabase/server'
import { Container, Section } from '@/components/ui/Layout'
import { GlitchText } from '@/components/ui/GlitchText'
import { NeonContainer } from '@/components/ui/NeonContainer'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { User, Music, ExternalLink, Disc, AudioWaveform, Headphones, Twitter, MessageSquare, Music2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
    title: 'Community DJs | Taco\'s Nightlife',
    description: 'Meet the resident and guest DJs of the Tacos ecosystem.',
}

export default async function DJsPage() {
    const supabase = await createClient()

    const { data: djs } = await supabase
        .from('profiles')
        .select('*')
        .eq('application_status', 'approved')
        .in('role', ['dj', 'partner', 'admin'])
        .eq('is_visible', true)

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[url('/grid.svg')] bg-fixed bg-center">
            <Section>
                <Container>
                    <div className="text-center mb-20 space-y-6 relative z-10">
                        <div className="inline-flex items-center justify-center p-3 rounded-full bg-zinc-900/80 border border-white/10 mb-4 backdrop-blur-sm">
                            <Headphones className="w-5 h-5 text-brand-pink mr-2" />
                            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Sonic Architects</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
                            <GlitchText text="ROSTER" />
                        </h1>
                        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            The resident selectors and guest artists shaping our soundscape.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {djs?.map((dj) => (
                            <div key={dj.id} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-b from-brand-pink/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative h-full bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-brand-pink/50 transition-all duration-300 flex flex-col">
                                    {/* Avatar/Header */}
                                    <div className="relative h-48 bg-black">
                                        {/* Background pattern */}
                                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-transparent" />

                                        <div className="absolute -bottom-10 left-0 right-0 flex justify-center z-10">
                                            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-zinc-900 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                                                {dj.avatar_url ? (
                                                    <Image src={dj.avatar_url} alt={dj.username || 'DJ'} fill className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                                                        <User className="w-10 h-10 text-zinc-600" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="pt-14 p-6 flex-1 flex flex-col items-center text-center">
                                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-brand-pink transition-colors">
                                            {dj.username}
                                        </h3>
                                        <Badge variant="outline" className="mb-4 border-zinc-700 text-zinc-400 text-[10px] tracking-widest bg-zinc-900/50">
                                            RESIDENT
                                        </Badge>

                                        {dj.bio && (
                                            <p className="text-sm text-zinc-400 line-clamp-4 mb-6 italic leading-relaxed">
                                                "{dj.bio}"
                                            </p>
                                        )}

                                        <div className="mt-auto w-full space-y-4">
                                            <div className="flex flex-wrap gap-2 justify-center mb-4">
                                                {dj.genres?.slice(0, 3).map((genre: string) => (
                                                    <span key={genre} className="text-[10px] uppercase text-cyber-cyan border border-cyber-cyan/20 px-2 py-1 rounded bg-cyber-cyan/5">
                                                        {genre}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Social Links */}
                                            <div className="flex items-center justify-center gap-4 mb-4">
                                                {dj.socials?.soundcloud && (
                                                    <a href={dj.socials.soundcloud} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#ff7700] transition-colors">
                                                        <Music2 className="w-5 h-5" />
                                                    </a>
                                                )}
                                                {dj.socials?.twitter && (
                                                    <a href={dj.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#1DA1F2] transition-colors">
                                                        <Twitter className="w-5 h-5" />
                                                    </a>
                                                )}
                                                {dj.socials?.discord && (
                                                    <div className="group/discord relative">
                                                        <div className="text-zinc-500 hover:text-[#5865F2] cursor-help transition-colors">
                                                            <MessageSquare className="w-5 h-5" />
                                                        </div>
                                                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/discord:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                            {dj.socials.discord}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <Button asChild variant="ghost" className="w-full border border-white/5 hover:bg-white/5 hover:text-white transition-all text-zinc-400 text-xs uppercase tracking-wider h-10">
                                                <Link href={dj.socials?.vrc || `https://vrchat.com/home/user/${dj.id}`} target="_blank">
                                                    Connect Signal <ExternalLink className="w-3 h-3 ml-2 opacity-50" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {(!djs || djs.length === 0) && (
                            <div className="col-span-full text-center py-20">
                                <AudioWaveform className="w-16 h-16 text-zinc-800 mx-auto mb-4 animate-pulse" />
                                <h3 className="text-xl font-bold text-zinc-700 uppercase tracking-widest">No Signal</h3>
                            </div>
                        )}
                    </div>
                </Container>
            </Section>
        </div>
    )
}
