"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { Committee } from "@/types";

interface CommitteeCardProps {
    committee: Committee;
    className?: string;
}

export function CommitteeCard({ committee, className }: CommitteeCardProps) {
    return (
        <Link href={`/committees/${committee.slug}`}>
            <Card
                hover
                className={cn(
                    "p-6 relative group border-l-2 border-l-transparent hover:border-l-coesa-electric transition-all duration-300",
                    className
                )}
            >
                {/* Icon */}
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {committee.icon || "🔧"}
                </div>

                {/* Name */}
                <h3 className="font-display font-bold text-lg text-white mb-2">
                    {committee.short_name || committee.name}
                </h3>

                {/* Mandate */}
                <p className="text-coesa-muted text-sm line-clamp-2 mb-4">
                    {committee.mandate}
                </p>

                {/* CTA */}
                <span className="text-coesa-electric text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                    View Committee
                    <span className="text-lg">→</span>
                </span>
            </Card>
        </Link>
    );
}
