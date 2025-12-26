import { createClient } from '@/lib/supabase/server'
import { Container, Section } from '@/components/ui/Layout'
import { GlitchText } from '@/components/ui/GlitchText'
import { NeonContainer } from '@/components/ui/NeonContainer'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { User, Music, ExternalLink, Disc } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
    title: 'Community DJs | Taco\'s Nightlife',
    description: 'Meet the resident and guest DJs of the Tacos ecosystem.',
}

export default async function DJsPage() {
    const supabase = await createClient()

    // Fetch approved DJs (role='dj' or role='partner' OR application_status='approved')
    // Depending on how strict we want to be. Let's use application_status='approved' AND role IN ('dj','partner','admin')
    // Logic: "Community DJ" usually implies role='dj'.

    const { data: djs } = await supabase
        .from('profiles')
        .select('*')
        .eq('application_status', 'approved')
        .in('role', ['dj', 'partner', 'admin'])
        .eq('is_visible', true)

    return (
        <div className="min-h-screen pt-20 pb-20">
            <Section>
                <Container>
                    <div className="text-center mb-16 space-y-4">
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase">
                            <span className="text-cyber-pink block text-lg font-bold tracking-widest mb-2">Audio Signal</span>
                            <GlitchText text="COMMUNITY DJs" />
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            The sonic architects shaping the soundscape of Tacos Nightlife.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {djs?.map((dj) => (
                            <NeonContainer key={dj.id} glowColor="violet" className="group h-full flex flex-col p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-pink/50">
                                        {dj.avatar_url ? (
                                            <Image src={dj.avatar_url} alt={dj.username || 'DJ'} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                                                <User className="w-8 h-8 text-zinc-600" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-brand-pink transition-colors">
                                            {dj.username}
                                        </h3>
                                        <Badge variant="outline" className="text-[10px] border-zinc-700 text-zinc-400">
                                            RESIDENT
                                        </Badge>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-4">
                                    {dj.bio && (
                                        <p className="text-sm text-gray-400 line-clamp-3 italic">
                                            "{dj.bio}"
                                        </p>
                                    )}

                                    <div className="flex flex-wrap gap-2">
                                        {dj.genres?.slice(0, 3).map((genre: string) => (
                                            <span key={genre} className="text-[10px] uppercase text-cyber-cyan border border-cyber-cyan/20 px-2 py-0.5 rounded-full">
                                                {genre}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Socials - assuming simpler structure for now, strict typing might require parsing */}
                                {/* For this MVP, let's just show a Connect button if we had a profile page, 
                     but for now maybe just VRChat link if available in socials? 
                     We'll add a generic 'View Profile' or placeholder. */}
                                <div className="pt-4 mt-4 border-t border-white/5">
                                    <Button asChild variant="ghost" className="w-full justify-between group-hover:bg-brand-pink group-hover:text-white transition-all">
                                        <Link href={`https://vrchat.com/home/user/${dj.id}`} target="_blank"> {/* Placeholder link logic */}
                                            <span className="flex items-center gap-2">
                                                <Disc className="w-4 h-4 animate-spin-slow" /> VRChat
                                            </span>
                                            <ExternalLink className="w-4 h-4 opacity-50" />
                                        </Link>
                                    </Button>
                                </div>
                            </NeonContainer>
                        ))}

                        {(!djs || djs.length === 0) && (
                            <div className="col-span-full text-center py-20 bg-zinc-900/30 rounded-xl border border-white/5">
                                <Disc className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white">Signal Lost</h3>
                                <p className="text-gray-500">No DJs found in the frequency range.</p>
                            </div>
                        )}
                    </div>
                </Container>
            </Section>
        </div>
    )
}
