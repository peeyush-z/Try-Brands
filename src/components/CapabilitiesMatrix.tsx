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
    <section id="capabilities" className="py-24 border-b border-[#1f2621]/80 bg-[#090b0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8e9290] mb-2">
            <span className="text-[#ccff00]">END-TO-END CAPABILITIES</span>
            <span aria-hidden="true">·</span>
            <span>STRATEGY TO EXECUTION</span>
            <span aria-hidden="true">·</span>
            <span>AESTHETIC & TECHNICAL MASTERY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display">
            How We Build Category Dominance
          </h2>
        </div>

        {/* 2-Column Interactive Scrub Matrix: Left Accordion List, Right Dynamic High-Res Media */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left: Interactive Service Chapters */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
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
                    sound.playTick(750);
                    setActiveIndex(idx);
                    setCursor('hover', 'EXPLORE');
                  }}
                  onMouseLeave={() => setCursor('default')}
                  className={`p-6 sm:p-7 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#121614] border-[#ccff00] shadow-[0_0_30px_-10px_rgba(204,255,0,0.2)]'
                      : 'bg-[#0d100e] border-[#1f2621] hover:border-[#38433b]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-sm font-mono font-bold ${
                          isActive ? 'text-[#ccff00]' : 'text-[#8e9290]'
                        }`}
                      >
                        {cap.index}.
                      </span>
                      <h3
                        className={`text-xl sm:text-2xl font-bold font-display tracking-tight transition-colors ${
                          isActive ? 'text-white' : 'text-[#a1a1aa] group-hover:text-white'
                        }`}
                      >
                        {cap.title}
                      </h3>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                        isActive ? 'bg-[#ccff00] text-black' : 'text-[#8e9290]'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Expanded deliverables when active */}
                  {isActive && (
                    <div className="mt-5 pt-5 border-t border-[#1f2621] animate-fadeIn">
                      <p className="text-sm text-[#d4d4d8] leading-relaxed mb-4">
                        {cap.tagline}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                        {cap.deliverables.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            className="flex items-center gap-2 text-xs font-mono text-[#8e9290]"
                          >
                            <Check className="w-3.5 h-3.5 text-[#ccff00] flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[#1a201c] text-xs font-mono">
                        <span className="text-[#ccff00] font-semibold">
                          Target Metric: {cap.accentMetric}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playPop(650);
                            setIsInquiryOpen(true);
                          }}
                          className="text-white hover:text-[#ccff00] underline underline-offset-4 cursor-pointer"
                        >
                          Request Scope & Timeline →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Dynamic High-Res Media Reveal */}
          <div className="lg:col-span-5 h-[380px] lg:h-auto min-h-[380px] rounded-2xl overflow-hidden bg-[#111412] border border-[#222a24] relative shadow-2xl flex flex-col justify-end p-6 sm:p-8">
            <img
              key={activeCapability.id}
              src={activeCapability.mediaUrl}
              alt={activeCapability.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

            <div className="relative z-10 space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">
                Capability Spotlight {activeCapability.index}
              </div>
              <h4 className="text-2xl font-bold text-white font-display">
                {activeCapability.title}
              </h4>
              <p className="text-xs text-[#a1a1aa] font-mono">
                {activeCapability.accentMetric}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
