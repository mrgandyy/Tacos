"use client";

import * as React from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { SimpleCalendar } from "./SimpleCalendar";
import { Input } from "./input";

interface DateTimePickerProps {
    value?: Date;
    onChange: (date: Date) => void;
    className?: string;
}

export function DateTimePicker({ value, onChange, className }: DateTimePickerProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Close on click outside
    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDateSelect = (date: Date) => {
        const newDate = new Date(date);
        if (value) {
            newDate.setHours(value.getHours(), value.getMinutes());
        } else {
            newDate.setHours(12, 0); // Default to noon
        }
        onChange(newDate);
        // Don't close immediately so they can see it changed, or maybe close?
        // Let's keep it open or let user close.
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [hours, minutes] = e.target.value.split(":").map(Number);
        if (!isNaN(hours) && !isNaN(minutes)) {
            const newDate = value ? new Date(value) : new Date();
            newDate.setHours(hours, minutes);
            onChange(newDate);
        }
    };

    return (
        <div className={cn("relative", className)} ref={containerRef}>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "w-full justify-start text-left font-normal border-zinc-700 bg-black/50 text-white hover:bg-zinc-800",
                        !value && "text-zinc-500"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, "PPP") : <span>Pick a date</span>}
                </Button>

                <div className="flex items-center gap-2 bg-black/50 border border-zinc-700 rounded-md px-3">
                    <Clock className="w-4 h-4 text-zinc-400" />
                    <input
                        type="time"
                        className="bg-transparent border-none text-white focus:outline-none text-sm [&::-webkit-calendar-picker-indicator]:hidden"
                        value={value ? format(value, "HH:mm") : ""}
                        onChange={handleTimeChange}
                    />
                </div>
            </div>

            {isOpen && (
                <div className="absolute top-12 left-0 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <SimpleCalendar
                        selected={value}
                        onSelect={handleDateSelect}
                    />
                </div>
            )}
        </div>
    );
}
