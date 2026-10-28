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
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
              <span className="text-[#ccff00]">CLIENT PARTNERS</span>
              <span aria-hidden="true">·</span>
              <span>10 ENTERPRISE ROSTER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-display break-words">
              Trusted by Industry Vanguard Brands
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
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-pressed={isPaused}
              aria-label={isPaused ? 'Play infinite client carousel' : 'Pause infinite client carousel for accessibility'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#ccff00]" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Client Reel - Clean & Uncluttered */}
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
        {/* Soft edge fade masks */}
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
                setCursor('hover');
                setActiveClientInfo(client);
              }}
              onMouseLeave={() => {
                setCursor('default');
              }}
              className="group relative w-72 sm:w-80 p-5 sm:p-6 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors duration-300 flex-shrink-0 cursor-pointer select-none flex flex-col justify-between"
            >
              <div>
                {/* Header: Partnership Year & Client Index */}
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-4">
                  <span className="text-[#ccff00] font-medium">{client.partnershipYear}</span>
                  <span className="text-zinc-600">0{((idx % 10) + 1).toString().padStart(2, '0')}</span>
                </div>

                {/* Brand Monogram / Logo Mark - NO zoom in */}
                <div className="flex items-center gap-3.5 mb-4">
                  {client.logoUrl ? (
                    <div className="w-11 h-11 rounded-lg bg-white/95 border border-zinc-800 p-1 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src={client.logoUrl}
                        alt={`${client.name} logo`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-display font-bold text-[#ccff00] text-xs tracking-wider">
                      {client.symbolText.slice(0, 3)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-zinc-200 transition-colors tracking-tight flex items-center gap-1.5">
                      <span>{client.name}</span>
                      {client.websiteUrl && (
                        <a
                          href={client.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-zinc-500 hover:text-white transition-colors"
                          title="Visit official website"
                        >
                          <ArrowRight className="w-3 h-3 -rotate-45" />
                        </a>
                      )}
                    </h3>
                    <p className="text-xs text-zinc-500 font-sans">
                      {client.industry}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Result Metric */}
              <div className="mt-4 pt-3.5 border-t border-zinc-900 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">
                    Verified Outcome
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white font-mono-tabular">
                    {client.impactMetric}
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 group-hover:text-white group-hover:bg-zinc-800 transition-colors">
                  <ArrowRight className="w-3 h-3" />
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
