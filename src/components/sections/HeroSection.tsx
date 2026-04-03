"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { ParticleCanvas } from "@/components/features/ParticleCanvas";
import { CountUp } from "@/components/features/CountUp";
import { MOCK_STATS } from "@/lib/mock-data";

const CAPABILITY_BADGES = [
    { icon: "💻", label: "Software Engineering", x: "-10%", y: "12%", depth: 1.5 },
    { icon: "🔧", label: "Hardware Design", x: "82%", y: "8%", depth: 2 },
    { icon: "🌐", label: "Networking", x: "-6%", y: "74%", depth: 1.8 },
    { icon: "🤖", label: "AI & Robotics", x: "78%", y: "78%", depth: 1.2 },
];

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);

    // Mouse position as motion values (0 to 1, center = 0.5)
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Smooth springs for fluid motion
    const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Transform ranges for different elements
    const imageRotateY = useTransform(smoothX, [0, 1], [3, -3]);
    const imageRotateX = useTransform(smoothY, [0, 1], [-3, 3]);
    const glowX = useTransform(smoothX, [0, 1], ["-20%", "20%"]);
    const glowY = useTransform(smoothY, [0, 1], ["-15%", "15%"]);
    const textX = useTransform(smoothX, [0, 1], [6, -6]);
    const textY = useTransform(smoothY, [0, 1], [4, -4]);
    const shineX = useTransform(smoothX, [0, 1], [-100, 100]);

    // Pre-compute badge parallax transforms (hooks must be at top level)
    const badge0X = useTransform(smoothX, [0, 1], [8 * CAPABILITY_BADGES[0].depth, -8 * CAPABILITY_BADGES[0].depth]);
    const badge0Y = useTransform(smoothY, [0, 1], [6 * CAPABILITY_BADGES[0].depth, -6 * CAPABILITY_BADGES[0].depth]);
    const badge1X = useTransform(smoothX, [0, 1], [8 * CAPABILITY_BADGES[1].depth, -8 * CAPABILITY_BADGES[1].depth]);
    const badge1Y = useTransform(smoothY, [0, 1], [6 * CAPABILITY_BADGES[1].depth, -6 * CAPABILITY_BADGES[1].depth]);
    const badge2X = useTransform(smoothX, [0, 1], [8 * CAPABILITY_BADGES[2].depth, -8 * CAPABILITY_BADGES[2].depth]);
    const badge2Y = useTransform(smoothY, [0, 1], [6 * CAPABILITY_BADGES[2].depth, -6 * CAPABILITY_BADGES[2].depth]);
    const badge3X = useTransform(smoothX, [0, 1], [8 * CAPABILITY_BADGES[3].depth, -8 * CAPABILITY_BADGES[3].depth]);
    const badge3Y = useTransform(smoothY, [0, 1], [6 * CAPABILITY_BADGES[3].depth, -6 * CAPABILITY_BADGES[3].depth]);
    const badgeTransforms = [
        { x: badge0X, y: badge0Y },
        { x: badge1X, y: badge1Y },
        { x: badge2X, y: badge2Y },
        { x: badge3X, y: badge3Y },
    ];

    // Mouse move handler
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
    }, [mouseX, mouseY]);

    // Mouse leave — reset to center
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
            className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-[120px] pb-8 lg:pt-[140px]"
        >
            {/* Background gradient */}
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
                    // @ts-ignore
                    "--glow-x": glowX,
                    "--glow-y": glowY,
                }}
            />

            {/* Static fallback glow */}
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(0,180,255,0.08) 0%, transparent 70%)" }} />

            {/* ─── Main Content ─── */}
            <div className="relative z-10 max-w-container mx-auto px-6 w-full flex-1 flex flex-col justify-center">
                <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-12 items-center">

                    {/* ─── LEFT COLUMN: Typography ─── */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="order-2 lg:order-1"
                        style={{ x: textX, y: textY }}
                    >
                        {/* Kicker pill */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mb-5"
                        >
                            <span className="inline-block py-1.5 px-4 rounded-full bg-coesa-electric/10 border border-coesa-electric/20 text-coesa-electric text-[11px] font-bold tracking-[0.25em] uppercase">
                                Welcome to COESA
                            </span>
                        </motion.div>

                        {/* Sub-heading */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-coesa-muted font-display font-semibold text-sm lg:text-base uppercase tracking-[0.15em] mb-4"
                        >
                            Computer Engineering Student Association
                            <br />
                            <span className="text-coesa-sky">Ahmadu Bello University Chapter</span>
                        </motion.p>

                        {/* Main headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-black text-white leading-[1.05] mb-6"
                            style={{ textShadow: "0 4px 40px rgba(0,180,255,0.15)" }}
                        >
                            Engineering
                            <br />
                            the Future,
                            <br />
                            <span className="text-gradient">One Line</span> at
                            <br />
                            a Time.
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55, duration: 0.5 }}
                            className="font-body text-lg text-coesa-muted font-light max-w-[480px] mb-8 leading-relaxed"
                        >
                            Empowering the next generation of computer engineers through innovation,
                            collaboration, and high-performance technical excellence.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65, duration: 0.5 }}
                            className="flex flex-wrap items-center gap-4"
                        >
                            <Link
                                href="/administration"
                                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-coesa-sky to-coesa-electric text-white font-body font-bold text-sm shadow-btn hover:brightness-110 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                            >
                                Explore COESA
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/administration"
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white font-body font-bold text-sm hover:bg-white/5 hover:border-white/30 active:scale-[0.97] transition-all duration-300"
                            >
                                View Manifest
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* ─── RIGHT COLUMN: Image + Floating Badges ─── */}
                    <motion.div
                        initial={{ opacity: 0, x: 40, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="order-1 lg:order-2 relative flex items-center justify-center"
                        style={{
                            rotateY: imageRotateY,
                            rotateX: imageRotateX,
                            transformPerspective: 1200,
                        }}
                    >
                        {/* Image container — LARGER */}
                        <div className="relative w-full max-w-[640px] aspect-[4/3] rounded-3xl overflow-hidden group">
                            {/* Glow behind the image */}
                            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-coesa-sky/25 via-coesa-electric/15 to-transparent blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

                            {/* Image frame */}
                            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_24px_100px_rgba(0,0,0,0.6)]">
                                <Image
                                    src="/images/about/Computer 1.jpg"
                                    alt="Department of Computer Engineering, ABU Zaria"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 640px"
                                    priority
                                />
                                {/* Bottom gradient fade */}
                                <div className="absolute inset-0 bg-gradient-to-t from-coesa-midnight/80 via-transparent to-transparent" />
                                {/* Top-left subtle overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-coesa-navy/30 to-transparent" />

                                {/* Inner shine line that follows mouse */}
                                <motion.div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: `linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)`,
                                        x: shineX,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Floating capability badges — parallax on mouse */}
                        {CAPABILITY_BADGES.map((badge, i) => (
                            <motion.div
                                key={badge.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                transition={{
                                    opacity: { delay: 0.7 + i * 0.12, duration: 0.5 },
                                    scale: { delay: 0.7 + i * 0.12, duration: 0.5 },
                                }}
                                className="absolute hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-full glass-strong text-xs font-body font-bold text-white/90 shadow-card whitespace-nowrap z-20 border border-white/[0.06]"
                                style={{
                                    left: badge.x,
                                    top: badge.y,
                                    x: badgeTransforms[i].x,
                                    y: badgeTransforms[i].y,
                                }}
                            >
                                <span className="text-base">{badge.icon}</span>
                                {badge.label}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* ─── STATS STRIP ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
                    className="mt-16 lg:mt-20"
                >
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {MOCK_STATS.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0 + index * 0.1, duration: 0.4 }}
                                className="relative rounded-2xl glass border border-white/[0.06] p-5 text-center group hover:border-coesa-electric/20 transition-colors duration-500"
                            >
                                <div className="font-display text-4xl lg:text-5xl font-black text-gradient mb-1">
                                    <CountUp end={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="font-body text-[11px] text-coesa-muted uppercase tracking-[0.2em] font-bold">
                                    {stat.label}
                                </div>
                                {/* Subtle glow on hover */}
                                <div className="absolute inset-0 rounded-2xl bg-coesa-electric/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <ChevronDown className="w-5 h-5 text-coesa-muted/40" />
            </motion.div>
        </section>
    );
}
