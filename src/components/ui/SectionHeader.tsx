"use client";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    tag: string;
    title: string;
    subtitle?: string;
    centered?: boolean;
    className?: string;
}

export function SectionHeader({
    tag,
    title,
    subtitle,
    centered = true,
    className,
}: SectionHeaderProps) {
    return (
        <div className={cn(centered && "text-center", "mb-12 lg:mb-16", className)}>
            {/* Tag line with rule */}
            <div
                className={cn(
                    "flex items-center gap-3 mb-4",
                    centered && "justify-center"
                )}
            >
                <div className="w-8 h-[2px] bg-coesa-electric" />
                <span className="font-mono text-sm text-coesa-electric uppercase tracking-[3px]">
                    {tag}
                </span>
                <div className="w-8 h-[2px] bg-coesa-electric" />
            </div>

            {/* Title */}
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-3">
                {title}
            </h2>

            {/* Subtitle */}
            {subtitle && (
                <p
                    className={cn(
                        "font-body text-lg text-coesa-muted max-w-[560px]",
                        centered && "mx-auto"
                    )}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}
