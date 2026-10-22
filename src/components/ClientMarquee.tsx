/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';
import { sound } from '../utils/sound';
import { ClientBrand } from '../types';

export const ClientMarquee: React.FC = () => {
  const { clients, setCursor, setIsInquiryOpen } = useAgency();
  const [isPaused, setIsPaused] = useState(false);
  const [activeClientInfo, setActiveClientInfo] = useState<ClientBrand | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeClients = clients.filter((c) => c.isActive);

  // Ensure seamless infinite loop by duplicating clients array
  const displayClients = [...activeClients, ...activeClients];

  // Touch event listeners for mobile swipe & pause accessibility
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    setTouchStartX(null);
  };

  return (
    <section
      id="clients"
      className="py-20 border-b border-[#1f2621]/80 bg-[#070908] relative overflow-hidden"
      aria-label="10 Global Client Partnerships Marquee"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8e9290] mb-2">
              <span className="text-[#ccff00]">GLOBAL CLIENT PORTFOLIO</span>
              <span aria-hidden="true">·</span>
              <span>10 ENTERPRISE PARTNERS</span>
              <span aria-hidden="true">·</span>
              <span>ESTABLISHED 2023–2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white font-display">
              Trusted by 10 Industry Vanguard Brands
            </h2>
          </div>

          {/* Accessibility Pause / Play toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playTick(500);
                setIsPaused(!isPaused);
              }}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={() => setCursor('default')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#232b25] bg-[#0d100e] text-xs font-mono text-[#8e9290] hover:text-[#ccff00] hover:border-[#ccff00]/40 transition-colors cursor-pointer"
              aria-pressed={isPaused}
              aria-label={isPaused ? 'Play infinite client carousel' : 'Pause infinite client carousel for accessibility'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#ccff00]" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isPaused ? 'Auto-Scroll Paused' : 'Hover / Tap to Pause'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Client Reel with Touch Handling & Smooth Hover Transitions */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-live="polite"
      >
        {/* Soft edge fade masks for seamless bleed */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#070908] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#070908] to-transparent z-10" />

        <div
          className={`flex gap-5 py-4 w-max ${
            isPaused ? '' : 'animate-marquee-slow'
          }`}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {displayClients.map((client, idx) => (
            <div
              key={`${client.id}-${idx}`}
              onClick={() => {
                sound.playTick(600);
                setActiveClientInfo(client);
              }}
              onMouseEnter={() => {
                setCursor('hover', 'CLIENT');
                setActiveClientInfo(client);
              }}
              onMouseLeave={() => {
                setCursor('default');
              }}
              className="group relative w-72 sm:w-80 p-6 rounded-xl bg-[#0d100e] border border-[#1f2621] hover:border-[#ccff00] hover:bg-[#121613] transition-all duration-300 flex-shrink-0 cursor-pointer select-none flex flex-col justify-between"
            >
              <div>
                {/* Header: Partnership Year & Client Index */}
                <div className="flex items-center justify-between text-[11px] font-mono text-[#8e9290] mb-4">
                  <span className="tracking-wider text-[#ccff00]/90">{client.partnershipYear}</span>
                  <span className="text-[#3c473f]">0{((idx % 10) + 1).toString().padStart(2, '0')}</span>
                </div>

                {/* Brand Typographic Monogram / Logo Mark */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#161d18] border border-[#263129] flex items-center justify-center font-display font-extrabold text-[#ccff00] text-sm tracking-wider group-hover:scale-105 group-hover:border-[#ccff00]/40 transition-transform">
                    {client.symbolText.slice(0, 3)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#ccff00] transition-colors font-display tracking-tight">
                      {client.name}
                    </h3>
                    <p className="text-xs text-[#8e9290] font-sans">
                      {client.industry}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Result Metric */}
              <div className="mt-4 pt-4 border-t border-[#1b221d] flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-widest text-[#8e9290]">
                    Verified Outcome
                  </div>
                  <div className="text-sm font-bold text-white font-mono-tabular group-hover:text-[#ccff00] transition-colors">
                    {client.impactMetric}
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#18201a] flex items-center justify-center text-[#8e9290] group-hover:text-black group-hover:bg-[#ccff00] transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sub-strip with partnership callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8e9290] border-t border-[#1a201c] pt-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
          <span>Full NDA & Strategic Confidentiality Standard Across All Engagements</span>
        </div>
        <button
          onClick={() => {
            sound.playPop(600);
            setIsInquiryOpen(true);
          }}
          className="hover:text-white text-[#ccff00] flex items-center gap-1 cursor-pointer"
        >
          <span>Join the Try-Brands Roster</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </section>
  );
};
