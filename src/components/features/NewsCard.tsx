"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CountdownTimer } from "@/components/features/CountdownTimer";
import { formatDate } from "@/lib/utils";
import type { NewsEvent } from "@/types";

interface NewsCardProps {
    post: NewsEvent;
    className?: string;
}

export function NewsCard({ post, className }: NewsCardProps) {
    const isEvent = post.type === "event";
    const isPast = isEvent && post.event_date
        ? new Date(post.event_date) < new Date()
        : false;

    return (
        <Link href={`/news/${post.id}`}>
            <Card hover className={className}>
                {/* Cover Image */}
                <div className="relative aspect-video overflow-hidden">
                    {post.cover_image_url ? (
                        <Image
                            src={post.cover_image_url}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-coesa-royal to-coesa-navy flex items-center justify-center">
                            <span className="text-4xl opacity-30">📰</span>
                        </div>
                    )}

                    {/* Date badge */}
                    <div className="absolute top-3 left-3">
                        <Badge variant={isEvent ? "warning" : "default"}>
                            {isEvent ? "Event" : "News"}
                        </Badge>
                    </div>

                    {/* Countdown / Concluded badge */}
                    {isEvent && post.event_date && (
                        <div className="absolute top-3 right-3 bg-coesa-midnight/80 backdrop-blur-sm rounded-lg px-2.5 py-1.5">
                            {isPast ? (
                                <Badge variant="error">Concluded</Badge>
                            ) : (
                                <CountdownTimer targetDate={post.event_date} />
                            )}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5">
                    <div className="flex items-center gap-2 text-coesa-muted text-xs mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <time>{formatDate(post.created_at)}</time>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white mb-2 line-clamp-2">
                        {post.title}
                    </h3>

                    {post.excerpt && (
                        <p className="text-coesa-muted text-sm line-clamp-2 mb-3">
                            {post.excerpt}
                        </p>
                    )}

                    <span className="text-coesa-electric text-sm font-semibold">
                        Read More →
                    </span>
                </div>
            </Card>
        </Link>
    );
}
