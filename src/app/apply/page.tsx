import { submitApplication } from '@/app/actions/application'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Disc, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ApplyPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Check if already applied
    const { data: profile } = await supabase
        .from('profiles')
        .select('application_status')
        .eq('id', user.id)
        .single()

    if (profile?.application_status !== 'none') {
        redirect('/dashboard')
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 text-white">
            <Card className="w-full max-w-2xl bg-zinc-900 border-zinc-800">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        Join the Party
                    </CardTitle>
                    <CardDescription className="text-zinc-400 text-lg">
                        Choose how you want to contribute to the Tacos ecosystem
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
                    <form action={submitApplication} className="contents">
                        <input type="hidden" name="type" value="dj" />
                        <button
                            type="submit"
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
                    </form>

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
                </CardContent>
            </Card>

            {/* Background Effects */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-zinc-950">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            </div>
        </div>
    )
}
