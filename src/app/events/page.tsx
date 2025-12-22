"use client";

import { useState } from "react";
import Link from "next/link";
import { Container, Section } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { events } from "@/data/events";
import { worlds } from "@/data/worlds";
import { Calendar, Clock, MapPin, Music, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EventsPage() {
    const [filter, setFilter] = useState<string>("all");

    const filteredEvents = filter === "all"
        ? events
        : events.filter(e => e.venueId === filter);

    return (
        <div className="min-h-screen">
            <Section className="pt-32 pb-8">
                <Container>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                        <div className="max-w-2xl">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Event Schedule</h1>
                            <p className="text-gray-400 text-lg">
                                Don't miss a beat. Check the schedule for upcoming nights and special events.
                            </p>
                        </div>
                        <div>
                            <Button variant="outline" asChild>
                                <Link href="https://discord.gg/placeholder" target="_blank">Join Discord for Alerts</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-2 mb-12 border-b border-white/10 pb-4">
                        <button
                            onClick={() => setFilter("all")}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                filter === "all" ? "bg-white text-black" : "text-gray-400 hover:text-white hover:bg-white/10"
                            )}
                        >
                            All Events
                        </button>
                        {worlds.map(w => (
                            <button
                                key={w.id}
                                onClick={() => setFilter(w.id)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                    filter === w.id ? "text-black" : "text-gray-400 hover:text-white hover:bg-white/10"
                                )}
                                style={filter === w.id ? { backgroundColor: w.color } : {}}
                            >
                                {w.shortName}
                            </button>
                        ))}
                    </div>

                    {/* Event List */}
                    <div className="space-y-4">
                        {filteredEvents.length === 0 ? (
                            <div className="text-center py-20 text-gray-500 bg-white/5 rounded-xl border border-white/5">
                                <p>No events found for this filter.</p>
                            </div>
                        ) : (
                            filteredEvents.map(event => {
                                const venue = worlds.find(w => w.id === event.venueId);
                                const eventDate = new Date(event.date);

                                return (
                                    <Card key={event.id} className="group hover:border-brand-pink/30 transition-colors">
                                        <CardContent className="p-6">
                                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">

                                                {/* Date Block */}
                                                <div className="flex-none bg-white/5 rounded-lg p-4 text-center min-w-[100px] border border-white/10 group-hover:border-brand-pink/20 transition-colors">
                                                    <span className="block text-sm text-gray-400 uppercase tracking-widest">{eventDate.toLocaleDateString(undefined, { month: 'short' })}</span>
                                                    <span className="block text-3xl font-bold text-white">{eventDate.getDate()}</span>
                                                    <span className="block text-xs text-gray-500 mt-1">{eventDate.toLocaleDateString(undefined, { weekday: 'short' })}</span>
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 space-y-2">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                                                        {event.status === 'upcoming' && <Badge variant="neon-pink">Upcoming</Badge>}
                                                    </div>

                                                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock className="w-4 h-4" />
                                                            {eventDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                                                        </div>
                                                        <div className="flex items-center gap-1.5" style={{ color: venue?.color }}>
                                                            <MapPin className="w-4 h-4" />
                                                            {venue?.name}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-sm text-gray-500 pt-1">
                                                        <Music className="w-4 h-4" />
                                                        <span>Lineup: {event.lineup.join(", ")}</span>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex-none w-full md:w-auto pt-4 md:pt-0">
                                                    <Button variant="solid" className="w-full md:w-auto">
                                                        Event Details
                                                    </Button>
                                                </div>

                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })
                        )}
                    </div>

                </Container>
            </Section>
        </div>
    );
}
