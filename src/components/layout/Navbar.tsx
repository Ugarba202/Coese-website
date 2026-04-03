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
            <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-500">
                <nav
                    className={cn(
                        "max-w-container mx-auto px-8 flex items-center justify-between h-[72px] rounded-full transition-all duration-500",
                        isScrolled
                            ? "bg-coesa-navy/70 backdrop-blur-2xl border border-white/10 shadow-2xl translate-y-[-10px]"
                            : "bg-white/5 backdrop-blur-md border border-white/5 shadow-lg"
                    )}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white shadow-glow transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                            <Image src="/images/logo/logo.jpeg" alt="COESA Logo" width={64} height={64} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-coesa-electric/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-display font-black text-xl tracking-tighter text-white group-hover:text-coesa-electric transition-colors leading-none">
                                COESA
                            </span>
                            <span className="text-[10px] font-mono text-coesa-muted font-bold tracking-widest uppercase mt-0.5 group-hover:text-coesa-sky transition-colors">
                                ABU Zaria
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-10">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;
                            
                            if (link.label === "Committees") {
                                return (
                                    <div key={link.href} className="group relative py-4">
                                        <button
                                            className={cn(
                                                "flex items-center gap-2 text-[13px] font-body font-bold uppercase tracking-widest transition-all duration-300",
                                                pathname.startsWith("/committees")
                                                    ? "text-coesa-electric"
                                                    : "text-coesa-muted group-hover:text-white"
                                            )}
                                        >
                                            {link.label}
                                            <ChevronDown className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-180" />
                                        </button>

                                        {/* Dropdown Menu */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-500 z-50">
                                            <div className="bg-coesa-navy/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] p-4 min-w-[300px] overflow-hidden">
                                                <div className="grid gap-2">
                                                    {MOCK_COMMITTEES.map((committee) => (
                                                        <Link
                                                            key={committee.id}
                                                            href={`/committees/${committee.slug}`}
                                                            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all duration-300 group/item"
                                                        >
                                                            <div className="w-10 h-10 rounded-xl bg-coesa-electric/10 flex items-center justify-center text-xl group-hover/item:scale-110 transition-transform">
                                                                {committee.icon || "🏛️"}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-white font-bold text-sm group-hover/item:text-coesa-electric transition-colors">
                                                                    {committee.name}
                                                                </span>
                                                                <span className="text-[10px] text-coesa-muted font-medium line-clamp-1">
                                                                    {committee.mandate}
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                                <div className="mt-4 pt-4 border-t border-white/5">
                                                    <Link
                                                        href="/committees"
                                                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-coesa-electric/10 text-coesa-electric text-xs font-bold uppercase tracking-widest hover:bg-coesa-electric hover:text-white transition-all duration-300"
                                                    >
                                                        Explore All Committees
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
                                        "relative text-[13px] font-body font-bold uppercase tracking-widest transition-all duration-300 pb-1 group/link",
                                        isActive
                                            ? "text-coesa-electric"
                                            : "text-coesa-muted hover:text-white"
                                    )}
                                >
                                    {link.label}
                                    <span className={cn(
                                        "absolute bottom-0 left-0 h-[2px] bg-coesa-electric transition-all duration-500",
                                        isActive ? "w-full" : "w-0 group-hover/link:w-full"
                                    )} />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Desktop CTA */}
                    <Link
                        href="/contact"
                        className="hidden lg:inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-coesa-sky to-coesa-electric text-white font-body font-bold text-xs uppercase tracking-widest shadow-glow hover:brightness-110 hover:scale-105 active:scale-[0.95] transition-all duration-500"
                    >
                        Join the Union
                    </Link>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="lg:hidden relative z-50 w-12 h-12 flex items-center justify-center rounded-full glass border border-white/10 hover:bg-white/10 transition-colors"
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
