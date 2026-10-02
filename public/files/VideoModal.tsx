import React, { useEffect } from 'react';
import { X, Play, Clock, Eye, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { LongFormProject } from '../data/portfolioData.ts';
import { triggerHaptic } from '../utils/haptics.ts';
import { getEmbedUrl, isDirectVideoFile } from '../utils/videoHelpers.ts';

interface VideoModalProps {
  project: LongFormProject | null;
  onClose: () => void;
  onOpenHire: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  project,
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

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#141418] border border-white/10 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/5 bg-[#18181f]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              {project.categoryLabel}
            </span>
            <span className="text-xs text-zinc-400 font-medium">{project.client}</span>
          </div>

          <button
            onClick={() => {
              triggerHaptic('light');
              onClose();
            }}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Video Player */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10 shadow-lg">
            {project.videoUrl ? (
              isDirectVideoFile(project.videoUrl) ? (
                <video
                  src={project.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={getEmbedUrl(project.videoUrl) || project.videoUrl}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                
                {/* Visual badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-black/80 font-mono text-amber-400">{project.duration}</span>
                    <span>4K UHD Master</span>
                  </div>
                  <span className="text-amber-400 font-bold">{project.views} Views</span>
                </div>
              </div>
            )}
          </div>

          {/* Project Details */}
          <div>
            <div className="mb-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                {project.title}
              </h2>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#0e0e12] border border-white/5 mb-6 text-center">
              <div>
                <div className="text-[11px] text-zinc-500">Client / Channel</div>
                <div className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">{project.client}</div>
              </div>
              <div>
                <div className="text-[11px] text-zinc-500">Total Views</div>
                <div className="text-xs sm:text-sm font-bold text-amber-400 mt-0.5">{project.views}</div>
              </div>
              <div>
                <div className="text-[11px] text-zinc-500">Viewer Retention</div>
                <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">{project.retention}</div>
              </div>
              <div>
                <div className="text-[11px] text-zinc-500">Runtime</div>
                <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{project.duration}</div>
              </div>
            </div>

            {/* Editing Techniques & Software */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Software & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.software.map((sw) => (
                    <span
                      key={sw}
                      className="px-2.5 py-1 rounded-md bg-[#18181f] border border-white/5 text-xs text-zinc-300 font-mono"
                    >
                      {sw}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Pacing & Retention Strategies
                </h4>
                <ul className="space-y-1.5">
                  {project.keyPacingTechniques.map((tech, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-zinc-400">
              Need editing of this caliber for your channel?
            </span>
            <button
              onClick={() => {
                triggerHaptic('success');
                onClose();
                onOpenHire();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/15 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Book Saqib For Your Next Video</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
