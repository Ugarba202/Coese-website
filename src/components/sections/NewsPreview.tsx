"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { NewsCard } from "@/components/features/NewsCard";
import { MOCK_NEWS_EVENTS } from "@/lib/mock-data";

export function NewsPreview() {
    const latestPosts = MOCK_NEWS_EVENTS
        .filter((p) => p.published)
        .slice(0, 3);

    return (
        <section className="relative py-24 lg:py-32 bg-coesa-navy">
            <div className="max-w-container mx-auto px-6">
                <SectionHeader
                    tag="Updates"
                    title="Latest News & Events"
                    subtitle="Stay up to date with what's happening in COESA."
                />

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {latestPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                            <NewsCard post={post} />
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 text-coesa-electric font-semibold hover:gap-3 transition-all duration-200"
                    >
                        All News & Events
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
