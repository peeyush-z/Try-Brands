/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useAgency } from '../context/AgencyContext';

export const CustomCursor: React.FC = () => {
  const { cursorText, cursorVariant } = useAgency();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) {
    return null;
  }

  // Define cursor geometry based on variant and text
  const isMedia = cursorVariant === 'media' || Boolean(cursorText);
  const isHover = cursorVariant === 'hover';
  const isHidden = cursorVariant === 'hidden';

  if (isHidden) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Primary animated follower */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none"
        animate={{
          x: position.x - (isMedia ? 42 : isHover ? 24 : 10),
          y: position.y - (isMedia ? 42 : isHover ? 24 : 10),
          width: isMedia ? 84 : isHover ? 48 : 20,
          height: isMedia ? 84 : isHover ? 48 : 20,
          backgroundColor: isMedia ? '#ccff00' : isHover ? 'rgba(204, 255, 0, 0.2)' : 'transparent',
          borderColor: isMedia ? '#ccff00' : '#ccff00',
          borderWidth: isMedia ? 0 : isHover ? 2 : 1.5,
          scale: 1,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 280,
          mass: 0.4,
        }}
      >
        {isMedia && cursorText && (
          <span className="font-display text-[10px] font-extrabold uppercase tracking-widest text-black select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center pinpoint indicator */}
      {!isMedia && (
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#ccff00] rounded-full pointer-events-none"
          animate={{
            x: position.x - 3,
            y: position.y - 3,
            opacity: isHover ? 0 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 400,
            mass: 0.1,
          }}
        />
      )}
    </div>
  );
};
