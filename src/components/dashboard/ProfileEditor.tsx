'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { updateProfile, toggleVisibility } from '@/app/actions/profile'
import { Loader2, Music2, Twitter, MessageSquare, Gamepad2, Twitch, Youtube } from 'lucide-react'
import { AvatarUpload } from './AvatarUpload'

export function ProfileEditor({ profile }: { profile: any }) {
    const [loading, setLoading] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || '')

    async function onSubmit(formData: FormData) {
        setLoading(true)
        try {
            await updateProfile(formData)
        } catch (error) {
            console.error('Error updating profile:', error)
            alert('Failed to update profile. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Public Visibility</CardTitle>
                        <CardDescription>Show your profile on the main DJs list</CardDescription>
                    </div>
                    <Switch
                        checked={profile.is_visible}
                        onCheckedChange={async (val) => await toggleVisibility(val)}
                    />
                </CardHeader>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                    <CardTitle>Profile Details</CardTitle>
                    <CardDescription>Update your public information</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={onSubmit} className="space-y-6">
                        <div className="flex justify-center mb-6">
                            <AvatarUpload value={avatarUrl} onChange={setAvatarUrl} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="display_name">Display Name</Label>
                            <Input
                                id="display_name"
                                name="display_name"
                                defaultValue={profile.display_name || profile.username}
                                className="bg-zinc-950 border-zinc-800"
                                placeholder="Your Stage Name"
                            />
                            <p className="text-xs text-zinc-500">How you want to be known on the site.</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                name="bio"
                                defaultValue={profile.bio}
                                className="bg-zinc-950 border-zinc-800 min-h-[100px]"
                                placeholder="Tell us about your style..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="genres">Genres (comma separated)</Label>
                            <Input
                                id="genres"
                                name="genres"
                                defaultValue={profile.genres?.join(', ')}
                                className="bg-zinc-950 border-zinc-800"
                                placeholder="House, Techno, Trance"
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-zinc-400">Social Presence</h3>
                            <div className="grid gap-4">
                                <div className="relative">
                                    <Music2 className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                                    <Input
                                        name="soundcloud"
                                        defaultValue={profile.socials?.soundcloud}
                                        placeholder="SoundCloud URL"
                                        className="pl-9 bg-zinc-950/50 border-zinc-800 focus:ring-orange-500/50"
                                    />
                                </div>

                                <div className="relative">
                                    <Twitter className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
                                    <Input
                                        name="twitter"
                                        defaultValue={profile.socials?.twitter}
                                        placeholder="Twitter / X URL"
                                        className="pl-9 bg-zinc-950/50 border-zinc-800 focus:ring-blue-500/50"
                                    />
                                </div>

                                <div className="relative">
                                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-indigo-400" />
                                    <Input
                                        name="discord"
                                        defaultValue={profile.socials?.discord}
                                        placeholder="Discord Username"
                                        className="pl-9 bg-zinc-950/50 border-zinc-800 focus:ring-indigo-500/50"
                                    />
                                </div>

                                <div className="relative">
                                    <Gamepad2 className="absolute left-3 top-3 h-4 w-4 text-teal-400" />
                                    <Input
                                        name="vrc"
                                        defaultValue={profile.socials?.vrc}
                                        placeholder="VRChat Profile URL"
                                        className="pl-9 bg-zinc-950/50 border-zinc-800 focus:ring-teal-500/50"
                                    />
                                </div>

                                <div className="relative">
                                    <Twitch className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                                    <Input
                                        name="twitch"
                                        defaultValue={profile.socials?.twitch}
                                        placeholder="Twitch Channel URL"
                                        className="pl-9 bg-zinc-950/50 border-zinc-800 focus:ring-purple-500/50"
                                    />
                                </div>

                                <div className="relative">
                                    <Youtube className="absolute left-3 top-3 h-4 w-4 text-red-500" />
                                    <Input
                                        name="youtube"
                                        defaultValue={profile.socials?.youtube}
                                        placeholder="YouTube Channel URL"
                                        className="pl-9 bg-zinc-950/50 border-zinc-800 focus:ring-red-500/50"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button type="submit" disabled={loading} className="w-full md:w-auto">
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
