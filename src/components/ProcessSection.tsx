import React from 'react';
import { UploadCloud, Scissors, CheckCircle, ArrowRight } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics.ts';

interface ProcessSectionProps {
  onOpenContact: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenContact }) => {
  const steps = [
    {
      num: '01',
      icon: UploadCloud,
      title: 'Share Footage & Brief',
      desc: 'Send your raw files, voiceover, and visual inspiration via Google Drive, Dropbox, or Frame.io.',
    },
    {
      num: '02',
      icon: Scissors,
      title: 'Retention-Driven Edit',
      desc: 'We craft the narrative pacing, custom 2D/3D motion graphics, sensory sound design, and color grading.',
    },
    {
      num: '03',
      icon: CheckCircle,
      title: 'Review & 4K Delivery',
      desc: 'Review cuts with timestamped feedback. Get finalized 4K ProRes or YouTube-optimized files ready to publish.',
    },
  ];

  return (
    <section id="process-section" className="py-16 md:py-20 border-t border-white/5 bg-[#09090b] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Simple 3-Step Workflow
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-2">
            How We Work Together
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            A frictionless, client-friendly process from raw footage to published viral video.
          </p>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative p-7 rounded-2xl bg-[#141418] border border-white/5 hover:border-amber-500/20 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xl font-black text-white/10 group-hover:text-amber-400/20 transition-colors">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#18181f] to-amber-600/10 border border-amber-500/20 p-8 text-center max-w-3xl mx-auto">
          <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">
            Have a project or channel ready to scale?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto">
            Book a direct consultation or hire Saqib for your next YouTube documentary or vertical retainer.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => {
                triggerHaptic('success');
                onOpenContact();
              }}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Get in Touch with Saqib</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
