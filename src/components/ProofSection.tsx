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
        {/* Kinetic Metric Counters Grid */}
        <div className="mb-20">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8e9290] mb-2">
            <span className="text-[#ccff00]">QUANTITATIVE RIGOR</span>
            <span aria-hidden="true">·</span>
            <span>MEASURABLE ENTERPRISE OUTCOMES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display mb-12">
            Proof of Transformational Impact
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-[#0d100e] border border-[#1f2621] relative overflow-hidden group hover:border-[#ccff00] transition-colors">
              <div className="text-4xl sm:text-5xl font-extrabold text-[#ccff00] font-mono-tabular tracking-tight">
                $180M+
              </div>
              <div className="mt-3 text-sm font-bold text-white font-display">
                Venture Capital Raised
              </div>
              <p className="mt-1 text-xs text-[#8e9290] leading-relaxed">
                By client partners across Seed to Series C following visual repositioning.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0d100e] border border-[#1f2621] relative overflow-hidden group hover:border-[#ccff00] transition-colors">
              <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono-tabular tracking-tight">
                38+
              </div>
              <div className="mt-3 text-sm font-bold text-white font-display">
                Global Design Honors
              </div>
              <p className="mt-1 text-xs text-[#8e9290] leading-relaxed">
                Awwwards Site of the Day, FWA of the Month, and Red Dot: Best of Best.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0d100e] border border-[#1f2621] relative overflow-hidden group hover:border-[#ccff00] transition-colors">
              <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono-tabular tracking-tight">
                48+
              </div>
              <div className="mt-3 text-sm font-bold text-white font-display">
                Global Category Brands
              </div>
              <p className="mt-1 text-xs text-[#8e9290] leading-relaxed">
                From San Francisco and New York to Tokyo, London, and Berlin.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0d100e] border border-[#1f2621] relative overflow-hidden group hover:border-[#ccff00] transition-colors">
              <div className="text-4xl sm:text-5xl font-extrabold text-[#ccff00] font-mono-tabular tracking-tight">
                99.2%
              </div>
              <div className="mt-3 text-sm font-bold text-white font-display">
                Client Retention & Re-up
              </div>
              <p className="mt-1 text-xs text-[#8e9290] leading-relaxed">
                Annual recurring creative advisory partnerships and design retainers.
              </p>
            </div>
          </div>
        </div>

        {/* Executive Testimonial Carousel */}
        {current && (
          <div className="rounded-3xl bg-[#0b0e0c] border border-[#222a24] p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            {/* Ambient Acid Hue */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Quote & Narrative */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ccff00]">
                  <Quote className="w-4 h-4 fill-current rotate-180" />
                  <span>Executive Endorsement</span>
                </div>

                <blockquote className="text-xl sm:text-2xl md:text-3xl text-white font-normal leading-relaxed font-display text-balance">
                  "{current.quote}"
                </blockquote>

                <div className="pt-4 border-t border-[#1f2621] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={current.avatarUrl}
                      alt={current.author}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border border-[#303c33]"
                    />
                    <div>
                      <div className="text-base font-bold text-white font-display">
                        {current.author}
                      </div>
                      <div className="text-xs text-[#8e9290] font-mono">
                        {current.role} · <span className="text-white">{current.company}</span>
                      </div>
                    </div>
                  </div>

                  {/* Impact Metric Badge */}
                  <div className="px-4 py-2 rounded-xl bg-[#121614] border border-[#263128] font-mono text-xs">
                    <span className="text-[#8e9290]">{current.metricLabel}: </span>
                    <span className="text-[#ccff00] font-bold">{current.metricValue}</span>
                  </div>
                </div>
              </div>

              {/* Right Controls & Carousel Indicator */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-between space-y-6 lg:border-l lg:border-[#1f2621] lg:pl-10">
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
