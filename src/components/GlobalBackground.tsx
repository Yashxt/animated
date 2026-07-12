import React, { useEffect, useRef, useState } from "react";

export default function GlobalBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let frameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateGlow = () => {
      // Smooth lerp (linear interpolation) for glowing orb
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      if (containerRef.current) {
        const pctX = (currentX / window.innerWidth) * 100;
        const pctY = (currentY / window.innerHeight) * 100;
        containerRef.current.style.setProperty("--mouse-x", `${pctX}%`);
        containerRef.current.style.setProperty("--mouse-y", `${pctY}%`);
        setCoords({ x: Math.round(currentX), y: Math.round(currentY) });
      }

      frameId = requestAnimationFrame(updateGlow);
    };

    // Auto-drift orbs for screens with no mouse or initially
    const handleScroll = () => {
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setScrolled(isNaN(scrollPct) ? 0 : scrollPct);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    frameId = requestAnimationFrame(updateGlow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      id="global-background-system"
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-[#030305]"
      style={{
        ["--mouse-x" as any]: "50%",
        ["--mouse-y" as any]: "50%",
      }}
    >
      {/* Layer 1: Dark Base is handled by the root div bg-[#030305] */}

      {/* Layer 2: Radial Glow System (Interactive and GPU accelerated) */}
      <div 
        id="bg-ambient-orbs"
        className="absolute inset-0 w-full h-full opacity-70 transition-opacity duration-1000 bg-radial-gradient-glow pointer-events-none will-change-[background]"
      />
      
      {/* Additional custom accent glow blobs that drift slowly */}
      <div 
        id="glow-accent-blob-1"
        className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none animate-[pulse_12s_infinite_alternate]"
      />
      <div 
        id="glow-accent-blob-2"
        className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-500/5 blur-[140px] pointer-events-none animate-[pulse_16s_infinite_alternate_2s]"
      />

      {/* Layer 3: Film Grain Overlay (High Performance Animated SVG feTurbulence) */}
      <div 
        id="bg-film-grain"
        className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none film-grain"
      >
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="cinematic-grain-filter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.65" 
              numOctaves="3" 
              stitchTiles="stitch" 
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#cinematic-grain-filter)" className="noise-animation absolute inset-0 w-[200%] h-[200%] -left-1/2 -top-1/2" />
        </svg>
      </div>

      {/* Layer 4: Depth of Field System (Blurred vignette framing the content viewport) */}
      <div 
        id="depth-of-field-vignette"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, transparent 65%, rgba(3, 3, 5, 0.45) 100%)",
          backdropFilter: "blur(0.5px)",
        }}
      />

      {/* Layer 5: Technical Grid System & Tactical Lines */}
      <div 
        id="bg-tech-grid"
        className="absolute inset-0 w-full h-full bg-grid-tech bg-grid-tech-subtle pointer-events-none opacity-45"
      />

      {/* Grid Border Accents - Subtle long vertical divider lines typical of Matveyan */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-white/[0.015] pointer-events-none hidden md:block" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-white/[0.015] pointer-events-none hidden md:block" />
      <div className="absolute left-[25%] top-0 bottom-0 w-[1px] bg-white/[0.006] pointer-events-none hidden lg:block" />
      <div className="absolute right-[25%] top-0 bottom-0 w-[1px] bg-white/[0.006] pointer-events-none hidden lg:block" />

      {/* Technical HUD Crosshairs / Intersection Markers */}
      <div className="absolute left-[8%] top-[15dvh] -translate-x-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none hidden md:flex items-center justify-center">
        <div className="w-[1px] h-full bg-white/20 absolute" />
        <div className="h-[1px] w-full bg-white/20 absolute" />
      </div>
      <div className="absolute right-[8%] top-[15dvh] -translate-x-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none hidden md:flex items-center justify-center">
        <div className="w-[1px] h-full bg-white/20 absolute" />
        <div className="h-[1px] w-full bg-white/20 absolute" />
      </div>
      
      {/* Corner Bracket Accents */}
      <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-white/10 pointer-events-none" />
      <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-white/10 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-white/10 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-white/10 pointer-events-none" />
    </div>
  );
}
