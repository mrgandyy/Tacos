"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { format, parseISO } from 'date-fns'
import { Calendar, Clock, Music, Radio } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

interface Slot {
    id: string
    startTime: string
    durationMinutes: number
    performerName: string
}

interface Event {
    id: string
    title: string
    start_time: string
    end_time: string
    description: string
    timezone: string
    host_profile: { username: string; avatar_url: string }
    host_group: { name: string; logo_url: string }
    image_url: string
    slots: Slot[]
    tags: string[]
}

export function EventSchedule() {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchEvents() {
            const supabase = createClient()
            const { data } = await supabase
                .from('events')
                .select(`
          *,
          host_profile:host_profile_id(username, avatar_url),
          host_group:host_group_id(name, logo_url)
        `)
                .gte('end_time', new Date().toISOString()) // Only future/current events
                .order('start_time', { ascending: true })

            if (data) setEvents(data as unknown as Event[])
            setLoading(false)
        }

        fetchEvents()
    }, [])

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-8 h-8 border-2 border-brand-pink border-t-transparent rounded-full animate-spin" />
            <div className="text-zinc-500 uppercase tracking-widest text-sm animate-pulse">Scanning Frequencies...</div>
        </div>
    )

    // Group events by day
    const groupedEvents = events.reduce((groups, event) => {
        const date = format(parseISO(event.start_time), 'yyyy-MM-dd')
        if (!groups[date]) groups[date] = []
        groups[date].push(event)
        return groups
    }, {} as Record<string, Event[]>)

    return (
        <div className="space-y-12 max-w-5xl mx-auto">
            {Object.entries(groupedEvents).map(([date, dayEvents]) => (
                <div key={date} className="relative">
                    {/* Date Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-pink/50 to-transparent" />
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter shadow-brand-pink drop-shadow-[0_0_10px_rgba(255,45,134,0.5)]">
                            {format(parseISO(date), 'EEEE, MMM do')}
                        </h3>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-pink/50 to-transparent" />
                    </div>

                    <div className="space-y-8">
                        {dayEvents.map((event) => {
                            const now = new Date()
                            const start = new Date(event.start_time)
                            const end = new Date(event.end_time)
                            const isLive = now >= start && now <= end

                            return (
                                <div key={event.id} className="group relative">
                                    {/* Glow Effect for Live Events */}
                                    {isLive && (
                                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-pink via-purple-600 to-cyber-cyan rounded-xl opacity-75 blur-lg animate-pulse" />
                                    )}

                                    <Card className={cn(
                                        "relative bg-zinc-900 border-zinc-800 overflow-hidden",
                                        isLive && "border-brand-pink bg-zinc-900/90"
                                    )}>
                                        <div className="grid md:grid-cols-12 gap-0">
                                            {/* Left: Poster Image */}
                                            <div className="md:col-span-4 lg:col-span-3 relative h-64 md:h-full min-h-[300px] border-b md:border-b-0 md:border-r border-zinc-800 bg-black">
                                                {event.image_url ? (
                                                    <Image
                                                        src={event.image_url}
                                                        alt={event.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 opacity-20">
                                                        <Music className="w-16 h-16 text-zinc-700" />
                                                    </div>
                                                )}

                                                {/* Live Badge Overlay */}
                                                {isLive && (
                                                    <div className="absolute top-4 left-4 z-10">
                                                        <Badge className="bg-red-600 text-white border-none animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                                                            <Radio className="w-3 h-3 mr-1" /> LIVE NOW
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Right: Content */}
                                            <div className="md:col-span-8 lg:col-span-9 p-6 flex flex-col h-full">
                                                {/* Header */}
                                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                                                    <div>
                                                        <div className="flex items-center gap-2 text-sm text-cyber-cyan font-mono mb-2 uppercase tracking-wide">
                                                            <Clock className="w-4 h-4" />
                                                            {format(parseISO(event.start_time), 'h:mm a')} - {format(parseISO(event.end_time), 'h:mm a')} ({event.timezone || 'Local'})
                                                        </div>
                                                        <h2 className="text-3xl font-black text-white mb-2 uppercase italic leading-none group-hover:text-brand-pink transition-colors">
                                                            {event.title}
                                                        </h2>
                                                        <div className="flex items-center gap-2 text-zinc-400">
                                                            <span className="text-sm">Hosted by</span>
                                                            {event.host_group ? (
                                                                <Badge variant="outline" className="text-white border-zinc-700 bg-zinc-800">{event.host_group.name}</Badge>
                                                            ) : (
                                                                <Badge variant="outline" className="text-white border-zinc-700 bg-zinc-800">{event.host_profile?.username || 'Unknown'}</Badge>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Action Button */}
                                                    {isLive && (
                                                        <Button className="bg-brand-pink text-white hover:bg-brand-pink/90 shadow-[0_0_20px_rgba(255,45,134,0.4)] animate-pulse">
                                                            JOIN SIGNAL
                                                        </Button>
                                                    )}
                                                </div>

                                                {/* Description */}
                                                {event.description && (
                                                    <p className="text-zinc-400 text-sm mb-6 line-clamp-2">
                                                        {event.description}
                                                    </p>
                                                )}

                                                {/* Tags */}
                                                {event.tags && event.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-6">
                                                        {event.tags.map(tag => (
                                                            <span key={tag} className="text-[10px] uppercase px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Time Slots Table */}
                                                {event.slots && event.slots.length > 0 && (
                                                    <div className="mt-auto bg-black/20 rounded-lg border border-white/5 p-4">
                                                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                            <Music className="w-3 h-3" /> Lineup
                                                        </h4>
                                                        <div className="grid gap-2">
                                                            {event.slots.map((slot, i) => (
                                                                <div key={i} className="flex items-center justify-between text-sm py-1 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded transition-colors">
                                                                    <div className="flex items-center gap-4">
                                                                        <span className="font-mono text-zinc-500 text-xs">
                                                                            {format(parseISO(slot.startTime), 'HH:mm')}
                                                                        </span>
                                                                        <span className="font-bold text-white">
                                                                            {slot.performerName}
                                                                        </span>
                                                                    </div>
                                                                    <div className="text-xs text-zinc-600 font-mono">
                                                                        {slot.durationMinutes}m
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}

            {events.length === 0 && (
                <div className="text-center py-20 bg-zinc-900/30 rounded-xl border border-white/5">
                    <Calendar className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">No Upcoming Signals</h3>
                    <p className="text-gray-500">The timeline is quiet... for now.</p>
                </div>
            )}
        </div>
    )
}
