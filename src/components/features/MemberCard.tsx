"use client";

import Image from "next/image";
import { Linkedin, Twitter, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Member } from "@/types";

interface MemberCardProps {
    member: Member;
    featured?: boolean;
    className?: string;
}

export function MemberCard({ member, featured, className }: MemberCardProps) {
    return (
        <div className={cn(
            "group flex flex-col bg-[#0D1525] rounded-2xl overflow-hidden border border-white/5 shadow-2xl transition-all duration-300 hover:border-coesa-electric/40 hover:shadow-coesa-electric/10",
            featured && "border-coesa-electric/30 ring-1 ring-coesa-electric/20",
            className
        )}>
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-coesa-navy">
                {/* Branding accent glow on hover */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-coesa-electric/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {member.photo_url ? (
                    <Image
                        src={member.photo_url}
                        alt={member.full_name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 25vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-coesa-royal to-coesa-sky text-white font-display font-bold text-4xl">
                        {member.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                )}
            </div>

            {/* Bottom Content */}
            <div className="p-6">
                <h3 className="text-white font-display font-bold text-lg mb-1 group-hover:text-coesa-electric transition-colors">
                    {member.full_name}
                </h3>
                <p className="text-coesa-electric font-semibold text-xs mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-coesa-electric animate-pulse" />
                    {member.role}
                </p>

                {member.bio && (
                    <p className="text-coesa-muted text-[12px] leading-relaxed line-clamp-2 mb-6 group-hover:text-white/70 transition-colors">
                        {member.bio}
                    </p>
                )}

                {/* Social & Contact Links */}
                <div className="flex items-center gap-4 border-t border-white/5 pt-5">
                    {member.linkedin_url && (
                        <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-coesa-muted hover:text-white transition-colors" title="LinkedIn">
                            <Linkedin className="w-4 h-4" />
                        </a>
                    )}
                    {member.twitter_url && (
                        <a href={member.twitter_url} target="_blank" rel="noopener noreferrer" className="text-coesa-muted hover:text-white transition-colors" title="Twitter">
                            <Twitter className="w-4 h-4" />
                        </a>
                    )}
                    {member.phone && (
                        <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-coesa-muted hover:text-coesa-electric transition-colors" title="Call Member">
                            <Phone className="w-4 h-4" />
                            <span className="text-[10px] font-mono">{member.phone}</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
