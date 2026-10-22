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
          className={`w-full h-full object-cover opacity-25 scale-105 transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-25' : 'opacity-0'
          }`}
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/70 to-[#070707]/90" />
        <div className="absolute inset-0 grain-overlay opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="max-w-4xl space-y-8">
          {/* Subtle Category Kicker - Clean unboxed text */}
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#8e9290]">
            <span className="text-[#ccff00]">TRY-BRANDS STUDIO</span>
            <span aria-hidden="true" className="text-[#2e3731]">/</span>
            <span>RNO1-INSPIRED DIGITAL FLAGSHIP</span>
            <span aria-hidden="true" className="text-[#2e3731]">/</span>
            <span>EST. 2026</span>
          </div>

          {/* Kinetic Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight text-white leading-[1.02] font-display text-balance">
            ARCHITECTS OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f0f0f0] to-[#ccff00]">
              DIGITAL DESIRE.
            </span>
          </h1>

          {/* Value proposition subtext */}
          <p className="text-lg sm:text-xl text-[#a1a1aa] max-w-2xl font-normal leading-relaxed">
            We partner with category leaders and ambitious founders to forge disruptive brand identities,
            3D motion, and fluid web experiences that leave competitors obsolete.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                sound.playPop(700);
                setIsInquiryOpen(true);
              }}
              onMouseEnter={() => setCursor('hover', 'TALK')}
              onMouseLeave={() => setCursor('default')}
              className="px-7 py-4 text-xs sm:text-sm font-bold font-mono uppercase tracking-wider text-black bg-[#ccff00] hover:bg-[#d4ff3f] active:scale-95 rounded-lg transition-all shadow-[0_0_35px_-8px_rgba(204,255,0,0.5)] cursor-pointer"
            >
              Initiate Discovery
            </button>

            <button
              onClick={handleWatchShowreel}
              onMouseEnter={() => setCursor('media', 'PLAY')}
              onMouseLeave={() => setCursor('default')}
              className="group flex items-center gap-3 px-6 py-4 text-xs sm:text-sm font-bold font-mono uppercase tracking-wider text-white border border-[#232b25] hover:border-[#ccff00]/50 rounded-lg bg-[#0e110f]/80 backdrop-blur-sm transition-all cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-[#1b221d] flex items-center justify-center group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              <span>Watch 2026 Reel</span>
            </button>

            <button
              onClick={scrollToWork}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={() => setCursor('default')}
              className="hidden lg:flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8e9290] hover:text-white transition-colors ml-4 cursor-pointer"
            >
              <ArrowDown className="w-3.5 h-3.5 text-[#ccff00] animate-bounce" />
              <span>Scroll to explore</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full-width 4-metric strip below hero */}
      <div className="relative z-10 w-full mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#1f2621]/80">
          <div className="p-4 rounded-lg bg-[#0b0d0c]/70 border border-[#1a201c]">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#ccff00] font-mono-tabular">
              $180M+
            </div>
            <div className="text-xs text-[#8e9290] mt-1 font-mono uppercase tracking-wide">
              Client Venture Capital
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#0b0d0c]/70 border border-[#1a201c]">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono-tabular">
              38+
            </div>
            <div className="text-xs text-[#8e9290] mt-1 font-mono uppercase tracking-wide">
              Awwwards & FWA Honors
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#0b0d0c]/70 border border-[#1a201c]">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono-tabular">
              10
            </div>
            <div className="text-xs text-[#8e9290] mt-1 font-mono uppercase tracking-wide">
              Global Category Leaders
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#0b0d0c]/70 border border-[#1a201c]">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#ccff00] font-mono-tabular flex items-center gap-1.5">
              <span>99.2%</span>
              <Sparkles className="w-4 h-4 text-[#ccff00]" />
            </div>
            <div className="text-xs text-[#8e9290] mt-1 font-mono uppercase tracking-wide">
              Client Retention Rate
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
