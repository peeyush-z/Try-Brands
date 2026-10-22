/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Eye, Share2, Sparkles } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';
import { sound } from '../utils/sound';

export const ReelModal: React.FC = () => {
  const { activeReel, setActiveReel, setCursor } = useAgency();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playTick(450);
        setActiveReel(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveReel]);

  if (!activeReel) return null;

  const togglePlay = () => {
    sound.playTick(600);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    sound.playTick(700);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsAudioMuted(videoRef.current.muted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = clickX / rect.width;
      videoRef.current.currentTime = ratio * videoRef.current.duration;
      setProgress(ratio * 100);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn"
      onClick={() => {
        sound.playTick(450);
        setActiveReel(null);
      }}
    >
      <div
        className="relative w-full max-w-sm sm:max-w-md h-[85vh] max-h-[820px] rounded-3xl overflow-hidden bg-[#0c0e0c] border border-[#232b25] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls Bar */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#ccff00] text-black font-mono text-[11px] font-bold uppercase tracking-wider">
              {activeReel.client}
            </span>
            <span className="flex items-center gap-1 text-xs font-mono text-white/90 bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
              <Eye className="w-3 h-3 text-[#ccff00]" />
              <span>{activeReel.views}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
              aria-label={isAudioMuted ? 'Unmute video audio' : 'Mute video audio'}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#ccff00]" />}
            </button>
            <button
              onClick={() => {
                sound.playTick(450);
                setActiveReel(null);
              }}
              className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
              aria-label="Close reel player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 9:16 Video Player Body */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden cursor-pointer" onClick={togglePlay}>
          <video
            ref={videoRef}
            src={activeReel.videoUrl}
            poster={activeReel.thumbnailUrl}
            autoPlay
            loop
            playsInline
            muted={isAudioMuted}
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-cover"
          />

          {/* Pause overlay icon */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-[#ccff00] text-black flex items-center justify-center">
                <Play className="w-6 h-6 fill-current ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Progress Scrubber */}
        <div
          className="h-1.5 w-full bg-[#1f2621] cursor-pointer relative z-20"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-[#ccff00] transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Bottom Details & Attribution */}
        <div className="p-4 sm:p-5 bg-[#0e110f] border-t border-[#1f2621] space-y-2.5 z-20">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-white font-display">
              {activeReel.title}
            </h3>
            <span className="text-xs font-mono text-[#ccff00] font-semibold">
              {activeReel.category}
            </span>
          </div>

          <p className="text-xs text-[#a1a1aa] leading-relaxed line-clamp-2">
            {activeReel.caption}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#1a201c]">
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-[#8e9290]">
              {activeReel.tags.map((tag, i) => (
                <span key={i} className="text-[#8e9290]">{tag.startsWith('#') ? tag : `#${tag}`}</span>
              ))}
            </div>

            {activeReel.externalUrl && (
              <a
                href={activeReel.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-2.5 py-1 rounded bg-[#ccff00] hover:bg-[#d4ff3f] text-black font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
              >
                <span>Watch on Instagram Reel</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
