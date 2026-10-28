/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Filter } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';
import { sound } from '../utils/sound';
import { CaseStudy, CategoryType } from '../types';

export const SelectedWork: React.FC = () => {
  const { caseStudies, setActiveCaseStudy, setCursor } = useAgency();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const categories: CategoryType[] = ['All', 'Branding', 'Creative Direction', '3D Motion', 'Digital Product'];

  const filteredCases = caseStudies
    .filter((c) => c.isActive)
    .filter((c) => (selectedCategory === 'All' ? true : c.category === selectedCategory));

  const handleCaseClick = (item: CaseStudy) => {
    sound.playPop(640);
    setActiveCaseStudy(item);
  };

  return (
    <section id="work" className="py-24 border-b border-[#1f2621]/80 bg-[#070707] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
              <span className="text-[#ccff00]">SELECTED PORTFOLIO</span>
              <span aria-hidden="true">·</span>
              <span>2024–2026 ARCHIVE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-display break-words">
              Featured Case Studies
            </h2>
          </div>

          {/* Minimalist Category Filter */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-zinc-900/70 rounded-lg border border-zinc-800">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playTick(700);
                    setSelectedCategory(cat);
                  }}
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={() => setCursor('default')}
                  className={`px-3 py-1.5 text-xs font-mono tracking-wider rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-zinc-100 text-black font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean, Uncluttered Grid of Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCases.map((item, index) => {
            const isMarqueeItem = index === 0 && selectedCategory === 'All';

            return (
              <div
                key={item.id}
                onClick={() => handleCaseClick(item)}
                onMouseEnter={() => {
                  setHoveredCardId(item.id);
                  setCursor('hover');
                  sound.playTick(720);
                }}
                onMouseLeave={() => {
                  setHoveredCardId(null);
                  setCursor('default');
                }}
                className={`group relative rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors duration-300 flex flex-col cursor-pointer ${
                  isMarqueeItem ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Media Container - NO scale transform, clean image presentation */}
                <div
                  className={`relative w-full overflow-hidden bg-zinc-900 ${
                    isMarqueeItem ? 'h-[320px] sm:h-[420px] lg:h-[480px]' : 'h-[260px] sm:h-[320px]'
                  }`}
                >
                  {item.heroMediaType === 'video' || item.heroMediaUrl.endsWith('.mp4') ? (
                    <video
                      src={item.heroMediaUrl}
                      poster={item.thumbnailUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  ) : (
                    <img
                      src={item.heroMediaUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  )}

                  {/* Subtle top right indicator */}
                  <div className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:bg-black/90 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Card Editorial Body (Clean, uncluttered, no floating pills) */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Clean unboxed metadata with typographic separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 mb-2">
                      <span className="text-[#ccff00] font-medium">{item.client}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.year}</span>
                    </div>

                    <h3 className="text-base sm:text-xl font-bold text-white group-hover:text-zinc-200 transition-colors tracking-tight leading-snug break-words">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>

                  {/* Bottom Metric & Deliverables row */}
                  <div className="mt-5 pt-4 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                    <div className="text-[#ccff00] font-medium">
                      {item.metrics[0]?.value} {item.metrics[0]?.label}
                    </div>

                    <div className="text-zinc-500 flex items-center gap-3">
                      {item.deliverables.slice(0, 2).map((d, i) => (
                        <span key={i} className="hidden sm:inline">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
