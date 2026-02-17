"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 glass-panel border-b-white/10' : 'py-8 bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-neon-cyan to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,255,255,0.4)]">
            <Globe size={18} className="text-black" />
          </div>
          <span className="font-display font-bold text-xl tracking-widest text-white uppercase">9TH <span className="text-neon-cyan">REALM</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: 'Ecosystem', href: '/#ecosystem' },
            { name: 'Intelligence', href: '/#intelligence' },
            { name: 'Contact', href: '/#contact' }
          ].map((item) => (
            <Link key={item.name} href={item.href} className="text-xs font-mono text-white/60 hover:text-neon-cyan transition-colors uppercase tracking-widest relative group">
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-cyan transition-all group-hover:w-full shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
            </Link>
          ))}
          <Link href="/omnifusionai" className="px-6 py-2 border border-neon-cyan/30 text-neon-cyan font-mono text-[10px] uppercase tracking-tighter hover:bg-neon-cyan hover:text-black transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]">
            Access Hub
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full glass-panel border-b border-white/10 p-6 flex flex-col gap-4 overflow-hidden"
          >
            {[
              { name: 'Ecosystem', href: '/#ecosystem' },
              { name: 'Intelligence', href: '/#intelligence' },
              { name: 'Contact', href: '/#contact' },
              { name: 'Access Hub', href: '/omnifusionai' }
            ].map((item) => (
              <Link key={item.name} href={item.href} className="text-lg font-display text-white/80" onClick={() => setIsOpen(false)}>
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
