import React, { useState, useRef, useEffect } from 'react';
import { Film, Smartphone, Play, Clock, Sparkles, ChevronLeft, ChevronRight, Zap, Copy, Check } from 'lucide-react';
import {
  LONG_FORM_PROJECTS,
  SHORT_FORM_PROJECTS,
  LongFormProject,
  ShortFormProject,
} from '../data/portfolioData.ts';
import { triggerHaptic } from '../utils/haptics.ts';

interface PortfolioShowcaseProps {
  onSelectLong: (project: LongFormProject) => void;
  onSelectShort: (short: ShortFormProject) => void;
  activeTab?: 'long' | 'vertical';
  onTabChange?: (tab: 'long' | 'vertical') => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  onSelectLong,
  onSelectShort,
  activeTab: propActiveTab,
  onTabChange,
}) => {
  const [internalTab, setInternalTab] = useState<'long' | 'vertical'>(() => {
    if (typeof window === 'undefined') return 'long';
    try {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get('type') || params.get('view') || params.get('tab');
      if (typeParam) {
        if (['shorts', 'short', 'vertical', 'reels', 'reel', 'tiktok'].includes(typeParam.toLowerCase())) {
          return 'vertical';
        }
        if (['long', 'documentary', 'documentaries', 'youtube'].includes(typeParam.toLowerCase())) {
          return 'long';
        }
      }
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('short') || hash.includes('vertical') || hash.includes('reel')) {
        return 'vertical';
      }
    } catch {}
    return 'long';
  });

  const activeTab = propActiveTab !== undefined ? propActiveTab : internalTab;
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [shortIndex, setShortIndex] = useState(0);
  const [copiedTab, setCopiedTab] = useState<'long' | 'vertical' | null>(null);

  // Swipe & Drag Gesture Tracking (with strict vertical scroll pass-through)
  const touchStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isMouseDown = useRef(false);
  const wasDragAction = useRef(false);

  // Listen for browser navigation (back/forward)
  useEffect(() => {
    const handleUrlChange = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const typeParam = params.get('type') || params.get('view') || params.get('tab');
        const hash = window.location.hash.toLowerCase();
        let target: 'long' | 'vertical' = 'long';
        if (typeParam) {
          if (['shorts', 'short', 'vertical', 'reels', 'reel', 'tiktok'].includes(typeParam.toLowerCase())) {
            target = 'vertical';
          }
        } else if (hash.includes('short') || hash.includes('vertical') || hash.includes('reel')) {
          target = 'vertical';
        }
        setInternalTab(target);
        if (onTabChange) onTabChange(target);
      } catch {}
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [onTabChange]);

  // Categories
  const longCategories = [
    { id: 'all', label: 'All Projects' },
    { id: 'faceless', label: 'Documentaries' },
    { id: 'motion-graphics', label: 'Motion Graphics' },
    { id: 'talking-head', label: 'Talking Head' },
  ];

  const shortCategories = [
    { id: 'all', label: 'All Reels & Shorts' },
    { id: 'motion-shorts', label: 'Motion Graphics' },
    { id: 'talking-head', label: 'Talking Head' },
    { id: 'podcast', label: 'Podcasts' },
    { id: 'ads', label: 'Games & Promo' },
  ];

  const currentCategories = activeTab === 'long' ? longCategories : shortCategories;

  const filteredLong = categoryFilter === 'all'
    ? LONG_FORM_PROJECTS
    : LONG_FORM_PROJECTS.filter((p) => p.category === categoryFilter);

  const filteredShort = categoryFilter === 'all'
    ? SHORT_FORM_PROJECTS
    : SHORT_FORM_PROJECTS.filter((s) => s.category === categoryFilter);

  const handleTabChange = (tab: 'long' | 'vertical') => {
    triggerHaptic('medium');
    setInternalTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
    setCategoryFilter('all');
    setShortIndex(0);

    // Update URL query & hash seamlessly so it can be copied directly
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('type', tab === 'vertical' ? 'shorts' : 'long');
      url.hash = 'portfolio-section';
      window.history.replaceState(null, '', url.toString());
    } catch {}
  };

  const handleCopyClientLink = (tab: 'long' | 'vertical') => {
    triggerHaptic('success');
    const baseUrl = window.location.origin + window.location.pathname;
    const link = `${baseUrl}?type=${tab === 'vertical' ? 'shorts' : 'long'}#portfolio-section`;
    navigator.clipboard.writeText(link);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 3000);
  };

  const handlePrevShort = () => {
    triggerHaptic('medium');
    setShortIndex((prev) => (prev > 0 ? prev - 1 : filteredShort.length - 1));
  };

  const handleNextShort = () => {
    triggerHaptic('medium');
    setShortIndex((prev) => (prev < filteredShort.length - 1 ? prev + 1 : 0));
  };

  // --- Strict Touch Handling: Never block vertical scrolling ---
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    wasDragAction.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const dx = Math.abs(currentX - touchStartPos.current.x);
    const dy = Math.abs(currentY - touchStartPos.current.y);

    // If moving horizontally more than 10px, flag as drag so click doesn't misfire
    if (dx > 10 && dx > dy) {
      wasDragAction.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const dx = endX - touchStartPos.current.x;
    const dy = endY - touchStartPos.current.y;

    // Strict validation: Ignore if vertical motion dominates (scrolling down page)
    if (Math.abs(dy) > Math.abs(dx)) {
      return;
    }

    // Only swipe if clear horizontal swipe > 45px
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      wasDragAction.current = true;
      if (dx < 0) {
        handleNextShort();
      } else {
        handlePrevShort();
      }
    }
  };

  // --- Mouse Drag Handling for Desktop ---
  const handleMouseDown = (e: React.MouseEvent) => {
    isMouseDown.current = true;
    wasDragAction.current = false;
    mouseStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current) return;
    const dx = Math.abs(e.clientX - mouseStartPos.current.x);
    const dy = Math.abs(e.clientY - mouseStartPos.current.y);
    if (dx > 10) {
      wasDragAction.current = true;
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDown.current) return;
    isMouseDown.current = false;

    const dx = e.clientX - mouseStartPos.current.x;
    const dy = e.clientY - mouseStartPos.current.y;

    if (Math.abs(dy) > Math.abs(dx)) {
      return;
    }

    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      wasDragAction.current = true;
      if (dx < 0) {
        handleNextShort();
      } else {
        handlePrevShort();
      }
    }
  };

  return (
    <section id="portfolio-section" className="py-14 md:py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Simple Tab Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Works</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Video Portfolio
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              {activeTab === 'long'
                ? 'Curated long-form YouTube documentaries engineered for 20+ minute retention.'
                : 'Swipe left & right through high-velocity vertical reels floating in 3D.'}
            </p>
          </div>

          {/* Format Toggle & Direct Client Share Links */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 self-start md:self-auto">
            <div className="inline-flex p-1 bg-[#141418] rounded-2xl border border-white/10 shadow-inner">
              <button
                onClick={() => handleTabChange('long')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'long'
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Film className="w-4 h-4" />
                <span>Long-Form YouTube</span>
              </button>

              <button
                onClick={() => handleTabChange('vertical')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'vertical'
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Vertical Reels & Shorts</span>
              </button>
            </div>

            {/* Quick Share Link for Client */}
            <button
              onClick={() => handleCopyClientLink(activeTab)}
              title={activeTab === 'long' ? 'Copy dedicated Long-Form link to send to clients' : 'Copy dedicated Vertical Shorts link to send to clients'}
              className="px-3.5 py-2.5 rounded-xl bg-[#141418] hover:bg-[#1a1a22] border border-white/10 hover:border-amber-400/40 text-xs font-semibold text-zinc-300 hover:text-amber-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm group"
            >
              {copiedTab === activeTab ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">
                    {activeTab === 'long' ? 'Long-Form Link Copied!' : 'Shorts Link Copied!'}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Copy Client Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Clean Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {currentCategories.map((cat) => {
            const isActive = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  triggerHaptic('selection');
                  setCategoryFilter(cat.id);
                  setShortIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white/10 text-amber-300 border border-amber-400/30'
                    : 'text-zinc-400 hover:text-zinc-200 bg-[#141418] border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* MAIN DISPLAY: Long Form Grid vs 3D Floating Carousel */}
        {activeTab === 'long' ? (
          /* Long-Form Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredLong.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  triggerHaptic('medium');
                  onSelectLong(project);
                }}
                className="group relative bg-[#141418] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer flex flex-col"
              >
                {/* 16:9 Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      if (project.thumbnail.includes('maxresdefault.jpg')) {
                        e.currentTarget.src = project.thumbnail.replace('maxresdefault.jpg', 'hqdefault.jpg');
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                    <div className="w-12 h-12 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    </div>
                  </div>

                  {/* Runtime */}
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono text-zinc-300 flex items-center gap-1 border border-white/10">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{project.duration}</span>
                  </div>

                  {/* Tag */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/75 text-[11px] font-medium text-amber-300 border border-white/10">
                    {project.categoryLabel}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-white text-base group-hover:text-amber-300 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-medium text-zinc-300">{project.client}</span>
                    <span className="text-amber-400 font-semibold">{project.views} Views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* SILKY SMOOTH 60FPS 3D FLOATING CAROUSEL: "In the air" with visible edge peeks */
          <div className="relative py-6 sm:py-10 px-2 select-none overflow-hidden touch-pan-y">
            {/* Ambient Lighting in the center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[460px] h-[520px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

            {/* Left Floating Arrow Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevShort();
              }}
              aria-label="Previous vertical reel"
              className="absolute left-1 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#18181f]/95 hover:bg-amber-400 hover:text-black text-white border border-white/15 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all cursor-pointer active:scale-95 group"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Right Floating Arrow Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextShort();
              }}
              aria-label="Next vertical reel"
              className="absolute right-1 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#18181f]/95 hover:bg-amber-400 hover:text-black text-white border border-white/15 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all cursor-pointer active:scale-95 group"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* 3D Perspective Stage */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              className="relative h-[530px] sm:h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing [perspective:1200px]"
            >
              {filteredShort.map((short, idx) => {
                const count = filteredShort.length;
                let offset = (idx - shortIndex) % count;
                if (offset > count / 2) offset -= count;
                if (offset < -count / 2) offset += count;

                const isCenter = offset === 0;
                const isLeft = offset === -1;
                const isRight = offset === 1;

                if (!isCenter && !isLeft && !isRight) {
                  return null;
                }

                return (
                  <div
                    key={short.id}
                    onClick={(e) => {
                      if (wasDragAction.current) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                      }
                      if (isCenter) {
                        triggerHaptic('medium');
                        onSelectShort(short);
                      } else if (isLeft) {
                        handlePrevShort();
                      } else if (isRight) {
                        handleNextShort();
                      }
                    }}
                    style={{
                      transform: isCenter
                        ? 'translate3d(0, 0, 40px) scale(1)'
                        : isLeft
                        ? 'translate3d(-64%, 0, -40px) scale(0.85) rotateY(16deg)'
                        : 'translate3d(64%, 0, -40px) scale(0.85) rotateY(-16deg)',
                      zIndex: isCenter ? 30 : 15,
                      opacity: isCenter ? 1 : 0.65,
                      willChange: 'transform, opacity',
                      transition: 'transform 420ms cubic-bezier(0.16, 1, 0.3, 1), opacity 420ms ease',
                    }}
                    className={`absolute w-[260px] sm:w-[315px] aspect-[9/16] cursor-pointer rounded-[34px] p-2 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 border-2 select-none ${
                      isCenter
                        ? 'border-amber-400/50 shadow-[0_28px_60px_-10px_rgba(0,0,0,0.95),0_0_40px_rgba(245,158,11,0.25)]'
                        : 'border-white/10 shadow-2xl hover:opacity-85'
                    }`}
                  >
                    {/* Phone Screen Mockup */}
                    <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-black flex flex-col justify-between group pointer-events-none">
                      <img
                        src={short.thumbnail}
                        alt={short.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('hqdefault.jpg') && short.videoUrl?.includes('shorts/')) {
                            const idMatch = short.videoUrl.match(/shorts\/([\w-]{11})/);
                            if (idMatch) {
                              target.src = `https://img.youtube.com/vi/${idMatch[1]}/hqdefault.jpg`;
                              return;
                            }
                          }
                          target.src = 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80';
                        }}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/50" />

                      {/* Top Hook Badge */}
                      <div className="relative z-10 p-3 pt-5 text-center">
                        <span className="inline-block px-2.5 py-1 rounded bg-black/85 text-amber-300 font-extrabold text-[10px] sm:text-xs uppercase tracking-wider border border-amber-500/30 shadow-lg">
                          {short.hookHeadline}
                        </span>
                      </div>

                      {/* Center Play Button for Center Active Card */}
                      {isCenter && (
                        <div className="relative z-10 flex-1 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                            <Play className="w-6 h-6 fill-black translate-x-0.5" />
                          </div>
                        </div>
                      )}

                      {/* Bottom Reel Metrics */}
                      <div className="relative z-10 p-4 bg-gradient-to-t from-black via-black/90 to-transparent">
                        <div className="font-display font-bold text-sm sm:text-base text-white line-clamp-1">
                          {short.title}
                        </div>
                        <div className="flex items-center justify-between text-xs text-zinc-300 mt-1">
                          <span className="text-amber-400 font-bold font-mono">{short.views} Views</span>
                          <span className="text-emerald-400 font-semibold">{short.hookRate} Hook Rate</span>
                        </div>
                        {isCenter && (
                          <div className="mt-2 text-[11px] text-amber-300 font-medium flex items-center justify-center gap-1 bg-amber-500/15 py-1 rounded-lg border border-amber-500/20">
                            <span>Click to Watch Video & Breakdown</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Dots & Navigation Prompt */}
            <div className="mt-4 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                {filteredShort.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      triggerHaptic('selection');
                      setShortIndex(i);
                    }}
                    aria-label={`Jump to reel ${i + 1}`}
                    className={`transition-all rounded-full cursor-pointer ${
                      i === shortIndex
                        ? 'w-7 h-2 bg-amber-400'
                        : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
              <div className="text-xs text-zinc-400 flex items-center gap-1.5 font-medium">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Swipe left/right or click edges to explore ({shortIndex + 1} of {filteredShort.length})</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
