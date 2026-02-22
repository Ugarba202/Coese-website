"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, MapPin, BookOpen, Clock } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { MOCK_LECTURERS, MOCK_LEVEL_COORDINATORS } from "@/lib/mock-data";
import { LEVELS } from "@/lib/constants";

export default function AcademicStaffPage() {
    const [activeTab, setActiveTab] = useState<"lecturers" | "coordinators">("lecturers");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredLecturers = MOCK_LECTURERS.filter(
        (l) =>
            l.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.courses_taught.some((c) =>
                c.toLowerCase().includes(searchQuery.toLowerCase())
            )
    );

    return (
        <div className="pt-[72px] min-h-screen bg-coesa-midnight">
            <header className="relative py-20 lg:py-24 overflow-hidden border-b border-coesa-divider/50">
                <div className="absolute inset-0 bg-grad-hero opacity-30" />
                <div className="relative max-w-container mx-auto px-6 text-center">
                    <SectionHeader
                        tag="Academic"
                        title="Academic Staff"
                        subtitle="Meet the distinguished faculty shaping the minds of future engineers."
                    />
                </div>
            </header>

            {/* Tabs */}
            <section className="bg-coesa-navy sticky top-[72px] z-30 border-b border-white/[0.05]">
                <div className="max-w-container mx-auto px-6">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab("lecturers")}
                            className={`flex-1 md:flex-none px-8 py-5 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === "lecturers"
                                ? "text-coesa-electric border-b-2 border-coesa-electric"
                                : "text-coesa-muted hover:text-white border-b-2 border-transparent"
                                }`}
                        >
                            Lecturers
                        </button>
                        <button
                            onClick={() => setActiveTab("coordinators")}
                            className={`flex-1 md:flex-none px-8 py-5 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === "coordinators"
                                ? "text-coesa-electric border-b-2 border-coesa-electric"
                                : "text-coesa-muted hover:text-white border-b-2 border-transparent"
                                }`}
                        >
                            Level Coordinators
                        </button>
                    </div>
                </div>
            </section>

            <main className="py-16">
                <div className="max-w-container mx-auto px-6">
                    {activeTab === "lecturers" && (
                        <div className="animate-fade-up">
                            {/* Search */}
                            <div className="mb-8 max-w-md">
                                <input
                                    type="text"
                                    placeholder="Search by name or course (e.g., CPE 501)"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-5 py-3 rounded-full bg-coesa-navy border border-white/[0.1] text-white placeholder:text-coesa-muted/50 focus:outline-none focus:border-coesa-electric focus:ring-1 focus:ring-coesa-electric transition-all"
                                />
                            </div>

                            {/* Desktop Table */}
                            <div className="hidden lg:block overflow-hidden rounded-[18px] border border-coesa-divider bg-coesa-navy shadow-card">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white/[0.03] border-b border-coesa-divider">
                                            <th className="p-5 font-mono text-xs text-coesa-electric uppercase tracking-widest font-semibold w-[300px]">Staff Member</th>
                                            <th className="p-5 font-mono text-xs text-coesa-electric uppercase tracking-widest font-semibold">Courses Taught</th>
                                            <th className="p-5 font-mono text-xs text-coesa-electric uppercase tracking-widest font-semibold">Specialization</th>
                                            <th className="p-5 font-mono text-xs text-coesa-electric uppercase tracking-widest font-semibold w-[200px]">Contact</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredLecturers.map((lecturer) => (
                                            <tr key={lecturer.id} className="border-b border-coesa-divider/50 hover:bg-white/[0.02] transition-colors">
                                                <td className="p-5 align-top">
                                                    <div className="flex gap-4 items-center">
                                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-coesa-midnight flex-shrink-0">
                                                            {lecturer.photo_url ? (
                                                                <Image src={lecturer.photo_url} alt={lecturer.full_name} width={48} height={48} className="object-cover w-full h-full" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-coesa-muted text-white font-bold">{lecturer.full_name.charAt(0)}</div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-white">{lecturer.full_name}</div>
                                                            <div className="text-coesa-muted text-sm">{lecturer.title}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-5 align-top">
                                                    <ul className="space-y-1">
                                                        {lecturer.courses_taught.map((course, idx) => (
                                                            <li key={idx} className="text-sm text-coesa-muted flex items-start gap-2">
                                                                <BookOpen className="w-3.5 h-3.5 mt-0.5 text-coesa-electric/50 flex-shrink-0" />
                                                                {course}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td className="p-5 align-top">
                                                    <span className="inline-block px-3 py-1 rounded-full bg-white/[0.05] text-white text-xs">
                                                        {lecturer.specialization || "General"}
                                                    </span>
                                                </td>
                                                <td className="p-5 align-top space-y-2">
                                                    {lecturer.office && (
                                                        <div className="flex items-start gap-2 text-sm text-coesa-muted">
                                                            <MapPin className="w-4 h-4 text-coesa-electric flex-shrink-0" />
                                                            {lecturer.office}
                                                        </div>
                                                    )}
                                                    {lecturer.email && (
                                                        <div className="flex items-center gap-2 text-sm text-coesa-electric hover:underline">
                                                            <Mail className="w-4 h-4 flex-shrink-0" />
                                                            <a href={`mailto:${lecturer.email}`}>{lecturer.email}</a>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredLecturers.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="p-10 text-center text-coesa-muted">No lecturers found matching your search.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">
                                {filteredLecturers.map((lecturer) => (
                                    <Card key={lecturer.id} className="p-5 border border-coesa-divider">
                                        <div className="flex gap-4 items-start mb-4">
                                            <div className="w-14 h-14 rounded-full overflow-hidden bg-coesa-midnight flex-shrink-0">
                                                {lecturer.photo_url ? (
                                                    <Image src={lecturer.photo_url} alt={lecturer.full_name} width={56} height={56} className="object-cover w-full h-full" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-coesa-muted text-white font-bold">{lecturer.full_name.charAt(0)}</div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-white text-lg leading-tight mb-1">{lecturer.full_name}</div>
                                                <div className="text-coesa-electric text-sm">{lecturer.title}</div>
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-3 border-t border-white/5">
                                            {lecturer.specialization && (
                                                <div className="text-xs">
                                                    <span className="text-coesa-muted mr-2">Specialization:</span>
                                                    <span className="text-white">{lecturer.specialization}</span>
                                                </div>
                                            )}

                                            <div>
                                                <div className="text-coesa-muted text-xs mb-1">Courses:</div>
                                                <ul className="space-y-1 pl-2 border-l-2 border-coesa-divider">
                                                    {lecturer.courses_taught.map((course, idx) => (
                                                        <li key={idx} className="text-sm text-white">{course}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="space-y-1.5 pt-2">
                                                {lecturer.office && (
                                                    <div className="flex items-center gap-2 text-sm text-coesa-muted">
                                                        <MapPin className="w-3.5 h-3.5 text-coesa-sky" /> {lecturer.office}
                                                    </div>
                                                )}
                                                {lecturer.email && (
                                                    <div className="flex items-center gap-2 text-sm text-coesa-electric">
                                                        <Mail className="w-3.5 h-3.5" /> <a href={`mailto:${lecturer.email}`}>{lecturer.email}</a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "coordinators" && (
                        <div className="animate-fade-up">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                                {MOCK_LEVEL_COORDINATORS.map((coord) => {
                                    const levelConf = LEVELS.find(l => l.level === coord.level);
                                    const colorClass = levelConf?.color || "text-coesa-electric";

                                    return (
                                        <Card key={coord.id} className="p-6 relative overflow-hidden group">
                                            {/* Level Watermark */}
                                            <div className="absolute -right-6 -bottom-6 font-display font-black text-9xl opacity-[0.03] select-none pointer-events-none group-hover:scale-110 transition-transform duration-500">
                                                {coord.level_number}
                                            </div>

                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-coesa-midnight to-[#0D2547] border border-coesa-divider flex items-center justify-center font-display font-bold text-xl shadow-inner">
                                                    {coord.full_name.charAt(5)}
                                                </div>
                                                <div>
                                                    <div className={`font-mono text-sm tracking-widest font-bold mb-1 ${colorClass}`}>
                                                        {coord.level} LEVEL
                                                    </div>
                                                    <div className="font-display font-bold text-white text-xl">
                                                        {coord.full_name}
                                                    </div>
                                                    <div className="text-coesa-muted text-sm">{coord.title}</div>
                                                </div>
                                            </div>

                                            <div className="space-y-3 bg-coesa-midnight/40 rounded-xl p-4 border border-white/[0.02]">
                                                {coord.office && (
                                                    <div className="flex items-start gap-3">
                                                        <MapPin className="w-4 h-4 text-coesa-muted mt-0.5" />
                                                        <div>
                                                            <div className="text-xs text-coesa-muted uppercase tracking-wider mb-0.5">Office</div>
                                                            <div className="text-sm text-white">{coord.office}</div>
                                                        </div>
                                                    </div>
                                                )}
                                                {coord.office_hours && (
                                                    <div className="flex items-start gap-3">
                                                        <Clock className="w-4 h-4 text-coesa-muted mt-0.5" />
                                                        <div>
                                                            <div className="text-xs text-coesa-muted uppercase tracking-wider mb-0.5">Office Hours</div>
                                                            <div className="text-sm text-white">{coord.office_hours}</div>
                                                        </div>
                                                    </div>
                                                )}
                                                {coord.email && (
                                                    <div className="flex items-start gap-3">
                                                        <Mail className="w-4 h-4 text-coesa-muted mt-0.5" />
                                                        <div>
                                                            <div className="text-xs text-coesa-muted uppercase tracking-wider mb-0.5">Email</div>
                                                            <a href={`mailto:${coord.email}`} className="text-sm text-coesa-electric hover:underline">{coord.email}</a>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
