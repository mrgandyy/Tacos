'use client'

import { submitApplication } from '@/app/actions/application'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Disc, Twitter, MessageSquare, Music2, Gamepad2, Loader2 } from 'lucide-react'
import { useState } from 'react'

export function DJApplicationForm() {
    const [loading, setLoading] = useState(false)

    return (
        <form
            action={async (formData) => {
                setLoading(true)
                try {
                    await submitApplication(formData)
                } finally {
                    setLoading(false)
                }
            }}
            className="space-y-6"
        >
            <input type="hidden" name="type" value="dj" />

            {/* Basic Info */}
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="bio" className="text-white">Artist Bio</Label>
                    <Textarea
                        id="bio"
                        name="bio"
                        required
                        placeholder="Tell us about your style, experience, and what brings you to Tacos..."
                        className="bg-zinc-950/50 border-zinc-800 min-h-[120px] focus:ring-purple-500/50"
                    />
                    <p className="text-xs text-zinc-500">This will be shown on your public DJ card.</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="genres" className="text-white">Genres</Label>
                    <Input
                        id="genres"
                        name="genres"
                        required
                        placeholder="House, Techno, DnB, Trance..."
                        className="bg-zinc-950/50 border-zinc-800 focus:ring-purple-500/50"
                    />
                    <p className="text-xs text-zinc-500">Separate with commas.</p>
                </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Social Presence</h3>

                <div className="grid gap-4">
                    <div className="relative">
                        <Music2 className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                        <Input
                            name="soundcloud"
                            placeholder="SoundCloud URL"
                            className="pl-9 bg-zinc-950/50 border-zinc-800 focus:ring-orange-500/50"
                        />
                    </div>

                    <div className="relative">
                        <Twitter className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
                        <Input
                            name="twitter"
                            placeholder="Twitter / X URL"
                            className="pl-9 bg-zinc-950/50 border-zinc-800 focus:ring-blue-500/50"
                        />
                    </div>

                    <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-indigo-400" />
                        <Input
                            name="discord"
                            required
                            placeholder="Discord Username"
                            className="pl-9 bg-zinc-950/50 border-zinc-800 focus:ring-indigo-500/50"
                        />
                    </div>

                    <div className="relative">
                        <Gamepad2 className="absolute left-3 top-3 h-4 w-4 text-teal-400" />
                        <Input
                            name="vrc"
                            placeholder="VRChat Profile URL"
                            className="pl-9 bg-zinc-950/50 border-zinc-800 focus:ring-teal-500/50"
                        />
                    </div>
                </div>
            </div>

            <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    <>
                        <Disc className="mr-2 h-4 w-4" />
                        Submit Application
                    </>
                )}
            </Button>
        </form>
    )
}
