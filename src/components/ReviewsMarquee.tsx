import React, { useState } from 'react';
import { Star, ShieldCheck, TrendingUp, Sparkles, Quote, Pause, Play, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS, ClientReview } from '../data/portfolioData.ts';
import { triggerHaptic } from '../utils/haptics.ts';

export const ReviewsMarquee: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for continuous seamless loop without empty gaps
  const doubledReviews: ClientReview[] = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  const togglePause = () => {
    triggerHaptic('light');
    setIsPaused(!isPaused);
  };

  return (
    <section id="reviews-section" className="relative py-12 md:py-16 border-b border-white/5 bg-[#0b0b0e] overflow-hidden scroll-mt-20">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-64 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Creator Growth & Impact</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Client Reviews & Performance Proof
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Continuous client ticker</span>
            </div>

            <button
              onClick={togglePause}
              aria-label={isPaused ? 'Resume ticker motion' : 'Pause ticker motion'}
              className="px-3 py-1.5 rounded-lg bg-[#18181e] hover:bg-[#202028] border border-white/10 text-xs font-medium text-zinc-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 fill-zinc-300" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Marquee Track Container with smooth left & right gradient fade masks */}
      <div className="relative w-full overflow-hidden group">
        {/* Left Fade Gradient Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0b0b0e] to-transparent z-10 pointer-events-none" />
        
        {/* Right Fade Gradient Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0b0b0e] to-transparent z-10 pointer-events-none" />

        {/* Continuous Horizontal Moving Panels */}
        <div
          className={`animate-marquee-continuous flex items-stretch gap-6 py-2 px-4 ${
            isPaused ? '[animation-play-state:paused]' : ''
          }`}
        >
          {doubledReviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="w-[340px] sm:w-[420px] shrink-0 rounded-2xl bg-[#141419] hover:bg-[#181820] border border-white/10 hover:border-amber-500/40 p-6 flex flex-col justify-between shadow-xl transition-all duration-300 group/card"
            >
              {/* Top Row: Avatar, Identity, Rating & Verified Badge */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-800 border border-white/15 shrink-0 shadow-md">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#141419] rounded-full" />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-bold text-sm sm:text-base text-white tracking-tight">
                        {review.author}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                    </div>
                    <div className="text-[11px] text-zinc-400 font-medium">
                      {review.role} · <span className="text-zinc-300">{review.channel}</span>
                    </div>
                  </div>
                </div>

                {/* 5-Star Gold Rating */}
                <div className="flex items-center gap-0.5 text-amber-400 shrink-0 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Review Quote Body */}
              <div className="relative my-2">
                <Quote className="w-6 h-6 text-amber-500/20 absolute -top-2 -left-1 pointer-events-none" />
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pl-4 font-normal">
                  "{review.quote}"
                </p>
              </div>

              {/* Bottom Row: Key Metric and Deliverable Type */}
              <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold font-mono text-[11px] sm:text-xs">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{review.metric}</span>
                </div>

                <div className="text-[11px] text-zinc-400 font-medium">
                  {review.projectType}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
