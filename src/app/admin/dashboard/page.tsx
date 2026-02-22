"use client";

import { Users, Newspaper, Image as ImageIcon, Briefcase } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useEffect, useState } from "react";
import { getMembers, getNewsEvents, getGalleryImages, getStats } from "@/lib/data";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        members: 0,
        news: 0,
        photos: 0,
        programs: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [members, news, gallery] = await Promise.all([
                    getMembers(),
                    getNewsEvents(),
                    getGalleryImages(),
                    getStats()
                ]);

                setStats({
                    members: members.length,
                    news: news.length,
                    photos: gallery.length,
                    programs: 1, // Mock
                });
            } catch (error) {
                console.error("Dashboard data error", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const statCards = [
        { label: "Total Members", value: stats.members, icon: Users, color: "text-coesa-electric", bg: "bg-coesa-electric/10" },
        { label: "Published News", value: stats.news, icon: Newspaper, color: "text-coesa-sky", bg: "bg-coesa-sky/10" },
        { label: "Gallery Photos", value: stats.photos, icon: ImageIcon, color: "text-coesa-primary", bg: "bg-coesa-primary/10" },
        { label: "Active Programs", value: stats.programs, icon: Briefcase, color: "text-warning", bg: "bg-warning/10" },
    ];

    if (loading) {
        return <div className="text-coesa-muted animate-pulse">Loading dashboard...</div>;
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionHeader
                tag="Overview"
                title="Dashboard"
                subtitle="Welcome to the COESA management portal."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="glass border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-white/10 transition-colors">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-coesa-muted text-sm font-medium">{stat.label}</span>
                                <div className={`w-10 h-10 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="font-display font-bold text-3xl text-white">
                                {stat.value}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Activity Placeholder */}
                <div className="glass border border-white/5 rounded-2xl p-6">
                    <h3 className="font-display font-bold text-xl text-white mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 group cursor-pointer p-2 -mx-2 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="w-2 h-2 rounded-full bg-coesa-electric" />
                            <div className="flex-1">
                                <p className="text-sm text-white/90">New photo added to <span className="font-medium text-coesa-electric">Tech Week 2025</span></p>
                                <span className="text-xs text-coesa-muted">2 hours ago</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group cursor-pointer p-2 -mx-2 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="w-2 h-2 rounded-full bg-coesa-sky" />
                            <div className="flex-1">
                                <p className="text-sm text-white/90">News article published: <span className="font-medium text-coesa-sky">Python Bootcamp</span></p>
                                <span className="text-xs text-coesa-muted">5 hours ago</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group cursor-pointer p-2 -mx-2 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="w-2 h-2 rounded-full bg-coesa-primary" />
                            <div className="flex-1">
                                <p className="text-sm text-white/90">Updated executive member profile</p>
                                <span className="text-xs text-coesa-muted">Yesterday</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="glass border border-white/5 rounded-2xl p-6">
                    <h3 className="font-display font-bold text-xl text-white mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-white/5 hover:border-coesa-electric/30 hover:bg-coesa-electric/5 text-white/70 hover:text-white transition-all">
                            <Newspaper className="w-6 h-6 text-coesa-electric" />
                            <span className="text-sm font-medium">Post News</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-white/5 hover:border-coesa-primary/30 hover:bg-coesa-primary/5 text-white/70 hover:text-white transition-all">
                            <ImageIcon className="w-6 h-6 text-coesa-primary" />
                            <span className="text-sm font-medium">Upload Photo</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-white/5 hover:border-coesa-sky/30 hover:bg-coesa-sky/5 text-white/70 hover:text-white transition-all">
                            <Users className="w-6 h-6 text-coesa-sky" />
                            <span className="text-sm font-medium">Add Member</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
