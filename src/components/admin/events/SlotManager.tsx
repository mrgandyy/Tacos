"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Plus, Trash2, GripVertical, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format, addMinutes, parseISO } from "date-fns";

export interface Slot {
    id: string;
    startTime: string; // ISO string calculated from event start + offset
    durationMinutes: number;
    performerName: string;
    performerId?: string; // Optional if we link to db users later
}

interface SlotManagerProps {
    slots: Slot[];
    onChange: (slots: Slot[]) => void;
    eventStartTime: string;
}

export function SlotManager({ slots, onChange, eventStartTime }: SlotManagerProps) {

    const addSlot = () => {
        // Calculate next start time based on last slot
        let nextStart = eventStartTime ? new Date(eventStartTime) : new Date();
        if (slots.length > 0) {
            const lastSlot = slots[slots.length - 1];
            // If the last slot has a valid start time, add duration to it
            // otherwise rely on index
            if (lastSlot.startTime) {
                nextStart = addMinutes(new Date(lastSlot.startTime), lastSlot.durationMinutes);
            }
        }

        const newSlot: Slot = {
            id: Math.random().toString(36).substr(2, 9),
            startTime: nextStart.toISOString(),
            durationMinutes: 60,
            performerName: "",
        };
        onChange([...slots, newSlot]);
    };

    const removeSlot = (id: string) => {
        onChange(slots.filter(s => s.id !== id));
    };

    const updateSlot = (id: string, field: keyof Slot, value: any) => {
        const newSlots = slots.map(s => {
            if (s.id === id) {
                return { ...s, [field]: value };
            }
            return s;
        });

        // Setup simple logic: if duration changes, subsequent start times should shift?
        // For now, let's keep it simple. If we were building a full VRC timetable we'd auto-recalc triggers.
        // Let's at least auto-recalc start times linearly if the user toggles a "Auto-flow" switch, 
        // but for now we will just update the requested field.

        // Actually, for a smooth experience, let's recalculate all start times 
        // purely based on the first event start time + cumulative duration.
        // This effectively enforces "Order of performers is accurate" checkbox behavior from the screenshot.

        if (eventStartTime) {
            let runningTime = new Date(eventStartTime);
            for (let i = 0; i < newSlots.length; i++) {
                newSlots[i].startTime = runningTime.toISOString();
                runningTime = addMinutes(runningTime, newSlots[i].durationMinutes);
            }
        }

        onChange(newSlots);
    };

    // Re-calculate times if event start time changes (run once when start time prop changes)
    useEffect(() => {
        if (eventStartTime && slots.length > 0) {
            let runningTime = new Date(eventStartTime);
            const newSlots = slots.map(s => {
                const updated = { ...s, startTime: runningTime.toISOString() };
                runningTime = addMinutes(runningTime, s.durationMinutes);
                return updated;
            });
            // Only update if actual changes to avoid loops, simplistic check
            if (newSlots[0].startTime !== slots[0].startTime) {
                onChange(newSlots);
            }
        }
    }, [eventStartTime]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-white font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-pink" /> Performer Slots
                </h3>
                <Button type="button" size="sm" onClick={addSlot} variant="outline" className="text-xs">
                    <Plus className="w-3 h-3 mr-1" /> Add Slot
                </Button>
            </div>

            <div className="space-y-2">
                {slots.map((slot, index) => (
                    <div key={slot.id} className="flex items-center gap-2 bg-white/5 p-2 rounded-md border border-white/10 group">
                        <div className="text-gray-500 cursor-move px-2">
                            <span className="text-xs font-mono">#{index + 1}</span>
                        </div>

                        <div className="w-20">
                            <span className="text-xs text-brand-pink font-mono block">
                                {format(new Date(slot.startTime), 'HH:mm')}
                            </span>
                            <span className="text-[10px] text-gray-500 font-mono block">
                                {format(new Date(slot.startTime), 'hh:mm a')}
                            </span>
                        </div>

                        <div className="w-20">
                            <Input
                                type="number"
                                value={slot.durationMinutes}
                                onChange={(e) => updateSlot(slot.id, 'durationMinutes', parseInt(e.target.value))}
                                className="h-8 text-xs bg-black/50"
                                placeholder="Min"
                            />
                        </div>

                        <div className="flex-1">
                            <Input
                                placeholder="Performer Name"
                                value={slot.performerName}
                                onChange={(e) => updateSlot(slot.id, 'performerName', e.target.value)}
                                className="h-8 bg-black/50"
                            />
                        </div>

                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSlot(slot.id)}
                            className="text-gray-500 hover:text-red-500"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ))}

                {slots.length === 0 && (
                    <div className="text-center py-8 border border-dashed border-white/20 rounded-lg text-gray-500 text-sm">
                        No slots added. Click "Add Slot" to build the lineup.
                    </div>
                )}
            </div>
        </div>
    );
}
