"use client";

import { useState, useEffect, useCallback } from "react";
import { getTimeRemaining } from "@/lib/utils";

interface CountdownTimerProps {
    targetDate: string;
    className?: string;
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
    const [time, setTime] = useState(getTimeRemaining(targetDate));

    const updateTimer = useCallback(() => {
        setTime(getTimeRemaining(targetDate));
    }, [targetDate]);

    useEffect(() => {
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [updateTimer]);

    if (time.total <= 0) {
        return (
            <span className={className}>
                <span className="font-mono text-xs text-coesa-muted">Concluded</span>
            </span>
        );
    }

    return (
        <div className={`flex items-center gap-1.5 font-mono text-xs ${className}`}>
            <TimeUnit value={time.days} label="d" />
            <span className="text-coesa-electric/50">:</span>
            <TimeUnit value={time.hours} label="h" />
            <span className="text-coesa-electric/50">:</span>
            <TimeUnit value={time.minutes} label="m" />
        </div>
    );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
    return (
        <span className="text-coesa-electric">
            {String(value).padStart(2, "0")}
            <span className="text-coesa-muted/60 text-[10px] ml-0.5">{label}</span>
        </span>
    );
}
