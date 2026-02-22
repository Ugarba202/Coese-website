"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Layers,
    GraduationCap,
    Newspaper,
    Image as ImageIcon,
    Settings,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Members", href: "/admin/members", icon: Users },
    { name: "Committees", href: "/admin/committees", icon: Layers },
    { name: "Academic Staff", href: "/admin/staff", icon: GraduationCap },
    { name: "News & Events", href: "/admin/news", icon: Newspaper },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const handleLogout = () => {
        document.cookie = "coesa-admin-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        router.push("/admin/login");
        router.refresh();
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-6 border-b border-white/5">
                <Link href="/admin/dashboard" className="flex items-center gap-2">
                    <span className="font-display font-bold text-xl text-white tracking-tight">
                        COESA<span className="text-coesa-electric">Admin</span>
                    </span>
                </Link>
            </div>

            <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                    const Icon = link.icon;

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? "bg-coesa-electric/10 text-coesa-electric"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? "text-coesa-electric" : ""}`} />
                            {link.name}
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-coesa-error hover:bg-coesa-error/10 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 z-50 bg-coesa-midnight border-r border-white/5">
                <SidebarContent />
            </aside>

            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-coesa-midnight/80 backdrop-blur-md border-b border-white/5 z-40 flex items-center justify-between px-4">
                <Link href="/admin/dashboard" className="font-display font-bold text-lg text-white">
                    COESA<span className="text-coesa-electric">Admin</span>
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 -mr-2 text-white/70 hover:text-white"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </header>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-64 bg-coesa-midnight z-50 lg:hidden shadow-2xl border-r border-white/5"
                        >
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
