"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AdminLoginPage() {
    const router = useRouter();
    const [loginError, setLoginError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        setLoginError("");

        try {
            // Mock authentication delay
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Mock validation (accepts any email with password "admin123")
            if (data.password === "admin123") {
                // In a real app, Supabase auth sets the cookie. Here we mock it via a dummy API or document.cookie.
                document.cookie = "coesa-admin-auth=true; path=/";
                router.push("/admin/dashboard");
                router.refresh();
            } else {
                setLoginError("Invalid credentials. Try password 'admin123'.");
            }
        } catch {
            setLoginError("An error occurred during login.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-coesa-navy p-6 relative overflow-hidden font-body">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -m-32 w-96 h-96 bg-coesa-electric/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -m-32 w-96 h-96 bg-coesa-primary/20 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="glass border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                    {/* Top gradient line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-coesa-primary via-coesa-electric to-coesa-sky" />

                    <div className="text-center mb-8">
                        <div className="font-display font-extrabold text-3xl tracking-tight text-white mb-2">
                            COESA <span className="text-coesa-electric">Admin</span>
                        </div>
                        <p className="text-coesa-muted text-sm">Secure access to the management portal</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="admin@coesa.com.ng"
                            icon={<Mail className="w-4 h-4" />}
                            error={errors.email?.message as string}
                            {...register("email")}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            icon={<Lock className="w-4 h-4" />}
                            error={errors.password?.message as string}
                            {...register("password")}
                        />

                        {loginError && (
                            <div className="p-3 rounded-lg bg-coesa-error/10 border border-coesa-error/20 text-coesa-error text-sm text-center">
                                {loginError}
                            </div>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full mt-2 group"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    Sign In securely
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>

                        <div className="text-center mt-6">
                            <p className="text-xs text-coesa-muted italic">Demo access: any email + password &quot;admin123&quot;</p>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
