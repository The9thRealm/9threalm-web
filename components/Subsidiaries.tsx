"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Music, ShoppingBag, Leaf, Zap, ArrowRight } from 'lucide-react';

const brands = [
  {
    name: 'NinjaLOC',
    domain: 'NinjaLOC.com',
    desc: 'Autonomous artist collective & underground record label.',
    icon: Music,
    gradient: 'from-blue-600/20 to-cyan-400/20',
    url: 'https://NinjaLOC.com'
  },
  {
    name: 'BLVCKMVGICK',
    domain: 'BLVCKMVGICK.com',
    desc: 'Avant-garde apparel for the digital collective.',
    icon: ShoppingBag,
    gradient: 'from-purple-900/20 to-black',
    url: 'https://BLVCKMVGICK.com'
  },
  {
    name: 'CBTDA',
    domain: 'CBTDA.win',
    desc: 'The pinnacle of botanical intelligence & pure wellness.',
    icon: Leaf,
    gradient: 'from-emerald-500/20 to-teal-900/20',
    url: 'https://CBTDA.win'
  },
  {
    name: 'OmnifusionAI',
    domain: 'Omnifusion.ai',
    desc: 'Neural-linked automation & autonomous agents.',
    icon: Zap,
    gradient: 'from-rose-500/20 to-pink-900/20',
    url: 'https://Omnifusion.ai'
  }
];

export default function Subsidiaries() {
  return (
    <section id="ecosystem" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 border-l-2 border-neon-cyan/50 pl-6"
        >
          <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tighter">
            CORE PORTFOLIO
          </h2>
          <p className="text-white/40 font-mono text-sm tracking-widest mt-2 uppercase">Parent Organization / Asset Management</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 hover:border-neon-cyan/30 transition-all duration-500"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${brand.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 text-white/40 group-hover:text-neon-cyan group-hover:bg-neon-cyan/10 transition-all duration-500">
                    <brand.icon size={24} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-1 group-hover:hologram-text transition-all">
                    {brand.name}
                  </h3>
                  <div className="text-[10px] font-mono text-neon-cyan/40 mb-4 tracking-[0.2em] uppercase">{brand.domain}</div>
                  <p className="text-white/50 text-xs leading-relaxed mb-8 font-medium">
                    {brand.desc}
                  </p>
                </div>

                <a href={brand.url} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 group-hover:text-white transition-all">
                  INITIALIZE <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
