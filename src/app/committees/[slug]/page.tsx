"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MOCK_COMMITTEES, MOCK_MEMBERS } from "@/lib/mock-data";

export default function CommitteeDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    const committee = MOCK_COMMITTEES.find((c) => c.slug === params.slug);

    if (!committee) {
        notFound();
    }

    // Get members for this committee (mock logic)
    // In reality, committee members will be fetched specifically
    // Since we don't have explicit committee members in mock, we'll slice general council
    const members = MOCK_MEMBERS.filter((m) => !m.is_executive).slice(0, 4);

    return (
        <div className="pt-[72px] min-h-screen bg-coesa-navy">
            {/* Cover Header */}
            <header className="relative h-[400px] lg:h-[500px] flex items-end">
                <div className="absolute inset-0 bg-coesa-midnight">
                    {committee.cover_image_url ? (
                        <Image
                            src={committee.cover_image_url}
                            alt={committee.name}
                            fill
                            className="object-cover opacity-40 mix-blend-overlay"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-coesa-midnight to-coesa-royal/40" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-coesa-navy via-coesa-navy/60 to-transparent" />
                </div>

                <div className="relative z-10 max-w-container mx-auto px-6 pb-12 w-full">
                    <Link
                        href="/committees"
                        className="inline-flex items-center gap-2 text-coesa-electric hover:text-white mb-6 transition-colors text-sm font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Committees
                    </Link>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl shadow-card">
                            {committee.icon}
                        </div>
                        <h1 className="font-display text-4xl lg:text-5xl font-extrabold text-white">
                            {committee.name}
                        </h1>
                    </div>

                    <p className="font-body text-xl text-coesa-muted max-w-[800px] leading-relaxed">
                        {committee.mandate}
                    </p>
                </div>
            </header>

            {/* Content */}
            <main className="py-16">
                <div className="max-w-container mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-12">

                        {/* Left Column: Info & Activities */}
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <div className="w-6 h-1 bg-coesa-electric rounded-full" />
                                    About the Committee
                                </h2>
                                <div className="prose-coesa">
                                    <p>
                                        The {committee.name} plays a vital role in our association&apos;s ecosystem.
                                        Tasked with the mandate to &quot;{committee.mandate?.toLowerCase()}&quot;, this
                                        group works tirelessly to ensure that our collective objectives are met.
                                    </p>
                                    <p>
                                        Membership in this committee provides students with hands-on
                                        experience, networking opportunities, and the chance to directly
                                        impact the student community.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <div className="w-6 h-1 bg-coesa-electric rounded-full" />
                                    Recent Initiatives
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[1, 2].map((i) => (
                                        <div key={i} className="p-5 rounded-[18px] glass border border-white/[0.05]">
                                            <div className="text-coesa-electric mb-2 font-mono text-xs uppercase">Completed</div>
                                            <h3 className="font-display font-medium text-white mb-2">Initiative Project {i}</h3>
                                            <p className="text-sm text-coesa-muted line-clamp-2">A successful execution of our mandate delivering high value to all student members.</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Right Column: Members */}
                        <div>
                            <div className="sticky top-[100px]">
                                <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <div className="w-6 h-1 bg-coesa-sky rounded-full" />
                                    Committee Members
                                </h2>
                                <div className="space-y-4">
                                    {members.map((member) => (
                                        <div key={member.id} className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-white/[0.02] to-transparent border border-white/[0.05]">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-coesa-midnight flex-shrink-0">
                                                {member.photo_url ? (
                                                    <Image src={member.photo_url} alt={member.full_name} width={48} height={48} className="object-cover w-full h-full" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-coesa-royal text-white text-xs font-bold">
                                                        {member.full_name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-white text-sm">{member.full_name}</div>
                                                <div className="text-xs text-coesa-electric font-mono mt-0.5">MEMBER</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#0D2547] to-coesa-navy border border-coesa-electric/20 text-center">
                                    <h3 className="font-display font-bold text-white mb-2">Want to join?</h3>
                                    <p className="text-sm text-coesa-muted mb-4">Recruitment opens at the start of every session.</p>
                                    <Link href="/contact" className="inline-block w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors">
                                        Contact Chairman
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
