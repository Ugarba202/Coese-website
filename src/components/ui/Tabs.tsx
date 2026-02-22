"use client";

import { motion } from "framer-motion";

interface Tab {
    id: string;
    label: string;
}

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (id: string) => void;
    className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className = "" }: TabsProps) {
    return (
        <div className={`flex flex-wrap items-center gap-2 p-1.5 glass rounded-2xl w-fit border border-white/5 ${className}`}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={`relative px-5 py-2.5 text-sm font-medium rounded-xl transition-colors ${isActive ? "text-white" : "text-white/60 hover:text-white"
                            }`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeTabBadge"
                                className="absolute inset-0 bg-white/10 rounded-xl border border-white/10 shadow-sm"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
