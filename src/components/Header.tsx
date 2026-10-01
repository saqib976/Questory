import React, { useState } from 'react';
import { Mail, Menu, X, ArrowRight } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics.ts';

interface HeaderProps {
  onOpenContact: () => void;
  onScrollToSection: (id: string) => void;
  onSwitchTab?: (tab: 'long' | 'vertical') => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact, onScrollToSection, onSwitchTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    triggerHaptic('light');
    setMobileMenuOpen(false);
    onScrollToSection(sectionId);
  };

  const handleTabClick = (tab: 'long' | 'vertical') => {
    triggerHaptic('light');
    setMobileMenuOpen(false);
    if (onSwitchTab) {
      onSwitchTab(tab);
    } else {
      onScrollToSection('portfolio-section');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#09090b]/90 border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            triggerHaptic('light');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2.5 text-slate-100 hover:text-white transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-black font-extrabold text-sm shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            Q
          </div>
          <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1">
            QUESTORY<span className="text-amber-400">.</span>
          </span>
        </a>

        {/* Clean, Simple Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
          <button
            onClick={() => handleTabClick('long')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Long-Form Videos
          </button>
          <button
            onClick={() => handleTabClick('vertical')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Vertical Shorts
          </button>
          <button
            onClick={() => handleNavClick('reviews-section')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Reviews
          </button>
          <button
            onClick={() => handleNavClick('process-section')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            How It Works
          </button>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => {
              triggerHaptic('medium');
              onOpenContact();
            }}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-black font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/15 cursor-pointer flex items-center gap-1.5"
          >
            <span>Hire Saqib</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => {
            triggerHaptic('light');
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 rounded-lg bg-[#141418] border border-white/5 text-zinc-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0e0e12] px-4 py-5 space-y-2">
          <button
            onClick={() => handleTabClick('long')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5"
          >
            Long-Form Videos
          </button>
          <button
            onClick={() => handleTabClick('vertical')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5"
          >
            Vertical Shorts & Reels
          </button>
          <button
            onClick={() => handleNavClick('reviews-section')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5"
          >
            Reviews
          </button>
          <button
            onClick={() => handleNavClick('process-section')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5"
          >
            How It Works
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                triggerHaptic('medium');
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-2.5 rounded-xl bg-amber-400 text-black font-bold text-sm text-center shadow-md shadow-amber-500/20"
            >
              Hire Saqib
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
