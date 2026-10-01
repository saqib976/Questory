import React, { useState } from 'react';
import { Play, Eye, TrendingUp, Clock, Layers, Sparkles, Filter, ChevronRight, Check } from 'lucide-react';
import { LONG_FORM_PROJECTS, LongFormProject } from '../data/portfolioData.ts';
import { triggerHaptic } from '../utils/haptics.ts';

interface LongFormPortfolioProps {
  onSelectProject: (project: LongFormProject) => void;
  onSwitchToVertical: () => void;
}

type CategoryType = 'all' | 'faceless' | 'motion-graphics' | 'retention' | 'podcasts' | 'commercial';

export const LongFormPortfolio: React.FC<LongFormPortfolioProps> = ({
  onSelectProject,
  onSwitchToVertical,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

  const categories: { id: CategoryType; label: string; count: number }[] = [
    { id: 'all', label: 'All Projects', count: LONG_FORM_PROJECTS.length },
    { id: 'faceless', label: 'Faceless & Documentaries', count: LONG_FORM_PROJECTS.filter(p => p.category === 'faceless').length },
    { id: 'motion-graphics', label: 'Motion Graphics & VFX', count: LONG_FORM_PROJECTS.filter(p => p.category === 'motion-graphics').length },
    { id: 'retention', label: 'YouTube Retention', count: LONG_FORM_PROJECTS.filter(p => p.category === 'retention').length },
    { id: 'podcasts', label: 'Podcasts & Talking Heads', count: LONG_FORM_PROJECTS.filter(p => p.category === 'podcasts').length },
    { id: 'commercial', label: 'Commercial & Brand', count: LONG_FORM_PROJECTS.filter(p => p.category === 'commercial').length },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? LONG_FORM_PROJECTS
    : LONG_FORM_PROJECTS.filter((p) => p.category === selectedCategory);

  const handleCategorySelect = (catId: CategoryType) => {
    triggerHaptic('selection');
    setSelectedCategory(catId);
  };

  return (
    <div id="long-form-section" className="py-12 md:py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Long-Form Showcase</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            High-Retention YouTube & Documentaries
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
            Story-driven editing engineered to dominate YouTube browse features, elevate channel authority, and sustain viewers through 20+ minute runtimes.
          </p>
        </div>

        {/* Quick stat */}
        <div className="flex items-center gap-4 bg-[#141418] p-3 rounded-2xl border border-white/5 shrink-0">
          <div>
            <div className="text-[11px] text-zinc-500 font-medium">Avg Viewer Retention</div>
            <div className="text-xl font-extrabold text-amber-400 font-display">78.4%</div>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div>
            <div className="text-[11px] text-zinc-500 font-medium">Top Video Reach</div>
            <div className="text-xl font-extrabold text-white font-display">4.2M+</div>
          </div>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="mb-10 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 p-1.5 bg-[#141418] rounded-2xl border border-white/5 min-w-max">
          <div className="px-3 py-1 text-xs text-zinc-500 flex items-center gap-1.5 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-500 text-black font-semibold shadow-md shadow-amber-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isActive ? 'bg-black/25 text-black' : 'bg-white/10 text-zinc-500'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              triggerHaptic('medium');
              onSelectProject(project);
            }}
            className="group relative bg-[#141418] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer flex flex-col"
          >
            {/* Thumbnail 16:9 with overlay */}
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
              <img
                src={project.thumbnail}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-black/30" />

              {/* Play button hover highlight */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                <div className="w-14 h-14 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <Play className="w-6 h-6 fill-black translate-x-0.5" />
                </div>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-mono font-medium text-zinc-300 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>{project.duration}</span>
              </div>

              {/* Category tag */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-medium text-amber-300">
                {project.categoryLabel}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xs text-zinc-500 font-medium mb-1.5 flex items-center gap-2">
                  <span>{project.client}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/5">
                {/* Stats: Views & Retention */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-semibold text-white">{project.views}</span>
                    <span className="text-zinc-500 text-[11px]">views</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-semibold text-emerald-400">{project.retention}</span>
                    <span className="text-zinc-500 text-[11px]">retention</span>
                  </div>
                </div>

                {/* Software tags */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {project.software.slice(0, 3).map((soft) => (
                      <span
                        key={soft}
                        className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-zinc-400"
                      >
                        {soft}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs text-amber-400 group-hover:translate-x-1 transition-transform flex items-center font-medium">
                    Inspect →
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
