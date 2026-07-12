import React, { useEffect, useRef } from "react";

export default function HUDSystem() {
  const xRef = useRef<HTMLSpanElement>(null);
  const yRef = useRef<HTMLSpanElement>(null);
  const scrollRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastUpdate = 0;
    const throttleMs = 33; // ~30fps refresh limit

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastUpdate < throttleMs) return;
      lastUpdate = now;

      if (xRef.current) xRef.current.innerText = String(e.clientX).padStart(4, "0");
      if (yRef.current) yRef.current.innerText = String(e.clientY).padStart(4, "0");
    };

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPos = window.scrollY;
      const pct = docHeight > 0 ? Math.min(Math.round((scrollPos / docHeight) * 100), 100) : 0;

      if (scrollRef.current) {
        scrollRef.current.innerText = `${String(pct).padStart(3, "0")}%`;
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${pct}%`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial scroll setup
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="hud-overlay-system"
      className="fixed bottom-8 right-12 z-40 hidden md:flex flex-col gap-2.5 font-mono text-[9px] tracking-[0.2em] text-white/40 pointer-events-none select-none text-right"
    >
      {/* Scroll Progress HUD */}
      <div id="hud-scroll-status" className="flex items-center gap-3 justify-end">
        <span>VIEWPORT_SCROLL</span>
        <span ref={scrollRef} className="text-[#10b981] font-bold">000%</span>
      </div>

      {/* Mini Progress Rail */}
      <div id="hud-scroll-rail" className="w-40 h-[1px] bg-white/10 relative self-end">
        <div 
          ref={progressBarRef} 
          className="absolute right-0 top-0 h-full bg-[#10b981] transition-all duration-75"
          style={{ width: "0%" }}
        />
      </div>

      {/* Coordinate Tracker */}
      <div id="hud-coordinates-status" className="flex items-center gap-2 justify-end">
        <span>GRID_COORD</span>
        <span className="text-white/60 font-medium">
          [ X: <span ref={xRef} className="text-white">0000</span> // Y: <span ref={yRef} className="text-white">0000</span> ]
        </span>
      </div>

      {/* Small tech accent line */}
      <div className="w-12 h-[1px] bg-[#10b981]/30 self-end mt-1" />
    </div>
  );
}
