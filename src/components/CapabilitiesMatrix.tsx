/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';
import { sound } from '../utils/sound';

export const CapabilitiesMatrix: React.FC = () => {
  const { capabilities, setCursor, setIsInquiryOpen } = useAgency();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCapability = capabilities[activeIndex] || capabilities[0];

  return (
    <section id="capabilities" className="py-24 border-b border-[#1f2621]/80 bg-[#070707] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
            <span className="text-[#ccff00]">CAPABILITIES</span>
            <span aria-hidden="true">·</span>
            <span>STRATEGY TO EXECUTION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-display break-words">
            How We Build Category Dominance
          </h2>
        </div>

        {/* 2-Column Scrub Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Interactive Service Chapters */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-2.5">
            {capabilities.map((cap, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={cap.id}
                  onClick={() => {
                    sound.playPop(520);
                    setActiveIndex(idx);
                  }}
                  onMouseEnter={() => {
                    setActiveIndex(idx);
                    setCursor('hover');
                  }}
                  onMouseLeave={() => setCursor('default')}
                  className={`p-5 sm:p-6 rounded-xl border transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 border-zinc-600'
                      : 'bg-zinc-950 border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`text-xs font-mono font-semibold ${
                          isActive ? 'text-[#ccff00]' : 'text-zinc-500'
                        }`}
                      >
                        {cap.index}.
                      </span>
                      <h3
                        className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                          isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                        }`}
                      >
                        {cap.title}
                      </h3>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        isActive ? 'text-[#ccff00]' : 'text-zinc-600'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Expanded deliverables when active */}
                  {isActive && (
                    <div className="mt-4 pt-4 border-t border-zinc-800 animate-fadeIn">
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                        {cap.tagline}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        {cap.deliverables.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            className="flex items-center gap-2 text-xs font-mono text-zinc-400"
                          >
                            <Check className="w-3 h-3 text-[#ccff00] flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-zinc-800 text-xs font-mono">
                        <span className="text-[#ccff00]">
                          Metric: {cap.accentMetric}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playPop(650);
                            setIsInquiryOpen(true);
                          }}
                          className="text-zinc-400 hover:text-white underline underline-offset-4 cursor-pointer"
                        >
                          Request Scope →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Media Reveal */}
          <div className="lg:col-span-5 h-[320px] lg:h-auto min-h-[320px] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 relative flex flex-col justify-end p-6">
            <img
              key={activeCapability.id}
              src={activeCapability.mediaUrl}
              alt={activeCapability.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="relative z-10 space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00]">
                Capability 0{activeCapability.index}
              </div>
              <h4 className="text-xl font-bold text-white">
                {activeCapability.title}
              </h4>
              <p className="text-xs text-zinc-400 font-mono">
                {activeCapability.accentMetric}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
