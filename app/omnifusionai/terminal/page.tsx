"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, Cpu, Globe, Wifi, Activity, Maximize2, Minimize2, X } from "lucide-react";

function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#00ff41"; // Neon green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newColumns = Math.floor(width / fontSize);
      drops.length = newColumns;
      drops.fill(1);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-20 z-0" />;
}

function SecureVideoStream({ url }: { url: string }) {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [error, setError] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!url) return;
    const cleanUrl = url.replace(/\/$/, "");
    const newSrc = `${cleanUrl}/video_feed?t=${Date.now()}`;
    setImgSrc(newSrc);
    setError(false);
  }, [url, key]);

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center border-b border-[#00ff41]/20">
      {error ? (
        <div className="text-center space-y-2 px-4">
          <p className="text-[10px] text-[#00ff41]/40 font-mono tracking-widest uppercase">[ CONNECTION_INTERRUPTED ]</p>
          <button 
            onClick={() => setKey(k => k + 1)}
            className="text-[10px] text-[#00ff41] hover:text-[#00ff41]/80 font-mono underline uppercase"
          >
            re-establish_uplink
          </button>
        </div>
      ) : (
        <img 
          src={imgSrc} 
          onError={() => setError(true)}
          alt="Live Feed"
          className="w-full h-full object-contain opacity-80"
          crossOrigin="anonymous"
        />
      )}
    </div>
  );
}

