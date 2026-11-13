import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import PopularDestinationsSection from "@/components/home/PopularDestinationsSection";
import LocalExperiencesSection from "@/components/home/LocalExperiencesSection";
import CulinarySection from "@/components/home/CulinarySection";
import ItineraryInspirationSection from "@/components/home/ItineraryInspirationSection";
import PartnerInvitationSection from "@/components/home/PartnerInvitationSection";
import TrustBannerSection from "@/components/home/TrustBannerSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <CategoriesSection />
        <PopularDestinationsSection />
        <LocalExperiencesSection />
        <CulinarySection />
        <ItineraryInspirationSection />
        <PartnerInvitationSection />
        <TrustBannerSection />
      </main>
      <Footer />
    </div>
  );
}
