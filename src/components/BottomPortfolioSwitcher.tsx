import React from 'react';
import { Smartphone, Film, ArrowRight, ArrowLeft, Sparkles, Layers } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics.ts';

interface BottomPortfolioSwitcherProps {
  activePortfolio: 'long' | 'vertical';
  onSwitch: (mode: 'long' | 'vertical') => void;
}

export const BottomPortfolioSwitcher: React.FC<BottomPortfolioSwitcherProps> = ({
  activePortfolio,
  onSwitch,
}) => {
  const isLong = activePortfolio === 'long';

  const handleClick = () => {
    triggerHaptic('success');
    const targetMode = isLong ? 'vertical' : 'long';
    onSwitch(targetMode);
    window.scrollTo({ top: 320, behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 border-t border-white/10 relative overflow-hidden bg-gradient-to-b from-[#09090b] via-[#141418] to-[#09090b]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#18181f] via-[#141418] to-[#0f0f13] border-2 border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
          
          {/* Subtle watermarked film strip or phone accent */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
            {isLong ? (
              <Smartphone className="w-80 h-80 text-amber-400 rotate-12" />
            ) : (
              <Film className="w-80 h-80 text-amber-400 -rotate-12" />
            )}
          </div>

          <div className="relative z-10 max-w-2xl">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isLong ? 'Targeting Short Form Audiences?' : 'Targeting Long Form Viewership?'}</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {isLong
                ? 'Explore My High-Retention Vertical Reels & Shorts'
                : 'Explore My Cinematic Long-Form & Documentary Works'}
            </h2>

            {/* Description */}
            <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
              {isLong
                ? 'Swipe through 9:16 interactive smartphone mockups designed for Instagram Reels, TikTok, and YouTube Shorts with sub-second hook pacing.'
                : 'Inspect full 20+ minute investigative documentaries, 3D motion graphics breakdowns, podcast pacing, and audio stems.'}
            </p>

            {/* Action Switch Button (User's Core Requirement) */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={handleClick}
                className="group px-6 sm:px-8 py-4 text-sm sm:text-base font-extrabold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-95 rounded-2xl shadow-xl shadow-amber-500/25 transition-all flex items-center gap-3 cursor-pointer"
              >
                {isLong ? (
                  <>
                    <Smartphone className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
                    <span>View Vertical Work (Swipe Carousel)</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </>
                ) : (
                  <>
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform" />
                    <Film className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
                    <span>View Long Form Work (Documentaries & YouTube)</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
