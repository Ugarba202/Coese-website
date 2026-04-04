"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { ChevronDown, ArrowRight, Globe, Code, Cpu, Bot } from "lucide-react";
import { ParticleCanvas } from "@/components/features/ParticleCanvas";
import { CountUp } from "@/components/features/CountUp";
import { MOCK_STATS } from "@/lib/mock-data";

const CAPABILITY_BADGES = [
    { label: "Software Engineering", icon: <Code className="w-3.5 h-3.5" />, x: "5%", y: "15%", index: 0 },
    { label: "Networking", icon: <Globe className="w-3.5 h-3.5" />, x: "10%", y: "75%", index: 1 },
    { label: "Hardware Design", icon: <Cpu className="w-3.5 h-3.5" />, x: "85%", y: "20%", index: 2 },
    { label: "AI & Robotics", icon: <Bot className="w-3.5 h-3.5" />, x: "80%", y: "80%", index: 3 },
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
    
    const badgeX = useTransform(smoothX, [0, 1], [10 * (index % 2 ? 1 : -1), -10 * (index % 2 ? 1 : -1)]);
    const badgeY = useTransform(smoothY, [0, 1], [10 * (index < 2 ? 1 : -1), -10 * (index < 2 ? 1 : -1)]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
            className="absolute hidden lg:flex items-center gap-2.5 px-5 py-3 rounded-full glass-strong text-xs font-body font-bold text-white shadow-card z-30 border border-white/10 whitespace-nowrap"
            style={{
                left: x,
                top: y,
                x: badgeX,
                y: badgeY,
            }}
        >
            <span className="text-coesa-sky">{icon}</span>
            {label}
        </motion.div>
    );
}

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);

    // Mouse position as motion values (0 to 1, center = 0.5)
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Smooth springs for fluid motion
    const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Transform ranges for subtle depth effects
    const glowX = useTransform(smoothX, [0, 1], ["-20%", "20%"]);
    const glowY = useTransform(smoothY, [0, 1], ["-15%", "15%"]);
    const textX = useTransform(smoothX, [0, 1], [6, -6]);
    const textY = useTransform(smoothY, [0, 1], [4, -4]);

    // Pre-compute image transforms for 3D parallax layers
    const img1X = useTransform(smoothX, [0, 1], [15, -15]); // Back
    const img1Y = useTransform(smoothY, [0, 1], [12, -12]);
    const img2X = useTransform(smoothX, [0, 1], [-15, 15]); // Mid
    const img2Y = useTransform(smoothY, [0, 1], [-12, 12]);
    const img3X = useTransform(smoothX, [0, 1], [-20, 20]); // Front
    const img3Y = useTransform(smoothY, [0, 1], [-18, 18]);

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
            className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-[120px] pb-16 lg:pt-[100px]"
        >
            {/* ─── ORIGINAL DARK THEME BACKGROUND ─── */}
            <div className="absolute inset-0 bg-grad-hero" />

            {/* Circuit pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300B4FF' stroke-width='0.5'%3E%3Cpath d='M30 0v60M0 30h60M15 15l30 30M45 15L15 45'/%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3Ccircle cx='15' cy='15' r='2'/%3E%3Ccircle cx='45' cy='45' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            {/* Particle Canvas */}
            <div className="absolute inset-0">
                <ParticleCanvas />
            </div>

            {/* Mouse-tracking radial glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 600px 400px at var(--glow-x) var(--glow-y), rgba(0,180,255,0.12) 0%, transparent 70%)",
                    // @ts-expect-error -- Custom CSS properties on motion.div
                    "--glow-x": glowX,
                    "--glow-y": glowY,
                }}
            />

            {/* Static fallback glow */}
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(0,180,255,0.08) 0%, transparent 70%)" }} />

            {/* ─── MAIN CONTENT ─── */}
            <div className="relative z-10 max-w-container mx-auto px-6 w-full flex-1 flex flex-col justify-center">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">

                    {/* ─── LEFT COLUMN: Text ─── */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ x: textX, y: textY }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mb-8"
                        >
                            <span className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-coesa-electric/10 border border-coesa-electric/20 text-coesa-electric text-[11px] font-bold tracking-[0.25em] uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-coesa-electric animate-pulse" />
                                Welcome to COESA
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black text-white leading-[1.05] mb-6 tracking-tight"
                        >
                            Driving a <br />
                            <span className="text-coesa-electric">Digital-First</span> <br />
                            Future.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="font-body text-lg lg:text-xl text-coesa-muted font-light max-w-[540px] mb-10 leading-relaxed"
                        >
                            Empowering the next generation of computer engineers through innovation, 
                            collaboration, and high-performance technical excellence at Ahmadu Bello University.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="flex flex-wrap items-center gap-5"
                        >
                            <Link
                                href="/administration"
                                className="group inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-coesa-sky to-coesa-electric text-white font-body font-bold text-sm shadow-btn hover:brightness-110 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                            >
                                Explore COESA
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/administration"
                                className="inline-flex items-center gap-3 px-10 py-4 rounded-full border-2 border-white/20 text-white font-body font-bold text-sm hover:bg-white/5 hover:border-white/30 active:scale-[0.97] transition-all duration-300"
                            >
                                View Manifest
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* ─── RIGHT COLUMN: NEW ARRANGEMENT WITH ORIGINAL CONTENT ─── */}
                    <div className="order-1 lg:order-2 relative flex items-center justify-center min-h-[500px] lg:min-h-[600px]">
                        <div className="relative w-full h-full max-w-[600px]">
                            
                            {/* Card 1: Networking (Back layer) */}
                            <motion.div
                                initial={{ opacity: 0, x: 60, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                style={{ x: img1X, y: img1Y }}
                                className="absolute right-[5%] top-[5%] w-[65%] aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/10 z-0"
                            >
                                <Image
                                    src="/images/community/community4.jpg"
                                    alt="Networking Lab"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-coesa-navy/40 to-transparent pointer-events-none" />
                            </motion.div>

                            {/* Card 2: Software Engineering (Middle layer) */}
                            <motion.div
                                initial={{ opacity: 0, x: 60, y: 60, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                style={{ x: img2X, y: img2Y, rotate: 2 }}
                                className="absolute bottom-[10%] -right-[5%] w-[70%] aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] border-4 border-white/10 z-10"
                            >
                                <Image
                                    src="/images/community/community.jpg"
                                    alt="Software Engineering Session"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-bl from-coesa-navy/40 to-transparent pointer-events-none" />
                            </motion.div>

                            {/* Card 3: Department Main (Front layer) */}
                            <motion.div
                                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                style={{ x: img3X, y: img3Y }}
                                className="relative w-full aspect-[4/3.5] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)] border-4 border-white/20 z-20 group"
                            >
                                <Image
                                    src="/images/about/Computer 1.jpg"
                                    alt="Department of Computer Engineering, ABU Zaria"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-coesa-midnight/40 via-transparent to-transparent pointer-events-none" />
                            </motion.div>

                            {/* Capability Badges */}
                            {CAPABILITY_BADGES.map((badge) => (
                                <CapabilityBadge 
                                    key={badge.label} 
                                    badge={badge} 
                                    smoothX={smoothX} 
                                    smoothY={smoothY} 
                                />
                            ))}

                            {/* Glow behind the collage */}
                            <div className="absolute -inset-10 bg-coesa-electric/10 rounded-full blur-[100px] pointer-events-none -z-10" />
                        </div>
                    </div>
                </div>

                {/* ─── STATS SECTION ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
                    className="mt-16 lg:mt-24 border-t border-white/5 pt-12"
                >
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {MOCK_STATS.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0 + index * 0.1, duration: 0.4 }}
                                className="text-center md:text-left group"
                            >
                                <div className="font-display text-4xl lg:text-5xl font-black text-gradient mb-2">
                                    <CountUp end={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="font-body text-[10px] text-coesa-muted uppercase tracking-[0.25em] font-bold">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold text-coesa-muted/50 uppercase tracking-widest">Scroll</span>
                    <ChevronDown className="w-5 h-5 text-coesa-muted/30" />
                </div>
            </motion.div>
        </section>
    );
}
