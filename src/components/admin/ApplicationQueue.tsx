'use client'

import { manageApplication, manageGroupApplication } from '@/app/actions/admin' // Added import
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Check, X, Users } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import Image from 'next/image'

export function ApplicationQueue({ applications, groupApplications = [] }: { applications: any[], groupApplications?: any[] }) {
    if (applications.length === 0 && groupApplications.length === 0) {
        return <div className="text-center py-8 text-zinc-500">No pending applications</div>
    }

    return (
        <div className="space-y-8">
            {applications.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">User Applications</h3>
                    {applications.map((app) => (
                        <ApplicationItem key={app.id} application={app} />
                    ))}
                </div>
            )}

            {groupApplications.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Group Applications</h3>
                    {groupApplications.map((app) => (
                        <GroupApplicationItem key={app.id} application={app} />
                    ))}
                </div>
            )}
        </div>
    )
}

function GroupApplicationItem({ application }: { application: any }) {
    const [loading, setLoading] = useState(false)
    const [expanded, setExpanded] = useState(false)

    const handleAction = async (status: 'approved' | 'rejected') => {
        setLoading(true)
        try {
            await manageGroupApplication(application.id, status)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden">
            <div className="p-4 flex items-center justify-between">
                <div
                    className="flex-1 cursor-pointer"
                    onClick={() => setExpanded(!expanded)}
                >
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-cyber-cyan" />
                        <h3 className="font-semibold text-white">{application.name}</h3>
                        <Badge variant="outline" className="border-cyber-cyan/50 text-cyber-cyan">
                            Partner Group
                        </Badge>
                    </div>
                    <p className="text-sm text-zinc-400">
                        {application.description ? application.description.slice(0, 50) + '...' : 'No description'}
                    </p>
                </div>

                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50"
                        onClick={() => handleAction('rejected')}
                        disabled={loading}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                    <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleAction('approved')}
                        disabled={loading}
                    >
                        <Check className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {expanded && (
                <div className="px-4 pb-4 border-t border-zinc-800 pt-4 bg-zinc-900/50 space-y-4">
                    {application.logo_url && (
                        <div className="relative w-full h-32 bg-black rounded-md overflow-hidden">
                            <Image src={application.logo_url} alt={application.name} fill className="object-cover" />
                        </div>
                    )}
                    <div>
                        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Description</h4>
                        <p className="text-zinc-300">{application.description}</p>
                    </div>
                    {application.social_link && (
                        <div>
                            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Social</h4>
                            <a href={application.social_link} target="_blank" className="text-cyber-cyan hover:underline">{application.social_link}</a>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

function ApplicationItem({ application }: { application: any }) {
    const [loading, setLoading] = useState(false)
    const [expanded, setExpanded] = useState(false)

    const handleAction = async (status: 'approved' | 'rejected') => {
        setLoading(true)
        try {
            await manageApplication(application.id, status)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden">
            <div className="p-4 flex items-center justify-between">
                <div
                    className="flex-1 cursor-pointer"
                    onClick={() => setExpanded(!expanded)}
                >
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{application.username}</h3>
                        <Badge variant="outline" className="capitalize">
                            {application.application_type}
                        </Badge>
                        {application.application_type === 'dj' && (
                            <span className="text-xs text-zinc-500">(Click to view details)</span>
                        )}
                    </div>
                    <p className="text-sm text-zinc-400">
                        Applied on {new Date(application.updated_at).toLocaleDateString()}
                    </p>
                </div>

                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50"
                        onClick={() => handleAction('rejected')}
                        disabled={loading}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                    <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleAction('approved')}
                        disabled={loading}
                    >
                        <Check className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {expanded && (
                <div className="px-4 pb-4 border-t border-zinc-800 pt-4 bg-zinc-900/50">
                    <div className="grid gap-4">
                        {application.bio && (
                            <div>
                                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Bio</h4>
                                <p className="text-sm text-zinc-300 italic">{application.bio}</p>
                            </div>
                        )}

                        {application.genres && application.genres.length > 0 && (
                            <div>
                                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Genres</h4>
                                <div className="flex flex-wrap gap-1">
                                    {application.genres.map((g: string) => (
                                        <Badge key={g} variant="outline" className="bg-zinc-900 border-zinc-700 text-zinc-400">
                                            {g}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {application.socials && (
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                {application.socials.discord && (
                                    <div className="text-zinc-400">
                                        <span className="text-indigo-400 font-medium">Discord:</span> {application.socials.discord}
                                    </div>
                                )}
                                {application.socials.soundcloud && (
                                    <a href={application.socials.soundcloud} target="_blank" className="text-orange-400 hover:underline truncate">
                                        SoundCloud
                                    </a>
                                )}
                                {application.socials.twitter && (
                                    <a href={application.socials.twitter} target="_blank" className="text-blue-400 hover:underline truncate">
                                        Twitter
                                    </a>
                                )}
                                {application.socials.vrc && (
                                    <a href={application.socials.vrc} target="_blank" className="text-teal-400 hover:underline truncate">
                                        VRChat
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
