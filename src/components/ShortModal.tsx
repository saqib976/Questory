import React, { useEffect } from 'react';
import { X, Play, Clock, Sparkles, TrendingUp, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { ShortFormProject } from '../data/portfolioData.ts';
import { triggerHaptic } from '../utils/haptics.ts';
import { getEmbedUrl, isDirectVideoFile } from '../utils/videoHelpers.ts';

interface ShortModalProps {
  short: ShortFormProject | null;
  onClose: () => void;
  onOpenHire: () => void;
}

export const ShortModal: React.FC<ShortModalProps> = ({
  short,
  onClose,
  onOpenHire,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerHaptic('light');
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!short) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#141418] border border-white/10 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/5 bg-[#18181f]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              {short.categoryLabel}
            </span>
            <span className="text-xs text-zinc-400 font-medium">{short.platform} · Vertical 9:16</span>
          </div>

          <button
            onClick={() => {
              triggerHaptic('light');
              onClose();
            }}
            aria-label="Close short modal"
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Phone Player Preview */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[250px] aspect-[9/16] rounded-[28px] p-2 bg-gradient-to-b from-zinc-700 to-zinc-950 border-2 border-zinc-700 shadow-2xl overflow-hidden">
              <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-black flex flex-col justify-between">
                {short.videoUrl ? (
                  isDirectVideoFile(short.videoUrl) ? (
                    <video
                      src={short.videoUrl}
                      controls
                      autoPlay
                      loop
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <iframe
                      src={getEmbedUrl(short.videoUrl) || short.videoUrl}
                      title={short.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  )
                ) : (
                  <>
                    <img
                      src={short.thumbnail}
                      alt={short.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />

                    {/* Kinetic text hook */}
                    <div className="relative z-10 p-3 pt-6 text-center">
                      <div className="inline-block px-2.5 py-1 rounded bg-black/80 text-amber-300 font-extrabold text-xs uppercase shadow-md border border-amber-500/30">
                        {short.hookHeadline}
                      </div>
                    </div>

                    {/* Bottom preview info */}
                    <div className="relative z-10 p-3 bg-gradient-to-t from-black via-black/90 to-transparent">
                      <div className="text-xs font-bold text-white line-clamp-1">{short.title}</div>
                      <div className="flex items-center justify-between text-[11px] text-zinc-300 mt-1">
                        <span className="text-amber-400 font-bold">{short.views} views</span>
                        <span className="text-emerald-400 font-medium">{short.hookRate} hook</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Details */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
                {short.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {short.breakdown}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-[#0e0e12] border border-white/5 text-center">
              <div>
                <div className="text-[10px] text-zinc-500">Total Views</div>
                <div className="text-xs sm:text-sm font-bold text-amber-400">{short.views}</div>
              </div>
              <div>
                <div className="text-[10px] text-zinc-500">Hook Rate (3s)</div>
                <div className="text-xs sm:text-sm font-bold text-emerald-400">{short.hookRate}</div>
              </div>
              <div>
                <div className="text-[10px] text-zinc-500">Avg Completion</div>
                <div className="text-xs sm:text-sm font-bold text-zinc-200">{short.completionRate}</div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span><strong className="text-white">Pacing:</strong> {short.pacingSecondsPerCut} cuts with dynamic audio risers</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span><strong className="text-white">Typography:</strong> {short.captionsStyle}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span><strong className="text-white">Sound Design:</strong> {short.soundtrack}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5">
              <button
                onClick={() => {
                  triggerHaptic('success');
                  onClose();
                  onOpenHire();
                }}
                className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/15 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book Saqib For Vertical Reels</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
