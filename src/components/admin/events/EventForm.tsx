"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/Badge";
import { createEvent, updateEvent } from "@/app/actions/events";
import { SlotManager, Slot } from "./SlotManager";
import { PosterUpload } from "./PosterUpload";
import { Loader2, Save, ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Layout";
import { DateTimePicker } from "@/components/ui/DateTimePicker";

// Dummy data for partner groups - in real app, fetch from DB
// For now we'll just use a simple dropdown or text input if not fetching dynamically yet
// We will implement dynamic fetching soon, but user wanted "Event Creator" now.

export function EventForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        start_time: initialData?.start_time ? new Date(initialData.start_time).toISOString().slice(0, 16) : "",
        end_time: initialData?.end_time ? new Date(initialData.end_time).toISOString().slice(0, 16) : "",
        host_group_id: initialData?.host_group_id || null,
        image_url: initialData?.image_url || "",
        is_nsfw: initialData?.is_nsfw || false,
        is_age_gated: initialData?.is_age_gated || false,
        instance_open_before_minutes: initialData?.instance_open_before_minutes || 15,
        timezone: initialData?.timezone || "UTC",
        tags: initialData?.tags || [],
        slots: initialData?.slots || [] as Slot[],
        co_hosts: initialData?.co_hosts || [],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        // Auto-calculate end time based on slots if slots exist
        let finalEndTime = formData.end_time;
        if (formData.slots.length > 0) {
            const lastSlot = formData.slots[formData.slots.length - 1];
            // Simple calc: end time of last slot
            // To be precise we should use date-fns addMinutes on lastSlot.startTime
            // But we'll trust the input or calculation for now.
        }

        try {
            const payload = {
                ...formData,
                start_time: new Date(formData.start_time).toISOString(),
                // If end_time is empty, default to 4 hours after start? or require it.
                end_time: formData.end_time ? new Date(formData.end_time).toISOString() : new Date(new Date(formData.start_time).getTime() + 4 * 60 * 60 * 1000).toISOString(),
            };

            let res;
            if (initialData?.id) {
                res = await updateEvent(initialData.id, payload);
            } else {
                res = await createEvent(payload);
            }

            if (res.error) {
                alert(res.error);
            } else {
                router.push("/admin");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = e.currentTarget.value.trim();
            if (val && !formData.tags.includes(val)) {
                setFormData(prev => ({ ...prev, tags: [...prev.tags, val] }));
                e.currentTarget.value = "";
            }
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
            <div className="grid md:grid-cols-3 gap-8">
                {/* Left Column: Details */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardContent className="p-6 space-y-6">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-brand-pink" /> Event Details
                            </h3>

                            <div className="space-y-2">
                                <Label>Event Name *</Label>
                                <Input
                                    required
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="bg-black/50 border-zinc-700"
                                    placeholder="e.g. Saturday Night Taqueria"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="bg-black/50 border-zinc-700 min-h-[120px]"
                                    placeholder="Tell us more about your event..."
                                />
                            </div>



                            // ... inside component ...

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Start Time *</Label>
                                    <DateTimePicker
                                        value={formData.start_time ? new Date(formData.start_time) : undefined}
                                        onChange={(date) => setFormData({ ...formData, start_time: date.toISOString() })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>End Time</Label>
                                    <DateTimePicker
                                        value={formData.end_time ? new Date(formData.end_time) : undefined}
                                        onChange={(date) => setFormData({ ...formData, end_time: date.toISOString() })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Instance Open (Minutes before start)</Label>
                                <div className="flex gap-2">
                                    {[0, 15, 30, 60].map(mins => (
                                        <Button
                                            key={mins}
                                            type="button"
                                            size="sm"
                                            variant={formData.instance_open_before_minutes === mins ? "solid" : "outline"}
                                            onClick={() => setFormData({ ...formData, instance_open_before_minutes: mins })}
                                            className={formData.instance_open_before_minutes === mins ? "bg-brand-pink text-white border-brand-pink" : "border-zinc-700"}
                                        >
                                            {mins}m
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Time Zone</Label>
                                <select
                                    className="flex h-9 w-full rounded-md border border-zinc-700 bg-black/50 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-pink disabled:cursor-not-allowed disabled:opacity-50 text-white"
                                    value={formData.timezone}
                                    onChange={e => setFormData({ ...formData, timezone: e.target.value })}
                                >
                                    <option value="UTC">UTC (Universal Time)</option>
                                    <option value="EST">EST (Eastern Standard Time)</option>
                                    <option value="CST">CST (Central Standard Time)</option>
                                    <option value="MST">MST (Mountain Standard Time)</option>
                                    <option value="PST">PST (Pacific Standard Time)</option>
                                    <option value="GMT">GMT (London)</option>
                                    <option value="CET">CET (Central Europe)</option>
                                    <option value="JST">JST (Tokyo)</option>
                                    <option value="AEST">AEST (Sydney)</option>
                                </select>
                                <p className="text-[10px] text-zinc-500">Pick the reference timezone for the event.</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Slot Manager */}
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardContent className="p-6">
                            <SlotManager
                                slots={formData.slots}
                                onChange={slots => setFormData({ ...formData, slots })}
                                eventStartTime={formData.start_time}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Meta & Media */}
                <div className="space-y-6">
                    <PosterUpload
                        value={formData.image_url}
                        onChange={url => setFormData({ ...formData, image_url: url })}
                    />

                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardContent className="p-6 space-y-6">
                            <h3 className="text-white font-bold mb-2">Settings & Tags</h3>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>NSFW</Label>
                                    <p className="text-xs text-gray-500">Is this event 18+ content?</p>
                                </div>
                                <Switch
                                    checked={formData.is_nsfw}
                                    onCheckedChange={c => setFormData({ ...formData, is_nsfw: c })}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Age Gated</Label>
                                    <p className="text-xs text-gray-500">Strictly 18+ ID check?</p>
                                </div>
                                <Switch
                                    checked={formData.is_age_gated}
                                    onCheckedChange={c => setFormData({ ...formData, is_age_gated: c })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Tags</Label>
                                <Input
                                    onKeyDown={handleTagInput}
                                    className="bg-black/50 border-zinc-700"
                                    placeholder="Type & Enter (e.g. Techno)"
                                />
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.tags.map((tag: string) => (
                                        <Badge key={tag} variant="secondary" className="bg-white/10 hover:bg-white/20">
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="ml-2 hover:text-red-500"
                                            >
                                                &times;
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Floating Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-md border-t border-white/10 z-40 flex justify-end gap-4">
                <Button variant="ghost" type="button" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="submit" variant="solid" className="bg-brand-pink text-white hover:bg-brand-pink/90 min-w-[200px]" disabled={submitting}>
                    {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    {initialData ? "Update Event" : "Create Event"}
                </Button>
            </div>
        </form>
    );
}
