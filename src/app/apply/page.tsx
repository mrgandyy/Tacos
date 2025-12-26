'use client'

import { submitApplication } from '@/app/actions/application'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Disc, Users, ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DJApplicationForm } from '@/components/forms/DJApplicationForm'

export default function ApplyPage() {
    const [selectedRole, setSelectedRole] = useState<'dj' | 'partner' | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        async function checkAuth() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/login')
                return
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('application_status')
                .eq('id', user.id)
                .single()

            if (profile?.application_status !== 'none') {
                router.push('/dashboard')
            }
            setLoading(false)
        }
        checkAuth()
    }, [router, supabase])

    if (loading) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Loading...</div>

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 text-white">
            <Card className="w-full max-w-2xl bg-zinc-900 border-zinc-800">
                <CardHeader className="text-center relative">
                    {selectedRole === 'dj' && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedRole(null)}
                            className="absolute left-6 top-6 text-zinc-400 hover:text-white"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Button>
                    )}

                    <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        {selectedRole === 'dj' ? 'DJ Application' : 'Join the Party'}
                    </CardTitle>
                    <CardDescription className="text-zinc-400 text-lg">
                        {selectedRole === 'dj' ? 'Tell us about your sound' : 'Choose how you want to contribute to the Tacos ecosystem'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    {selectedRole === 'dj' ? (
                        <DJApplicationForm />
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                            <button
                                onClick={() => setSelectedRole('dj')}
                                className="group relative flex flex-col items-center p-6 rounded-xl border-2 border-zinc-800 hover:border-purple-500 bg-zinc-950/50 hover:bg-zinc-900 transition-all duration-300 text-left"
                            >
                                <div className="p-4 rounded-full bg-purple-500/10 text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                                    <Disc className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-white">Community DJ</h3>
                                <p className="text-sm text-zinc-400">
                                    Showcase your sets, get booked for events, and build your following in the VRChat scene.
                                </p>
                            </button>

                            <form action={submitApplication} className="contents">
                                <input type="hidden" name="type" value="partner" />
                                <button
                                    type="submit"
                                    className="group relative flex flex-col items-center p-6 rounded-xl border-2 border-zinc-800 hover:border-pink-500 bg-zinc-950/50 hover:bg-zinc-900 transition-all duration-300 text-left"
                                >
                                    <div className="p-4 rounded-full bg-pink-500/10 text-pink-400 mb-4 group-hover:scale-110 transition-transform">
                                        <Users className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-white">Partnered Group</h3>
                                    <p className="text-sm text-zinc-400">
                                        List your community, manage events, and grow your audience with Tacos partnership.
                                    </p>
                                </button>
                            </form>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Background Effects */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-zinc-950">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            </div>
        </div>
    )
}
