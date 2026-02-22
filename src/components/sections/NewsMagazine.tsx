"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function NewsMagazine() {
    return (
        <section className="relative py-24 lg:py-32 bg-coesa-navy overflow-hidden" id="news">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coesa-electric/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-coesa-sky/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-container mx-auto px-6 mb-16">
                <SectionHeader
                    tag="Latest Updates"
                    title="News & Events"
                    subtitle="Stay informed with our specialized bulletins and university news."
                    centered
                />
            </div>

            {/* Scrollable Container */}
            <div className="relative w-full">
                <div className="overflow-x-auto hide-scrollbar scroll-smooth">
                    <div className="flex gap-0 min-w-full lg:min-w-0">

                        {/* News Card 1 */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-1/3 border-r border-white/5 bg-coesa-navy/40"
                        >
                            <div className="relative h-[700px] md:h-[800px] overflow-hidden">
                                <Image
                                    src="/images/events/1 image.png"
                                    alt="Special Bulletin"
                                    fill
                                    className="object-cover transition-transform duration-1000 hover:scale-110"
                                />
                            </div>
                            <div className="p-10 border-t border-white/5">
                                <span className="inline-block px-3 py-1 rounded-full bg-coesa-electric/10 border border-coesa-electric/20 text-[10px] font-black text-coesa-electric uppercase tracking-widest mb-4">Special Bulletin</span>
                                <h3 className="text-3xl font-black text-white uppercase leading-tight mb-4">Academic Orientation</h3>
                                <p className="text-coesa-muted text-sm leading-relaxed max-w-md">
                                    Official university announcement and orientation schedule for fresh students. Join us for the matriculation ceremony and departmental orientation sessions.
                                </p>
                                <div className="mt-8 h-1 w-12 bg-coesa-electric" />
                            </div>
                        </motion.div>

                        {/* News Card 2 */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-1/3 border-r border-white/5 bg-coesa-navy/40"
                        >
                            <div className="relative h-[700px] md:h-[800px] overflow-hidden">
                                <Image
                                    src="/images/events/images.jpeg"
                                    alt="Research Newsletter"
                                    fill
                                    className="object-cover transition-transform duration-1000 hover:scale-110"
                                />
                            </div>
                            <div className="p-10 border-t border-white/5">
                                <span className="inline-block px-3 py-1 rounded-full bg-coesa-sky/10 border border-coesa-sky/20 text-[10px] font-black text-coesa-sky uppercase tracking-widest mb-4">Research Magazine</span>
                                <h3 className="text-3xl font-black text-white uppercase leading-tight mb-4">Directorate Highlights</h3>
                                <p className="text-coesa-muted text-sm leading-relaxed max-w-md">
                                    Strategic research updates, innovation success stories, and new funding opportunities for the 2025/2026 academic calendar.
                                </p>
                                <div className="mt-8 h-1 w-12 bg-coesa-sky" />
                            </div>
                        </motion.div>

                        {/* News Card 3 */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-1/3 border-r border-white/5 bg-coesa-navy/40"
                        >
                            <div className="relative h-[700px] md:h-[800px] overflow-hidden flex items-center justify-center bg-white/5">
                                <Image
                                    src="/images/logo/logo.jpeg"
                                    alt="Symposia"
                                    fill
                                    className="object-contain p-20 grayscale opacity-20 transition-all duration-1000 hover:grayscale-0 hover:opacity-100"
                                />
                            </div>
                            <div className="p-10 border-t border-white/5">
                                <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">Institutional</span>
                                <h3 className="text-3xl font-black text-white uppercase leading-tight mb-4">University Symposia</h3>
                                <p className="text-coesa-muted text-sm leading-relaxed max-w-md">
                                    Major academic gatherings, emblem showcase, and central institutional events celebrating our shared heritage and progress.
                                </p>
                                <div className="mt-8 h-1 w-12 bg-white/20" />
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* Optional Scroll Hint for mobile */}
                <div className="lg:hidden flex justify-center mt-8 gap-2">
                    <div className="w-12 h-1 bg-coesa-electric rounded-full" />
                    <div className="w-2 h-1 bg-white/10 rounded-full" />
                    <div className="w-2 h-1 bg-white/10 rounded-full" />
                </div>
            </div>
        </section>
    );
}
