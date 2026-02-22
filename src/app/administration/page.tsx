"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MemberCard } from "@/components/features/MemberCard";
import { MOCK_ADMINISTRATIONS, MOCK_MEMBERS } from "@/lib/mock-data";

export default function AdministrationPage() {
    const [activeYearId, setActiveYearId] = useState(MOCK_ADMINISTRATIONS[0]?.id);

    const activeAdministration = MOCK_ADMINISTRATIONS.find(
        (a) => a.id === activeYearId
    );

    const members = MOCK_MEMBERS
        .filter((m) => m.administration_id === activeYearId)
        .sort((a, b) => a.order_index - b.order_index);

    const executives = members.filter((m) => m.is_executive);
    const generalCouncil = members.filter((m) => !m.is_executive);

    const president = executives.find((m) => m.order_index === 1);
    const otherExecutives = executives.filter((m) => m.order_index !== 1);

    return (
        <div className="pt-[72px] min-h-screen">
            {/* Page Header */}
            <header className="relative py-20 lg:py-28 bg-coesa-midnight overflow-hidden">
                <div className="absolute inset-0 bg-grad-hero opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-coesa-midnight to-transparent" />
                <div className="relative max-w-container mx-auto px-6 text-center">
                    <SectionHeader
                        tag="Leadership"
                        title="Administration"
                        subtitle="The dynamic team driving the vision and mission of COESA."
                    />
                </div>
            </header>

            {/* Year Tabs */}
            <section className="bg-coesa-midnight border-b border-coesa-divider/50 sticky top-[72px] z-30">
                <div className="max-w-container mx-auto px-6">
                    <div className="flex gap-2 overflow-x-auto py-4 scrollbar-none items-center justify-center md:justify-start">
                        {MOCK_ADMINISTRATIONS.map((admin) => (
                            <button
                                key={admin.id}
                                onClick={() => setActiveYearId(admin.id)}
                                className={`relative px-6 py-2 rounded-full font-body text-sm font-semibold transition-colors whitespace-nowrap ${activeYearId === admin.id
                                        ? "text-white"
                                        : "text-coesa-muted hover:text-white"
                                    }`}
                            >
                                {activeYearId === admin.id && (
                                    <motion.div
                                        layoutId="admin-year-tab"
                                        className="absolute inset-0 bg-gradient-to-r from-coesa-sky to-coesa-electric rounded-full -z-10 shadow-btn"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                {admin.year} {admin.is_current && " (Current)"}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <main className="py-16 lg:py-24 bg-coesa-navy min-h-[50vh]">
                <div className="max-w-container mx-auto px-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeYearId}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeAdministration?.theme && (
                                <div className="text-center mb-16">
                                    <span className="inline-block px-4 py-1.5 rounded-full border border-coesa-electric/30 bg-coesa-electric/10 text-coesa-electric font-mono text-xs tracking-wider uppercase">
                                        Theme: {activeAdministration.theme}
                                    </span>
                                </div>
                            )}

                            {/* Executives Section */}
                            <div className="mb-24">
                                <h2 className="font-display text-3xl font-bold text-white mb-10 text-center flex items-center justify-center gap-4">
                                    <div className="h-px w-12 bg-coesa-divider" />
                                    Executive Council
                                    <div className="h-px w-12 bg-coesa-divider" />
                                </h2>

                                {/* President (Featured) */}
                                {president && (
                                    <div className="flex justify-center mb-10">
                                        <MemberCard
                                            member={president}
                                            featured
                                            className="w-full max-w-sm"
                                        />
                                    </div>
                                )}

                                {/* Other Executives */}
                                {otherExecutives.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {otherExecutives.map((member) => (
                                            <MemberCard key={member.id} member={member} />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* General Council Section */}
                            {generalCouncil.length > 0 && (
                                <div>
                                    <h2 className="font-display text-3xl font-bold text-white mb-10 text-center flex items-center justify-center gap-4">
                                        <div className="h-px w-12 bg-coesa-divider" />
                                        General Council
                                        <div className="h-px w-12 bg-coesa-divider" />
                                    </h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                        {generalCouncil.map((member) => (
                                            <MemberCard key={member.id} member={member} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {members.length === 0 && (
                                <div className="text-center py-20 text-coesa-muted">
                                    No administration records found for this year.
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
