import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ReviewsMarquee } from './components/ReviewsMarquee.tsx';
import { PortfolioShowcase } from './components/PortfolioShowcase.tsx';
import { ProcessSection } from './components/ProcessSection.tsx';
import { VideoModal } from './components/VideoModal.tsx';
import { ShortModal } from './components/ShortModal.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { Footer } from './components/Footer.tsx';
import { LongFormProject, ShortFormProject } from './data/portfolioData.ts';

export default function App() {
  const [selectedLongProject, setSelectedLongProject] = useState<LongFormProject | null>(null);
  const [selectedShortProject, setSelectedShortProject] = useState<ShortFormProject | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Clean Sticky Header */}
      <Header
        onOpenContact={() => setIsContactOpen(true)}
        onScrollToSection={scrollToSection}
      />

      <main className="flex-1">
        {/* Hero Section with Saqib Portrait and direct CTA */}
        <HeroSection
          onOpenContact={() => setIsContactOpen(true)}
          onScrollToPortfolio={() => scrollToSection('portfolio-section')}
        />

        {/* Continuous Horizontal Moving Reviews Panels right beneath image section */}
        <ReviewsMarquee />

        {/* Unified, clean Portfolio Showcase (YouTube Long-form & Vertical Reels) */}
        <PortfolioShowcase
          onSelectLong={(project) => setSelectedLongProject(project)}
          onSelectShort={(short) => setSelectedShortProject(short)}
        />

        {/* Simple 3-Step Process & Direct Call to Action */}
        <ProcessSection onOpenContact={() => setIsContactOpen(true)} />
      </main>

      {/* Clean Footer */}
      <Footer
        onScrollToSection={scrollToSection}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Streamlined Video Modal */}
      <VideoModal
        project={selectedLongProject}
        onClose={() => setSelectedLongProject(null)}
        onOpenHire={() => setIsContactOpen(true)}
      />

      {/* Streamlined Short Reel Modal */}
      <ShortModal
        short={selectedShortProject}
        onClose={() => setSelectedShortProject(null)}
        onOpenHire={() => setIsContactOpen(true)}
      />

      {/* Contact / Hire Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
