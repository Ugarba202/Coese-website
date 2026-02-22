"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MOCK_PATRON, MOCK_HOD, MOCK_STAFF_GRID } from "@/lib/mock-data";
import { Mail, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface StaffCardProps {
    member: any;
    isLarge?: boolean;
}

function StaffCard({ member, isLarge = false }: StaffCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
                "group relative overflow-hidden rounded-3xl bg-coesa-midnight border border-white/5",
                isLarge ? "aspect-[4/5] md:aspect-auto h-full" : "aspect-square"
            )}
        >
            <Image
                src={member.photo_url}
                alt={member.full_name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes={isLarge ? "50vw" : "25vw"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-coesa-midnight via-coesa-midnight/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

            <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[10px] font-bold text-coesa-electric uppercase tracking-widest mb-1">
                    {member.role}
                </p>
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
                            <div className="grid grid-cols-2 gap-4 h-full">
                                {MOCK_STAFF_GRID.map((staff) => (
                                    <StaffCard key={staff.id} member={staff} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* HOD Section (Reversed for visual balance) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        <div className="lg:col-span-7 order-2 lg:order-1">
                            <div className="grid grid-cols-2 gap-4 h-full">
                                {MOCK_STAFF_GRID.map((staff, i) => (
                                    <StaffCard key={`hod-staff-${staff.id}`} member={{ ...staff, id: `hod-staff-${staff.id}` }} />
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
