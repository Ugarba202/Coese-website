"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { useState } from "react";

export function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
        (e.target as HTMLFormElement).reset();
    };

    return (
        <section className="py-24 bg-blue-50/50 relative overflow-hidden" id="contact">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300B4FF' stroke-width='0.5'%3E%3Cpath d='M30 0v60M0 30h60M15 15l30 30M45 15L15 45'/%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3Ccircle cx='15' cy='15' r='2'/%3E%3Ccircle cx='45' cy='45' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            <div className="max-w-container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block font-mono text-sm text-coesa-electric uppercase tracking-[3px] mb-4">
                        Get In Touch
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-coesa-navy mb-4">
                        Contact <span className="text-coesa-electric">Us</span>
                    </h2>
                    <p className="font-body text-coesa-nav/70 max-w-2xl mx-auto text-lg">
                        Have questions or want to collaborate? We&apos;d love to hear from you. Drop us a message or visit our department.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-stretch">
                    {/* Left: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl shadow-card border border-coesa-sky/10 p-8 md:p-10 flex flex-col justify-center h-full"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-semibold text-coesa-navy">First Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-coesa-sky/20 bg-coesa-sky/5 focus:bg-white focus:border-coesa-electric focus:ring-2 focus:ring-coesa-electric/20 outline-none transition-all placeholder:text-coesa-nav/40"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-coesa-navy">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-coesa-sky/20 bg-coesa-sky/5 focus:bg-white focus:border-coesa-electric focus:ring-2 focus:ring-coesa-electric/20 outline-none transition-all placeholder:text-coesa-nav/40"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-semibold text-coesa-navy">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-coesa-sky/20 bg-coesa-sky/5 focus:bg-white focus:border-coesa-electric focus:ring-2 focus:ring-coesa-electric/20 outline-none transition-all placeholder:text-coesa-nav/40"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-semibold text-coesa-navy">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl border border-coesa-sky/20 bg-coesa-sky/5 focus:bg-white focus:border-coesa-electric focus:ring-2 focus:ring-coesa-electric/20 outline-none transition-all placeholder:text-coesa-nav/40 resize-none"
                                    placeholder="Your message here..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-white transition-all duration-300 ${isSuccess
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-gradient-to-r from-coesa-sky to-coesa-electric shadow-btn hover:brightness-110 active:scale-[0.98]"
                                    }`}
                            >
                                {isSubmitting ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : isSuccess ? (
                                    "Message Sent!"
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                    {/* Right: Map */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="h-full min-h-[400px] lg:min-h-0"
                    >
                        <div className="w-full h-full rounded-3xl overflow-hidden shadow-card border border-coesa-sky/10 relative group bg-[#0f172a]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15664.218520891512!2d7.6393478954751305!3d11.14498522306353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11b2843b0f5de1a7%3A0x6bca06f6bdf1a0e7!2sAhmadu%20Bello%20University%20Zaria!5e0!3m2!1sen!2sng!4v1709664551234!5m2!1sen!2sng"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "grayscale(100%) invert(100%) contrast(90%) hue-rotate(180deg)" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="group-hover:opacity-100 transition-all duration-500 absolute inset-0 z-0 object-cover"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
