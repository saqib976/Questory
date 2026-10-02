import React, { useState, useEffect } from 'react';
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

  // Initialize portfolio tab from URL parameter (?type=shorts or ?type=long or hash #shorts / #long)
  const [portfolioTab, setPortfolioTab] = useState<'long' | 'vertical'>(() => {
    if (typeof window === 'undefined') return 'long';
    try {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get('type') || params.get('view') || params.get('tab');
      if (typeParam) {
        if (['shorts', 'short', 'vertical', 'reels', 'reel', 'tiktok'].includes(typeParam.toLowerCase())) {
          return 'vertical';
        }
        if (['long', 'documentary', 'documentaries', 'youtube'].includes(typeParam.toLowerCase())) {
          return 'long';
        }
      }
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('short') || hash.includes('vertical') || hash.includes('reel')) {
        return 'vertical';
      }
    } catch {}
    return 'long';
  });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If client lands with ?type=shorts or ?type=long or #portfolio-section, auto-scroll directly to the portfolio
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get('type') || params.get('view') || params.get('tab');
      const hash = window.location.hash.toLowerCase();
      if (typeParam || hash.includes('short') || hash.includes('vertical') || hash.includes('long') || hash.includes('portfolio')) {
        const timer = setTimeout(() => {
          scrollToSection('portfolio-section');
        }, 350);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const handleTabSwitch = (tab: 'long' | 'vertical') => {
    setPortfolioTab(tab);
    scrollToSection('portfolio-section');
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('type', tab === 'vertical' ? 'shorts' : 'long');
      url.hash = 'portfolio-section';
      window.history.replaceState(null, '', url.toString());
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Clean Sticky Header */}
      <Header
        onOpenContact={() => setIsContactOpen(true)}
        onScrollToSection={scrollToSection}
        onSwitchTab={handleTabSwitch}
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
          activeTab={portfolioTab}
          onTabChange={(tab) => {
            setPortfolioTab(tab);
            try {
              const url = new URL(window.location.href);
              url.searchParams.set('type', tab === 'vertical' ? 'shorts' : 'long');
              url.hash = 'portfolio-section';
              window.history.replaceState(null, '', url.toString());
            } catch {}
          }}
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
