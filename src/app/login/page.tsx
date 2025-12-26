'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Chrome, Disc } from 'lucide-react'
import { useState } from 'react'

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    const handleLogin = async (provider: 'discord' | 'google') => {
        setLoading(true)
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${location.origin}/auth/callback`,
                },
            })
            if (error) throw error
        } catch (error) {
            console.error('Login error:', error)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 text-white">
            <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center text-white">Sign In</CardTitle>
                    <CardDescription className="text-center text-zinc-400">
                        Login to apply as a DJ/Partner or access your dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Button
                        className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
                        onClick={() => handleLogin('discord')}
                        disabled={loading}
                    >
                        <Disc className="mr-2 h-4 w-4" />
                        Discord
                    </Button>
                    <Button
                        className="w-full bg-white text-black hover:bg-zinc-200"
                        variant="outline"
                        onClick={() => handleLogin('google')}
                        disabled={loading}
                    >
                        <Chrome className="mr-2 h-4 w-4" />
                        Google
                    </Button>
                </CardContent>
            </Card>

            {/* Background Effects */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-zinc-950">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            </div>
        </div>
    )
}
