/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Play, Pause, Eye, Volume2, Maximize2, Sparkles } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';
import { sound } from '../utils/sound';
import { ReelItem } from '../types';

export const ReelsShowcase: React.FC = () => {
  const { reels, setActiveReel, setCursor } = useAgency();
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredReelId, setHoveredReelId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeReels = reels.filter((r) => r.isActive);

  // Duplicate for seamless 360-degree marquee loop
  const displayReels = [...activeReels, ...activeReels];

  const handleReelClick = (reel: ReelItem) => {
    sound.playPop(580);
    setActiveReel(reel);
  };

  return (
    <section id="reels" className="py-24 border-b border-[#1f2621]/80 relative overflow-hidden bg-[#080a09]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8e9290] mb-2">
              <span className="text-[#ccff00]">SHORT-FORM KINETIC MEDIA</span>
              <span aria-hidden="true">·</span>
              <span>9:16 RATIO</span>
              <span aria-hidden="true">·</span>
              <span>HOVER TO PREVIEW</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display">
              Vertical Reels & CGI Showcases
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playTick(500);
                setIsPaused(!isPaused);
              }}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={() => setCursor('default')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#232b25] bg-[#0f1210] text-xs font-mono text-[#8e9290] hover:text-[#ccff00] hover:border-[#ccff00]/40 transition-colors cursor-pointer"
              aria-label={isPaused ? 'Resume auto-scroll marquee' : 'Pause auto-scroll marquee'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isPaused ? 'Resume Reel Flow' : 'Pause Reel Flow'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Carousel */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => {
          setIsPaused(true);
        }}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredReelId(null);
        }}
        ref={scrollRef}
      >
        <div
          className={`flex gap-6 py-4 px-4 sm:px-8 w-max ${
            isPaused ? '' : 'animate-marquee-left'
          }`}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {displayReels.map((reel, index) => {
            const isHovered = hoveredReelId === `${reel.id}-${index}`;
            return (
              <div
                key={`${reel.id}-${index}`}
                onClick={() => handleReelClick(reel)}
                onMouseEnter={() => {
                  setHoveredReelId(`${reel.id}-${index}`);
                  setCursor('media', 'PLAY');
                  sound.playTick(720);
                }}
                onMouseLeave={() => {
                  setCursor('default');
                }}
                className="group relative w-64 sm:w-72 md:w-80 h-[440px] sm:h-[490px] md:h-[520px] rounded-2xl overflow-hidden bg-[#111412] border border-[#222a24] hover:border-[#ccff00] transition-all duration-300 shadow-xl flex-shrink-0 cursor-pointer select-none"
              >
                {/* 9:16 Media Preview: Auto-plays muted loop on hover or shows high-res poster */}
                <div className="absolute inset-0 w-full h-full bg-[#0d0f0e]">
                  <img
                    src={reel.thumbnailUrl}
                    alt={reel.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                      isHovered ? 'opacity-30' : 'opacity-85'
                    }`}
                  />

                  {/* Video preview on hover */}
                  {isHovered && (
                    <video
                      src={reel.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}

                  {/* Scrim overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40 group-hover:via-black/20 transition-opacity" />
                </div>

                {/* Top Badge: Client & View Count */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs z-10">
                  <div className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 font-mono text-white text-[11px] uppercase tracking-wider">
                    {reel.client}
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[#a1a1aa] text-[11px]">
                    <Eye className="w-3 h-3 text-[#ccff00]" />
                    <span>{reel.views}</span>
                  </div>
                </div>

                {/* Center Expand Icon Hover Trigger */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="w-16 h-16 rounded-full bg-[#ccff00] text-black flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform shadow-[0_0_30px_rgba(204,255,0,0.6)]">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Metadata */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#ccff00] mb-1.5">
                    <span>{reel.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>9:16 Vertical</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#ccff00] transition-colors leading-snug font-display">
                    {reel.title}
                  </h3>

                  <p className="text-xs text-[#a1a1aa] mt-1 line-clamp-2 leading-relaxed">
                    {reel.caption}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10 text-[11px] font-mono text-[#8e9290]">
                    <span className="flex items-center gap-1 text-[#a1a1aa] group-hover:text-white transition-colors">
                      <Maximize2 className="w-3 h-3 text-[#ccff00]" />
                      <span>Click to Expand</span>
                    </span>
                    <span className="text-[#8e9290]">Audio Reactive</span>
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
