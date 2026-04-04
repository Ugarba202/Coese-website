"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MOCK_MEMBERS } from "@/lib/mock-data";

export function ExecutivesPreview() {
    // Only the top 4 executive leaders
    const executives = MOCK_MEMBERS
        .filter((m) => m.is_executive)
        .sort((a, b) => a.order_index - b.order_index)
        .slice(0, 4);

    return (
        <section className="relative py-24 lg:py-32 bg-coesa-midnight overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-coesa-electric/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

            <div className="max-w-container mx-auto px-6 relative z-10">
                <SectionHeader
                    tag="Leadership"
                    title="Meet the Leadership"
                    subtitle="Visionary leaders and engineers dedicated to driving innovation at COESA."
                    className="mb-20"
                />

                {/* Circular Layout Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 lg:gap-x-12 mb-20 text-center">
                    {executives.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="group"
                        >
                            {/* Circular Image Container */}
                            <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto mb-8">
                                <div className="absolute inset-0 rounded-full border-2 border-white/5 transition-colors duration-500 group-hover:border-coesa-electric/40 z-20 pointer-events-none" />
                                <div className="absolute -inset-2 rounded-full border border-coesa-electric/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                                
                                <div className="relative w-full h-full rounded-full overflow-hidden bg-coesa-navy shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]">
                                    {member.photo_url ? (
                                        <Image
                                            src={member.photo_url}
                                            alt={member.full_name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-coesa-royal/20 to-coesa-sky/20 text-white/50 font-display font-bold text-4xl">
                                            {member.full_name.split(" ").map((n) => n[0]).join("")}
                                        </div>
                                    )}
                                    {/* Vignette Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </div>

                            {/* Identity Info */}
                            <h3 className="font-display font-bold text-xl lg:text-2xl text-white mb-3 tracking-tight group-hover:text-coesa-electric transition-colors duration-300">
                                {member.full_name}
                            </h3>
                            
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-white/50 text-[10px] font-mono font-black tracking-widest uppercase group-hover:bg-coesa-electric/10 group-hover:border-coesa-electric/30 group-hover:text-coesa-electric transition-all duration-300">
                                {member.role}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Explore All Leadership CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center"
                >
                    <Link
                        href="/administration"
                        className="group relative inline-flex items-center gap-3 px-12 py-5 rounded-full bg-white/[0.03] border border-white/10 text-white font-display font-black text-sm uppercase tracking-[0.2em] hover:bg-white/5 active:scale-[0.98] transition-all duration-300 shadow-xl overflow-hidden"
                    >
                        <span className="relative z-10">Explore All Leadership</span>
                        <ArrowRight className="w-4 h-4 text-coesa-electric group-hover:translate-x-1.5 transition-transform" />
                        
                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-coesa-electric/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
