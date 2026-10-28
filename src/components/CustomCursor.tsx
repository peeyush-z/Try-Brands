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
      {/* Subtle minimalist cursor ring */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none"
        animate={{
          x: position.x - (isHover ? 16 : 6),
          y: position.y - (isHover ? 16 : 6),
          width: isHover ? 32 : 12,
          height: isHover ? 32 : 12,
          backgroundColor: isHover ? 'rgba(204, 255, 0, 0.15)' : 'rgba(255, 255, 255, 0.4)',
          borderColor: isHover ? '#ccff00' : 'transparent',
          borderWidth: isHover ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 350,
          mass: 0.2,
        }}
      />
    </div>
  );
};
