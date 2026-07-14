import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Shield, Zap, BarChart3, Coins, Database, Layers } from "lucide-react";

interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  ctaUrl: string;
  visualType: "fintech" | "wallet" | "portfolio" | "telegram" | "widget" | "icons";
  stat: string;
}

const PROJECTS: Project[] = [
  {
    id: "fintech-design-system",
    category: "COMMERCIAL BRANDING",
    title: "Aesthetic Rigor Brand Campaign",
    description: "A high-fashion commercial video campaign focusing on premium product aesthetics. Engineered pacing, custom sound design overlays, and advanced high-contrast color grading to communicate brand value.",
    tags: ["DaVinci Resolve", "Resolve Color", "Sound Design", "Color Grading"],
    ctaUrl: "#",
    visualType: "fintech",
    stat: "12M+ VIEWS"
  },
  {
    id: "croco-wallet",
    category: "GAME MOTION TRAILER",
    title: "Echoes of the Vanguard",
    description: "Fast-paced cinematic gameplay trailer featuring dynamic speed ramps, complex visual effects compositions, 3D tracking integration, and high-impact sound design.",
    tags: ["Resolve Edit", "Resolve Fusion", "Sound Synthesis", "VFX Composite"],
    ctaUrl: "#",
    visualType: "wallet",
    stat: "4K CINEMATIC RELEASE"
  },
  {
    id: "crypto-portfolio",
    category: "DOCUMENTARY FILM",
    title: "The Digital Frontier",
    description: "A compelling short-form documentary chronicling high-tech innovators. Crafted a narrative-driven pacing rhythm, restored archival footage, and applied a cinematic film print emulation look.",
    tags: ["DaVinci Resolve", "Resolve Edit", "Film Emulation", "Archival Audio"],
    ctaUrl: "#",
    visualType: "portfolio",
    stat: "FESTIVAL SELECTION"
  },
  {
    id: "telegram-wallet",
    category: "MUSIC VISUAL ART",
    title: "Neon Horizons",
    description: "A rhythm-synchronized, visual-heavy music video utilizing custom glitch overlays, camera movement tracking, strobe color effects, and seamless stylistic cuts.",
    tags: ["Resolve Edit", "Glitch Effects", "Resolve Fusion", "Bespoke LUTs"],
    ctaUrl: "#",
    visualType: "telegram",
    stat: "VFX HEAVY CUT"
  },
  {
    id: "cunex-crypto-widget",
    category: "ENTERPRISE PROMO",
    title: "Apex Global Keynote Video",
    description: "High-end corporate introduction and product demo film blending live-action executive interviews with sleek screen-capture tracking and custom callout overlays.",
    tags: ["Resolve Fusion", "Resolve Edit", "UI Motion", "Sound Mixing"],
    ctaUrl: "#",
    visualType: "widget",
    stat: "$10M+ CAMPAIGN REACH"
  },
  {
    id: "crypto-icons-library",
    category: "NARRATIVE DRAMA",
    title: "Midnight Transit",
    description: "A moody, low-light dramatic sequence requiring extensive color correction, noise reduction, and matching diverse camera profiles to achieve a cohesive, cinematic tone.",
    tags: ["DaVinci Resolve", "ACES Workflow", "Noise Reduction", "HDR Grading"],
    ctaUrl: "#",
    visualType: "icons",
    stat: "BEST EDITING AWARD"
  }
];

