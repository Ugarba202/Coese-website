"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MOCK_COMMUNITY_IMPACT } from "@/lib/mock-data";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export function CommunityImpact() {
    return (
        <section className="relative py-24 lg:py-32 bg-coesa-navy" id="community">
            <div className="max-w-container mx-auto px-6">
                <SectionHeader
                    tag="Our Impact"
                    title="Community Impact"
                    subtitle="At COESA, community is at the heart of our mission. Discover how we thrive together to shape a better future."
                    centered
                />

                <div className="grid grid-cols-12 gap-8 mt-16">
                    {MOCK_COMMUNITY_IMPACT.map((item, index) => {
                        // Weighted grid logic based on sample image (8/4 for first row, 4/8 for second, etc.)
                        const isEvenRow = Math.floor(index / 2) % 2 === 0;
                        const isFirstInPair = index % 2 === 0;

                        let colSpan = "col-span-12 md:col-span-6";
                        if (index < 4) { // Only apply complex weighting to first 4 for layout variety
                            if (isEvenRow) {
                                colSpan = isFirstInPair ? "col-span-12 md:col-span-7 lg:col-span-8" : "col-span-12 md:col-span-5 lg:col-span-4";
                            } else {
                                colSpan = isFirstInPair ? "col-span-12 md:col-span-5 lg:col-span-4" : "col-span-12 md:col-span-7 lg:col-span-8";
                            }
                        }

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={cn("group flex flex-col", colSpan)}
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-coesa-midnight border border-white/5 mb-4 shadow-xl">
                                    <Image
                                        src={item.image_url || "/images/lecturers/hod.jpg"}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />

                                    {/* Year Badge overlay on image (to match sample look) */}
                                    <div className="absolute bottom-4 left-4">
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                                            {item.year || "2024"}
                                        </span>
                                    </div>
                                </div>

                                {/* Text Content BELOW images */}
                                <div className="px-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-display font-bold text-white group-hover:text-coesa-electric transition-colors">
                                            {item.title}
                                        </h3>
                                        {item.location && (
                                            <span className="flex items-center gap-1.5 text-[10px] font-medium text-coesa-muted italic">
                                                <MapPin className="w-3 h-3 text-coesa-electric" />
                                                {item.location}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-coesa-muted leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
