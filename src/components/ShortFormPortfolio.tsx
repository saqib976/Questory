import React, { useState, useRef, useEffect, TouchEvent } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  TrendingUp,
  Zap,
  Smartphone,
  Maximize2,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { SHORT_FORM_PROJECTS, ShortFormProject } from '../data/portfolioData.ts';
import { triggerHaptic } from '../utils/haptics.ts';

interface ShortFormPortfolioProps {
  onSelectShort: (short: ShortFormProject) => void;
  onSwitchToLong: () => void;
}

export const ShortFormPortfolio: React.FC<ShortFormPortfolioProps> = ({
  onSelectShort,
  onSwitchToLong,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Touch and drag swipe state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);
  const mouseStartX = useRef<number>(0);

  const filteredShorts = filterCategory === 'all'
    ? SHORT_FORM_PROJECTS
    : SHORT_FORM_PROJECTS.filter((s) => s.category === filterCategory);

  const activeShort = filteredShorts[currentIndex] || filteredShorts[0];

  // Keep index within bounds if category filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filterCategory]);

  const handleNext = () => {
    if (currentIndex < filteredShorts.length - 1) {
      triggerHaptic('medium');
      setCurrentIndex((prev) => prev + 1);
    } else {
      triggerHaptic('light');
      setCurrentIndex(0); // Loop back
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      triggerHaptic('medium');
      setCurrentIndex((prev) => prev - 1);
    } else {
      triggerHaptic('light');
      setCurrentIndex(filteredShorts.length - 1);
    }
  };

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Mouse drag handlers for desktop swipe emulation
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    mouseStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const distance = mouseStartX.current - e.clientX;
    const minDistance = 50;
    if (distance > minDistance) {
      handleNext();
    } else if (distance < -minDistance) {
      handlePrev();
    }
    isDragging.current = false;
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic('success');
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div id="vertical-reels-section" className="py-12 md:py-16">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Interactive 9:16 Carousel Showcase</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Vertical Viral Reels & TikToks
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
            Swipe left or right through high-conversion short-form edits. Engineered with sub-second visual hooks, kinetic captions, and dopamine sound design.
          </p>
        </div>

        {/* Carousel swipe instructions */}
        <div className="flex items-center gap-3 bg-[#141418] px-4 py-2.5 rounded-2xl border border-white/5 text-xs text-zinc-300">
          <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>Swipe or Drag to explore shorts</span>
        </div>
      </div>

      {/* Filter Categories */}
      <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Formats' },
          { id: 'talking-head', label: 'Talking Head + Captions' },
          { id: 'faceless-reels', label: 'Faceless & Storytelling' },
          { id: 'viral-hooks', label: 'Viral Hooks & Pacing' },
          { id: 'ads', label: 'E-commerce & Ads' },
        ].map((cat) => {
          const isActive = filterCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                triggerHaptic('selection');
                setFilterCategory(cat.id);
              }}
              className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-black font-semibold shadow-md shadow-amber-500/20'
                  : 'bg-[#141418] text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Main Carousel Area */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-12 py-6">
        
        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrev}
          aria-label="Previous short video"
          className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-zinc-900/90 hover:bg-amber-500 hover:text-black text-white border border-white/10 shadow-xl flex items-center justify-center transition-all cursor-pointer active:scale-90"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNext}
          aria-label="Next short video"
          className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-zinc-900/90 hover:bg-amber-500 hover:text-black text-white border border-white/10 shadow-xl flex items-center justify-center transition-all cursor-pointer active:scale-90"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Swipe Carousel Stage */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className="flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
        >
          {/* Active Smartphone Bezel (9:16 aspect ratio) */}
          <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[9/16] rounded-[36px] p-3 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 border-[3px] border-zinc-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(245,158,11,0.15)] overflow-hidden transition-all duration-300">
            
            {/* Phone Screen Container */}
            <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-black flex flex-col justify-between">
              
              {/* Dynamic Video / Graphic Layer */}
              <div className="absolute inset-0 bg-zinc-900">
                <img
                  src={activeShort.thumbnail}
                  alt={activeShort.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${activeShort.colorTheme} mix-blend-overlay`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
              </div>

              {/* Dynamic Kinetic Captions Simulation Layer */}
              <div className="absolute inset-x-4 top-1/3 text-center z-10 pointer-events-none">
                <div className="inline-block px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-amber-500/40 text-amber-300 font-extrabold text-sm tracking-wide uppercase shadow-lg shadow-black/80 animate-pulse">
                  {activeShort.hookHeadline}
                </div>
                <div className="mt-2 text-xs font-semibold text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  ⚡ {activeShort.pacingSecondsPerCut} cut rhythm · Custom sound punch
                </div>
              </div>

              {/* Top Phone Bar: Speaker Notch & Status */}
              <div className="relative z-20 pt-3 px-4 flex items-center justify-between text-zinc-300">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white">
                    {activeShort.platform}
                  </span>
                </div>

                {/* Speaker Notch */}
                <div className="w-16 h-3 bg-black/80 rounded-full border border-white/10" />

                {/* Sound toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerHaptic('light');
                    setIsMuted(!isMuted);
                  }}
                  className="p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              </div>

              {/* Center Play / Pause Indicator */}
              <div
                onClick={() => {
                  triggerHaptic('selection');
                  setIsPlaying(!isPlaying);
                }}
                className="relative z-20 flex-1 flex items-center justify-center cursor-pointer"
              >
                {!isPlaying && (
                  <div className="w-16 h-16 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/50 flex items-center justify-center text-amber-400 shadow-2xl">
                    <Play className="w-8 h-8 fill-amber-400 translate-x-0.5" />
                  </div>
                )}
              </div>

              {/* Right Side Social Actions (Typical TikTok / Reels UI) */}
              <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4 text-white">
                {/* Like Button */}
                <button
                  onClick={(e) => toggleLike(activeShort.id, e)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                    likedMap[activeShort.id]
                      ? 'bg-rose-500 text-white scale-110'
                      : 'bg-black/50 text-white hover:bg-white/20'
                  }`}>
                    <Heart className={`w-5 h-5 ${likedMap[activeShort.id] ? 'fill-white' : ''}`} />
                  </div>
                  <span className="text-[10px] font-bold tracking-tight">
                    {likedMap[activeShort.id] ? 'Liked' : activeShort.likes}
                  </span>
                </button>

                {/* Hook Rate Metric */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center backdrop-blur-md">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-amber-300">{activeShort.hookRate}</span>
                </div>

                {/* Inspect Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerHaptic('medium');
                    onSelectShort(activeShort);
                  }}
                  title="Inspect Reel Details"
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className="w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-amber-500 hover:text-black transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-medium text-zinc-400">Inspect</span>
                </button>
              </div>

              {/* Bottom Video Metadata & Pacing Details */}
              <div className="relative z-20 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                {/* Sound wave visualizer */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center gap-0.5 h-3">
                    {[40, 80, 60, 100, 50, 75, 90, 45, 70, 85].map((h, i) => (
                      <span
                        key={i}
                        className={`w-0.5 bg-amber-400 rounded-full transition-all duration-300 ${
                          isPlaying ? 'animate-pulse' : 'h-1'
                        }`}
                        style={{ height: isPlaying ? `${h}%` : '20%' }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-zinc-400 truncate max-w-[170px] ml-1">
                    {activeShort.soundtrack}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-display text-sm font-bold text-white line-clamp-2 leading-tight">
                  {activeShort.title}
                </h4>

                {/* Views & Metrics */}
                <div className="mt-2 flex items-center gap-3 text-xs text-zinc-300">
                  <span className="text-amber-400 font-bold">{activeShort.views} Views</span>
                  <span aria-hidden="true" className="text-zinc-600">·</span>
                  <span className="text-emerald-400 font-semibold">{activeShort.completionRate} Comp.</span>
                </div>

                {/* Simulated playback progress scrubber */}
                <div className="mt-3 w-full bg-white/20 h-1 rounded-full overflow-hidden">
                  <div className={`h-full bg-amber-400 rounded-full ${isPlaying ? 'w-3/4 animate-pulse' : 'w-1/3'}`} />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots & Index Tracker */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            {filteredShorts.map((short, idx) => (
              <button
                key={short.id}
                onClick={() => {
                  triggerHaptic('light');
                  setCurrentIndex(idx);
                }}
                aria-label={`Jump to video ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-8 h-2 bg-amber-400 shadow-md shadow-amber-500/40'
                    : 'w-2 h-2 bg-zinc-700 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>

          <div className="text-xs font-mono text-zinc-500">
            Swipe {currentIndex + 1} of {filteredShorts.length}
          </div>
        </div>

        {/* Active Short Detailed Breakdown Card */}
        <div className="mt-8 bg-[#141418] rounded-2xl p-6 border border-white/10 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-semibold">
                {activeShort.categoryLabel}
              </span>
              <span className="text-xs text-zinc-500">·</span>
              <span className="text-xs text-zinc-400">{activeShort.platform}</span>
            </div>

            <button
              onClick={() => {
                triggerHaptic('medium');
                onSelectShort(activeShort);
              }}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Retention Analysis</span>
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <h3 className="font-display text-base font-bold text-white mb-2">
            {activeShort.title}
          </h3>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {activeShort.breakdown}
          </p>

          <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
            <div>
              <span className="text-zinc-500">Captions Style: </span>
              <span className="text-zinc-300">{activeShort.captionsStyle}</span>
            </div>
            <div>
              <span className="text-zinc-500">Cut Speed: </span>
              <span className="text-amber-400 font-mono font-bold">{activeShort.pacingSecondsPerCut}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
