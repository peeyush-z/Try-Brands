/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X, ArrowUpRight, Check, Quote, ExternalLink, Calendar, Layers, Sparkles } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';
import { sound } from '../utils/sound';

export const CaseStudyModal: React.FC = () => {
  const { activeCaseStudy, setActiveCaseStudy, setIsInquiryOpen, setCursor } = useAgency();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playTick(450);
        setActiveCaseStudy(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveCaseStudy]);

  if (!activeCaseStudy) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/90 backdrop-blur-xl overflow-y-auto animate-fadeIn"
      onClick={() => {
        sound.playTick(450);
        setActiveCaseStudy(null);
      }}
    >
      <div
        className="relative w-full max-w-5xl my-auto rounded-3xl bg-[#090b0a] border border-[#232b25] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Nav with Close Button */}
        <div className="sticky top-0 z-20 px-6 py-4 border-b border-[#1f2621] bg-[#090b0a]/95 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-[#ccff00] uppercase tracking-wider">
              {activeCaseStudy.client}
            </span>
            <span className="text-xs text-[#8e9290]">/</span>
            <span className="text-xs font-mono text-[#a1a1aa] uppercase tracking-wider">
              {activeCaseStudy.category}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playTick(450);
              setActiveCaseStudy(null);
            }}
            className="p-2 rounded-full bg-[#161a17] hover:bg-[#202722] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Pane */}
        <div className="overflow-y-auto p-6 sm:p-10 lg:p-12 space-y-12">
          {/* Hero Media Banner */}
          <div className="relative w-full h-[320px] sm:h-[440px] rounded-2xl overflow-hidden border border-[#222a24]">
            {activeCaseStudy.heroMediaType === 'video' || activeCaseStudy.heroMediaUrl.endsWith('.mp4') ? (
              <video
                src={activeCaseStudy.heroMediaUrl}
                poster={activeCaseStudy.thumbnailUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={activeCaseStudy.heroMediaUrl}
                alt={activeCaseStudy.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090b0a] via-transparent to-black/20" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-white bg-black/70 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10">
                Released: {activeCaseStudy.year}
              </div>
              {activeCaseStudy.liveUrl && (
                <a
                  href={activeCaseStudy.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-black bg-[#ccff00] hover:bg-[#d4ff3f] px-3.5 py-1.5 rounded-lg transition-colors"
                >
                  <span>Visit Production Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Title & Overview */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
              {activeCaseStudy.title}
            </h1>
            <p className="text-lg text-[#d4d4d8] leading-relaxed max-w-3xl">
              {activeCaseStudy.description}
            </p>
          </div>

          {/* Quantitative Impact Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#0f1210] border border-[#1f2621]">
            {activeCaseStudy.metrics.map((metric, i) => (
              <div key={i} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#ccff00] font-mono-tabular">
                  {metric.value}
                </div>
                <div className="text-xs font-mono text-[#8e9290] uppercase tracking-wide">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Challenge & Solution 2-Column Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="p-7 rounded-2xl bg-[#0d100e] border border-[#1f2621] space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">
                01. The Strategic Challenge
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Overcoming Category Inertia
              </h3>
              <p className="text-sm text-[#a1a1aa] leading-relaxed">
                {activeCaseStudy.challenge}
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#0d100e] border border-[#1f2621] space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">
                02. The Creative Solution
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Uncompromising Architectural Execution
              </h3>
              <p className="text-sm text-[#a1a1aa] leading-relaxed">
                {activeCaseStudy.solution}
              </p>
            </div>
          </div>

          {/* Key Deliverables Matrix */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#8e9290]">
              Key Scope & Deliverables
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeCaseStudy.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#0d100e] border border-[#1a201c] text-xs font-mono text-[#d4d4d8]"
                >
                  <Check className="w-4 h-4 text-[#ccff00] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Client Executive Quote */}
          {activeCaseStudy.clientQuote && (
            <div className="p-8 rounded-2xl bg-[#0f1210] border border-[#232b25] relative">
              <Quote className="w-8 h-8 text-[#ccff00]/20 absolute top-6 right-6 fill-current rotate-180" />
              <blockquote className="text-lg sm:text-xl text-white font-display leading-relaxed">
                "{activeCaseStudy.clientQuote.quote}"
              </blockquote>
              <div className="mt-4 pt-4 border-t border-[#1f2621] text-xs font-mono">
                <span className="font-bold text-white">{activeCaseStudy.clientQuote.author}</span>
                <span className="text-[#8e9290]"> — {activeCaseStudy.clientQuote.role}</span>
              </div>
            </div>
          )}

          {/* Art Direction Gallery */}
          {activeCaseStudy.gallery && activeCaseStudy.gallery.length > 0 && (
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-[#8e9290]">
                Art Direction & Production Stills
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {activeCaseStudy.gallery.map((imgUrl, gIdx) => (
                  <div key={gIdx} className="h-48 rounded-xl overflow-hidden border border-[#1f2621]">
                    <img
                      src={imgUrl}
                      alt={`${activeCaseStudy.client} Production Still ${gIdx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Conversion CTA Strip */}
          <div className="pt-8 border-t border-[#1f2621] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold text-white font-display">
                Ready to achieve similar velocity?
              </h4>
              <p className="text-xs text-[#8e9290] font-mono mt-0.5">
                We take on a maximum of 4 concurrent client flagships per quarter.
              </p>
            </div>
            <button
              onClick={() => {
                sound.playPop(700);
                setActiveCaseStudy(null);
                setIsInquiryOpen(true);
              }}
              className="px-6 py-3.5 text-xs font-bold font-mono uppercase tracking-wider text-black bg-[#ccff00] hover:bg-[#d4ff3f] rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Initiate Similar Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
