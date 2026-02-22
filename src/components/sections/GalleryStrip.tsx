"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MOCK_GALLERY } from "@/lib/mock-data";

export function GalleryStrip() {
    const photos = MOCK_GALLERY.slice(0, 8);

    return (
        <section className="relative py-24 lg:py-32 bg-coesa-midnight overflow-hidden">
            <div className="max-w-container mx-auto px-6 mb-8">
                <div className="flex items-center gap-3 justify-center mb-4">
                    <div className="w-8 h-[2px] bg-coesa-electric" />
                    <span className="font-mono text-sm text-coesa-electric uppercase tracking-[3px]">
                        Gallery
                    </span>
                    <div className="w-8 h-[2px] bg-coesa-electric" />
                </div>
                <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white text-center mb-3">
                    Moments Captured
                </h2>
            </div>

            {/* Horizontal strip */}
            <div className="relative">
                <div className="flex gap-4 px-6 overflow-x-auto pb-4 scrollbar-none">
                    {photos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                            className="flex-shrink-0 w-[280px] h-[200px] rounded-[18px] overflow-hidden bg-coesa-navy border border-white/[0.08] relative group cursor-pointer"
                        >
                            {/* Placeholder gradient instead of image */}
                            <div
                                className="w-full h-full bg-gradient-to-br from-coesa-royal/30 to-coesa-navy flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                            >
                                <span className="text-3xl opacity-20">📸</span>
                            </div>

                            {/* Caption overlay */}
                            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-coesa-midnight/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-xs font-medium truncate">
                                    {photo.caption}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-coesa-midnight to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-coesa-midnight to-transparent pointer-events-none" />
            </div>

            {/* CTA */}
            <div className="text-center mt-8">
                <Link
                    href="/gallery"
                    className="inline-flex items-center gap-2 text-coesa-electric font-semibold hover:gap-3 transition-all duration-200"
                >
                    View Full Gallery
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}
