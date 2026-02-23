"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Twitter, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import Image from "next/image";
import { NAV_LINKS, SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";
import { MOCK_COMMITTEES } from "@/lib/mock-data";

const socialItems = [
    { icon: Twitter, href: SOCIAL_LINKS.twitter, label: "Twitter" },
    { icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram" },
    { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
    { icon: MessageCircle, href: SOCIAL_LINKS.whatsapp, label: "WhatsApp" },
    { icon: Mail, href: `mailto:${SOCIAL_LINKS.email}`, label: "Email" },
];

export function Footer() {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith("/admin");

    if (isAdminRoute) return null;

    return (
        <footer className="relative bg-coesa-navy border-t border-coesa-divider">
            {/* Glow decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-coesa-electric/40 to-transparent" />

            <div className="max-w-container mx-auto px-6 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    {/* Column 1: Logo & Tagline */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-white">
                                <Image src="/images/logo/logo.jpeg" alt="COESA Logo" width={40} height={40} className="w-full h-full object-cover" />
                            </div>
                            <span className="font-display font-bold text-xl text-white">
                                {SITE_CONFIG.name}
                            </span>
                        </div>
                        <p className="text-coesa-muted text-sm leading-relaxed max-w-[280px]">
                            {SITE_CONFIG.tagline}
                        </p>
                        <p className="text-coesa-muted/60 text-xs">
                            {SITE_CONFIG.fullName}
                            <br />
                            {SITE_CONFIG.chapter} Chapter
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-mono text-xs text-coesa-electric uppercase tracking-[3px] mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2.5">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-coesa-muted hover:text-white text-sm transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Committees */}
                    <div>
                        <h4 className="font-mono text-xs text-coesa-electric uppercase tracking-[3px] mb-4">
                            Committees
                        </h4>
                        <ul className="space-y-2.5">
                            {MOCK_COMMITTEES.map((committee) => (
                                <li key={committee.slug}>
                                    <Link
                                        href={`/committees/${committee.slug}`}
                                        className="text-coesa-muted hover:text-white text-sm transition-colors duration-200"
                                    >
                                        {committee.short_name || committee.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact & Social */}
                    <div>
                        <h4 className="font-mono text-xs text-coesa-electric uppercase tracking-[3px] mb-4">
                            Connect
                        </h4>
                        <div className="space-y-3 mb-6">
                            <a
                                href={`mailto:${SOCIAL_LINKS.email}`}
                                className="text-coesa-muted hover:text-white text-sm transition-colors block"
                            >
                                {SOCIAL_LINKS.email}
                            </a>
                            <p className="text-coesa-muted/60 text-xs">
                                Dept. of Computer Engineering,
                                <br />
                                Ahmadu Bello University, Zaria
                            </p>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 mb-8">
                            {socialItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full glass flex items-center justify-center text-coesa-muted hover:text-coesa-electric hover:shadow-glow transition-all duration-300"
                                    aria-label={item.label}
                                >
                                    <item.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>


                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-6 border-t border-coesa-divider/50 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-coesa-muted/50 text-xs text-center md:text-left">
                        © {new Date().getFullYear()} COESA, ABU Zaria Chapter. All rights
                        reserved.
                    </p>
                    <p className="text-coesa-muted/50 text-xs flex items-center gap-1.5">
                        Built with <Heart className="w-3 h-3 text-coesa-error fill-coesa-error" /> by the IT Committee
                    </p>
                </div>
            </div>
        </footer>
    );
}
