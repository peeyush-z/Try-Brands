/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Award, TrendingUp, Users, CheckCircle2 } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';
import { sound } from '../utils/sound';

export const ProofSection: React.FC = () => {
  const { testimonials, setCursor } = useAgency();
  const [activeIdx, setActiveIdx] = useState(0);

  const activeTestimonials = testimonials.filter((t) => t.isActive);

  const nextTestimonial = () => {
    sound.playTick(650);
    setActiveIdx((prev) => (prev + 1) % activeTestimonials.length);
  };

  const prevTestimonial = () => {
    sound.playTick(650);
    setActiveIdx((prev) => (prev - 1 + activeTestimonials.length) % activeTestimonials.length);
  };

  const current = activeTestimonials[activeIdx] || activeTestimonials[0];

  return (
    <section id="proof" className="py-24 border-b border-[#1f2621]/80 bg-[#070707] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Kinetic Metric Counters Grid - Clean Swiss Style */}
        <div className="mb-16">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
            <span className="text-[#ccff00]">QUANTITATIVE IMPACT</span>
            <span aria-hidden="true">·</span>
            <span>MEASURABLE OUTCOMES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-display break-words mb-10">
            Proof of Transformational Impact
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-zinc-900">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold text-white font-mono-tabular">
                $180M+
              </div>
              <div className="text-sm font-semibold text-zinc-200">
                Venture Capital Raised
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                By client partners across Seed to Series C following visual repositioning.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold text-white font-mono-tabular">
                38+
              </div>
              <div className="text-sm font-semibold text-zinc-200">
                Global Design Honors
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Awwwards Site of the Day, FWA of the Month, and Red Dot: Best of Best.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold text-white font-mono-tabular">
                48+
              </div>
              <div className="text-sm font-semibold text-zinc-200">
                Global Category Brands
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                From San Francisco and New York to Tokyo, London, and Berlin.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold text-[#ccff00] font-mono-tabular">
                99.2%
              </div>
              <div className="text-sm font-semibold text-zinc-200">
                Client Retention Rate
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Annual recurring creative advisory partnerships and design retainers.
              </p>
            </div>
          </div>
        </div>

        {/* Executive Testimonial Carousel - Minimalist & Refined */}
        {current && (
          <div className="rounded-xl bg-zinc-950 border border-zinc-800/80 p-6 sm:p-10 lg:p-12 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Quote & Narrative */}
              <div className="lg:col-span-8 space-y-5">
                <div className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">
                  Client Endorsement
                </div>

                <blockquote className="text-lg sm:text-xl md:text-2xl text-zinc-100 font-normal leading-relaxed text-balance">
                  "{current.quote}"
                </blockquote>

                <div className="pt-4 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={current.avatarUrl}
                      alt={current.author}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-zinc-800"
                    />
                    <div>
                      <div className="text-sm font-bold text-white">
                        {current.author}
                      </div>
                      <div className="text-xs text-zinc-500 font-mono">
                        {current.role} · <span className="text-zinc-300">{current.company}</span>
                      </div>
                    </div>
                  </div>

                  {/* Impact Metric Badge */}
                  <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 font-mono text-xs">
                    <span className="text-zinc-400">{current.metricLabel}: </span>
                    <span className="text-[#ccff00] font-semibold">{current.metricValue}</span>
                  </div>
                </div>
              </div>

              {/* Right Controls & Carousel Indicator */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-between space-y-4 lg:border-l lg:border-zinc-900 lg:pl-8">
                <div className="text-center lg:text-right">
                  <div className="text-4xl font-extrabold text-[#ccff00] font-mono-tabular">
                    0{activeIdx + 1}
                    <span className="text-sm text-[#8e9290] font-normal"> / 0{activeTestimonials.length}</span>
                  </div>
                  <div className="text-xs text-[#8e9290] font-mono mt-1 uppercase tracking-wider">
                    Verified Partnership
                  </div>
                </div>

                {/* Slider Navigation Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevTestimonial}
                    onMouseEnter={() => setCursor('hover')}
                    onMouseLeave={() => setCursor('default')}
                    className="p-3 rounded-xl border border-[#232b25] bg-[#121614] hover:border-[#ccff00] hover:text-[#ccff00] text-white transition-colors cursor-pointer"
                    aria-label="Previous Testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    onMouseEnter={() => setCursor('hover')}
                    onMouseLeave={() => setCursor('default')}
                    className="p-3 rounded-xl border border-[#232b25] bg-[#121614] hover:border-[#ccff00] hover:text-[#ccff00] text-white transition-colors cursor-pointer"
                    aria-label="Next Testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
