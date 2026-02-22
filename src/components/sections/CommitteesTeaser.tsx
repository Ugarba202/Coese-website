"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CommitteeCard } from "@/components/features/CommitteeCard";
import { MOCK_COMMITTEES } from "@/lib/mock-data";

export function CommitteesTeaser() {
    return (
        <section className="relative py-24 lg:py-32 bg-coesa-midnight">
            <div className="max-w-container mx-auto px-6">
                <SectionHeader
                    tag="Committees"
                    title="Our Committees"
                    subtitle="Seven specialized teams driving COESA's mission forward."
                />

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
                    {MOCK_COMMITTEES.map((committee, index) => (
                        <motion.div
                            key={committee.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: index * 0.06, duration: 0.4 }}
                        >
                            <CommitteeCard committee={committee} />
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href="/committees"
                        className="inline-flex items-center gap-2 text-coesa-electric font-semibold hover:gap-3 transition-all duration-200"
                    >
                        Explore All Committees
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