export default function Portfolio() {
  return (
    <section id="work" className="relative py-24 md:py-36 border-b border-white/[0.03]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div id="work-header" className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs tracking-[0.3em] text-[#10b981]">
              [ 01 // SELECTED WORK ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
              FEATURED CASES
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-white/40 max-w-xs font-light leading-relaxed">
            A curated portfolio of high-end cinematic edits, commercial campaigns, and narrative films graded and finished to perfection.
          </p>
        </div>

        {/* Portfolio List */}
        <div id="portfolio-list" className="flex flex-col gap-28 md:gap-36">
          {PROJECTS.map((project, idx) => {
            const isPatternB = idx % 2 === 1; // Pattern A: Even (Text Left), Pattern B: Odd (Image Left)
            return (
              <ProjectCard 
                key={project.id} 
                project={project} 
                isPatternB={isPatternB} 
                index={idx}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  key?: React.Key;
  project: Project;
  isPatternB: boolean;
  index: number;
}

function ProjectCard({ project, isPatternB, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      id={project.id}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
    >
      {/* Content Col */}
      <div
        className={`lg:col-span-5 flex flex-col items-start gap-5 ${
          isPatternB ? "lg:order-2 lg:pl-8" : "lg:order-1"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#10b981] bg-[#10b981]/5 px-2.5 py-1 rounded border border-[#10b981]/15">
            // 0{index + 1}
          </span>
          <span className="font-mono text-[9px] tracking-[0.25em] text-white/40">
            {project.category}
          </span>
        </div>

        <h3 className="font-display text-2xl md:text-3xl font-light tracking-tight text-white">
          {project.title}
        </h3>

        <p className="font-sans text-xs md:text-sm text-white/50 leading-relaxed font-light">
          {project.description}
        </p>

        {/* Technical Stat */}
        <div className="flex items-center gap-2 border-l border-[#10b981]/30 pl-3 py-1 font-mono text-[10px] text-white/70">
          <span className="text-[#10b981]">// STAT:</span>
          <span className="tracking-widest">{project.stat}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] tracking-wider text-white/35 bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={project.ctaUrl}
          className="group flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-[#10b981] border border-[#10b981]/25 hover:border-[#10b981]/60 bg-[#10b981]/5 hover:bg-[#10b981]/10 px-4 py-2.5 rounded-sm transition-all duration-300 mt-4"
        >
          ANALYZE_CASE
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Visual Image Treatment Col */}
      <div
        className={`lg:col-span-7 ${
          isPatternB ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div className="relative group/image overflow-hidden rounded-sm border border-white/[0.04] bg-[#0c0c10] p-4 sm:p-6 transition-all duration-500 shadow-[0_0_50px_rgba(0,0,0,0.5)] hover:border-[#10b981]/30">
          
          {/* Accent corner brackets inside image border */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/20" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/20" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20" />

          {/* Ambient Glow behind image */}
          <div className="absolute -inset-1 rounded bg-gradient-to-r from-[#10b981]/5 to-blue-500/5 opacity-0 group-hover/image:opacity-100 blur transition-all duration-750" />

          {/* Core Interactive Visual Canvas */}
          <div className="relative z-10 w-full aspect-[16/10] overflow-hidden rounded-sm bg-[#07070a] border border-white/[0.04] flex items-center justify-center">
            
            {/* Direct CSS Custom Graphics corresponding to project types */}
            {project.visualType === "fintech" && (
              <div className="w-full h-full p-4 flex flex-col gap-3 font-mono text-[9px] text-white/30">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-[#10b981]">// ATOMIC_TOKEN_GRAPH</span>
                  <span>SECURE_NODE: ACTIVE</span>
                </div>
                <div className="flex-1 grid grid-cols-12 gap-3 items-end">
                  <div className="col-span-8 h-full border border-white/5 rounded p-2 flex flex-col gap-2 relative overflow-hidden bg-white/[0.01]">
                    {/* Simulated Chart Bars */}
                    <div className="flex-1 flex gap-1.5 items-end pt-4">
                      {[30, 45, 60, 50, 75, 90, 85, 100, 110, 95, 120].map((h, i) => (
                        <div 
                          key={i} 
                          className="flex-1 bg-gradient-to-t from-emerald-500/20 to-emerald-500/80 rounded-t-sm transition-all duration-500 group-hover/image:scale-y-115 origin-bottom" 
                          style={{ height: `${h / 1.5}%` }} 
                        />
                      ))}
                    </div>
                    <div className="h-4 border-t border-white/5 flex justify-between items-center text-[7px]">
                      <span>GRID_INDEX</span>
                      <span>INTERVAL: 1S</span>
                    </div>
                  </div>
                  <div className="col-span-4 h-full flex flex-col gap-2">
                    <div className="flex-1 border border-white/5 rounded p-2 flex flex-col justify-center bg-[#10b981]/5 text-center text-[#10b981]">
                      <BarChart3 className="w-5 h-5 mx-auto mb-1 animate-pulse" />
                      <span className="font-bold">99.8%</span>
                      <span className="text-[7px] text-white/40">SYS_UPTIME</span>
                    </div>
                    <div className="flex-1 border border-white/5 rounded p-2 flex flex-col justify-center bg-white/[0.01] text-center">
                      <span className="text-white">GAS_STABLE</span>
                      <span className="text-[7px]">21 GWEI</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {project.visualType === "wallet" && (
              <div className="w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-[#0c1210] to-[#07070a]">
                {/* Mobile screen mock */}
                <div className="w-[180px] h-[220px] bg-[#0d0d12] border border-white/10 rounded-xl p-3 flex flex-col gap-3 shadow-[0_0_30px_rgba(16,185,129,0.1)] relative">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-black rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
                  </div>
                  <div className="flex justify-between items-center text-[8px] font-mono text-white/40 mt-3 pt-1">
                    <span>CrocoWallet</span>
                    <Shield className="w-3 h-3 text-[#10b981]" />
                  </div>
                  <div className="text-center py-2 flex flex-col">
                    <span className="font-mono text-[8px] text-white/40 tracking-wider">WALLET BALANCE</span>
                    <span className="font-display text-lg font-bold text-white">$48,250.60</span>
                    <span className="font-mono text-[7px] text-[#10b981] mt-0.5">+14.2% (24H)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#10b981] text-black font-mono text-[7px] font-bold text-center py-1.5 rounded-md">
                      SEND_SOL
                    </div>
                    <div className="bg-white/5 border border-white/10 text-white font-mono text-[7px] text-center py-1.5 rounded-md">
                      RECEIVE
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-end">
                    <div className="h-[1px] bg-white/10 w-full my-1.5" />
                    <div className="flex justify-between text-[7px] font-mono text-white/40">
                      <span>SOL // SOLANA</span>
                      <span className="text-white">$142.20</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {project.visualType === "portfolio" && (
              <div className="w-full h-full p-4 flex flex-col gap-3 font-mono text-[9px] text-white/30 relative">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span>LIVE RISK ASSESSMENT MODULE</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                    <span className="text-white">API_STREAMING</span>
                  </div>
                </div>
                {/* SVG glowing graph */}
                <svg className="w-full h-[65%] text-[#10b981]/20" viewBox="0 0 100 40" fill="none">
                  <path 
                    d="M0 35 Q15 15, 30 25 T60 5 T80 20 T100 10" 
                    stroke="rgba(16, 185, 129, 0.8)" 
                    strokeWidth="1" 
                    fill="url(#gradient-portfolio)"
                    className="transition-all duration-1000 group-hover/image:translate-x-1"
                  />
                  <defs>
                    <linearGradient id="gradient-portfolio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(16, 185, 129, 0.2)" />
                      <stop offset="100%" stopColor="rgba(16, 185, 129, 0.0)" />
                    </linearGradient>
                  </defs>
                  {/* Grid Lines inside SVG */}
                  <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                  <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                  <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                </svg>
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-[7px] text-white/40">
                  <span>HISTORIC_VOLATILITY: LOW</span>
                  <span>MONTE_CARLO_RUN: 5000/OK</span>
                </div>
              </div>
            )}

            {project.visualType === "telegram" && (
              <div className="w-full h-full flex items-center justify-center p-6 bg-[#090b11]">
                <div className="w-[190px] h-[210px] bg-[#17212b] border border-white/5 rounded-lg flex flex-col overflow-hidden relative shadow-2xl">
                  {/* Telegram header */}
                  <div className="bg-[#24303f] p-2 flex items-center justify-between">
                    <span className="font-mono text-[7px] text-white">@wallet // TON</span>
                    <span className="text-[7px] font-mono text-[#10b981]">ESCROW_VERIFIED</span>
                  </div>
                  {/* Messages */}
                  <div className="p-2 flex flex-col gap-2.5 flex-1 justify-end font-mono text-[7px]">
                    <div className="self-start bg-[#182533] p-2 rounded-lg max-w-[80%] text-white/70">
                      Send me 5.0 TON for the vector asset package
                    </div>
                    <div className="self-end bg-[#2b5278] p-2 rounded-lg max-w-[80%] text-white relative">
                      <div className="flex flex-col gap-1">
                        <span className="text-emerald-400 font-bold">TRANSACTION SENT</span>
                        <span className="text-white/90">5.0 TON ($34.50)</span>
                        <span className="text-[6px] text-white/50">HASH: ton-a82f...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {project.visualType === "widget" && (
              <div className="w-full h-full flex items-center justify-center p-4 bg-[#0a0c10]">
                {/* Custom Swap card UI */}
                <div className="w-[210px] bg-[#0e1015] border border-white/5 rounded-lg p-3.5 flex flex-col gap-3 font-mono text-[8px] text-white/40">
                  <div className="flex justify-between items-center text-[#10b981]">
                    <span>CUNEX SWAP</span>
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-[#07080b] p-2 rounded border border-white/5">
                    <div className="flex justify-between text-white/60 mb-1">
                      <span>FROM (ETH)</span>
                      <span>BAL: 1.45</span>
                    </div>
                    <div className="flex justify-between text-white font-display text-xs font-semibold">
                      <span>1.0</span>
                      <span>$3,250.00</span>
                    </div>
                  </div>
                  <div className="flex justify-center -my-1 relative z-10">
                    <div className="w-5 h-5 rounded-full bg-[#10b981] text-black flex items-center justify-center text-xs font-bold border border-black shadow">
                      ↓
                    </div>
                  </div>
                  <div className="bg-[#07080b] p-2 rounded border border-white/5">
                    <div className="flex justify-between text-white/60 mb-1">
                      <span>TO (USDT)</span>
                      <span>BAL: 50.00</span>
                    </div>
                    <div className="flex justify-between text-white font-display text-xs font-semibold">
                      <span>3,248.50</span>
                      <span>$3,248.50</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-[7px]">
                    <span>SLIPPAGE: AUTO (0.1%)</span>
                    <span>GAS FEE: ~$4.50</span>
                  </div>
                </div>
              </div>
            )}

            {project.visualType === "icons" && (
              <div className="w-full h-full p-6 bg-radial-gradient-glow grid grid-cols-4 gap-4 items-center justify-center text-white/20">
                {/* Grid of stylized crypto coin icons drawn inside CSS */}
                <div className="aspect-square border border-white/5 bg-white/[0.01] rounded flex items-center justify-center relative group/box hover:border-[#10b981]/50 transition-colors">
                  <Coins className="w-6 h-6 text-yellow-500/80 animate-spin" style={{ animationDuration: "12s" }} />
                  <span className="absolute bottom-1 font-mono text-[6px]">BTC</span>
                </div>
                <div className="aspect-square border border-white/5 bg-white/[0.01] rounded flex items-center justify-center relative hover:border-[#10b981]/50 transition-colors">
                  <Layers className="w-6 h-6 text-indigo-400" />
                  <span className="absolute bottom-1 font-mono text-[6px]">ETH</span>
                </div>
                <div className="aspect-square border border-white/5 bg-white/[0.01] rounded flex items-center justify-center relative hover:border-[#10b981]/50 transition-colors">
                  <Zap className="w-6 h-6 text-[#10b981]" />
                  <span className="absolute bottom-1 font-mono text-[6px]">SOL</span>
                </div>
                <div className="aspect-square border border-white/5 bg-white/[0.01] rounded flex items-center justify-center relative hover:border-[#10b981]/50 transition-colors">
                  <Database className="w-6 h-6 text-blue-400" />
                  <span className="absolute bottom-1 font-mono text-[6px]">DOT</span>
                </div>
              </div>
            )}

          </div>

          {/* Micro-HUD scanning overlay style on hover */}
          <div className="absolute inset-x-0 bottom-4 text-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
            <span className="font-mono text-[8px] tracking-[0.4em] text-[#10b981] bg-[#030305] px-2.5 py-1 border border-[#10b981]/20 rounded-full">
              RENDER_FLOW // VIEW_SPECS
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
