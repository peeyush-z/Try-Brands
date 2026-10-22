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
        setCursor('media', 'PLAY');
        sound.playTick(720);
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        }
      }}
      onMouseLeave={() => {
        setCursor('default');
      }}
      className="group relative w-64 sm:w-72 md:w-80 h-[440px] sm:h-[490px] md:h-[520px] rounded-2xl overflow-hidden bg-[#111412] border border-[#222a24] hover:border-[#ccff00] transition-all duration-300 shadow-xl flex-shrink-0 cursor-pointer select-none"
    >
      {/* 9:16 Continuous Video Playback - No static poster to ensure live motion while sliding */}
      <div className="absolute inset-0 w-full h-full bg-[#0d0f0e] overflow-hidden">
        <video
          ref={videoRef}
          src={reel.videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />

        {/* Scrim overlay for typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40 group-hover:via-black/20 transition-opacity" />
      </div>

      {/* Top Badge: Client & View Count */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs z-10">
        <div className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 font-mono text-white text-[11px] uppercase tracking-wider">
          {reel.client}
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[#a1a1aa] text-[11px]">
          <Eye className="w-3 h-3 text-[#ccff00]" />
          <span>{reel.views}</span>
        </div>
      </div>

      {/* Center Expand Icon Hover Trigger */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <div className="w-16 h-16 rounded-full bg-[#ccff00] text-black flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform shadow-[0_0_30px_rgba(204,255,0,0.6)]">
          <Play className="w-6 h-6 fill-current ml-0.5" />
        </div>
      </div>

      {/* Bottom Metadata */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#ccff00] mb-1.5">
          <span>{reel.category}</span>
          <span aria-hidden="true">·</span>
          <span>9:16 Vertical Video</span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#ccff00] transition-colors leading-snug font-display break-words">
          {reel.title}
        </h3>

        <p className="text-xs text-[#a1a1aa] mt-1 line-clamp-2 leading-relaxed">
          {reel.caption}
        </p>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10 text-[11px] font-mono text-[#8e9290]">
          <span className="flex items-center gap-1 text-[#a1a1aa] group-hover:text-white transition-colors">
            <Maximize2 className="w-3 h-3 text-[#ccff00]" />
            <span>Click to Expand</span>
          </span>
          <span className="text-[#8e9290]">Live Motion</span>
        </div>
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
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#8e9290] mb-2">
              <span className="text-[#ccff00]">SHORT-FORM KINETIC MEDIA</span>
              <span aria-hidden="true">·</span>
              <span>9:16 VERTICAL VIDEO</span>
              <span aria-hidden="true">·</span>
              <span>LIVE SLIDING PLAYBACK</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display break-words">
              Vertical Reels & CGI Showcases
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
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#232b25] bg-[#0f1210] text-xs font-mono text-[#8e9290] hover:text-[#ccff00] hover:border-[#ccff00]/40 transition-colors cursor-pointer"
              aria-label={isPaused ? 'Resume auto-scroll marquee' : 'Pause auto-scroll marquee'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isPaused ? 'Resume Reel Flow' : 'Pause Reel Flow'}</span>
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
