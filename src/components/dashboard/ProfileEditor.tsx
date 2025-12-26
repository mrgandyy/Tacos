'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { updateProfile, toggleVisibility } from '@/app/actions/profile'
import { Loader2 } from 'lucide-react'

export function ProfileEditor({ profile }: { profile: any }) {
    const [loading, setLoading] = useState(false)

    async function onSubmit(formData: FormData) {
        setLoading(true)
        try {
            await updateProfile(formData)
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
                    <form action={onSubmit} className="space-y-4">
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

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="discord">Discord Username</Label>
                                <Input
                                    id="discord"
                                    name="discord"
                                    defaultValue={profile.socials?.discord}
                                    className="bg-zinc-950 border-zinc-800"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="twitter">Twitter/X (Optional)</Label>
                                <Input
                                    id="twitter"
                                    name="twitter"
                                    defaultValue={profile.socials?.twitter}
                                    className="bg-zinc-950 border-zinc-800"
                                />
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