export default function OmnifusionTerminal() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [bridgeUrl, setBridgeUrl] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [vncUrl, setVncUrl] = useState("");
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);

  const speak = (text: string) => {
    if (!isVoiceEnabled || typeof window === "undefined" || !window.speechSynthesis) return;

    // Clean up text for better speech
    const cleanText = text
      .replace(/\[.*?\]/g, "")
      .replace(/\{.*?\}/g, "data received")
      .replace(/[#$]> /g, "")
      .substring(0, 500);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voices = window.speechSynthesis.getVoices();
    const britishFemale = voices.find(v => 
      (v.lang.includes("en-GB") || v.lang.includes("en_GB")) && 
      (v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("samantha") || v.name.toLowerCase().includes("hazel") || v.name.toLowerCase().includes("google uk"))
    ) || voices.find(v => v.lang.includes("en-GB"));

    if (britishFemale) utterance.voice = britishFemale;
    utterance.rate = 1.0;
    utterance.pitch = 1.1;
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    let savedUrl = localStorage.getItem("9threalm_bridge_url");
    // Purge old local URLs to prevent mixed content issues on remote devices
    if (savedUrl && savedUrl.includes("10.0.0.179")) {
      savedUrl = null;
      localStorage.removeItem("9threalm_bridge_url");
    }
    setBridgeUrl(savedUrl || "https://trying-attacks-blues-introduction.trycloudflare.com");
    
    let savedVnc = localStorage.getItem("9threalm_vnc_url");
    if (savedVnc && savedVnc.includes("10.0.0.179")) {
      savedVnc = null;
      localStorage.removeItem("9threalm_vnc_url");
    }
    setVncUrl(savedVnc || "https://roles-nearby-existing-lenders.trycloudflare.com/vnc.html?autoconnect=true&resize=scale");

    const savedVoice = localStorage.getItem("9threalm_voice_enabled");
    if (savedVoice !== null) setIsVoiceEnabled(savedVoice === "true");
  }, []);

  useEffect(() => {
    if (vncUrl) localStorage.setItem("9threalm_vnc_url", vncUrl);
    localStorage.setItem("9threalm_voice_enabled", String(isVoiceEnabled));
  }, [vncUrl, isVoiceEnabled]);

  // Command handler for updating URLs
  const handleCommand = (cmd: string) => {
    if (cmd.startsWith("set-gateway ")) {
      const newUrl = cmd.split(" ")[1];
      setBridgeUrl(newUrl);
      return "Gateway updated to: " + newUrl;
    }
    if (cmd.startsWith("set-vnc ")) {
      const newUrl = cmd.split(" ")[1];
      setVncUrl(newUrl);
      return "Remote Desktop URL updated to: " + newUrl;
    }
    if (cmd === "voice-on") {
      setIsVoiceEnabled(true);
      return "Vocal uplink enabled.";
    }
    if (cmd === "voice-off") {
      setIsVoiceEnabled(false);
      return "Vocal uplink disabled.";
    }
    return null;
  };


  useEffect(() => {
    const checkStatus = async () => {
      if (!bridgeUrl) return;
      try {
        const cleanUrl = bridgeUrl.replace(/\/$/, "");
        const res = await fetch(`${cleanUrl}/status`, { 
          headers: { "Bypass-Tunnel-Reminder": "true" },
          signal: AbortSignal.timeout(3000) 
        });
        setIsOnline(res.ok);
      } catch {
        setIsOnline(false);
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, [bridgeUrl]);

  useEffect(() => {
    if (bridgeUrl) {
      localStorage.setItem("9threalm_bridge_url", bridgeUrl);
    }
  }, [bridgeUrl]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, showVideo]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          setCommand(history[history.length - 1 - nextIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setCommand(history[history.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand("");
      }
    }
  };

  const sendCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    
    setStatus("sending");
    const currentCommand = command;
    setCommand("");
    setHistory(prev => [...prev, currentCommand]);
    setHistoryIndex(-1);
    setLogs(prev => [...prev, `9threalm@omnifusion:~$ ${currentCommand}`]);

    // Check for local commands first
    const localResponse = handleCommand(currentCommand);
    if (localResponse) {
      setLogs(prev => [...prev, localResponse]);
      speak(localResponse);
      setStatus("success");
      setStatus("idle");
      return;
    }

    try {
      const cleanUrl = bridgeUrl.replace(/\/$/, ""); 
      const response = await fetch(`${cleanUrl}/command`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Bypass-Tunnel-Reminder": "true"
        },
        body: JSON.stringify({ command: currentCommand }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server responded with ${response.status}`);
      }

      const data = await response.json();
      setStatus("success");
      if (data.response) {
        const cleanResponse = typeof data.response === 'string' 
          ? data.response 
          : JSON.stringify(data.response, null, 2);
        setLogs(prev => [...prev, cleanResponse]);
        speak(cleanResponse);
      }
    } catch (err) {
      setStatus("error");
      const errorMessage = err instanceof Error ? err.message : "network failure";
      setLogs(prev => [...prev, `error: [UPLINK_FAILURE] ${errorMessage.toUpperCase()}`]);
      speak("Uplink failure detected.");
      console.error("Terminal UPLINK_FAILURE:", err);
    } finally {
      setStatus("idle");
    }
  };

  const launchRemoteDesktop = () => {
    // Add the VNC password to the URL for automatic login
    const finalVncUrl = (vncUrl || "https://roles-nearby-existing-lenders.trycloudflare.com/vnc.html?autoconnect=true&resize=scale") + "&password=Godmode1111";
    window.open(finalVncUrl, "_blank");
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#000] flex items-center justify-center p-6 font-mono relative overflow-hidden">
        <MatrixBackground />
        <div className="w-full max-w-sm space-y-6 relative z-10 bg-black/80 p-8 border border-[#00ff41]/20 rounded-sm shadow-[0_0_30px_rgba(0,255,65,0.1)]">
          <div className="space-y-1">
            <p className="text-[#00ff41]/40 text-xs tracking-tighter uppercase">OMNIFUSION_OS(4.0.2)</p>
            <p className="text-[#00ff41] text-sm">login: 9threalm</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#00ff41]">password:</span>
              <input 
                type="password" 
                className="bg-transparent border-none outline-none text-[#00ff41] w-full caret-[#00ff41]"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if ((e.target as HTMLInputElement).value === 'Godmode333$') {
                      setIsAuthorized(true);
                      setLogs([
                        "Last login: " + new Date().toUTCString() + " on ttys001",
                        "Welcome to Omnifusion OS (GNU/Linux 6.1.0-21-cloud-amd64)",
                        "",
                        " * Documentation:  https://docs.omnifusion.ai",
                        " * Management:     https://9threalm.com/admin",
                        " * Support:        https://discord.gg/omnifusion",
                        "",
                        "System load:  0.12                Processes:             104",
                        "Usage of /:   14.2% of 40GB       Users logged in:       1",
                        "Memory usage: 22%                 IP address for eth0:   10.0.0.179",
                        "",
                        "0 updates can be applied immediately.",
                        "",
                        "Type 'help' for available commands."
                      ]);
                    } else {
                      (e.target as HTMLInputElement).value = '';
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
    <div className="min-h-screen bg-[#000] text-[#00ff41] font-mono p-0 md:p-6 flex flex-col selection:bg-[#00ff41]/30 selection:text-white relative overflow-hidden">
      <MatrixBackground />
      
      <div className="flex-1 max-w-6xl mx-auto w-full flex flex-col bg-black/90 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(0,255,65,0.1)] border border-[#00ff41]/20 relative z-10">
        
        {/* Terminal Title Bar */}
        <div className="bg-[#0a0a0a] px-3 py-1.5 flex justify-between items-center border-b border-[#00ff41]/10">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00ff41]/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#00ff41]/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#00ff41]/20" />
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#00ff41]/60 font-medium tracking-tight uppercase">
            <Terminal size={10} />
            9threalm@omnifusion: ~
          </div>
          <div className="w-12" />
        </div>

        {/* Status Bar */}
        <div className="bg-[#050505] px-4 py-1.5 flex justify-between items-center text-[9px] border-b border-[#00ff41]/10 text-[#00ff41]/40">
          <div className="flex gap-4 items-center uppercase tracking-widest font-bold">
            <div className="flex items-center gap-1.5">
              <Wifi size={10} className="text-[#00ff41]" />
              <span>10.0.0.179</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Activity size={10} className="text-[#00ff41]" />
              <span>CPU: 12%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cpu size={10} className="text-[#00ff41]" />
              <span>MEM: 22%</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 mr-2">
                <div className={`w-1.5 h-1.5 rounded-full ${isOnline === true ? 'bg-[#00ff41] animate-pulse shadow-[0_0_5px_#00ff41]' : isOnline === false ? 'bg-rose-500' : 'bg-white/20'}`} />
                <span className="text-[8px] font-bold tracking-widest">{isOnline === true ? "ONLINE" : isOnline === false ? "OFFLINE" : "CONNECTING..."}</span>
             </div>
             <button 
                onClick={launchRemoteDesktop}
                className="px-2 py-0.5 rounded-sm border bg-black border-[#00ff41]/20 text-[#00ff41]/40 hover:text-[#00ff41]/60 hover:border-[#00ff41]/40 text-[8px] font-bold tracking-widest transition-all uppercase"
              >
                [ REMOTE_VIEW ]
              </button>
              <button 
                onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                className={`px-2 py-0.5 rounded-sm border text-[8px] font-bold tracking-widest transition-all ${isVoiceEnabled ? 'bg-[#00ff41]/10 border-[#00ff41]/40 text-[#00ff41]' : 'bg-black border-[#00ff41]/20 text-[#00ff41]/40 hover:text-[#00ff41]/60'}`}
              >
                {isVoiceEnabled ? "[ VOICE_ACTIVE ]" : "[ VOICE_OFFLINE ]"}
              </button>
             <input 
                type="text" 
                value={bridgeUrl}
                onChange={(e) => setBridgeUrl(e.target.value)}
                className="bg-black border border-[#00ff41]/20 rounded px-2 py-0.5 text-[9px] text-[#00ff41]/60 outline-none focus:border-[#00ff41]/40 w-48 font-mono"
                placeholder="SECURE_GATEWAY"
              />
              <button 
                onClick={() => setShowVideo(!showVideo)}
                className={`px-2 py-0.5 rounded-sm border text-[8px] font-bold tracking-widest transition-all ${showVideo ? 'bg-[#00ff41]/10 border-[#00ff41]/40 text-[#00ff41]' : 'bg-black border-[#00ff41]/20 text-[#00ff41]/40 hover:text-[#00ff41]/60'}`}
              >
                {showVideo ? "[ FEED_ACTIVE ]" : "[ FEED_OFFLINE ]"}
              </button>
          </div>
        </div>

        {/* Terminal Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-black/40">
          
          {showVideo && (
            <div className="h-[30vh] min-h-[180px] w-full bg-black relative border-b border-[#00ff41]/20 overflow-hidden">
               <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,255,0,0.03))] bg-[length:100%_2px,3px_100%]" />
               <SecureVideoStream url={bridgeUrl} />
               <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 text-[8px] text-[#00ff41] font-bold uppercase tracking-[0.2em] border border-[#00ff41]/20 z-20">
                  UPLINK_STABLE // NO_SIGNAL_LOSS
               </div>
            </div>
          )}

          <div 
            className="flex-1 p-4 overflow-y-auto custom-scrollbar font-mono text-xs md:text-sm leading-[1.6] space-y-1" 
            ref={scrollRef}
          >
            <AnimatePresence initial={false}>
              {logs.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1 }}
                  className={`whitespace-pre-wrap break-all ${
                    log.startsWith('9threalm@omnifusion') 
                      ? 'text-[#00ff41] font-bold shadow-[0_0_8px_rgba(0,255,65,0.4)]' 
                      : log.startsWith('error')
                      ? 'text-rose-500 font-bold'
                      : 'text-[#00ff41]/80'
                  }`}
                >
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Active Input Line */}
            <div className="flex items-center gap-2 group pt-1">
              <span className="text-[#00ff41] font-bold whitespace-nowrap shadow-[0_0_8px_rgba(0,255,65,0.2)]">9threalm@omnifusion:~$</span>
              <form onSubmit={sendCommand} className="flex-1 relative flex items-center">
                <input 
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none text-[#00ff41] font-mono caret-transparent"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
                {/* Custom Blinking Cursor */}
                {status === "idle" && (
                  <div 
                    className="absolute h-[1.2em] w-[0.6em] bg-[#00ff41] animate-[blink_1s_steps(1)_infinite] pointer-events-none shadow-[0_0_10px_#00ff41]"
                    style={{ left: `${command.length * 0.6}em` }}
                  />
                )}
                {status === "sending" && (
                  <div className="absolute right-0 w-3 h-3 border border-[#00ff41]/40 border-t-[#00ff41] rounded-full animate-spin" />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="max-w-6xl mx-auto w-full mt-2 flex justify-between items-center px-2 text-[9px] text-[#00ff41]/20 uppercase tracking-[0.3em] font-bold relative z-10">
        <span>SESSION: ENCRYPTED // 9TH_REALM_INTRA_NET</span>
        <span>OS_BUILD: 4.0.2_PRODUCTION</span>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 255, 65, 0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 255, 65, 0.1); }
        
        @keyframes blink {
          50% { opacity: 0; }
        }

        ::selection {
          background: rgba(0, 255, 65, 0.3);
          color: white;
        }

        .hologram-text {
          text-shadow: 0 0 10px rgba(0, 255, 65, 0.5), 0 0 20px rgba(0, 255, 65, 0.2);
        }
      `}</style>
    </div>
  );
}
