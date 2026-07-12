import React from "react";
import { ArrowDown } from "lucide-react";

export default function HeroPlaceholder() {
  const handleScrollClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.querySelector("#work");
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="hero-placeholder-section"
      className="relative w-full h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* 1. Future Animation Layer - Left completely blank & ready for canvas overlay */}
      <div 
        id="hero-future-canvas-container" 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      />

      {/* 2. Future Image Sequence Layer - Empty container for frame preloader references */}
      <div 
        id="hero-future-image-preloader" 
        className="absolute inset-0 w-full h-full z-1 pointer-events-none hidden"
      />

      {/* 3. Content Overlay Layer */}
      <div 
        id="hero-content-overlay"
        className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 h-full flex flex-col justify-center"
      >
        <div className="max-w-3xl flex flex-col items-start gap-6 select-none">
          {/* Tag */}
          <div 
            id="hero-tech-tag"
            className="flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/[0.05] rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
            <span className="font-mono text-[9px] tracking-[0.25em] text-white/60">
              AVAILABLE FOR SELECT PROJECTS // 2026
            </span>
          </div>

          {/* Heading */}
          <div id="hero-title-container" className="flex flex-col gap-2 mt-2">
            <span className="font-mono text-xs tracking-[0.3em] text-[#10b981]/80 font-medium">
              [ 00 // CREATIVE DEVELOPER & ARCHITECT ]
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-light tracking-tight leading-[1.05] text-white">
              CRAFTING HIGH<br />
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#10b981]">
                FIDELITY SYSTEMS
              </span>
            </h1>
          </div>

          {/* Description */}
          <p id="hero-paragraph-description" className="font-sans text-sm md:text-base text-white/50 leading-relaxed max-w-xl font-light mt-2">
            Specializing in high-performance full-stack architectures, interactive 
            fluid animations, and bespoke custom design solutions that bridge the gap 
            between raw technology and cinematic sensory experiences.
          </p>

          {/* CTA Action */}
          <div id="hero-cta-wrapper" className="flex items-center gap-4 mt-4">
            <button
              id="hero-cta-button"
              onClick={handleScrollClick}
              className="relative overflow-hidden group flex items-center gap-2 bg-white text-black font-mono text-[10px] tracking-widest px-6 py-3.5 rounded-sm hover:bg-[#10b981] hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
            >
              EXPLORE_PORTFOLIO
            </button>
            <span className="font-mono text-[9px] tracking-widest text-white/30 hidden sm:inline">
              // ACTIVE_CELL: SYSTEM_LOADED
            </span>
          </div>
        </div>
      </div>

      {/* 4. Scroll Indicator Layer */}
      <div 
        id="hero-scroll-indicator"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 select-none"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-white/30">
          SCROLL_TO_ENTER
        </span>
        <button
          onClick={handleScrollClick}
          className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/[0.01] text-white/40 hover:text-[#10b981] hover:border-[#10b981]/40 hover:scale-110 transition-all duration-300"
          aria-label="Scroll down to work section"
        >
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
