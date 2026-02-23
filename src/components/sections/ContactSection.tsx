"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
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
        <section className="relative py-24 lg:py-32 bg-coesa-navy overflow-hidden" id="contact">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coesa-electric/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-coesa-sky/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block font-mono text-sm text-coesa-electric uppercase tracking-[3px] mb-4">
                        Get In Touch
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                        Contact <span className="text-coesa-electric">Us</span>
                    </h2>
                    <p className="font-body text-coesa-muted max-w-2xl mx-auto text-lg">
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
                        className="bg-white/5 backdrop-blur-sm rounded-3xl shadow-card border border-white/10 p-8 md:p-10 flex flex-col justify-center h-full"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-semibold text-white/80">First Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:bg-white/10 focus:border-coesa-electric focus:ring-2 focus:ring-coesa-electric/20 outline-none transition-all placeholder:text-white/30"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-white/80">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:bg-white/10 focus:border-coesa-electric focus:ring-2 focus:ring-coesa-electric/20 outline-none transition-all placeholder:text-white/30"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-semibold text-white/80">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:bg-white/10 focus:border-coesa-electric focus:ring-2 focus:ring-coesa-electric/20 outline-none transition-all placeholder:text-white/30"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-semibold text-white/80">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:bg-white/10 focus:border-coesa-electric focus:ring-2 focus:ring-coesa-electric/20 outline-none transition-all placeholder:text-white/30 resize-none"
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
                        <div className="w-full h-full rounded-3xl overflow-hidden shadow-card border border-white/10 relative group bg-black">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15664.218520891512!2d7.6393478954751305!3d11.14498522306353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11b2843b0f5de1a7%3A0x6bca06f6bdf1a0e7!2sAhmadu%20Bello%20University%20Zaria!5e0!3m2!1sen!2sng!4v1709664551234!5m2!1sen!2sng"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "grayscale(100%) invert(100%) contrast(90%) hue-rotate(180deg)" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="opacity-90 transition-all duration-500 absolute inset-0 z-0 object-cover"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
