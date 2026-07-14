import React from "react";
import { ArrowDown } from "lucide-react";
import SilverKnightSequence from "./SilverKnightSequence";

interface HeroPlaceholderProps {
  onLoadProgress?: (loaded: number, total: number) => void;
  onReady?: () => void;
}

export default function HeroPlaceholder({ onLoadProgress, onReady }: HeroPlaceholderProps) {
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
      className="relative w-full h-[100dvh] min-h-[680px] flex items-center justify-center overflow-hidden bg-[#030305]"
      style={{ filter: "none", backdropFilter: "none" }}
    >
      {/* z-0 Background Layer */}
      <div 
        id="hero-background-layer" 
        className="absolute inset-0 w-full h-full z-[0] pointer-events-none bg-gradient-to-b from-[#030305] via-[#080a0f] to-[#030305]"
        style={{ filter: "none", backdropFilter: "none" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.06)_0%,rgba(0,0,0,0)_65%)]" />
      </div>

      {/* z-1 Hidden preloader reference (maintained for architectural compatibility) */}
      <div 
        id="hero-future-image-preloader" 
        className="absolute inset-0 w-full h-full z-[1] pointer-events-none hidden"
      />

      {/* z-5 Silver Knight Sequence Layer */}
      <div 
        id="hero-sequence-layer" 
        className="absolute inset-0 w-full h-full z-[5] pointer-events-none flex items-center justify-center"
        style={{ filter: "none", backdropFilter: "none" }}
      >
        <SilverKnightSequence onLoadProgress={onLoadProgress} onReady={onReady} />
      </div>

      {/* z-10 Optional Dark Overlay (Subtle dark overlay only, no blur / vignette / glow) */}
      <div 
        id="hero-dark-overlay" 
        className="absolute inset-0 w-full h-full z-[10] pointer-events-none bg-black/15"
        style={{ filter: "none", backdropFilter: "none" }}
      />

      {/* z-20 Content Overlay & Hero Composition Layer */}
      <div 
        id="hero-content-overlay"
        className="relative z-[20] max-w-7xl w-full mx-auto px-6 md:px-12 h-full flex flex-col md:flex-row items-center justify-between pointer-events-none py-16 md:py-0"
        style={{ filter: "none", backdropFilter: "none" }}
      >
        {/* Left Side: Hero Text Content (Never covered, never pushed) */}
        <div 
          className="max-w-xl lg:max-w-2xl w-full flex flex-col items-start gap-6 select-none pointer-events-auto z-[20]"
          style={{ filter: "none", backdropFilter: "none" }}
        >
          {/* Tag */}
          <div 
            id="hero-tech-tag"
            className="flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/[0.05] rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
            <span className="font-mono text-[9px] tracking-[0.25em] text-white/60">
              AVAILABLE FOR SELECT PROJECTS // 2026
            </span>
          </div>

          {/* Heading */}
          <div id="hero-title-container" className="flex flex-col gap-2 mt-2">
            <span className="font-mono text-xs tracking-[0.3em] text-[#10b981]/80 font-medium">
              [ 00 // VIDEO EDITOR & COLORIST ]
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
              CRAFTING HIGH<br />
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#10b981]">
                FIDELITY MOTION
              </span>
            </h1>
          </div>

          {/* Description */}
          <p id="hero-paragraph-description" className="font-sans text-sm md:text-base text-white/60 leading-relaxed max-w-lg font-light mt-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Specializing in cinematic video editing, advanced color grading, sound design,
            and post-production workflows that bridge the gap between raw footage and
            high-impact visual storytelling.
          </p>

          {/* CTA Action */}
          <div id="hero-cta-wrapper" className="flex items-center gap-4 mt-4">
            <button
              id="hero-cta-button"
              onClick={handleScrollClick}
              className="relative overflow-hidden group flex items-center gap-2 bg-white text-black font-mono text-[10px] tracking-widest px-6 py-3.5 rounded-sm hover:bg-[#10b981] hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]"
            >
              EXPLORE_REEL
            </button>
            <span className="font-mono text-[9px] tracking-widest text-white/40 hidden sm:inline">
              // ACTIVE_CELL: EDIT_SUITE_ONLINE
            </span>
          </div>
        </div>
      </div>

      {/* z-30 Scroll Indicator Layer */}
      <div 
        id="hero-scroll-indicator"
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-[30] flex flex-col items-center gap-3 select-none pointer-events-auto"
        style={{ filter: "none", backdropFilter: "none" }}
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-white/40 drop-shadow-md">
          SCROLL_TO_ENTER
        </span>
        <button
          onClick={handleScrollClick}
          className="flex items-center justify-center w-8 h-8 rounded-full border border-white/15 bg-white/[0.02] text-white/50 hover:text-[#10b981] hover:border-[#10b981]/40 hover:scale-110 transition-all duration-300 shadow-lg"
          aria-label="Scroll down to work section"
        >
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
