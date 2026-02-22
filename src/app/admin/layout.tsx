"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Do not show sidebar on login page
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#070b14] font-body text-white flex">
            <AdminSidebar />
            <main className="flex-1 lg:ml-64 relative min-h-screen overflow-x-hidden pt-16 lg:pt-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coesa-electric/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
