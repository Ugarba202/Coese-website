"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
    end: number;
    suffix?: string;
    duration?: number;
    className?: string;
}

export function CountUp({ end, suffix = "", duration = 1500, className }: CountUpProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) {
            setCount(end);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const startTime = performance.now();

                    const animate = (now: number) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.round(eased * end));
                        if (progress < 1) requestAnimationFrame(animate);
                    };

                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.15 }
        );

        const el = ref.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
        };
    }, [end, duration]);

    return (
        <span ref={ref} className={className}>
            {count}
            {suffix}
        </span>
    );
}
