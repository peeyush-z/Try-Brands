/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowDown, Play, Sparkles } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';
import { sound } from '../utils/sound';

export const HeroSection: React.FC = () => {
  const { setCursor, setActiveReel, reels, setIsInquiryOpen } = useAgency();
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleWatchShowreel = () => {
    sound.playPop(600);
    const firstReel = reels.find((r) => r.isActive) || reels[0];
    if (firstReel) {
      setActiveReel(firstReel);
    }
  };

  const scrollToWork = () => {
    sound.playTick(600);
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden pt-12 pb-16 border-b border-[#1f2621]/80">
      {/* Background ambient video with dark vignette and grain */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-20' : 'opacity-0'
          }`}
          src="/videos/hero-reel.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/80 to-[#070707]/90" />
        <div className="absolute inset-0 grain-overlay opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto overflow-hidden">
        <div className="max-w-3xl space-y-6 sm:space-y-8">
          {/* Subtle Category Kicker - Clean unboxed text */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono uppercase tracking-widest text-zinc-500">
            <span className="text-[#ccff00]">TRY-BRANDS</span>
            <span aria-hidden="true" className="text-zinc-700">/</span>
            <span>BRAND EXPERIENCE & MOTION</span>
            <span aria-hidden="true" className="text-zinc-700">/</span>
            <span>2026</span>
          </div>

          {/* Refined Minimalist Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] font-display break-words">
            Architects of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#ccff00]">
              Digital Brand Desire.
            </span>
          </h1>

          {/* Value proposition subtext */}
          <p className="text-base sm:text-lg text-zinc-400 max-w-xl font-normal leading-relaxed">
            We partner with category leaders and ambitious founders to engineer distinctive brand identities,
            short-form video systems, and immersive web flagships.
          </p>

          {/* Clean Minimalist Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => {
                sound.playPop(700);
                setIsInquiryOpen(true);
              }}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={() => setCursor('default')}
              className="px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-black bg-[#ccff00] hover:bg-[#d4ff3f] active:scale-95 rounded-lg transition-colors cursor-pointer"
            >
              Initiate Discovery
            </button>

            <button
              onClick={handleWatchShowreel}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={() => setCursor('default')}
              className="group flex items-center gap-2.5 px-5 py-3.5 text-xs font-mono font-medium uppercase tracking-wider text-zinc-300 border border-zinc-800 hover:border-zinc-600 rounded-lg bg-zinc-900/60 backdrop-blur-sm transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-[#ccff00] fill-current" />
              <span>Watch Reel</span>
            </button>

            <button
              onClick={scrollToWork}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={() => setCursor('default')}
              className="hidden lg:flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition-colors ml-3 cursor-pointer"
            >
              <ArrowDown className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>Scroll</span>
            </button>
          </div>
        </div>
      </div>

      {/* Clean Uncluttered Metrics Strip */}
      <div className="relative z-10 w-full mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-zinc-900">
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono-tabular">
              $180M+
            </div>
            <div className="text-xs text-zinc-500 mt-0.5 font-mono">
              Client Venture Raised
            </div>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono-tabular">
              38+
            </div>
            <div className="text-xs text-zinc-500 mt-0.5 font-mono">
              Design & FWA Honors
            </div>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-bold text-white font-mono-tabular">
              10
            </div>
            <div className="text-xs text-zinc-500 mt-0.5 font-mono">
              Enterprise Partners
            </div>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#ccff00] font-mono-tabular">
              +240%
            </div>
            <div className="text-xs text-zinc-500 mt-0.5 font-mono">
              D2C Velocity Metric
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
