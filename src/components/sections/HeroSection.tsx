"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { ArrowRight, Globe, Code, Cpu, Bot } from "lucide-react";
import { ParticleCanvas } from "@/components/features/ParticleCanvas";
import { CountUp } from "@/components/features/CountUp";
import { MOCK_STATS } from "@/lib/mock-data";

const CAPABILITY_BADGES = [
    { label: "Software Engineering", icon: <Code className="w-3.5 h-3.5" />, x: "-5%", y: "15%", index: 0 },
    { label: "Networking", icon: <Globe className="w-3.5 h-3.5" />, x: "-10%", y: "55%", index: 1 },
    { label: "Hardware Design", icon: <Cpu className="w-3.5 h-3.5" />, x: "85%", y: "10%", index: 2 },
    { label: "AI & Robotics", icon: <Bot className="w-3.5 h-3.5" />, x: "90%", y: "65%", index: 3 },
];

function CapabilityBadge({ 
    badge, 
    smoothX, 
    smoothY 
}: { 
    badge: typeof CAPABILITY_BADGES[0], 
    smoothX: MotionValue<number>, 
    smoothY: MotionValue<number> 
}) {
    const { index, label, icon, x, y } = badge;
    
    // Smooth responsive parallax for clustering around images
    const badgeX = useTransform(smoothX, [0, 1], [15 * (index % 2 ? 1 : -1), -15 * (index % 2 ? 1 : -1)]);
    const badgeY = useTransform(smoothY, [0, 1], [15 * (index < 2 ? 1 : -1), -15 * (index < 2 ? 1 : -1)]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
            className="absolute hidden lg:flex items-center gap-2 px-4 py-2 rounded-full glass-strong text-[10px] font-display font-black text-white shadow-card z-50 border border-white/20 whitespace-nowrap"
            style={{
                left: x,
                top: y,
                x: badgeX,
                y: badgeY,
            }}
        >
            <span className="text-coesa-electric">{icon}</span>
            {label}
        </motion.div>
    );
}

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);

    // Mouse position as motion values
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Smooth springs
    const smoothX = useSpring(mouseX, { damping: 30, stiffness: 100, mass: 0.5 });
    const smoothY = useSpring(mouseY, { damping: 30, stiffness: 100, mass: 0.5 });

    // Multi-layered parallax transforms
    const bgX = useTransform(smoothX, [0, 1], ["1%", "-1%"]);
    const bgY = useTransform(smoothY, [0, 1], ["1%", "-1%"]);
    const textX = useTransform(smoothX, [0, 1], [8, -8]);
    const textY = useTransform(smoothY, [0, 1], [6, -6]);
    const img1X = useTransform(smoothX, [0, 1], [-12, 12]);
    const img1Y = useTransform(smoothY, [0, 1], [-10, 10]);
    const img2X = useTransform(smoothX, [0, 1], [20, -20]);
    const img2Y = useTransform(smoothY, [0, 1], [15, -15]);

    // Mouse move handler
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
    }, [mouseX, mouseY]);

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    }, [mouseX, mouseY]);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [handleMouseMove, handleMouseLeave]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden pt-[120px] pb-16 lg:pt-[100px]"
        >
            {/* ─── FULL-SCREEN CINEMATIC BACKGROUND ─── */}
            <motion.div 
                className="absolute inset-0 z-0"
                style={{ x: bgX, y: bgY, scale: 1.02 }}
            >
                <Image
                    src="/images/about/Computer 1.jpg"
                    alt="Department Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Cinematic Overlay - Increased opacity on left for header and text clarity */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-black/30 md:from-coesa-midnight/100 md:to-transparent z-10" />
                <div className="absolute top-0 left-0 right-0 h-[150px] bg-gradient-to-b from-black/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-coesa-midnight/40 backdrop-blur-[0.5px] z-10" />
            </motion.div>

            {/* Particle Canvas for Depth */}
            <div className="absolute inset-0 pointer-events-none opacity-10 z-10">
                <ParticleCanvas />
            </div>

            {/* ─── MAIN CONTENT ─── */}
            <div className="relative z-20 max-w-container mx-auto px-6 w-full flex-1 flex flex-col justify-center">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">

                    {/* ─── LEFT: CONTENT ─── */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{ x: textX, y: textY }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-coesa-electric/20 border border-coesa-electric/40 text-coesa-electric text-[10px] font-display font-black tracking-[0.3em] uppercase backdrop-blur-md">
                                <span className="w-1.5 h-1.5 rounded-full bg-coesa-electric animate-pulse" />
                                Computer Engineering Student Association
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black text-white leading-[1.0] mb-6 tracking-tighter"
                        >
                            Engineering <br />
                            <span className="text-gradient">Tomorrow&apos;s</span> <br />
                            Landmarks, Today
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="font-body text-base lg:text-lg text-white font-medium max-w-[540px] mb-10 leading-relaxed opacity-70"
                        >
                            Turning visionary ideas into iconic structures with cutting-edge engineering, 
                            smart planning, and future-ready construction solutions at the heart of ABU Zaria.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-wrap items-center gap-5"
                        >
                            <Link
                                href="/administration"
                                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white text-coesa-midnight font-display font-black text-xs uppercase tracking-widest hover:scale-[1.05] hover:shadow-[0_15px_30px_rgba(255,255,255,0.2)] active:scale-[0.97] transition-all duration-300"
                            >
                                Exlpore COESA
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                            {/* <Link
                                href="/administration"
                                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full glass-strong border border-white/10 text-white font-display font-black text-xs uppercase tracking-widest hover:bg-white/5 active:scale-[0.97] transition-all duration-300"
                            >
                                View Manifest
                            </Link> */}
                        </motion.div>
                    </motion.div>

                    {/* ─── RIGHT: PROTAGONISTS WITH BADGES ─── */}
                    <div className="relative hidden lg:flex items-center justify-center min-h-[450px]">
                        <div className="relative w-full max-w-[450px]">
                            
                            {/* Main Protagonist Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                style={{ x: img1X, y: img1Y }}
                                className="relative w-full aspect-[1/1.2] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 z-20"
                            >
                                <Image
                                    src="/images/community/community.jpg"
                                    alt="Engineering Protagonist"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-coesa-midnight/60 via-transparent to-transparent" />
                            </motion.div>

                            {/* Secondary Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20, y: 20 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                style={{ x: img2X, y: img2Y }}
                                className="absolute -bottom-4 -right-4 w-3/4 aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/20 z-30"
                            >
                                <Image
                                    src="/images/community/comp3.jpg"
                                    alt="Networking Concept"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-coesa-navy/20" />
                            </motion.div>

                            {/* Badges clustered around cards */}
                            <div className="absolute inset-0 pointer-events-none z-40">
                                {CAPABILITY_BADGES.map((badge) => (
                                    <CapabilityBadge 
                                        key={badge.label} 
                                        badge={badge} 
                                        smoothX={smoothX} 
                                        smoothY={smoothY} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── STATS STRIP: COMPRESS & LOWER ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-12 lg:absolute lg:bottom-4 lg:left-1/2 lg:-translate-x-1/2 w-full lg:max-w-4xl glass-strong border border-white/10 rounded-pill py-3 px-12 z-30 overflow-hidden shadow-2xl"
                >
                    <div className="absolute -inset-10 bg-coesa-electric/5 blur-[40px] pointer-events-none" />
                    
                    <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                        {MOCK_STATS.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                                className="text-center border-r border-white/5 last:border-0"
                            >
                                <div className="font-display text-2xl lg:text-3xl font-black text-gradient leading-none mb-0.5">
                                    <CountUp end={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="font-body text-[8px] text-white/40 uppercase tracking-[0.2em] font-black italic">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
