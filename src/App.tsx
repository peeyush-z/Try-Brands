/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { AgencyProvider } from './context/AgencyContext';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ReelsShowcase } from './components/ReelsShowcase';
import { ClientMarquee } from './components/ClientMarquee';
import { SelectedWork } from './components/SelectedWork';
import { CapabilitiesMatrix } from './components/CapabilitiesMatrix';
import { ProofSection } from './components/ProofSection';
import { FooterSection } from './components/FooterSection';
import { ReelModal } from './components/ReelModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { InquiryModal } from './components/InquiryModal';
import { AdminDashboard } from './components/AdminDashboard';

function AppContent() {
  useEffect(() => {
    // Check for prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Initialize smooth momentum scrolling via Lenis
    let lenis: Lenis | null = null;
    let rafId: number;

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    } catch {
      // Graceful fallback to native browser smooth scroll
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#070707] text-[#f4f4f5] selection:bg-[#ccff00] selection:text-black">
      {/* Interactive Follower Cursor */}
      <CustomCursor />

      {/* Main Agency Navigation adhering to 3-zone Top Bar Contract */}
      <Navbar />

      {/* Primary Page Flow */}
      <main>
        {/* Hero Section with kinetic typography & ambient reel */}
        <HeroSection />

        {/* 9:16 Vertical Short-Form Video Showcase Marquee */}
        <ReelsShowcase />

        {/* 10 Global Client Brands Marquee with Hover/Touch Pause */}
        <ClientMarquee />

        {/* Selected Work & Bento Case Studies */}
        <SelectedWork />

        {/* Capabilities Matrix with Interactive Reveal */}
        <CapabilitiesMatrix />

        {/* Quantitative Proof & Executive Testimonial Carousel */}
        <ProofSection />
      </main>

      {/* Dynamic Footer with Kinetic CTA & Global Clocks */}
      <FooterSection />

      {/* Interactive Modal Layers */}
      <ReelModal />
      <CaseStudyModal />
      <InquiryModal />
      <AdminDashboard />
    </div>
  );
}

export default function App() {
  return (
    <AgencyProvider>
      <AppContent />
    </AgencyProvider>
  );
}
