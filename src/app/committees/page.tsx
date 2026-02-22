"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { CommitteeCard } from "@/components/features/CommitteeCard";
import { MOCK_COMMITTEES } from "@/lib/mock-data";

export default function CommitteesPage() {
    return (
        <div className="pt-[72px] min-h-screen bg-coesa-navy">
            <header className="relative py-20 lg:py-28 bg-coesa-midnight overflow-hidden">
                {/* Glow */}
                <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-coesa-royal/20 rounded-full blur-[100px]" />

                <div className="relative max-w-container mx-auto px-6 text-center">
                    <SectionHeader
                        tag="Structure"
                        title="Our Committees"
                        subtitle="The operational arms of COESA, creating value across different domains of student life."
                    />
                </div>
            </header>

            <main className="py-16 lg:py-24">
                <div className="max-w-container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {MOCK_COMMITTEES.map((committee) => (
                            <CommitteeCard key={committee.id} committee={committee} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
