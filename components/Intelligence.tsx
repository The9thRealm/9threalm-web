"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, TrendingUp, BarChart3, Users, Briefcase } from 'lucide-react';

const intelligenceData = [
  {
    title: 'Strategic Marketing',
    desc: 'Hyper-targeted digital campaigns and brand positioning for high-growth enterprises.',
    icon: BarChart3,
    highlights: ['Multi-channel strategy', 'Conversion optimization', 'Data-driven insights']
  },
  {
    title: 'Talent Recruitment',
    desc: 'Precision headhunting and talent acquisition for technical and creative leadership.',
    icon: Users,
    highlights: ['Executive search', 'Culture-fit vetting', 'Global talent pipelining']
  },
  {
    title: 'Talent Management',
    desc: 'Comprehensive management services for elite creators and industry professionals.',
    icon: Briefcase,
    highlights: ['Career roadmap mapping', 'Contract negotiation', 'Brand partnerships']
  }
];

export default function Intelligence() {
  return (
    <section id="intelligence" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-[10px] font-mono tracking-[0.3em] uppercase mb-6">
              Core Methodology
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 tracking-tighter leading-tight">
              A VISION OF <span className="text-neon-cyan hologram-text">STRATEGIC EXCELLENCE</span>
            </h2>
            <p className="text-white/60 text-lg mb-12 leading-relaxed font-light">
              9th Realm was established as a central axis for a diverse ecosystem of ventures. 
              Our philosophy is rooted in the &quot;9th Realm&quot; methodology—a commitment to reaching 
              heights of performance and synergy that transcend traditional market boundaries.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neon-cyan group-hover:bg-neon-cyan/20 transition-all duration-500 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                  <Target size={24} />
                </div>
                <h3 className="font-display font-bold text-xl text-white">Precision Focus</h3>
                <p className="text-white/40 text-sm leading-relaxed">Targeting hyper-growth opportunities across tech, talent, and lifestyle sectors.</p>
              </div>
              <div className="space-y-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neon-cyan group-hover:bg-neon-cyan/20 transition-all duration-500 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                  <Lightbulb size={24} />
                </div>
                <h3 className="font-display font-bold text-xl text-white">Innovative DNA</h3>
                <p className="text-white/40 text-sm leading-relaxed">Infusing every subsidiary with cutting-edge strategies and automated efficiencies.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-panel aspect-square md:aspect-video flex items-center justify-center p-12 rounded-3xl overflow-hidden group border-white/10 relative">
               <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
               <TrendingUp size={160} className="text-neon-cyan/5 group-hover:text-neon-cyan/10 transition-colors duration-1000 absolute -right-10 -bottom-10" />
               <div className="relative z-10 text-center">
                   <div className="text-7xl md:text-9xl font-display font-black text-white mb-2 tracking-tighter group-hover:hologram-text transition-all duration-700">9+</div>
                   <div className="text-neon-cyan font-mono font-bold tracking-[0.5em] uppercase text-xs">Strategic Domains</div>
               </div>
            </div>
            {/* Decorative bloom */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon-cyan/10 blur-[100px] rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {intelligenceData.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-2xl border-white/5 hover:border-neon-cyan/30 transition-all duration-500 group"
            >
              <div className="w-10 h-10 rounded-lg bg-neon-cyan/5 flex items-center justify-center text-neon-cyan mb-6 group-hover:bg-neon-cyan/20 transition-all">
                <item.icon size={20} />
              </div>
              <h4 className="text-xl font-display font-bold text-white mb-4">{item.title}</h4>
              <p className="text-white/50 text-sm leading-relaxed mb-6 font-medium">{item.desc}</p>
              <ul className="space-y-3">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-3 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                    <div className="w-1 h-1 rounded-full bg-neon-cyan/40 shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
