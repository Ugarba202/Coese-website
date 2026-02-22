"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getMembers } from "@/lib/data";
import type { Member } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Edit2, Trash2 } from "lucide-react";

export default function AdminMembersPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await getMembers();
                setMembers(data);
            } catch (error) {
                console.error("Failed to fetch members", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    const columns = [
        {
            header: "Member",
            cell: (row: Member) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white/5 border border-white/10">
                        {row.photo_url ? (
                            <Image src={row.photo_url} alt={row.full_name} width={40} height={40} className="object-cover w-full h-full" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-white/50 bg-coesa-royal/50">
                                {row.full_name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="font-medium text-white">{row.full_name}</div>
                        <div className="text-coesa-muted text-xs">{row.email || "No email"}</div>
                    </div>
                </div>
            )
        },
        {
            header: "Role",
            cell: (row: Member) => (
                <div className="flex flex-col gap-1 items-start">
                    <span className="font-medium">{row.role}</span>
                    {row.is_executive && <Badge variant="default" className="scale-75 origin-left">EXECUTIVE</Badge>}
                </div>
            )
        },
        {
            header: "Administration",
            accessorKey: "administration_id" as keyof Member, // Simplified for mock
            cell: (row: Member) => <span className="text-coesa-muted font-mono text-sm">{row.administration_id}</span>
        },
        {
            header: "Actions",
            cell: () => (
                <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-coesa-muted hover:text-white transition-colors" aria-label="Edit member">
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-coesa-muted hover:text-coesa-error transition-colors" aria-label="Delete member">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionHeader
                tag="Directory"
                title="Members"
                subtitle="Manage executive and general council members."
            />

            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="animate-pulse flex items-center gap-3 text-coesa-muted">
                        <div className="w-5 h-5 border-2 border-t-coesa-electric border-r-coesa-electric rounded-full animate-spin" />
                        Loading members...
                    </div>
                </div>
            ) : (
                <DataTable
                    data={members}
                    columns={columns}
                    searchKey="full_name"
                    searchPlaceholder="Search members by name..."
                    onAdd={() => alert("Add member slide-in panel would open here.")}
                    addLabel="Add Member"
                />
            )}
        </div>
    );
}
