"use client";

import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function InteractiveBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the "liquid" feel
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#020205]">
      {/* Primary Liquid Orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 bg-neon-cyan/30"
        style={{
          x: springX,
          y: springY,
          left: -300,
          top: -300,
        }}
      />
      
      {/* Secondary Orbiting Orb */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 bg-blue-600/30"
        style={{
          x: springX,
          y: springY,
          left: -100,
          top: -100,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />

      {/* Static Deep Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neon-cyan/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-900/10 blur-[120px] rounded-full" />
      
      {/* CRT Scanline / Noise Overlay for "Glass" texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />
    </div>
  );
}
