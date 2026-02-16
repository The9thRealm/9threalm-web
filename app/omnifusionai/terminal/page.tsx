"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Terminal, Send, Lock, Cpu, Globe, Wifi, Activity } from "lucide-react";

function SecureVideoStream({ url }: { url: string }) {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [error, setError] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!url) return;
    const cleanUrl = url.replace(/\/$/, "");
    setImgSrc(`${cleanUrl}/video_feed?t=${Date.now()}`);
    setError(false);
  }, [url, key]);

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      {error ? (
        <div className="text-center space-y-4">
          <p className="text-xs text-neon-cyan animate-pulse">SIGNAL LOST</p>
          <button 
            onClick={() => setKey(k => k + 1)}
            className="text-[10px] border border-neon-cyan/30 px-3 py-1 hover:bg-neon-cyan hover:text-black transition-colors"
          >
            RE-ESTABLISH UPLINK
          </button>
        </div>
      ) : (
        <img 
          src={imgSrc} 
          onError={() => setError(true)}
          alt="Live Feed"
          className="w-full h-full object-contain opacity-80 mix-blend-screen scanline-effect"
          crossOrigin="anonymous"
        />
      )}
    </div>
  );
}

export default function OmnifusionTerminal() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [command, setCommand] = useState("");
  const DEFAULT_BRIDGE = "http://10.0.0.179:5002";
  const [bridgeUrl, setBridgeUrl] = useState(DEFAULT_BRIDGE);
  const [showVideo, setShowVideo] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedUrl = localStorage.getItem("9threalm_bridge_url");
    if (savedUrl && savedUrl.trim() !== "") {
      setBridgeUrl(savedUrl);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [logs]);

  const MASTER_CODE = "Godmode333$"; 

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === MASTER_CODE) {
      setIsAuthorized(true);
      setLogs(["[SYSTEM] OMNIFUSION OS v4.0.2 INITIALIZED", "[SYSTEM] ENCRYPTED UPLINK ESTABLISHED", "[SYSTEM] AWAITING COMMANDS..."]);
    } else {
      alert("UNAUTHORIZED ACCESS DETECTED");
      setPassword("");
    }
  };

  const sendCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetUrl = bridgeUrl || localStorage.getItem("9threalm_bridge_url");
    
    if (!command) return;
    if (!targetUrl) {
      setLogs(prev => ["✕ ERROR: UPLINK ENDPOINT NOT DEFINED", ...prev]);
      return;
    }

    setStatus("sending");
    const currentCommand = command;
    setCommand("");
    setLogs(prev => [`> ${currentCommand}`, ...prev]);

    try {
      let cleanUrl = targetUrl.replace(/\/$/, ""); 
      const response = await fetch(`${cleanUrl}/command`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Bypass-Tunnel-Reminder": "true",
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({ command: currentCommand }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        if (data.response) {
          const cleanResponse = typeof data.response === 'string' 
            ? data.response 
            : JSON.stringify(data.response, null, 2);
          
          setLogs(prev => [cleanResponse, ...prev]);
        }
      } else {
        throw new Error(data.message || "Uplink internal error");
      }
    } catch (err) {
      setStatus("error");
      setLogs(prev => [`✕ TRANSMISSION FAILURE: ${err instanceof Error ? err.message : "NETWORK TIMEOUT"}`, ...prev]);
    } finally {
      setStatus("idle");
    }
  };

  const saveUrl = (url: string) => {
    setBridgeUrl(url);
    localStorage.setItem("9threalm_bridge_url", url);
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#020205] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md glass-panel p-10 space-y-8 relative z-10 border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="w-20 h-20 rounded-2xl bg-neon-cyan/5 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan shadow-[0_0_20px_rgba(0,255,255,0.1)]">
              <Lock size={36} className="hologram-text" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-black tracking-[0.2em] text-white uppercase">Omnifusion AI</h1>
              <p className="text-[10px] text-neon-cyan/40 font-mono tracking-[0.4em] mt-2 uppercase">Core Terminal Interface</p>
            </div>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] text-neon-cyan/40 uppercase tracking-widest font-mono ml-1">Access Protocol</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white/[0.02] border border-white/10 rounded-lg p-4 font-mono text-center focus:outline-none focus:border-neon-cyan/50 focus:bg-white/[0.05] transition-all text-white placeholder:text-white/5"
                autoFocus
              />
            </div>
            <button className="w-full py-4 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-display font-bold uppercase tracking-[0.3em] hover:bg-neon-cyan hover:text-black transition-all hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]">
              Initialize
            </button>
          </form>
          
          <div className="text-center">
            <span className="text-[8px] opacity-20 font-mono tracking-widest uppercase italic">Secured by 9th Realm Strategic</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020205] text-neon-cyan font-mono p-4 md:p-6 flex flex-col selection:bg-neon-cyan selection:text-black">
      <style jsx global>{`
        .scanline-effect {
          position: relative;
        }
        .scanline-effect::after {
          content: " ";
          display: block;
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 118, 0.06));
          z-index: 2;
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 255, 255, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 255, 255, 0.3); }
      `}</style>

      {/* Header OS Bar */}
      <div className="w-full glass-panel border-white/10 p-4 mb-4 flex justify-between items-center rounded-xl shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
          </div>
          <div className="h-4 w-px bg-white/10 mx-2" />
          <div className="flex items-center gap-2">
            <Cpu size={14} className="text-neon-cyan" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">Omnifusion OS <span className="text-neon-cyan/40">v4.0.2</span></span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/5">
            <Activity size={12} className="text-neon-cyan/50 animate-pulse" />
            <span className="text-[9px] text-white/40 uppercase tracking-widest">CPU: 12%</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi size={14} className="text-green-500" />
            <span className="text-[9px] text-white/40 uppercase tracking-widest">Bridge: Active</span>
          </div>
          <div className="h-8 w-8 rounded bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center">
            <Globe size={16} className="text-neon-cyan" />
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 overflow-hidden">
        {/* Main Terminal Column */}
        <div className="lg:col-span-3 flex flex-col gap-4 overflow-hidden">
          {/* Video Stream */}
          <AnimatePresence>
            {showVideo && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "40vh" }}
                exit={{ opacity: 0, height: 0 }}
                className="glass-panel border-white/10 overflow-hidden relative rounded-xl shadow-inner bg-black"
              >
                <SecureVideoStream url={bridgeUrl} />
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-red-500/30">
                  <div className="w-2 h-2 bg-red-500 animate-pulse rounded-full" />
                  <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Live Visual Stream</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Console Output */}
          <div className="flex-1 glass-panel border-white/10 bg-black/40 p-6 flex flex-col gap-4 overflow-hidden rounded-xl relative shadow-inner custom-scrollbar" ref={scrollRef}>
            <div className="flex-1 overflow-y-auto space-y-3 flex flex-col-reverse custom-scrollbar">
              <AnimatePresence initial={false}>
                {logs.map((log, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-xs font-mono leading-relaxed p-2 rounded ${
                      log.startsWith('>') 
                        ? 'text-neon-cyan bg-neon-cyan/5' 
                        : log.startsWith('[SYSTEM]')
                        ? 'text-white/40 border-l border-white/10'
                        : log.startsWith('✕')
                        ? 'text-red-400 bg-red-400/5'
                        : 'text-neon-cyan/80 border-l border-neon-cyan/20 pl-4'
                    }`}
                  >
                    <span className="opacity-30 mr-2 text-[9px]">{new Date().toLocaleTimeString([], { hour12: false })}</span>
                    {log}
                  </motion.div>
                ))}
              </AnimatePresence>
              {logs.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center opacity-10">
                  <Terminal size={64} />
                  <p className="mt-4 text-xs tracking-[0.5em] uppercase">No logs detected</p>
                </div>
              )}
            </div>

            {/* Command Input */}
            <form onSubmit={sendCommand} className="relative mt-2">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neon-cyan/40 text-sm font-bold tracking-widest">
                SYS_PATH:
              </div>
              <input 
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Initialize instruction set..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-5 pl-24 pr-16 text-sm focus:outline-none focus:border-neon-cyan/40 focus:bg-white/[0.05] transition-all text-neon-cyan placeholder:text-white/5"
                autoFocus
              />
              <button 
                disabled={status === "sending"}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-neon-cyan/40 hover:text-neon-cyan hover:scale-110 transition-all disabled:opacity-20"
              >
                {status === "sending" ? (
                  <div className="w-5 h-5 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-4">
          {/* Uplink Config */}
          <div className="glass-panel border-white/10 p-5 rounded-xl space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 flex items-center gap-2">
              <Globe size={12} /> Uplink Config
            </h3>
            <div className="space-y-3">
              <input 
                type="text" 
                value={bridgeUrl}
                onChange={(e) => setBridgeUrl(e.target.value)}
                placeholder="Endpoint URL"
                className="w-full bg-white/[0.03] border border-white/10 rounded px-3 py-2 text-neon-cyan text-[10px] outline-none focus:border-neon-cyan/30 transition-all"
              />
              <button 
                onClick={() => saveUrl(bridgeUrl)}
                className="w-full py-2 bg-neon-cyan/5 border border-neon-cyan/20 text-neon-cyan text-[9px] font-bold uppercase tracking-widest hover:bg-neon-cyan hover:text-black transition-all"
              >
                Update Endpoint
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="glass-panel border-white/10 p-5 rounded-xl space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">Interface Modules</h3>
            <div className="space-y-2">
              <button 
                onClick={() => setShowVideo(!showVideo)}
                className={`w-full py-3 px-4 rounded-lg border text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-between ${
                  showVideo 
                  ? 'bg-neon-cyan text-black border-neon-cyan shadow-[0_0_15px_rgba(0,255,255,0.3)]' 
                  : 'bg-white/5 text-white/40 border-white/10 hover:border-white/20'
                }`}
              >
                <span>Visual Feed</span>
                <div className={`w-1.5 h-1.5 rounded-full ${showVideo ? 'bg-black animate-pulse' : 'bg-white/20'}`} />
              </button>
              
              <button 
                onClick={() => setLogs([])}
                className="w-full py-3 px-4 rounded-lg border border-white/10 bg-white/5 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all text-left"
              >
                Purge History
              </button>
            </div>
          </div>

          {/* System Health */}
          <div className="glass-panel border-white/10 p-5 rounded-xl bg-neon-cyan/[0.02]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[9px] uppercase tracking-widest text-white/40">Encryption</span>
              <span className="text-[9px] text-green-500 font-bold uppercase">AES-256</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: ["10%", "90%", "60%", "100%"] }}
                transition={{ repeat: Infinity, duration: 10 }}
                className="h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.5)]" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="mt-4 flex justify-between items-center px-2">
        <div className="flex gap-4">
          <span className="text-[8px] text-white/20 uppercase tracking-[0.3em]">Lat: 34.0522° N</span>
          <span className="text-[8px] text-white/20 uppercase tracking-[0.3em]">Lon: 118.2437° W</span>
        </div>
        <span className="text-[8px] text-neon-cyan/30 uppercase tracking-[0.5em] animate-pulse">Omnifusion Secure Session Active</span>
      </div>
    </div>
  );
}
