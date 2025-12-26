
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ApplicationQueue } from '@/components/admin/ApplicationQueue'
import { EventsList } from '@/components/admin/EventsList'
import { UserManagement } from '@/components/admin/UserManagement'
import { getUsers } from '@/app/actions/admin'

export default async function AdminPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        redirect('/dashboard')
    }

    // Fetch Pending Applications
    const { data: applications } = await supabase
        .from('profiles')
        .select('*')
        .eq('application_status', 'pending')
        .order('updated_at', { ascending: false })

    // Fetch Pending Group Applications
    const { data: groupApplications } = await supabase
        .from('partnered_groups')
        .select('*')
        .eq('application_status', 'pending')
        .order('updated_at', { ascending: false })

    // Fetch All Users
    const users = await getUsers()

    return (
        <div className="container mx-auto p-6 space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white">Admin Console</h1>
                <p className="text-zinc-400">Manage the ecosystem</p>
            </header>

            <Tabs defaultValue="applications" className="space-y-4">
                <TabsList className="bg-zinc-900 border-zinc-800">
                    <TabsTrigger value="applications">Applications</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>

                <TabsContent value="applications">
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader>
                            <CardTitle>Application Queue</CardTitle>
                            <CardDescription>
                                Review incoming requests for DJs and Partners
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ApplicationQueue
                                applications={applications || []}
                                groupApplications={groupApplications || []}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="users">
                    <UserManagement users={users || []} />
                </TabsContent>

                <TabsContent value="events">
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardContent className="p-6">
                            <EventsList />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
