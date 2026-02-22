"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { MOCK_PROGRAMS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function ProgramShowcase() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            const scrollAmount = direction === "left" ? -clientWidth / 1.5 : clientWidth / 1.5;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    return (
        <section className="relative py-24 lg:py-32 bg-coesa-navy overflow-hidden" id="programs">
            {/* Immersive Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-coesa-electric/5 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-coesa-sky/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

            <div className="max-w-container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 text-coesa-electric font-mono text-xs uppercase tracking-[4px] mb-4">
                            <Sparkles className="w-4 h-4" />
                            <span>Professional Development</span>
                        </div>
                        <h2 className="font-display text-4xl lg:text-6xl font-bold text-white leading-[1.1]">
                            The Future of <br />
                            <span className="text-gradient">Engineering</span>
                        </h2>
                    </motion.div>

                    <div className="flex flex-col gap-6">
                        <p className="text-coesa-muted max-w-sm text-lg leading-relaxed">
                            Master cutting-edge technologies with our industry-led certification programs and hands-on workshops.
                        </p>

                        {/* Navigation Controls */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => scroll("left")}
                                disabled={!canScrollLeft}
                                className={cn(
                                    "w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300",
                                    canScrollLeft
                                        ? "border-white/10 bg-white/5 text-white hover:bg-coesa-electric hover:border-coesa-electric"
                                        : "border-white/5 bg-white/0 text-white/20 cursor-not-allowed"
                                )}
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                disabled={!canScrollRight}
                                className={cn(
                                    "w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300",
                                    canScrollRight
                                        ? "border-white/10 bg-white/5 text-white hover:bg-coesa-electric hover:border-coesa-electric"
                                        : "border-white/5 bg-white/0 text-white/20 cursor-not-allowed"
                                )}
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Slider Component */}
                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-8 pb-12 transition-all"
                >
                    {MOCK_PROGRAMS.map((program, index) => (
                        <motion.div
                            key={program.id}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] snap-center group"
                        >
                            <div className="relative h-full bg-[#0D2547]/40 rounded-[3rem] border border-white/5 p-4 transition-all duration-500 hover:bg-[#0D2547]/60 hover:border-coesa-electric/30 hover:shadow-2xl hover:shadow-coesa-electric/5">

                                {/* Image Box */}
                                <div className="relative h-80 rounded-[2.5rem] overflow-hidden mb-8">
                                    <Image
                                        src={program.cover_image_url || "/images/programs/1 image.png"}
                                        alt={program.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-coesa-navy/80 via-transparent to-transparent opacity-80" />

                                    {/* Glass Badge */}
                                    <div className="absolute top-6 left-6">
                                        <div className="px-5 py-2 rounded-full glass border-white/10 text-[10px] font-black text-white uppercase tracking-widest">
                                            {program.mode}
                                        </div>
                                    </div>
                                </div>

                                {/* Details Area */}
                                <div className="px-6 pb-8">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="h-1 w-8 bg-coesa-electric rounded-full" />
                                        <span className="text-coesa-electric font-mono text-[10px] font-bold uppercase tracking-widest">Enrollment Open</span>
                                    </div>

                                    <h3 className="text-2xl font-black text-white uppercase leading-tight mb-4 group-hover:text-gradient transition-all duration-500">
                                        {program.title}
                                    </h3>

                                    <p className="text-coesa-muted text-sm leading-relaxed mb-8 line-clamp-3">
                                        {program.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-3 border border-white/5">
                                            <Calendar className="w-5 h-5 text-coesa-sky" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">Date</span>
                                                <span className="text-xs text-white font-bold">{program.start_date ? formatDate(program.start_date) : "TBA"}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-3 border border-white/5">
                                            <MapPin className="w-5 h-5 text-coesa-electric" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">Venue</span>
                                                <span className="text-xs text-white font-bold line-clamp-1">{program.venue}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-black text-white tracking-tighter">₦{program.enrollment_fee?.internal.toLocaleString()}</span>
                                            <span className="text-[10px] text-white/30 uppercase font-bold">Starting</span>
                                        </div>

                                        <Link
                                            href="/contact"
                                            className="group/btn relative w-14 h-14 rounded-full bg-coesa-electric flex items-center justify-center text-white overflow-hidden transition-all duration-500 hover:w-40"
                                        >
                                            <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity" />
                                            <div className="flex items-center gap-3 whitespace-nowrap px-6">
                                                <span className="hidden group-hover/btn:block font-bold text-sm">Enroll Now</span>
                                                <ArrowRight className="w-6 h-6 flex-shrink-0" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
