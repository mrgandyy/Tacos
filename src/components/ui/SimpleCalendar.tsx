"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek,
    subMonths,
} from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface SimpleCalendarProps {
    selected?: Date;
    onSelect: (date: Date) => void;
    className?: string;
}

export function SimpleCalendar({ selected, onSelect, className }: SimpleCalendarProps) {
    const [currentMonth, setCurrentMonth] = React.useState(selected || new Date());

    const days = React.useMemo(() => {
        const start = startOfWeek(startOfMonth(currentMonth));
        const end = endOfWeek(endOfMonth(currentMonth));
        return eachDayOfInterval({ start, end });
    }, [currentMonth]);

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    return (
        <div className={cn("p-3 bg-zinc-900 border border-zinc-800 rounded-md shadow-xl", className)}>
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-white">
                    {format(currentMonth, "MMMM yyyy")}
                </h4>
                <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={prevMonth} type="button" className="h-7 w-7 p-0 text-white hover:bg-zinc-800">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={nextMonth} type="button" className="h-7 w-7 p-0 text-white hover:bg-zinc-800">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="text-center text-xs text-zinc-500 font-medium">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {days.map((day, idx) => {
                    const isSelected = selected && isSameDay(day, selected);
                    const isCurrentMonth = isSameMonth(day, currentMonth);

                    return (
                        <button
                            key={day.toString()}
                            onClick={() => onSelect(day)}
                            type="button"
                            className={cn(
                                "h-8 w-8 text-sm rounded-full flex items-center justify-center transition-colors",
                                !isCurrentMonth && "text-zinc-600",
                                isCurrentMonth && "text-zinc-300 hover:bg-zinc-800 hover:text-white",
                                isSelected && "bg-brand-pink text-white hover:bg-brand-pink hover:text-white"
                            )}
                        >
                            {format(day, "d")}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
