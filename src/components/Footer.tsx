import React from 'react';
import { ArrowUp } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics.ts';

interface FooterProps {
  onScrollToSection: (id: string) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection, onOpenContact }) => {
  const scrollToTop = () => {
    triggerHaptic('light');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-[#09090b] py-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
              <div className="w-6 h-6 rounded bg-amber-500 text-black flex items-center justify-center text-xs font-black">
                Q
              </div>
              <span>QUESTORY</span>
            </div>
            <p className="mt-1 text-xs text-zinc-500 max-w-sm">
              High-retention video editing and post-production founded by Saqib.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-6 text-xs font-medium">
            <button
              onClick={() => {
                triggerHaptic('light');
                onScrollToSection('portfolio-section');
              }}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Showcase
            </button>
            <button
              onClick={() => {
                triggerHaptic('light');
                onScrollToSection('reviews-section');
              }}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Reviews
            </button>
            <button
              onClick={() => {
                triggerHaptic('light');
                onScrollToSection('process-section');
              }}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                triggerHaptic('medium');
                onOpenContact();
              }}
              className="hover:text-amber-400 transition-colors cursor-pointer text-amber-300 font-semibold"
            >
              Hire Saqib
            </button>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-10 h-10 rounded-xl bg-[#141418] hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5 flex items-center justify-center transition-all cursor-pointer group"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-3">
          <div>
            © {new Date().getFullYear()} Questory. Founded & Owned by Saqib. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>Premiere Pro</span>
            <span>·</span>
            <span>After Effects</span>
            <span>·</span>
            <span>DaVinci Resolve Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
