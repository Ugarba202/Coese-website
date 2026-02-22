"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MOCK_GALLERY, MOCK_ALBUMS } from "@/lib/mock-data";

export default function GalleryPage() {
    const [activeAlbumId, setActiveAlbumId] = useState<string>("all");
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const filteredImages = activeAlbumId === "all"
        ? MOCK_GALLERY
        : MOCK_GALLERY.filter((img) => img.album_id === activeAlbumId);

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = useCallback(() => {
        setLightboxOpen(false);
        document.body.style.overflow = "";
    }, []);

    const nextImage = useCallback(() => {
        setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
    }, [filteredImages.length]);

    const prevImage = useCallback(() => {
        setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    }, [filteredImages.length]);

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!lightboxOpen) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

    return (
        <div className="pt-[72px] min-h-screen bg-coesa-midnight">
            <header className="py-20 lg:py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-grad-glow opacity-30" />
                <div className="relative max-w-container mx-auto px-6 text-center">
                    <SectionHeader
                        tag="Gallery"
                        title="Moments in Time"
                        subtitle="Explore highlights from our events, bootcamps, and community gatherings."
                    />
                </div>
            </header>

            {/* Album Filters */}
            <section className="bg-coesa-navy border-y border-coesa-divider/50 sticky top-[72px] z-30">
                <div className="max-w-container mx-auto px-6">
                    <div className="flex gap-2 overflow-x-auto py-4 scrollbar-none items-center justify-start xl:justify-center">
                        <button
                            onClick={() => setActiveAlbumId("all")}
                            className={`relative px-6 py-2 rounded-full font-body text-sm font-semibold transition-colors whitespace-nowrap ${activeAlbumId === "all" ? "text-white" : "text-coesa-muted hover:text-white"
                                }`}
                        >
                            {activeAlbumId === "all" && (
                                <motion.div
                                    layoutId="gallery-tab"
                                    className="absolute inset-0 bg-gradient-to-r from-coesa-sky to-coesa-electric rounded-full -z-10 shadow-btn"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            All Photos
                        </button>

                        {MOCK_ALBUMS.map((album) => (
                            <button
                                key={album.id}
                                onClick={() => setActiveAlbumId(album.id)}
                                className={`relative px-6 py-2 rounded-full font-body text-sm font-semibold transition-colors whitespace-nowrap ${activeAlbumId === album.id ? "text-white" : "text-coesa-muted hover:text-white"
                                    }`}
                            >
                                {activeAlbumId === album.id && (
                                    <motion.div
                                        layoutId="gallery-tab"
                                        className="absolute inset-0 bg-gradient-to-r from-coesa-sky to-coesa-electric rounded-full -z-10 shadow-btn"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                {album.title}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <main className="py-8 bg-coesa-midnight min-h-[50vh]">
                <div className="px-4 mx-auto w-full max-w-[1600px]">
                    {filteredImages.length > 0 ? (
                        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                            {filteredImages.map((image, i) => (
                                <motion.div
                                    key={image.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative group overflow-hidden rounded-[18px] cursor-pointer break-inside-avoid bg-coesa-navy border border-white/[0.05]"
                                    onClick={() => openLightbox(i)}
                                >
                                    {/* Aspect ratio wrapper for varied height visual effect */}
                                    <div className={`relative w-full ${i % 3 === 0 ? 'aspect-[3/4]' : i % 5 === 0 ? 'aspect-[4/3]' : 'aspect-square'}`}>
                                        {image.url ? (
                                            <Image
                                                src={image.url}
                                                alt={image.caption || "Gallery image"}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-[#0D2547] to-coesa-navy flex items-center justify-center">
                                                <span className="text-4xl opacity-10">📸</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-coesa-midnight via-coesa-midnight/80 to-transparent opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        <p className="text-white text-sm font-medium line-clamp-2">{image.caption || "Untitled"}</p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <Maximize2 className="w-4 h-4 text-coesa-electric" />
                                            <span className="text-xs text-coesa-muted font-mono uppercase tracking-widest">Enlarge</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 text-coesa-muted font-body">
                            No photos found in this album.
                        </div>
                    )}
                </div>
            </main>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen && filteredImages.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-coesa-midnight/98 backdrop-blur-xl flex items-center justify-center"
                    >
                        {/* Top Bar */}
                        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black/50 to-transparent flex items-center justify-between px-6 z-10">
                            <div className="text-coesa-muted font-mono text-sm tracking-widest">
                                {currentImageIndex + 1} / {filteredImages.length}
                            </div>
                            <button
                                onClick={closeLightbox}
                                className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Main Image */}
                        <div className="relative w-full h-full p-4 md:p-20 flex items-center justify-center">
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-full h-full max-w-6xl"
                            >
                                {filteredImages[currentImageIndex].url ? (
                                    <Image
                                        src={filteredImages[currentImageIndex].url}
                                        alt={filteredImages[currentImageIndex].caption || "Enlarged photo"}
                                        fill
                                        className="object-contain"
                                        sizes="100vw"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-coesa-navy rounded-2xl border border-white/10 flex items-center justify-center flex-col gap-4">
                                        <span className="text-6xl opacity-20">📸</span>
                                        <span className="text-coesa-muted uppercase tracking-widest font-mono text-sm">Image Placeholder</span>
                                    </div>
                                )}
                            </motion.div>

                            {/* Caption */}
                            {filteredImages[currentImageIndex].caption && (
                                <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 max-w-[90vw] text-center">
                                    <p className="text-white text-sm md:text-base">{filteredImages[currentImageIndex].caption}</p>
                                </div>
                            )}
                        </div>

                        {/* Navigation Arrows */}
                        {filteredImages.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 hidden md:flex"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-8 h-8 -ml-1" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 hidden md:flex"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-8 h-8 ml-1" />
                                </button>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
