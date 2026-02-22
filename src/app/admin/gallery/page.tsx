"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getGalleryImages } from "@/lib/data";
import type { GalleryImage } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Upload, Trash2, Edit2, FolderPlus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function AdminGalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [albums, setAlbums] = useState<string[]>([]);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const data = await getGalleryImages();
                setImages(data);
                const uniqueAlbums = Array.from(new Set(data.map(img => img.album_id)));
                setAlbums(uniqueAlbums);
            } catch (error) {
                console.error("Failed to fetch gallery", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <SectionHeader
                    tag="Media"
                    title="Gallery"
                    subtitle="Manage event photos and gallery albums."
                />
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-sm font-medium text-white hover:bg-white/5 transition-colors">
                        <FolderPlus className="w-4 h-4" />
                        New Album
                    </button>
                    <button className="flex items-center gap-2 btn-gradient px-4 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg shadow-coesa-electric/20 hover:shadow-coesa-electric/40 transition-all active:scale-95">
                        <Upload className="w-4 h-4" />
                        Upload Photos
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="animate-pulse flex items-center gap-3 text-coesa-muted">
                        <div className="w-5 h-5 border-2 border-t-coesa-electric border-r-coesa-electric rounded-full animate-spin" />
                        Loading gallery...
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Albums Overview */}
                    <div className="glass border border-white/5 rounded-2xl p-6">
                        <h3 className="font-display font-medium text-lg text-white mb-4">Albums Overview</h3>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="default" className="bg-coesa-electric/20 border-coesa-electric/30">All Photos ({images.length})</Badge>
                            {albums.map(album => (
                                <Badge key={album} variant="default" className="bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer transition-colors">
                                    {album} ({images.filter(i => i.album_id === album).length})
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Image Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {images.map((img) => (
                            <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden glass border border-white/5 hover:border-coesa-electric/50 transition-all">
                                <Image
                                    src={img.url}
                                    alt={img.caption || "Gallery image"}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />

                                {/* Overlay Controls */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-1.5 rounded-md bg-black/50 text-white hover:bg-coesa-electric transition-colors backdrop-blur-md" title="Edit details">
                                            <Edit2 className="w-3.5 h-3.5" />
                                        </button>
                                        <button className="p-1.5 rounded-md bg-black/50 text-white hover:bg-coesa-error transition-colors backdrop-blur-md" title="Delete image">
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                    <div>
                                        <div className="text-white text-xs font-medium truncate mb-1">{img.caption || "Untitled"}</div>
                                        <div className="text-coesa-electric text-[10px] font-mono uppercase tracking-wider truncate">{img.album_id}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
