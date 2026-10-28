/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Eye, Maximize2 } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';
import { sound } from '../utils/sound';
import { ReelItem } from '../types';

interface ReelCardProps {
  reel: ReelItem;
  index: number;
  hoveredReelId: string | null;
  setHoveredReelId: (id: string | null) => void;
  onReelClick: (reel: ReelItem) => void;
  setCursor: (variant: any, text?: string | null) => void;
}

const ReelCard: React.FC<ReelCardProps> = ({
  reel,
  index,
  hoveredReelId,
  setHoveredReelId,
  onReelClick,
  setCursor,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardId = `${reel.id}-${index}`;

  // Robust Autoplay Loop Engine: Ensures video is playing continuously while sliding
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Direct DOM property enforcement required by WebKit/Blink for unconditional autoplay
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');

    const startPlayback = () => {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback retry on user touch or page interaction
          const onUserGesture = () => {
            video.muted = true;
            video.play().catch(() => {});
            window.removeEventListener('touchstart', onUserGesture);
            window.removeEventListener('click', onUserGesture);
          };
          window.addEventListener('touchstart', onUserGesture, { once: true });
          window.addEventListener('click', onUserGesture, { once: true });
        });
      }
    };

    if (video.readyState >= 2) {
      startPlayback();
    } else {
      video.addEventListener('loadeddata', startPlayback, { once: true });
      video.addEventListener('canplay', startPlayback, { once: true });
    }

    // Keep playing even when container animates
    const handleVisibility = () => {
      if (!document.hidden && video.paused) {
        startPlayback();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      video.removeEventListener('loadeddata', startPlayback);
      video.removeEventListener('canplay', startPlayback);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [reel.videoUrl]);

  return (
    <div
      onClick={() => onReelClick(reel)}
      onMouseEnter={() => {
        setHoveredReelId(cardId);
        setCursor('hover');
        sound.playTick(720);
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        }
      }}
      onMouseLeave={() => {
        setCursor('default');
      }}
      className="group relative w-64 sm:w-72 md:w-80 h-[420px] sm:h-[460px] md:h-[480px] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/80 hover:border-zinc-600 transition-colors duration-300 flex-shrink-0 cursor-pointer select-none"
    >
      {/* 9:16 Continuous Video Playback - No zoom transform, clean stable presentation */}
      <div className="absolute inset-0 w-full h-full bg-zinc-950 overflow-hidden">
        <video
          ref={videoRef}
          src={reel.videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Minimalist scrim overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />
      </div>

      {/* Top Header: Clean unboxed metadata */}
      <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between text-xs z-10 pointer-events-none">
        <span className="font-mono text-zinc-300 text-[11px] font-medium tracking-wide">
          {reel.client}
        </span>

        <span className="flex items-center gap-1 font-mono text-zinc-400 text-[11px]">
          <Eye className="w-3 h-3 text-[#ccff00]" />
          <span>{reel.views}</span>
        </span>
      </div>

      {/* Discreet Hover Indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <div className="w-11 h-11 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center">
          <Play className="w-4 h-4 fill-current ml-0.5" />
        </div>
      </div>

      {/* Bottom Metadata - Minimal & Crisp */}
      <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
        <div className="text-[10px] font-mono uppercase tracking-wider text-[#ccff00] mb-1">
          {reel.category}
        </div>

        <h3 className="text-sm sm:text-base font-semibold text-white leading-snug break-words">
          {reel.title}
        </h3>

        <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
          {reel.caption}
        </p>
      </div>
    </div>
  );
};

export const ReelsShowcase: React.FC = () => {
  const { reels, setActiveReel, setCursor } = useAgency();
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredReelId, setHoveredReelId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeReels = reels.filter((r) => r.isActive);

  // Duplicate for seamless 360-degree marquee loop
  const displayReels = [...activeReels, ...activeReels];

  const handleReelClick = (reel: ReelItem) => {
    sound.playPop(580);
    setActiveReel(reel);
  };

  return (
    <section id="reels" className="py-20 sm:py-24 border-b border-[#1f2621]/80 relative overflow-hidden bg-[#080a09]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
              <span className="text-[#ccff00]">SHORT-FORM MOTION</span>
              <span aria-hidden="true">·</span>
              <span>9:16 VERTICAL REELS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-display break-words">
              Kinetic Reels & Social Film
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playTick(500);
                setIsPaused(!isPaused);
              }}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={() => setCursor('default')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-xs font-mono text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
              aria-label={isPaused ? 'Resume auto-scroll marquee' : 'Pause auto-scroll marquee'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isPaused ? 'Resume Flow' : 'Pause Flow'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Carousel */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => {
          setIsPaused(true);
        }}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredReelId(null);
        }}
        ref={scrollRef}
      >
        <div
          className={`flex gap-6 py-4 px-4 sm:px-8 w-max ${
            isPaused ? '' : 'animate-marquee-left'
          }`}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {displayReels.map((reel, index) => (
            <ReelCard
              key={`${reel.id}-${index}`}
              reel={reel}
              index={index}
              hoveredReelId={hoveredReelId}
              setHoveredReelId={setHoveredReelId}
              onReelClick={handleReelClick}
              setCursor={setCursor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
