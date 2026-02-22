"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { MOCK_PROGRAMS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export function ProgramBanner() {
    const activeProgram = MOCK_PROGRAMS.find((p) => p.is_active);

    if (!activeProgram) return null;

    return (
        <section className="relative py-16 overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-coesa-royal via-coesa-sky to-coesa-electric opacity-10" />
            <div className="absolute inset-0 bg-coesa-navy/90" />

            {/* Glow */}
            <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-coesa-electric/10 rounded-full blur-[100px] -translate-y-1/2" />

            <div className="relative max-w-container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="rounded-[28px] border border-coesa-electric/20 bg-gradient-to-br from-[#0D2547]/80 to-coesa-navy/80 backdrop-blur-sm p-8 lg:p-12"
                >
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Left: Program info */}
                        <div>
                            <Badge variant="warning" className="mb-4">
                                🔥 Enrolling Now
                            </Badge>
                            <h3 className="font-display text-3xl lg:text-4xl font-bold text-white mb-2">
                                {activeProgram.title}
                            </h3>
                            {activeProgram.subtitle && (
                                <p className="text-coesa-muted text-lg mb-4">
                                    {activeProgram.subtitle}
                                </p>
                            )}

                            {/* Tags */}
                            <div className="flex flex-wrap gap-3 mb-6">
                                {activeProgram.start_date && (
                                    <div className="flex items-center gap-1.5 text-coesa-muted text-sm">
                                        <Calendar className="w-4 h-4 text-coesa-electric" />
                                        <span>Starts {formatDate(activeProgram.start_date)}</span>
                                    </div>
                                )}
                                {activeProgram.duration_label && (
                                    <div className="flex items-center gap-1.5 text-coesa-muted text-sm">
                                        <Clock className="w-4 h-4 text-coesa-electric" />
                                        <span>{activeProgram.duration_label}</span>
                                    </div>
                                )}
                                {activeProgram.venue && (
                                    <div className="flex items-center gap-1.5 text-coesa-muted text-sm">
                                        <MapPin className="w-4 h-4 text-coesa-electric" />
                                        <span>{activeProgram.venue}</span>
                                    </div>
                                )}
                            </div>

                            {activeProgram.mode && (
                                <Badge className="mb-4">{activeProgram.mode}</Badge>
                            )}
                        </div>

                        {/* Right: CTA + Pricing */}
                        <div className="text-center lg:text-right">
                            {activeProgram.enrollment_fee && (
                                <div className="mb-6">
                                    <div className="font-mono text-sm text-coesa-muted mb-2 uppercase tracking-wider">
                                        Registration Fee
                                    </div>
                                    <div className="flex justify-center lg:justify-end gap-6">
                                        <div>
                                            <div className="font-display text-3xl font-bold text-white">
                                                ₦{activeProgram.enrollment_fee.internal.toLocaleString()}
                                            </div>
                                            <div className="text-coesa-muted text-xs">Internal</div>
                                        </div>
                                        <div className="w-px bg-coesa-divider" />
                                        <div>
                                            <div className="font-display text-3xl font-bold text-white">
                                                ₦{activeProgram.enrollment_fee.external.toLocaleString()}
                                            </div>
                                            <div className="text-coesa-muted text-xs">External</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-coesa-sky to-coesa-electric text-white font-semibold shadow-btn hover:brightness-110 active:scale-[0.97] transition-all"
                            >
                                Enroll Now
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
