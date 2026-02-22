"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { ParticleCanvas } from "@/components/features/ParticleCanvas";
import { SITE_CONFIG } from "@/lib/constants";

const TYPEWRITER_WORDS = ["Build.", "Innovate.", "Engineer."];

export function HeroSection() {
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState("");

    // Typewriter effect
    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) {
            setText(TYPEWRITER_WORDS[0]);
            return;
        }

        const currentWord = TYPEWRITER_WORDS[wordIndex];
        const speed = isDeleting ? 40 : 80;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                setText(currentWord.slice(0, charIndex + 1));
                setCharIndex((prev) => prev + 1);
                if (charIndex + 1 === currentWord.length) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setText(currentWord.slice(0, charIndex - 1));
                setCharIndex((prev) => prev - 1);
                if (charIndex <= 1) {
                    setIsDeleting(false);
                    setWordIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
                }
            }
        }, speed);

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, wordIndex]);

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-grad-hero" />

            {/* Circuit pattern overlay */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300B4FF' stroke-width='0.5'%3E%3Cpath d='M30 0v60M0 30h60M15 15l30 30M45 15L15 45'/%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3Ccircle cx='15' cy='15' r='2'/%3E%3Ccircle cx='45' cy='45' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            {/* Particle Canvas */}
            <div className="absolute inset-0">
                <ParticleCanvas />
            </div>

            {/* Radial glow */}
            <div className="absolute inset-0 bg-grad-glow" />

            {/* Content */}
            <div className="relative z-10 max-w-container mx-auto px-6 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <span className="inline-block font-mono text-sm text-coesa-electric uppercase tracking-[3px] mb-4">
                            {SITE_CONFIG.chapter} Chapter
                        </span>

                        <h1 className="font-display text-hero font-black text-white leading-[1.05] mb-4">
                            We{" "}
                            <span className="text-gradient inline-block min-w-[200px]">
                                {text}
                                <span className="animate-pulse text-coesa-electric">|</span>
                            </span>
                        </h1>

                        <p className="font-body text-xl text-coesa-muted font-light max-w-[500px] mb-8 leading-relaxed">
                            {SITE_CONFIG.tagline} Empowering Computer Engineering students at
                            Ahmadu Bello University.
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <Link
                                href="/administration"
                                className="inline-flex items-center px-8 py-3.5 rounded-full bg-gradient-to-r from-coesa-sky to-coesa-electric text-white font-body font-semibold shadow-btn hover:brightness-110 active:scale-[0.97] transition-all duration-200"
                            >
                                Explore COESA
                            </Link>
                            <Link
                                href="/administration"
                                className="inline-flex items-center px-8 py-3.5 rounded-full border border-white/20 text-white font-body font-semibold hover:bg-white/5 active:scale-[0.97] transition-all duration-200"
                            >
                                Meet the Team
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right: Animated Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="hidden lg:flex items-center justify-center"
                    >
                        <div className="relative w-[340px] h-[340px]">
                            {/* Outer glow ring */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-coesa-sky/20 to-coesa-electric/20 animate-pulse-glow" />

                            {/* Main badge */}
                            <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center shadow-card overflow-hidden border-4 border-coesa-navy">
                                <Image src="/images/logo/logo.jpeg" alt="COESA Badge" width={280} height={280} className="object-cover w-full h-full opacity-90 hover:opacity-100 transition-opacity" priority />
                            </div>

                            {/* Orbiting icons */}
                            {["🤖", "💻", "🌐", "</>"].map((icon, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-12 h-12 rounded-full glass flex items-center justify-center text-lg"
                                    animate={{
                                        rotate: 360,
                                    }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: i * 5,
                                    }}
                                    style={{
                                        top: "50%",
                                        left: "50%",
                                        marginTop: -24,
                                        marginLeft: -24,
                                        transformOrigin: `${170 * Math.cos((i * Math.PI) / 2)}px ${170 * Math.sin((i * Math.PI) / 2)}px`,
                                    }}
                                >
                                    <span className="font-mono text-sm">{icon}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <ChevronDown className="w-6 h-6 text-coesa-muted/50" />
            </motion.div>
        </section>
    );
}
