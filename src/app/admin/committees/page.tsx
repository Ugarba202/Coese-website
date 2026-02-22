"use client";

import { useEffect, useState } from "react";
import { getCommittees } from "@/lib/data";
import type { Committee } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DataTable } from "@/components/admin/DataTable";
import { Edit2, Trash2 } from "lucide-react";

export default function AdminCommitteesPage() {
    const [committees, setCommittees] = useState<Committee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCommittees = async () => {
            try {
                const data = await getCommittees();
                setCommittees(data);
            } catch (error) {
                console.error("Failed to fetch committees", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCommittees();
    }, []);

    const columns = [
        {
            header: "Committee",
            cell: (row: Committee) => (
                <div className="flex items-center gap-3">
                    <div className="text-2xl">{row.icon}</div>
                    <div>
                        <div className="font-medium text-white">{row.name}</div>
                        <div className="text-coesa-muted text-xs"> /{row.slug}</div>
                    </div>
                </div>
            )
        },
        {
            header: "Mandate",
            cell: (row: Committee) => (
                <div className="max-w-[400px] truncate text-white/80" title={row.mandate}>
                    {row.mandate || "-"}
                </div>
            )
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

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionHeader
                tag="Groups"
                title="Committees"
                subtitle="Manage COESA standing committees and task forces."
            />

            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="animate-pulse flex items-center gap-3 text-coesa-muted">
                        <div className="w-5 h-5 border-2 border-t-coesa-electric border-r-coesa-electric rounded-full animate-spin" />
                        Loading committees...
                    </div>
                </div>
            ) : (
                <DataTable
                    data={committees}
                    columns={columns}
                    searchKey="name"
                    searchPlaceholder="Search committees by name..."
                    onAdd={() => alert("Add committee slide-in panel would open here.")}
                    addLabel="Add Committee"
                />
            )}
        </div>
    );
}
