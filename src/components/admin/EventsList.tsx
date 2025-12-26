"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Plus, Edit, Trash2, Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { deleteEvent } from "@/app/actions/events";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";

export function EventsList() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const supabase = createClient();
        const { data } = await supabase
            .from('events')
            .select(`
                *,
                host_group:host_group_id(name),
                host_profile:host_profile_id(username)
            `)
            .order('start_time', { ascending: false });

        if (data) setEvents(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this event?")) {
            await deleteEvent(id);
            fetchEvents();
        }
    };

    if (loading) return <div className="text-white">Loading events...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Event Schedule</h2>
                <Button variant="solid" className="bg-brand-pink" asChild>
                    <Link href="/admin/events/new">
                        <Plus className="w-4 h-4 mr-2" /> Create Event
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4">
                {events.map((event) => (
                    <Card key={event.id} className="bg-white/5 border-white/10 hover:border-brand-pink/50 transition-colors">
                        <div className="flex flex-col md:flex-row gap-4 p-4">
                            {/* Image Thumbnail */}
                            <div className="w-full md:w-32 h-20 bg-black/50 rounded-md relative overflow-hidden flex-shrink-0">
                                {event.image_url ? (
                                    <Image src={event.image_url} alt={event.title} fill className="object-cover" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-700">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="flex-1 space-y-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{event.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {format(parseISO(event.start_time), 'MMM d, yyyy h:mm a')}
                                            </span>
                                            {event.host_group && (
                                                <Badge variant="outline" className="text-xs border-cyber-cyan text-cyber-cyan">
                                                    {event.host_group.name}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/admin/events/${event.id}`}>
                                                <Edit className="w-4 h-4 text-gray-400 hover:text-white" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(event.id)}>
                                            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-1">{event.description}</p>
                            </div>
                        </div>
                    </Card>
                ))}

                {events.length === 0 && (
                    <div className="text-center py-20 bg-zinc-900/30 rounded-xl border border-white/5 border-dashed">
                        <Calendar className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white">No Events Found</h3>
                        <p className="text-gray-500 mb-4">The timeline is empty.</p>
                        <Button variant="outline" asChild>
                            <Link href="/admin/events/new">Create First Event</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
