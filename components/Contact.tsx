"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate sending
    setTimeout(() => {
      setStatus('sent');
    }, 2000);
  };

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden bg-[#050510]">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-tighter">UPLINK SECURE</h2>
            <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.5em] mt-2">Encrypted transmission to 9th Realm Command.</p>
          </div>

          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-neon-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-neon-cyan" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2 tracking-widest">TRANSMISSION RECEIVED</h3>
                <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Your payload has been successfully decrypted and routed.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-neon-cyan text-[10px] font-mono uppercase tracking-[0.4em] hover:text-white transition-colors"
                >
                  [ Initialize New Uplink ]
                </button>
              </motion.div>
            ) : (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6" 
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] text-neon-cyan uppercase tracking-[0.3em] font-bold opacity-50 ml-1">Identity</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-cyan/50 focus:outline-none transition-all font-mono text-sm placeholder:text-white/10"
                      placeholder="Designation"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-neon-cyan uppercase tracking-[0.3em] font-bold opacity-50 ml-1">Frequency</label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-cyan/50 focus:outline-none transition-all font-mono text-sm placeholder:text-white/10"
                      placeholder="Comms Address"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-neon-cyan uppercase tracking-[0.3em] font-bold opacity-50 ml-1">Payload</label>
                  <textarea 
                    required
                    rows={4} 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-cyan/50 focus:outline-none transition-all font-mono text-sm placeholder:text-white/10 resize-none"
                    placeholder="Transmission content..."
                  ></textarea>
                </div>
                
                <button 
                  disabled={status === 'sending'}
                  className="group w-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-display font-bold py-5 rounded-lg hover:bg-neon-cyan hover:text-black transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'ENCRYPTING...' : 'INITIALIZE UPLOAD'} 
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-12 flex justify-center items-center gap-2 text-white/30 text-[10px] font-mono tracking-widest uppercase">
            <Mail size={12} />
            <span>management@9threalm.win</span>
          </div>
        </div>
      </div>
    </section>
  );
}
