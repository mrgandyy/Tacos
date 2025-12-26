import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProfileEditor } from '@/components/dashboard/ProfileEditor'
import { GroupEditor } from '@/components/dashboard/GroupEditor'
import { GroupApplicationForm } from '@/components/dashboard/GroupApplicationForm'
import { AlertCircle, CheckCircle2, Clock, User, Users } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link'

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    // Check profile
    let { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    // Auto-fix: Create profile if missing (trigger failed or didn't run)
    if (!profile) {
        const { data: newProfile, error } = await supabase
            .from('profiles')
            .insert({
                id: user.id,
                username: user.user_metadata.full_name || user.email?.split('@')[0] || 'User',
                avatar_url: user.user_metadata.avatar_url,
                role: 'public',
                application_status: 'none'
            })
            .select()
            .single()

        if (newProfile) {
            profile = newProfile
        } else {
            // Fallback if insert fails (unlikely)
            console.error("Failed to create profile:", error)
        }
    }

    // Only redirect if still no profile (shouldn't happen)
    if (!profile) return <div className="p-8 text-white">Error loading profile. Please contact support.</div>

    // If application status is none, show them the options instead of redirecting blindly
    // Actually, keeping the check but rendering a "Get Started" view might be better, 
    // but the `ApplyPage` handles the selection.
    // Let's redirect to `/apply` ONLY if they successfully have a profile but no status.
    // AND Ensure `/apply` doesn't redirect back to dashboard if status is none.

    if (profile.application_status === 'none') redirect('/apply')

    // Fetch user's group if any
    const { data: group } = await supabase
        .from('partnered_groups')
        .select('*')
        .eq('owner_id', user.id)
        .single() // Assuming one group per owner for now

    if (!profile) redirect('/login')

    return (
        <div className="container mx-auto p-6 space-y-8 min-h-screen">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                    <p className="text-zinc-400">Manage your presence on Taco's Nightlife</p>
                </div>
                <div className="flex gap-4">
                    {profile.role === 'admin' && (
                        <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10" asChild>
                            <Link href="/admin">Admin Command</Link>
                        </Button>
                    )}
                </div>
            </header>

            <Tabs defaultValue="profile" className="space-y-4">
                <TabsList className="bg-zinc-900 border-zinc-800">
                    <TabsTrigger value="profile" className="gap-2">
                        <User className="w-4 h-4" /> DJ Profile
                    </TabsTrigger>
                    <TabsTrigger value="group" className="gap-2">
                        <Users className="w-4 h-4" /> Group / Club
                    </TabsTrigger>
                </TabsList>

                {/* DJ Profile Tab */}
                <TabsContent value="profile" className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                        <StatusBadge status={profile.application_status} label="DJ Status" />
                    </div>

                    {profile.application_status === 'approved' ? (
                        <ProfileEditor profile={profile} />
                    ) : profile.application_status === 'pending' ? (
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader>
                                <CardTitle>DJ Application Pending</CardTitle>
                                <CardDescription>
                                    Our team is reviewing your profile. You will be able to edit your details once approved.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ) : (
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader>
                                <CardTitle>Become a Community DJ</CardTitle>
                                <CardDescription>
                                    Apply to be listed on our verified DJ roster and get booked for events.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button asChild variant="solid" className="bg-brand-pink text-white">
                                    <Link href="/apply">Start DJ Application</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                {/* Group Tab */}
                <TabsContent value="group" className="space-y-4">
                    {group ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <StatusBadge status={group.application_status} label="Group Status" />
                            </div>

                            {group.application_status === 'approved' ? (
                                <GroupEditor group={group} />
                            ) : (
                                <Card className="bg-zinc-900 border-zinc-800">
                                    <CardHeader>
                                        <CardTitle>Group Application Pending</CardTitle>
                                        <CardDescription>
                                            We are reviewing your application for <strong>{group.name}</strong>.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-zinc-500">
                                            You will be able to manage your group page once approved.
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            <GroupApplicationForm />
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}

function StatusBadge({ status, label }: { status: string; label?: string }) {
    const styles = {
        none: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
        pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        approved: "bg-green-500/10 text-green-500 border-green-500/20",
        rejected: "bg-red-500/10 text-red-500 border-red-500/20",
    }[status] || "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"

    const icon = {
        none: <AlertCircle className="w-4 h-4 mr-2" />,
        pending: <Clock className="w-4 h-4 mr-2" />,
        approved: <CheckCircle2 className="w-4 h-4 mr-2" />,
        rejected: <AlertCircle className="w-4 h-4 mr-2" />,
    }[status]

    return (
        <div className={`flex items-center px-3 py-1 rounded-full border ${styles} w-fit`}>
            {icon}
            <span className="capitalize font-medium">{label ? `${label}: ` : ''}{status === 'none' ? 'Not Applied' : status}</span>
        </div>
    )
}
