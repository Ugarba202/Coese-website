import { HeroSection } from "@/components/sections/HeroSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExecutivesPreview } from "@/components/sections/ExecutivesPreview";
import { CommunityImpact } from "@/components/sections/CommunityImpact";
import { StaffPreview } from "@/components/sections/StaffPreview";
import { NewsMagazine } from "@/components/sections/NewsMagazine";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <ExecutivesPreview />
      <CommunityImpact />
      <StaffPreview />
      <NewsMagazine />
      <ContactSection />
    </>
  );
}
