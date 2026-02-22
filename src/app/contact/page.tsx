"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, MapPin, Mail, MessageCircle } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { SOCIAL_LINKS } from "@/lib/constants";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    subject: z.string().min(4, "Subject must be at least 4 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true);
        setSubmitError("");
        setSubmitSuccess(false);

        try {
            // In Phase 5, this will call the real /api/contact route
            // For now, mock successful submission after delay
            await new Promise((resolve) => setTimeout(resolve, 1500));

            console.log("Form data:", data);

            setSubmitSuccess(true);
            reset();
        } catch {
            setSubmitError("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-[72px] min-h-screen bg-coesa-navy">
            <header className="relative py-20 lg:py-28 bg-coesa-midnight overflow-hidden">
                {/* Glow */}
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-coesa-electric/10 rounded-full blur-[120px]" />

                <div className="relative max-w-container mx-auto px-6 text-center">
                    <SectionHeader
                        tag="Reach Out"
                        title="Contact Us"
                        subtitle="Have a question, proposal, or want to collaborate? We'd love to hear from you."
                    />
                </div>
            </header>

            <main className="py-16 lg:py-24">
                <div className="max-w-container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Left Column: Info & Map */}
                        <div className="space-y-12">
                            <div>
                                <h3 className="font-display text-2xl font-bold text-white mb-6">
                                    Get in Touch
                                </h3>

                                <div className="space-y-6">
                                    <div className="flex gap-4 p-5 rounded-2xl glass border border-white/[0.05]">
                                        <div className="w-12 h-12 rounded-full bg-coesa-midnight flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-5 h-5 text-coesa-electric" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Our Location</h4>
                                            <p className="text-coesa-muted text-sm leading-relaxed">
                                                Computer Engineering Secretariat,<br />
                                                Department of Computer Engineering,<br />
                                                Ahmadu Bello University, Zaria,<br />
                                                Kaduna State, Nigeria.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 p-5 rounded-2xl glass border border-white/[0.05]">
                                        <div className="w-12 h-12 rounded-full bg-coesa-midnight flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-5 h-5 text-coesa-electric" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Email Us</h4>
                                            <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-coesa-muted hover:text-coesa-electric text-sm transition-colors">
                                                {SOCIAL_LINKS.email}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 p-5 rounded-2xl glass border border-white/[0.05]">
                                        <div className="w-12 h-12 rounded-full bg-coesa-midnight flex items-center justify-center flex-shrink-0 text-coesa-success">
                                            <MessageCircle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">WhatsApp Hub</h4>
                                            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-coesa-muted hover:text-coesa-electric text-sm transition-colors">
                                                Join our Official Channel
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Embed Container */}
                            <div className="h-[300px] w-full rounded-2xl overflow-hidden glass border border-white/10 relative">
                                <div className="absolute inset-0 bg-coesa-midnight flex flex-col items-center justify-center text-coesa-muted">
                                    <MapPin className="w-8 h-8 mb-2 opacity-50" />
                                    <span className="font-mono text-sm uppercase tracking-widest">Map Placeholder</span>
                                    <span className="text-xs mt-2 text-center px-6">Embed Google Maps iframe here via Google Cloud Console</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Form */}
                        <div>
                            <div className="bg-gradient-to-br from-[#0D2547]/80 to-coesa-navy/80 backdrop-blur-md p-8 sm:p-10 rounded-[28px] border border-coesa-electric/10 shadow-card">
                                <h3 className="font-display text-2xl font-bold text-white mb-8">
                                    Send a Message
                                </h3>

                                {submitSuccess ? (
                                    <div className="p-6 rounded-2xl bg-coesa-success/10 border border-coesa-success/30 text-center animate-fade-in">
                                        <div className="w-16 h-16 bg-coesa-success/20 rounded-full flex items-center justify-center mx-auto mb-4 text-coesa-success border border-coesa-success/30">
                                            <Send className="w-6 h-6 ml-1" />
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                                        <p className="text-coesa-muted text-sm">
                                            Thank you for reaching out. A representative will get back to you shortly.
                                        </p>
                                        <button
                                            onClick={() => setSubmitSuccess(false)}
                                            className="mt-6 text-sm text-coesa-electric hover:underline"
                                        >
                                            Send another message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        {submitError && (
                                            <div className="p-4 rounded-xl bg-coesa-error/10 border border-coesa-error/30 text-coesa-error text-sm">
                                                {submitError}
                                            </div>
                                        )}

                                        <div>
                                            <label htmlFor="name" className="block text-sm font-semibold text-white/90 mb-2">
                                                Full Name <span className="text-coesa-error">*</span>
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                {...register("name")}
                                                disabled={isSubmitting}
                                                className={`w-full px-5 py-3.5 rounded-xl bg-coesa-midnight border transition-all disabled:opacity-50 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 ${errors.name
                                                    ? "border-coesa-error focus:border-coesa-error focus:ring-coesa-error"
                                                    : "border-white/10 focus:border-coesa-electric focus:ring-coesa-electric"
                                                    }`}
                                                placeholder="e.g. John Doe"
                                            />
                                            {errors.name && <p className="mt-1.5 text-xs text-coesa-error">{errors.name.message}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-semibold text-white/90 mb-2">
                                                Email Address <span className="text-coesa-error">*</span>
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                {...register("email")}
                                                disabled={isSubmitting}
                                                className={`w-full px-5 py-3.5 rounded-xl bg-coesa-midnight border transition-all disabled:opacity-50 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 ${errors.email
                                                    ? "border-coesa-error focus:border-coesa-error focus:ring-coesa-error"
                                                    : "border-white/10 focus:border-coesa-electric focus:ring-coesa-electric"
                                                    }`}
                                                placeholder="you@example.com"
                                            />
                                            {errors.email && <p className="mt-1.5 text-xs text-coesa-error">{errors.email.message}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-semibold text-white/90 mb-2">
                                                Subject <span className="text-coesa-error">*</span>
                                            </label>
                                            <input
                                                id="subject"
                                                type="text"
                                                {...register("subject")}
                                                disabled={isSubmitting}
                                                className={`w-full px-5 py-3.5 rounded-xl bg-coesa-midnight border transition-all disabled:opacity-50 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 ${errors.subject
                                                    ? "border-coesa-error focus:border-coesa-error focus:ring-coesa-error"
                                                    : "border-white/10 focus:border-coesa-electric focus:ring-coesa-electric"
                                                    }`}
                                                placeholder="How can we help?"
                                            />
                                            {errors.subject && <p className="mt-1.5 text-xs text-coesa-error">{errors.subject.message}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-semibold text-white/90 mb-2">
                                                Message <span className="text-coesa-error">*</span>
                                            </label>
                                            <textarea
                                                id="message"
                                                rows={5}
                                                {...register("message")}
                                                disabled={isSubmitting}
                                                className={`w-full px-5 py-3.5 rounded-xl bg-coesa-midnight border transition-all disabled:opacity-50 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 resize-none ${errors.message
                                                    ? "border-coesa-error focus:border-coesa-error focus:ring-coesa-error"
                                                    : "border-white/10 focus:border-coesa-electric focus:ring-coesa-electric"
                                                    }`}
                                                placeholder="Write your message here..."
                                            />
                                            {errors.message && <p className="mt-1.5 text-xs text-coesa-error">{errors.message.message}</p>}
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full flex justify-center items-center gap-2 py-4 shadow-glow"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4 ml-1" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
