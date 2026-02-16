"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, Cpu, Globe, Wifi, Activity, Maximize2, Minimize2, X } from "lucide-react";

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
    <div className="relative w-full h-full bg-black flex items-center justify-center border-b border-white/5">
      {error ? (
        <div className="text-center space-y-2">
          <p className="text-[10px] text-white/20 font-mono tracking-widest">SIGNAL_OFFLINE</p>
          <button 
            onClick={() => setKey(k => k + 1)}
            className="text-[10px] text-neon-cyan hover:underline font-mono"
          >
            RETRY_UPLINK
          </button>
        </div>
      ) : (
        <img 
          src={imgSrc} 
          onError={() => setError(true)}
          alt="Live Feed"
          className="w-full h-full object-contain"
          crossOrigin="anonymous"
        />
      )}
    </div>
  );
}

export default function OmnifusionTerminal() {
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

  const sendCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command) return;
    
    setStatus("sending");
    const currentCommand = command;
    setCommand("");
    setLogs(prev => [`9threalm@Omnifusion-OS:~$ ${currentCommand}`, ...prev]);

    try {
      let cleanUrl = bridgeUrl.replace(/\/$/, ""); 
      const response = await fetch(`${cleanUrl}/command`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Bypass-Tunnel-Reminder": "true"
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
        throw new Error(data.message || "Execution error");
      }
    } catch (err) {
      setStatus("error");
      setLogs(prev => [`error: ${err instanceof Error ? err.message : "network failure"}`, ...prev]);
    } finally {
      setStatus("idle");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#000] flex items-center justify-center p-6 font-mono">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2">
            <p className="text-white/40 text-xs">Omnifusion OS v4.0.2</p>
            <p className="text-white text-sm">login: 9threalm</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white">password:</span>
              <input 
                type="password" 
                className="bg-transparent border-none outline-none text-white w-full"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if ((e.target as HTMLInputElement).value === 'Godmode333$') {
                      setIsAuthorized(true);
                      setLogs(["Last login: " + new Date().toUTCString() + " on ttys001", "Welcome to Omnifusion OS.", "Type 'help' for available commands."]);
                    } else {
                      (e.target as HTMLInputElement).value = '';
                      alert('Login incorrect');
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#d1d1d1] font-mono p-0 md:p-10 flex flex-col selection:bg-neon-cyan/30 selection:text-white">
      <div className="flex-1 max-w-6xl mx-auto w-full flex flex-col bg-[#1e1e1e] rounded-lg overflow-hidden shadow-2xl border border-white/10">
        
        {/* Terminal Title Bar */}
        <div className="bg-[#323232] px-4 py-2 flex justify-between items-center border-b border-black/20">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex items-center gap-2 text-[11px] text-white/40 font-semibold tracking-tight">
            <Terminal size={12} />
            9threalm — omnifusion — 80×24
          </div>
          <div className="w-12" /> {/* Spacer */}
        </div>

        {/* Sub-Header / Tool Bar */}
        <div className="bg-[#252525] px-4 py-2 flex justify-between items-center text-[10px] border-b border-black/10">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-1.5 text-white/30">
              <Wifi size={10} className="text-green-500/50" />
              <span>10.0.0.179</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/30">
              <Activity size={10} />
              <span>CPU: 12%</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <input 
                type="text" 
                value={bridgeUrl}
                onChange={(e) => setBridgeUrl(e.target.value)}
                className="bg-black/20 border border-white/5 rounded px-2 py-0.5 text-[9px] text-white/40 outline-none focus:border-neon-cyan/20 w-48"
                placeholder="Bridge URL"
              />
              <button 
                onClick={() => setShowVideo(!showVideo)}
                className={`px-2 py-0.5 rounded border transition-colors ${showVideo ? 'bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan' : 'bg-white/5 border-white/10 text-white/30'}`}
              >
                {showVideo ? "VIDEO: ON" : "VIDEO: OFF"}
              </button>
          </div>
        </div>

        {/* Terminal Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#1e1e1e]">
          
          {showVideo && (
            <div className="h-[35vh] min-h-[200px] w-full bg-black relative shadow-inner">
               <SecureVideoStream url={bridgeUrl} />
               <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-[8px] text-white/40 uppercase tracking-widest border border-white/10">
                  Secure_Feed_v1
               </div>
            </div>
          )}

          <div className="flex-1 p-4 overflow-y-auto flex flex-col-reverse custom-scrollbar font-mono text-sm leading-relaxed" ref={scrollRef}>
            <div className="space-y-1">
              <AnimatePresence initial={false}>
                {logs.map((log, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`whitespace-pre-wrap break-all ${
                      log.startsWith('9threalm@Omnifusion-OS') 
                        ? 'text-white font-bold' 
                        : log.startsWith('error')
                        ? 'text-red-400'
                        : 'text-white/70'
                    }`}
                  >
                    {log}
                  </motion.div>
                ))}
              </AnimatePresence>
              {logs.length === 0 && <div className="text-white/20 italic">Awaiting input...</div>}
            </div>
          </div>

          {/* Prompt Area */}
          <div className="p-4 bg-[#1e1e1e] border-t border-white/5">
            <form onSubmit={sendCommand} className="flex items-center gap-2 group">
              <span className="text-neon-cyan font-bold whitespace-nowrap">9threalm@Omnifusion-OS:~$</span>
              <input 
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white text-sm font-mono caret-neon-cyan"
                autoFocus
              />
              {status === "sending" && (
                <div className="w-3 h-3 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
              )}
            </form>
          </div>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="max-w-6xl mx-auto w-full mt-4 flex justify-between items-center px-2 text-[10px] text-white/20 uppercase tracking-widest">
        <span>Session: Active (9th Realm Private Network)</span>
        <span>Omnifusion AI workforce v4.0.2</span>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.1); }
      `}</style>
    </div>
  );
}
