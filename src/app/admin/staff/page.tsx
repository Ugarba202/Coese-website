"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getStaff } from "@/lib/data";
import type { Lecturer, LevelCoordinator } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DataTable } from "@/components/admin/DataTable";
import { Tabs } from "@/components/ui/Tabs";
import { Edit2, Trash2 } from "lucide-react";

export default function AdminStaffPage() {
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const [coordinators, setCoordinators] = useState<LevelCoordinator[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("lecturers");

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const data = await getStaff();
                setLecturers(data.lecturers);
                setCoordinators(data.coordinators);
            } catch (error) {
                console.error("Failed to fetch staff", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStaff();
    }, []);

    const lecturerColumns = [
        {
            header: "Lecturer",
            cell: (row: Lecturer) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white/5 border border-white/10 shrink-0">
                        {row.photo_url ? (
                            <Image src={row.photo_url} alt={row.full_name} width={40} height={40} className="object-cover w-full h-full" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-white/50 bg-coesa-royal/50">
                                {row.full_name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="font-medium text-white">{row.title} {row.full_name}</div>
                        <div className="text-coesa-muted text-xs">{row.email || "No email"}</div>
                    </div>
                </div>
            )
        },
        {
            header: "Specialization",
            accessorKey: "specialization" as keyof Lecturer,
            cell: (row: Lecturer) => <span className="text-white/80">{row.specialization || "-"}</span>
        },
        {
            header: "Office",
            accessorKey: "office" as keyof Lecturer,
            cell: (row: Lecturer) => <span className="text-coesa-muted text-sm">{row.office || "-"}</span>
        },
        {
            header: "Actions",
            cell: () => (
                <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-coesa-muted hover:text-white transition-colors">
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-coesa-muted hover:text-coesa-error transition-colors">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    const coordinatorColumns = [
        {
            header: "Coordinator",
            cell: (row: LevelCoordinator) => (
                <div className="flex items-center gap-3">
                    <div>
                        <div className="font-medium text-white">{row.title} {row.full_name}</div>
                        <div className="text-coesa-muted text-xs">{row.email || "No email"}</div>
                    </div>
                </div>
            )
        },
        {
            header: "Level",
            cell: (row: LevelCoordinator) => (
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-coesa-electric/10 text-coesa-electric font-mono text-sm font-bold border border-coesa-electric/20">
                    {row.level}
                </span>
            )
        },
        {
            header: "Office Hours",
            accessorKey: "office_hours" as keyof LevelCoordinator,
            cell: (row: LevelCoordinator) => <span className="text-coesa-muted text-sm">{row.office_hours || "-"}</span>
        },
        {
            header: "Actions",
            cell: () => (
                <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-coesa-muted hover:text-white transition-colors">
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-coesa-muted hover:text-coesa-error transition-colors">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    if (loading) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <SectionHeader tag="Directory" title="Academic Staff" subtitle="Manage department lecturers and level coordinators." />
                <div className="flex justify-center p-12">
                    <div className="animate-pulse flex items-center gap-3 text-coesa-muted">
                        <div className="w-5 h-5 border-2 border-t-coesa-electric border-r-coesa-electric rounded-full animate-spin" />
                        Loading staff...
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionHeader
                tag="Directory"
                title="Academic Staff"
                subtitle="Manage department lecturers and level coordinators."
            />

            <Tabs
                tabs={[
                    { id: "lecturers", label: "Lecturers" },
                    { id: "coordinators", label: "Level Coordinators" },
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
            />

            {activeTab === "lecturers" ? (
                <DataTable
                    data={lecturers}
                    columns={lecturerColumns}
                    searchKey="full_name"
                    searchPlaceholder="Search lecturers..."
                    onAdd={() => alert("Add lecturer panel")}
                    addLabel="Add Lecturer"
                />
            ) : (
                <DataTable
                    data={coordinators}
                    columns={coordinatorColumns}
                    searchKey="full_name"
                    searchPlaceholder="Search coordinators..."
                    onAdd={() => alert("Add coordinator panel")}
                    addLabel="Add Coordinator"
                />
            )}
        </div>
    );
}
