/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Volume2, VolumeX, Shield, ArrowUpRight, Menu, X } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';
import { sound } from '../utils/sound';

export const Navbar: React.FC = () => {
  const { isMuted, toggleSound, setIsInquiryOpen, setIsAdminOpen, setCursor } = useAgency();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    sound.playTick(680);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1f2621]/80 bg-[#070707]/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            sound.playTick(800);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onMouseEnter={() => setCursor('hover', 'HOME')}
          onMouseLeave={() => setCursor('default')}
          className="group flex items-center gap-2 whitespace-nowrap shrink-0 text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-90 font-display"
        >
          <span className="text-[#ccff00]">TRY-BRANDS</span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#8e9290] group-hover:text-[#ccff00] transition-colors">®</span>
        </a>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#a1a1aa]">
          <button
            onClick={() => handleNavClick('reels')}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={() => setCursor('default')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 text-left cursor-pointer"
          >
            Reels
          </button>
          <button
            onClick={() => handleNavClick('clients')}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={() => setCursor('default')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 text-left cursor-pointer"
          >
            Clients
          </button>
          <button
            onClick={() => handleNavClick('work')}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={() => setCursor('default')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 text-left cursor-pointer"
          >
            Work
          </button>
          <button
            onClick={() => handleNavClick('capabilities')}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={() => setCursor('default')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 text-left cursor-pointer"
          >
            Capabilities
          </button>
          <button
            onClick={() => handleNavClick('proof')}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={() => setCursor('default')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 text-left cursor-pointer"
          >
            Proof
          </button>
        </nav>

        {/* Zone 3: 1 primary action area */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Sound / sensory cue toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={() => setCursor('default')}
            className="p-2.5 rounded-lg border border-[#1f2621] text-[#a1a1aa] hover:text-[#ccff00] hover:border-[#ccff00]/40 transition-colors bg-[#0f1210] cursor-pointer"
            title={isMuted ? 'Unmute Sensory Audio' : 'Mute Sensory Audio'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#8e9290]" /> : <Volume2 className="w-4 h-4 text-[#ccff00]" />}
          </button>

          {/* Admin CMS portal shortcut */}
          <button
            onClick={() => {
              sound.playPop(500);
              setIsAdminOpen(true);
            }}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={() => setCursor('default')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium text-[#8e9290] hover:text-white border border-[#1f2621] hover:border-[#38433b] rounded-lg bg-[#0f1210] transition-colors cursor-pointer"
            title="Open Admin CMS & Media Manager"
          >
            <Shield className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>Admin</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => {
              sound.playPop(700);
              setIsInquiryOpen(true);
            }}
            onMouseEnter={() => setCursor('hover', 'INITIATE')}
            onMouseLeave={() => setCursor('default')}
            className="group flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 text-xs font-bold font-mono tracking-wider text-black bg-[#ccff00] hover:bg-[#d4ff3f] active:scale-95 rounded-lg transition-all shadow-[0_0_20px_-6px_rgba(204,255,0,0.4)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span className="hidden sm:inline">Start a Project</span>
            <span className="sm:hidden">Inquire</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => {
              sound.playTick(500);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-lg text-white hover:bg-[#161a17] transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#ccff00]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1f2621] bg-[#0c0e0c]/95 backdrop-blur-xl px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-medium">
            <button
              onClick={() => handleNavClick('reels')}
              className="text-left text-[#f4f4f5] hover:text-[#ccff00] py-1 cursor-pointer"
            >
              Short-Video Reels
            </button>
            <button
              onClick={() => handleNavClick('clients')}
              className="text-left text-[#f4f4f5] hover:text-[#ccff00] py-1 cursor-pointer"
            >
              10 Global Clients
            </button>
            <button
              onClick={() => handleNavClick('work')}
              className="text-left text-[#f4f4f5] hover:text-[#ccff00] py-1 cursor-pointer"
            >
              Case Studies & Portfolio
            </button>
            <button
              onClick={() => handleNavClick('capabilities')}
              className="text-left text-[#f4f4f5] hover:text-[#ccff00] py-1 cursor-pointer"
            >
              Capabilities & Services
            </button>
            <button
              onClick={() => handleNavClick('proof')}
              className="text-left text-[#f4f4f5] hover:text-[#ccff00] py-1 cursor-pointer"
            >
              Client Proof & Metrics
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminOpen(true);
              }}
              className="text-left text-[#8e9290] hover:text-[#ccff00] py-1 flex items-center gap-2 cursor-pointer"
            >
              <Shield className="w-4 h-4 text-[#ccff00]" />
              <span>Admin CMS & Media Manager</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
