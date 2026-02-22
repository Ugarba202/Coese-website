"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/constants";
import { MOCK_COMMITTEES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();

    // Don't show navbar on admin routes
    const isAdminRoute = pathname.startsWith("/admin");

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMobileOpen]);

    if (isAdminRoute) return null;

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled
                        ? "bg-coesa-navy/80 backdrop-blur-xl border-b border-white/[0.07] shadow-lg"
                        : "bg-transparent"
                )}
            >
                <nav className="max-w-container mx-auto px-6 flex items-center justify-between h-[72px] md:h-[72px]">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-btn group-hover:scale-105 transition-transform">
                            <Image src="/images/logo/logo.jpeg" alt="COESA Logo" width={60} height={40} className="w-full h-full object-cover" />
                        </div>
                        {/* <span className="font-display font-bold text-xl tracking-wide text-white">
                            COESA
                        </span> */}
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-8">
                        {NAV_LINKS.map((link) => {
                            if (link.label === "Committees") {
                                return (
                                    <div key={link.href} className="group relative py-4">
                                        <button
                                            className={cn(
                                                "flex items-center gap-1 text-[15px] font-body font-medium uppercase tracking-wider transition-colors duration-200",
                                                pathname.startsWith("/committees")
                                                    ? "text-coesa-electric"
                                                    : "text-coesa-muted hover:text-white"
                                            )}
                                        >
                                            {link.label}
                                            <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                                        </button>

                                        {/* Dropdown Menu */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50">
                                            <div className="bg-coesa-navy/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-3 min-w-[260px]">
                                                {MOCK_COMMITTEES.map((committee) => (
                                                    <Link
                                                        key={committee.id}
                                                        href={`/committees/${committee.slug}`}
                                                        className="flex flex-col p-3 rounded-xl hover:bg-white/5 transition-colors group/item"
                                                    >
                                                        <span className="text-white font-semibold text-sm group-hover/item:text-coesa-electric transition-colors">
                                                            {committee.name}
                                                        </span>
                                                        <span className="text-[10px] text-coesa-muted line-clamp-1">
                                                            {committee.mandate}
                                                        </span>
                                                    </Link>
                                                ))}
                                                <div className="mt-2 pt-2 border-t border-white/5">
                                                    <Link
                                                        href="/committees"
                                                        className="block text-center text-xs font-bold text-coesa-electric py-2 rounded-lg hover:bg-coesa-electric/10 transition-colors"
                                                    >
                                                        View All Committees
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "relative text-[15px] font-body font-medium uppercase tracking-wider transition-colors duration-200",
                                        pathname === link.href
                                            ? "text-coesa-electric"
                                            : "text-coesa-muted hover:text-white"
                                    )}
                                >
                                    {link.label}
                                    {pathname === link.href && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-coesa-electric rounded-full"
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Desktop CTA */}
                    <Link
                        href="/contact"
                        className="hidden lg:inline-flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-coesa-sky to-coesa-electric text-white font-body font-semibold text-sm shadow-btn hover:brightness-110 active:scale-[0.97] transition-all duration-200"
                    >
                        Join Us
                    </Link>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-full glass"
                        aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                    >
                        {isMobileOpen ? (
                            <X className="w-5 h-5 text-coesa-electric" />
                        ) : (
                            <Menu className="w-5 h-5 text-white" />
                        )}
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-coesa-midnight/95 backdrop-blur-xl flex flex-col items-center justify-center lg:hidden"
                    >
                        <nav className="flex flex-col items-center gap-6">
                            {NAV_LINKS.map((link, index) => {
                                if (link.label === "Committees") {
                                    return (
                                        <div key={link.href} className="flex flex-col items-center gap-4">
                                            <button
                                                onClick={() => {
                                                    const subMenu = document.getElementById('mobile-committees-sub');
                                                    if (subMenu) subMenu.classList.toggle('hidden');
                                                }}
                                                className="text-2xl font-display font-bold uppercase tracking-wider text-white/70 flex items-center gap-2"
                                            >
                                                {link.label}
                                                <ChevronDown className="w-6 h-6" />
                                            </button>
                                            <div id="mobile-committees-sub" className="hidden flex flex-col items-center gap-3 bg-white/5 p-4 rounded-2xl w-full">
                                                {MOCK_COMMITTEES.map((committee) => (
                                                    <Link
                                                        key={committee.id}
                                                        href={`/committees/${committee.slug}`}
                                                        onClick={() => setIsMobileOpen(false)}
                                                        className="text-lg font-body font-medium text-white/60 hover:text-coesa-electric transition-colors"
                                                    >
                                                        {committee.short_name || committee.name}
                                                    </Link>
                                                ))}
                                                <Link
                                                    href="/committees"
                                                    onClick={() => setIsMobileOpen(false)}
                                                    className="text-sm font-bold text-coesa-electric mt-2"
                                                >
                                                    View All
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                }
                                return (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ delay: index * 0.06, duration: 0.3 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMobileOpen(false)}
                                            className={cn(
                                                "text-2xl font-display font-bold uppercase tracking-wider transition-colors",
                                                pathname === link.href
                                                    ? "text-coesa-electric"
                                                    : "text-white/70 hover:text-white"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: NAV_LINKS.length * 0.06, duration: 0.3 }}
                            >
                                <Link
                                    href="/contact"
                                    onClick={() => setIsMobileOpen(false)}
                                    className="mt-4 inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-coesa-sky to-coesa-electric text-white font-body font-semibold shadow-btn"
                                >
                                    Join Us
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
