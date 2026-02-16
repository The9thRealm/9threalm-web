"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Shield, Terminal, ArrowRight, Activity } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function OmnifusionAIHome() {
  return (
    <main className="min-h-screen bg-[#020205] text-white selection:bg-neon-cyan/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-[10px] font-mono tracking-[0.3em] uppercase mb-8">
                <Cpu size={12} /> Neural Division v4.0
              </div>
              <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-8 leading-tight">
                OMNIFUSION <span className="text-neon-cyan hologram-text">AI</span>
              </h1>
              <p className="text-white/50 text-xl mb-6 leading-relaxed font-light max-w-xl">
                The autonomous intelligence layer of 9th Realm. Built to integrate AI into your everyday workflow—simplifying tasks, work, and existence.
              </p>
              <p className="text-neon-cyan/80 text-sm font-mono tracking-widest mb-10 uppercase border-l border-neon-cyan/30 pl-4 py-2">
                BECOME THE PRESIDENT. <br />
                OMNIFUSION IS YOUR WORKFORCE.
              </p>
              
              <div className="flex flex-wrap gap-6">
                <a href="/omnifusionai/terminal" className="px-8 py-4 bg-neon-cyan text-black font-display font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all flex items-center gap-2">
                  Access Terminal <Terminal size={16} />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative"
            >
              <div className="glass-panel aspect-square rounded-3xl border-white/10 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-transparent opacity-50" />
                <Zap size={200} className="text-neon-cyan/10 group-hover:text-neon-cyan/20 transition-colors duration-1000" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border border-neon-cyan/20 rounded-full animate-[spin_20s_linear_infinite]" />
                  <div className="absolute w-48 h-48 border border-neon-cyan/40 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
                </div>
              </div>
              {/* Glows */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon-cyan/10 blur-[100px] rounded-full" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-32 px-6 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-3xl font-display font-bold uppercase tracking-[0.3em] mb-4">The Command Structure</h2>
            <p className="text-white/30 font-mono text-xs uppercase tracking-widest">Autonomous Execution across every tier.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'The President', desc: 'You provide the vision and high-level strategy. You are the sole decision-maker.', icon: Shield, tier: 'TIER 01' },
              { title: 'Vice President', desc: 'Omnifusion AI coordinates workflows and manages mid-level systems autonomously.', icon: Cpu, tier: 'TIER 02' },
              { title: 'The Workforce', desc: 'A tireless legion of automated agents handling grunt work and data processing 24/7.', icon: Activity, tier: 'TIER 03' }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="glass-panel p-8 border-white/5 relative group hover:border-neon-cyan/30 transition-all"
              >
                <div className="text-[8px] font-mono text-neon-cyan/30 mb-4 tracking-[0.5em]">{feature.tier}</div>
                <div className="w-10 h-10 rounded-lg bg-neon-cyan/5 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan mb-6">
                  <feature.icon size={20} />
                </div>
                <h3 className="text-xl font-display font-bold uppercase tracking-tight mb-4 group-hover:text-neon-cyan transition-colors">{feature.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 text-center border-t border-white/5">
        <p className="text-[8px] font-mono text-white/10 tracking-[1em] uppercase">
          &copy; 2026 9TH REALM / OMNIFUSION AI. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </main>
  );
}
