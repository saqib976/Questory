import React, { useState, useRef } from 'react';
import { Eye, TrendingUp, Award, ArrowDown, Sparkles, Camera, Check } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics.ts';

interface HeroSectionProps {
  onOpenContact: () => void;
  onScrollToPortfolio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
  onScrollToPortfolio,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if user has uploaded their exact original photo
  const [customAvatar, setCustomAvatar] = useState<string | null>(() => {
    try {
      return localStorage.getItem('questory_saqib_photo');
    } catch {
      return null;
    }
  });

  // Default fallback paths
  const userUploadedOriginal = '/file_0000000033548211b191642797ebdcb7.png';
  const publicPortrait = '/saqib_portrait.jpg';
  const [avatarSrc, setAvatarSrc] = useState(userUploadedOriginal);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Handle direct client-side photo placement (zero compression, zero alteration)
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      triggerHaptic('success');
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCustomAvatar(result);
          try {
            localStorage.setItem('questory_saqib_photo', result);
          } catch (err) {
            console.error('Storage full', err);
          }
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const activeImageSrc = customAvatar || avatarSrc;

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-20 overflow-hidden border-b border-white/5">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Hidden File Input for direct photo placement */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Saqib Profile Portrait */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative group">
              {/* Outer soft ambient accent */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 to-amber-600/30 rounded-3xl blur-md opacity-60 group-hover:opacity-80 transition duration-500" />
              
              {/* Main Avatar Container — 100% natural, untouched */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-88 md:h-88 rounded-2xl overflow-hidden bg-[#141418] border border-white/15 shadow-2xl">
                <img
                  src={activeImageSrc}
                  alt="Saqib — Owner of Questory"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    if (avatarSrc !== publicPortrait) {
                      setAvatarSrc(publicPortrait);
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Direct Upload / Place Photo Overlay Trigger */}
                <button
                  onClick={() => {
                    triggerHaptic('light');
                    fileInputRef.current?.click();
                  }}
                  title="Click to place your exact photo directly"
                  aria-label="Upload original photo"
                  className="absolute top-3 right-3 px-2.5 py-1.5 rounded-lg bg-black/80 hover:bg-amber-400 hover:text-black text-zinc-300 text-xs font-medium border border-white/15 backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer shadow-lg opacity-80 hover:opacity-100"
                >
                  {uploadSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Updated</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-3.5 h-3.5" />
                      <span>{customAvatar ? 'Change Photo' : 'Place Original Photo'}</span>
                    </>
                  )}
                </button>

                {/* Permanent Name & Ownership Badge directly on image */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#09090b]/90 backdrop-blur-md border border-white/15 shadow-xl text-left">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="font-display font-extrabold text-white text-base sm:text-lg tracking-tight flex items-center gap-1.5">
                        <span>Saqib</span>
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                      </div>
                      <div className="text-[11px] sm:text-xs text-amber-400 font-semibold tracking-wide">
                        Owner & Lead Video Editor · Questory
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-emerald-400 font-bold flex items-center justify-end gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Accepting Work</span>
                      </div>
                      <div className="text-[11px] text-zinc-300 font-mono font-medium">48M+ Views</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Confident Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Status / Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Questory Video Editing Agency</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18] text-balance">
              High-retention video editing that turns viewers into <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">obsessed fans</span>.
            </h1>

            {/* Subtitle / Bio */}
            <p className="mt-4 text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
              I’m Saqib, owner of Questory. We edit cinematic YouTube documentaries and viral short-form reels engineered for maximum watch time, pacing, and retention.
            </p>

            {/* Clean Key Metrics */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs sm:text-sm text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-200 font-semibold">
                <Eye className="w-4 h-4 text-amber-400" />
                <span>48M+ Total Views</span>
              </span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="flex items-center gap-1.5 text-zinc-200 font-semibold">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span>78.4% Avg Retention</span>
              </span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="flex items-center gap-1.5 text-zinc-200 font-semibold">
                <Award className="w-4 h-4 text-amber-400" />
                <span>240+ Delivered Videos</span>
              </span>
            </div>

            {/* Focused Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => {
                  triggerHaptic('success');
                  onOpenContact();
                }}
                className="px-6 py-3 text-sm font-bold text-black bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                Work With Questory
              </button>

              <button
                onClick={() => {
                  triggerHaptic('medium');
                  onScrollToPortfolio();
                }}
                className="px-5 py-3 text-sm font-semibold text-zinc-300 hover:text-white bg-[#141418] hover:bg-zinc-800 rounded-xl border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>View Portfolio</span>
                <ArrowDown className="w-4 h-4 text-amber-400" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
