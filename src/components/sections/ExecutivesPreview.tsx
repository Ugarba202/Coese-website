"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MemberCard } from "@/components/features/MemberCard";
import { MOCK_MEMBERS } from "@/lib/mock-data";

export function ExecutivesPreview() {
    const executives = MOCK_MEMBERS
        .filter((m) => m.is_executive)
        .sort((a, b) => a.order_index - b.order_index)
        .slice(0, 8);

    return (
        <section className="relative py-24 lg:py-32 bg-coesa-midnight">
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-coesa-electric/10 to-transparent" />

            <div className="max-w-container mx-auto px-6">
                <SectionHeader
                    tag="Leadership"
                    title="Meet Our Leadership Team"
                    subtitle="Visionary leaders and engineers dedicated to driving innovation at COESA."
                />

                {/* Cards Grid - 4x2 Layout (4 per row) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {executives.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
                        >
                            <MemberCard
                                member={member}
                                className="h-full"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href="/administration"
                        className="inline-flex items-center gap-2 group text-white/70 hover:text-white font-semibold transition-all duration-200"
                    >
                        View Full Administration
                        <ArrowRight className="w-5 h-5 text-coesa-electric group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
