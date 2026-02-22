"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getNewsEvents } from "@/lib/data";
import type { NewsEvent } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Edit2, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminNewsPage() {
    const [news, setNews] = useState<NewsEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getNewsEvents();
                setNews(data);
            } catch (error) {
                console.error("Failed to fetch news", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    const columns = [
        {
            header: "Title",
            cell: (row: NewsEvent) => (
                <div className="flex items-center gap-3">
                    {row.cover_image_url && (
                        <div className="w-12 h-12 rounded-lg bg-coesa-midnight overflow-hidden shrink-0 hidden sm:block">
                            <Image
                                src={row.cover_image_url}
                                alt={row.title}
                                width={48}
                                height={48}
                                className="object-cover w-full h-full opacity-80"
                            />
                        </div>
                    )}
                    <div>
                        <div className="font-medium text-white line-clamp-1">{row.title}</div>
                        <div className="text-coesa-muted text-xs line-clamp-1 mt-0.5">{row.excerpt}</div>
                    </div>
                </div>
            )
        },
        {
            header: "Type",
            cell: (row: NewsEvent) => (
                <Badge variant={row.type === "event" ? "warning" : "default"} className="scale-75 origin-left">
                    {row.type}
                </Badge>
            )
        },
        {
            header: "Status",
            cell: (row: NewsEvent) => (
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${row.published ? 'bg-coesa-success' : 'bg-coesa-muted'}`} />
                    <span className="text-sm text-white/90">{row.published ? 'Published' : 'Draft'}</span>
                </div>
            )
        },
        {
            header: "Date",
            cell: (row: NewsEvent) => <span className="text-coesa-muted font-mono text-sm">{formatDate(row.created_at)}</span>
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
                tag="Content"
                title="News & Events"
                subtitle="Publish articles, announcements, and upcoming events."
            />

            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="animate-pulse flex items-center gap-3 text-coesa-muted">
                        <div className="w-5 h-5 border-2 border-t-coesa-electric border-r-coesa-electric rounded-full animate-spin" />
                        Loading content...
                    </div>
                </div>
            ) : (
                <DataTable
                    data={news}
                    columns={columns}
                    searchKey="title"
                    searchPlaceholder="Search by title..."
                    onAdd={() => alert("News editor would open here.")}
                    addLabel="Create Post"
                />
            )}
        </div>
    );
}
