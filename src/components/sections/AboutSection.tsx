"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const ABOUT_IMAGES = [
    "/images/about/Computer 1.jpg",
    "/images/about/Computer 2.jpg",
    "/images/about/computer1.jpg",
];

export function AboutSection() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % ABOUT_IMAGES.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? ABOUT_IMAGES.length - 1 : prev - 1));
    };

    // Auto-play the carousel
    useEffect(() => {
        const timer = setInterval(nextImage, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative py-24 lg:py-0 bg-coesa-midnight overflow-hidden min-h-[600px] flex items-center" id="about">
            {/* Background glow */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-coesa-royal/5 rounded-full blur-[120px] -translate-y-1/2" />

            <div className="relative w-full">
                <div className="grid lg:grid-cols-2 items-center">
                    {/* Left: Mission text */}
                    <div className="flex justify-end pr-6 lg:pr-12 py-12 lg:py-32">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-[540px] w-full"
                        >
                            <SectionHeader
                                tag="About Us"
                                title="What is COESA?"
                                centered={false}
                            />
                            <p className="text-coesa-muted text-lg leading-relaxed mb-6">
                                The Computer Engineering Student Association (COESA) is the
                                official body representing all Computer Engineering students at
                                Ahmadu Bello University, Zaria. We bridge the gap between
                                classroom learning and real-world engineering.
                            </p>
                            <p className="text-coesa-muted text-lg leading-relaxed mb-10">
                                Through hackathons, bootcamps, mentorship programs, and
                                industry partnerships, we prepare the next generation of engineers
                                who will shape Africa&apos;s technological future.
                            </p>

                            <Link
                                href="/administration"
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-coesa-sky to-coesa-electric text-white font-body font-semibold shadow-btn hover:brightness-110 active:scale-[0.97] transition-all duration-200"
                            >
                                Read More
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right: Image Carousel (Full-bleed) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-full h-[400px] lg:h-full lg:min-h-screen overflow-hidden group"
                    >
                        <AnimatePresence initial={false} mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={ABOUT_IMAGES[currentImageIndex]}
                                alt="About COESA"
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </AnimatePresence>

                        {/* Carousel overlays */}
                        <div className="absolute inset-0 bg-gradient-to-r from-coesa-midnight via-transparent to-transparent hidden lg:block" />
                        <div className="absolute inset-0 bg-gradient-to-t from-coesa-midnight/80 via-transparent to-transparent flex items-end justify-between p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <button
                                onClick={prevImage}
                                className="w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-coesa-electric transition-all hover:scale-110 active:scale-90"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            <div className="flex gap-3 mb-2">
                                {ABOUT_IMAGES.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentImageIndex(i)}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${i === currentImageIndex ? "bg-coesa-electric w-10" : "bg-white/30 w-4 hover:bg-white/50"
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={nextImage}
                                className="w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-coesa-electric transition-all hover:scale-110 active:scale-90"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
