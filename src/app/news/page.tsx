"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { NewsCard } from "@/components/features/NewsCard";
import { MOCK_NEWS_EVENTS } from "@/lib/mock-data";

export default function NewsPage() {
    const [filter, setFilter] = useState<"all" | "news" | "event">("all");

    const publishedPosts = MOCK_NEWS_EVENTS.filter((p) => p.published).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const filteredPosts =
        filter === "all"
            ? publishedPosts
            : publishedPosts.filter((p) => p.type === filter);

    return (
        <div className="pt-[72px] min-h-screen bg-coesa-navy">
            <header className="relative py-20 lg:py-28 bg-coesa-midnight overflow-hidden">
                <div className="absolute inset-0 bg-grad-hero opacity-40" />
                <div className="relative max-w-container mx-auto px-6 text-center">
                    <SectionHeader
                        tag="Updates"
                        title="News & Events"
                        subtitle="Stay informed about the latest happenings, announcements, and upcoming events in COESA."
                    />
                </div>
            </header>

            {/* Filter Bar */}
            <section className="bg-coesa-midnight border-b border-coesa-divider/50 sticky top-[72px] z-30">
                <div className="max-w-container mx-auto px-6">
                    <div className="flex gap-2 overflow-x-auto py-4 scrollbar-none items-center justify-center md:justify-start">
                        {(["all", "news", "event"] as const).map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`relative px-6 py-2 rounded-full font-body text-sm font-semibold transition-colors capitalize ${filter === type
                                        ? "text-white"
                                        : "text-coesa-muted hover:text-white"
                                    }`}
                            >
                                {filter === type && (
                                    <motion.div
                                        layoutId="news-filter-tab"
                                        className="absolute inset-0 bg-gradient-to-r from-coesa-sky to-coesa-electric rounded-full -z-10 shadow-btn"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                {type === "all" ? "All Updates" : type === "news" ? "News" : "Events"}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <main className="py-16 lg:py-24">
                <div className="max-w-container mx-auto px-6">
                    {filteredPosts.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                        >
                            {filteredPosts.map((post) => (
                                <NewsCard key={post.id} post={post} />
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-20 text-coesa-muted">
                            No posts found for this category.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
