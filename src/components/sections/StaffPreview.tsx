"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MOCK_PATRON, MOCK_HOD, MOCK_LECTURERS, MOCK_STAFF_GRID_HOD } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Lecturer } from "@/types";

interface StaffCardProps {
    member: Lecturer;
    isLarge?: boolean;
}

function StaffCard({ member, isLarge = false }: StaffCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
                "group flex flex-col",
                isLarge ? "h-full" : ""
            )}
        >
            {/* Image Container */}
            <div className={cn(
                "relative overflow-hidden rounded-3xl bg-coesa-midnight border border-white/5 mb-6",
                isLarge ? "aspect-[4/5]" : "aspect-square"
            )}>
                <Image
                    src={member.photo_url || "/images/lecturers/hod.jpg"}
                    alt={member.full_name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>

            {/* Content Below Image */}
            <div className="px-2">
                <div className="flex flex-col gap-1.5 mb-3">
                    <p className="text-[10px] font-bold text-coesa-electric uppercase tracking-widest">
                        {member.role || "Lecturer"}
                    </p>
                    {member.specialization && (
                        <p className="text-[11px] font-medium text-coesa-sky uppercase tracking-wider">
                            {member.specialization}
                        </p>
                    )}
                </div>

                <h3 className={cn(
                    "font-display font-bold text-white group-hover:text-coesa-electric transition-colors",
                    isLarge ? "text-2xl lg:text-3xl" : "text-lg"
                )}>
                    {member.full_name}
                </h3>

                {isLarge && member.designation && (
                    <p className="text-sm text-coesa-muted mt-2 max-w-[280px]">
                        {member.designation}
                    </p>
                )}

                {/* Course Tags - Always Visible */}
                {member.courses_taught && member.courses_taught.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {member.courses_taught.map((course: string) => (
                            <span key={course} className="text-[9px] font-bold text-white/50 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                                {course}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export function StaffPreview() {
    return (
        <section className="relative py-24 lg:py-32 bg-coesa-navy overflow-hidden" id="staff">
            {/* Background Accents */}
            <div className="absolute top-1/4 -right-64 w-full h-full bg-coesa-electric/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -left-64 w-full h-full bg-coesa-sky/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-container mx-auto px-6">
                <SectionHeader
                    tag="Academic Leadership"
                    title="Our Mentors & Lecturers"
                    subtitle="Meet the distinguished academic professionals guiding the next generation of engineers."
                    centered
                />

                <div className="space-y-32 mt-20">
                    {/* Patron Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        <div className="lg:col-span-5">
                            <StaffCard member={MOCK_PATRON} isLarge />
                        </div>
                        <div className="lg:col-span-7">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {MOCK_LECTURERS.slice(0, 4).map((staff) => (
                                    <StaffCard key={staff.id} member={staff} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* HOD Section (Reversed for visual balance) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        <div className="lg:col-span-7 order-2 lg:order-1">
                            <div className="grid grid-cols-2 gap-4 h-full">
                                {MOCK_STAFF_GRID_HOD.map((staff) => (
                                    <StaffCard key={`hod-staff-${staff.id}`} member={staff} />
                                ))}
                            </div>
                        </div>
                        <div className="lg:col-span-5 order-1 lg:order-2">
                            <StaffCard member={MOCK_HOD} isLarge />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
