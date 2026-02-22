"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Save, User, Mail, ShieldAlert } from "lucide-react";

export default function AdminSettingsPage() {
    const [saving, setSaving] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSaving(false);
        alert("Settings saved successfully.");
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
            <SectionHeader
                tag="Configuration"
                title="Settings"
                subtitle="Manage your admin account and portal preferences."
            />

            <div className="space-y-6 bg-coesa-midnight/50 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
                <h3 className="font-display font-bold text-xl text-white border-b border-white/5 pb-4">Profile Settings</h3>

                <form onSubmit={handleSave} className="space-y-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                            <User className="w-8 h-8 text-white/30" />
                        </div>
                        <div>
                            <Button type="button" variant="secondary" className="mb-2">Change Avatar</Button>
                            <p className="text-xs text-coesa-muted">JPG, GIF or PNG. 1MB max.</p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            defaultValue="Admin User"
                            icon={<User className="w-4 h-4" />}
                        />
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="admin@coesa.com.ng"
                            defaultValue="admin@coesa.com.ng"
                            icon={<Mail className="w-4 h-4" />}
                        />
                    </div>

                    <div className="pt-6 border-t border-white/5">
                        <h3 className="font-display font-medium text-lg text-white mb-4 flex items-center gap-2">
                            <ShieldAlert className="w-5 h-5 text-coesa-sky" /> Security
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <Input
                                label="Current Password"
                                type="password"
                                placeholder="••••••••"
                            />
                            <Input
                                label="New Password"
                                type="password"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" variant="primary" disabled={saving} className="min-w-[120px]">
                            {saving ? "Saving..." : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
