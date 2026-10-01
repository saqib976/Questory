import React from 'react';
import { Zap, Volume2, Eye, TrendingUp, Scissors, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics.ts';

export const RetentionBlueprint: React.FC = () => {
  return (
    <section id="process-section" className="py-16 md:py-24 border-t border-white/5 bg-[#0d0d10] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>The Retention Architecture</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why High-Calibre Creators Trust My Cuts
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Great editing isn’t just assembling clips; it is psychological attention management. Every frame, cut, and sound effect serves an explicit purpose: keeping viewers glued.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* Pillar 1 */}
          <div className="p-8 rounded-3xl bg-[#141418] border border-white/10 hover:border-amber-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-3">
              The 3-Second Hook Rule
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              90% of swiping or clicking drop-off happens within the first 3 seconds. I engineer cold opens with dynamic curiosity loops, question framing, and sensory sound design.
            </p>
            <div className="text-xs font-mono text-amber-400">
              Avg Hook Rate: 91.2% across 200+ videos
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-3xl bg-[#141418] border border-white/10 hover:border-amber-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Scissors className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-3">
              Pattern Interrupts Every 5s
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Monotony kills watch time. By modulating shot scale (4K punch-ins), 3D kinetic typography, animated paper foldouts, and b-roll inserts, the viewer's brain resets attention continuously.
            </p>
            <div className="text-xs font-mono text-amber-400">
              Pacing Cycle: 1.2s to 2.4s shot frequency
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-3xl bg-[#141418] border border-white/10 hover:border-amber-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Volume2 className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-3">
              4-Tier Sound Design Stems
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Audio is 50% of retention. Every edit receives studio vocal cleaning (iZotope RX), atmospheric room tone, tactile foley textures, and tailored bass risers for physical impact.
            </p>
            <div className="text-xs font-mono text-amber-400">
              Multi-channel spatial audio & ducking
            </div>
          </div>

        </div>

        {/* Collaboration Standards & Guarantees */}
        <div className="pt-4 border-t border-white/5">
          <div className="text-center mb-8">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              Studio Working Standards & Delivery Guarantees
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
              Every project follows a battle-tested post-production pipeline built for speed, security, and algorithmic performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#141418] border border-white/5 flex flex-col justify-between">
              <div className="text-amber-400 font-bold text-sm mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>48h Fast Turnaround</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Initial rough cuts delivered in 48 hours for short-form, and 4–5 days for comprehensive documentary films.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141418] border border-white/5 flex flex-col justify-between">
              <div className="text-amber-400 font-bold text-sm mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Dead Frames</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Every second is audited for viewer retention with custom motion graphics, sound risers, and micro-punches.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141418] border border-white/5 flex flex-col justify-between">
              <div className="text-amber-400 font-bold text-sm mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>4K Master Delivery</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Pristine ProRes / H.265 renders, full timeline project files, thumbnail frame grabs, and clean audio stems.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141418] border border-white/5 flex flex-col justify-between">
              <div className="text-amber-400 font-bold text-sm mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Retention Guaranteed</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Direct Slack/Discord communication with rapid revisions until your target watch-time curve is achieved.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
