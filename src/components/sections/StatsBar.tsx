"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/features/CountUp";
import { MOCK_STATS } from "@/lib/mock-data";

export function StatsBar() {
    return (
        <section className="relative bg-coesa-navy py-12 border-y border-coesa-divider/30">
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-grad-glow opacity-30" />

            <div className="relative max-w-container mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
                    {MOCK_STATS.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="text-center"
                        >
                            <div className="font-display text-5xl font-black text-gradient mb-2">
                                <CountUp end={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="font-body text-sm text-coesa-muted uppercase tracking-[2px]">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
