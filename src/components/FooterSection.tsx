/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowUp, Globe, Clock, Shield } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';
import { sound } from '../utils/sound';

export const FooterSection: React.FC = () => {
  const { setCursor, setIsInquiryOpen, setIsAdminOpen } = useAgency();
  const [times, setTimes] = useState({
    sf: '',
    nyc: '',
    lon: '',
    tyo: '',
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimes({
        sf: now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', hour12: false }),
        nyc: now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hour12: false }),
        lon: now.toLocaleTimeString('en-US', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: false }),
        tyo: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', hour12: false }),
      });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sound.playTick(800);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050605] border-t border-[#1f2621]/80 text-[#a1a1aa] overflow-hidden pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Massive Kinetic Headline Call-to-Action */}
        <div className="pb-16 border-b border-[#1b221d]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ccff00] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
            <span>ACCEPTING SELECT Q2/Q3 2026 ENGAGEMENTS</span>
          </div>

          <h2 style={{ fontSize: '81.8px' }} className="font-extrabold tracking-tight text-white leading-[1.02] font-display text-[81.8px]">
            LET'S BUILD SOMETHING <br />
            <span style={{ fontSize: '81.8px' }} className="text-[81.8px] text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e4e4e7] to-[#ccff00]">
              UNFORGETTABLE.
            </span>
          </h2>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                sound.playPop(750);
                setIsInquiryOpen(true);
              }}
              onMouseEnter={() => setCursor('hover', 'START')}
              onMouseLeave={() => setCursor('default')}
              className="px-8 py-5 text-sm sm:text-base font-bold font-mono uppercase tracking-wider text-black bg-[#ccff00] hover:bg-[#d4ff3f] active:scale-95 rounded-xl transition-all shadow-[0_0_40px_-5px_rgba(204,255,0,0.5)] flex items-center gap-2 cursor-pointer"
            >
              <span>Schedule Strategic Discovery</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="mailto:partner@try-brands.com"
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={() => setCursor('default')}
              className="px-7 py-5 text-sm sm:text-base font-mono uppercase tracking-wider text-white border border-[#232b25] hover:border-[#ccff00]/50 rounded-xl bg-[#0f1210] transition-colors"
            >
              partner@try-brands.com
            </a>
          </div>
        </div>

        {/* Global Timezones Strip */}
        <div className="py-12 border-b border-[#1b221d] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-[11px] font-mono text-[#8e9290] uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-[#ccff00]" />
              <span>San Francisco (HQ)</span>
            </div>
            <div className="text-xl font-bold text-white font-mono-tabular">
              {times.sf || '--:--'} <span className="text-xs text-[#8e9290] font-normal">PST</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-mono text-[#8e9290] uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-[#ccff00]" />
              <span>New York City</span>
            </div>
            <div className="text-xl font-bold text-white font-mono-tabular">
              {times.nyc || '--:--'} <span className="text-xs text-[#8e9290] font-normal">EST</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-mono text-[#8e9290] uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-[#ccff00]" />
              <span>London</span>
            </div>
            <div className="text-xl font-bold text-white font-mono-tabular">
              {times.lon || '--:--'} <span className="text-xs text-[#8e9290] font-normal">GMT</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-mono text-[#8e9290] uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-[#ccff00]" />
              <span>Tokyo</span>
            </div>
            <div className="text-xl font-bold text-white font-mono-tabular">
              {times.tyo || '--:--'} <span className="text-xs text-[#8e9290] font-normal">JST</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Socials, Back to Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono">
          <div className="flex items-center gap-4 text-[#8e9290]">
            <span>© 2026 TRY-BRANDS INC. ALL RIGHTS RESERVED.</span>
            <span aria-hidden="true">·</span>
            <span>RNO1-INSPIRED ARCHITECTURE</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 text-[#a1a1aa]">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ccff00] transition-colors"
            >
              X / TWITTER
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ccff00] transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ccff00] transition-colors"
            >
              LINKEDIN
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ccff00] transition-colors"
            >
              GITHUB
            </a>
          </div>

          {/* Actions: Admin Portal Trigger & Scroll Top */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playPop(500);
                setIsAdminOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#232b25] bg-[#0d100e] text-[#8e9290] hover:text-[#ccff00] hover:border-[#ccff00]/40 transition-colors cursor-pointer"
            >
              <Shield className="w-3 h-3 text-[#ccff00]" />
              <span>CMS Admin</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg border border-[#232b25] bg-[#0d100e] text-[#8e9290] hover:text-white hover:border-[#ccff00]/40 transition-colors cursor-pointer"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
