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
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#8e9290] mb-2">
              <span className="text-[#ccff00]">SELECTED PORTFOLIO</span>
              <span aria-hidden="true">·</span>
              <span>2024–2026 ARCHIVE</span>
              <span aria-hidden="true">·</span>
              <span>MEDIA-HEAVY SHOWCASE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display break-words">
              Flagship Case Studies
            </h2>
          </div>

          {/* Functional Category Filter Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0f1210] rounded-xl border border-[#232b25]">
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
                  className={`px-3.5 py-2 text-xs font-mono tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#ccff00] text-black font-bold shadow-sm'
                      : 'text-[#a1a1aa] hover:text-white hover:bg-[#181d19]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Media-Heavy Bento Grid of Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredCases.map((item, index) => {
            const isMarqueeItem = index === 0 && selectedCategory === 'All';
            const isHovered = hoveredCardId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleCaseClick(item)}
                onMouseEnter={() => {
                  setHoveredCardId(item.id);
                  setCursor('media', 'VIEW');
                  sound.playTick(720);
                }}
                onMouseLeave={() => {
                  setHoveredCardId(null);
                  setCursor('default');
                }}
                className={`group relative rounded-2xl overflow-hidden bg-[#0d100e] border border-[#1f2621] hover:border-[#ccff00] transition-all duration-300 flex flex-col cursor-pointer ${
                  isMarqueeItem ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Media Container with Live Video Loop & Zoom */}
                <div
                  className={`relative w-full overflow-hidden bg-[#0a0a0a] ${
                    isMarqueeItem ? 'h-[360px] sm:h-[480px] lg:h-[560px]' : 'h-[300px] sm:h-[380px]'
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
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={item.heroMediaUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}

                  {/* Dark Vignette Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-black/30" />

                  {/* Floating Action Button */}
                  <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#ccff00] group-hover:text-black group-hover:border-[#ccff00] transition-colors">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  {/* Top Client Attribution Pill */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 font-mono text-xs uppercase tracking-wider text-white">
                    {item.client}
                  </div>

                  {/* Bottom Metric Tag inside media for high visual impact */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs font-mono">
                    <div className="px-3 py-1.5 rounded-lg bg-[#070707]/80 backdrop-blur-md border border-[#232b25] text-[#ccff00] font-bold">
                      {item.metrics[0]?.value} {item.metrics[0]?.label}
                    </div>
                    <div className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[#8e9290]">
                      {item.year}
                    </div>
                  </div>
                </div>

                {/* Card Editorial Footer (Zero-Pill Discipline: unboxed metadata) */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Unboxed Metadata with Typographic Separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#8e9290] mb-2 uppercase tracking-wide">
                      <span className="text-[#ccff00]">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.client}</span>
                      <span aria-hidden="true">·</span>
                      <span>Release {item.year}</span>
                    </div>

                    <h3 className="text-lg sm:text-2xl font-bold text-white group-hover:text-[#ccff00] transition-colors font-display tracking-tight leading-snug break-words">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#a1a1aa] mt-2 line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>

                  {/* Key Deliverables Tagline */}
                  <div className="mt-6 pt-4 border-t border-[#1a201c] flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[#8e9290]">
                    {item.deliverables.slice(0, 3).map((d, i) => (
                      <span key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#ccff00]" />
                        <span>{d}</span>
                      </span>
                    ))}
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
