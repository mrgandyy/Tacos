'use client'

import { manageApplication } from '@/app/actions/admin'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Check, X } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'

export function ApplicationQueue({ applications }: { applications: any[] }) {
    if (applications.length === 0) {
        return <div className="text-center py-8 text-zinc-500">No pending applications</div>
    }

    return (
        <div className="space-y-4">
            {applications.map((app) => (
                <ApplicationItem key={app.id} application={app} />
            ))}
        </div>
    )
}

function ApplicationItem({ application }: { application: any }) {
    const [loading, setLoading] = useState(false)

    const handleAction = async (status: 'approved' | 'rejected') => {
        setLoading(true)
        try {
            await manageApplication(application.id, status)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-lg border border-zinc-800">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{application.username}</h3>
                    <Badge variant="outline" className="capitalize">
                        {application.application_type}
                    </Badge>
                </div>
                <p className="text-sm text-zinc-400">Applied on {new Date(application.updated_at).toLocaleDateString()}</p>
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
    )
}
