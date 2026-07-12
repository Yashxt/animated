import React, { useEffect, useRef, useState } from "react";

interface SkillCategory {
  num: string;
  title: string;
  tagline: string;
  technologies: { name: string; level: "EXPERT" | "ADVANCED" | "CORE" }[];
  concepts: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    num: "01",
    title: "Frontend Architecture",
    tagline: "High-performance interface design and layout parsing.",
    technologies: [
      { name: "React 19", level: "EXPERT" },
      { name: "TypeScript", level: "EXPERT" },
      { name: "Tailwind CSS v4", level: "EXPERT" },
      { name: "Next.js", level: "EXPERT" },
      { name: "HTML5 Canvas", level: "ADVANCED" }
    ],
    concepts: ["Atomic Token Systems", "Core Rendering Loops", "Modular Component Trees", "Accessibility (WCAG AA)"]
  },
  {
    num: "02",
    title: "Cinematic Motion",
    tagline: "Hardware-accelerated visual curves and scrolls.",
    technologies: [
      { name: "GSAP Suite", level: "EXPERT" },
      { name: "ScrollTrigger", level: "EXPERT" },
      { name: "SVG Filter Craft", level: "ADVANCED" },
      { name: "CSS Matrix Transitions", level: "EXPERT" }
    ],
    concepts: ["Transform-Only Timelines", "GPU Layer Promoting", "Custom Easing Matrices", "30/60 FPS Render Cycles"]
  },
  {
    num: "03",
    title: "Web3 & Protocol Integration",
    tagline: "Low-latency network interfacing and decentralized layers.",
    technologies: [
      { name: "Solana Web3.js", level: "ADVANCED" },
      { name: "Ethers / Wagmi", level: "ADVANCED" },
      { name: "WebSockets", level: "EXPERT" },
      { name: "GraphQL / APIs", level: "EXPERT" }
    ],
    concepts: ["Non-custodial Key Escrow", "Cross-chain swaps", "High-frequency payload filters", "State-merging hooks"]
  },
  {
    num: "04",
    title: "Development Pipeline",
    tagline: "Sub-second hot-reloads and atomic compile engines.",
    technologies: [
      { name: "Vite Bundler", level: "EXPERT" },
      { name: "Docker", level: "ADVANCED" },
      { name: "esbuild", level: "ADVANCED" },
      { name: "CI/CD Workflows", level: "ADVANCED" }
    ],
    concepts: ["Custom Chunk Splitting", "Tree Shaking Audit", "Local Dev Optimization", "Dependency Pruning"]
  }
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="relative py-24 md:py-36 border-b border-white/[0.03]">
      <div className="absolute inset-0 bg-grid-tech bg-grid-tech-subtle opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10" ref={containerRef}>
        
        {/* Section Header */}
        <div id="skills-header" className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs tracking-[0.3em] text-[#10b981]">
              [ 03 // CORE CAPABILITIES ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
              TECHNICAL STACK
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-white/40 max-w-xs font-light leading-relaxed">
            A precise mapping of engineering competence, visual craftsmanship, and system optimization layers.
          </p>
        </div>

        {/* Skills Grid */}
        <div 
          id="skills-grid" 
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Categories left list */}
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-[9px] tracking-widest text-white/30 mb-2">
              SELECT_CATEGORY //
            </span>
            {SKILL_CATEGORIES.map((cat, idx) => (
              <button
                key={cat.num}
                id={`skill-cat-btn-${cat.num}`}
                onClick={() => setActiveCategory(idx)}
                className={`flex items-center justify-between p-4 rounded border text-left transition-all duration-300 group cursor-pointer ${
                  activeCategory === idx
                    ? "bg-[#10b981]/5 border-[#10b981]/30 text-white shadow-[0_0_20px_rgba(16,185,129,0.05)]"
                    : "bg-white/[0.01] border-white/[0.04] text-white/50 hover:bg-white/[0.02] hover:border-white/[0.08]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`font-mono text-[10px] ${
                    activeCategory === idx ? "text-[#10b981]" : "text-white/30"
                  }`}>
                    {cat.num}
                  </span>
                  <span className="font-display text-sm tracking-wide font-light">
                    {cat.title}
                  </span>
                </div>
                <span className={`font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity ${
                  activeCategory === idx ? "opacity-100 text-[#10b981]" : "text-white/30"
                }`}>
                  →
                </span>
              </button>
            ))}
          </div>

          {/* Active Category Technical Breakdown */}
          <div className="col-span-1 lg:col-span-8 bg-white/[0.01] border border-white/[0.04] p-6 md:p-8 rounded-sm relative">
            <div className="absolute top-4 right-4 font-mono text-[8px] text-white/20 tracking-wider">
              SYS_INDEX: 0{activeCategory + 1} // CAPABILITIES
            </div>

            <div className="flex flex-col gap-6">
              {/* Category Title */}
              <div>
                <h3 className="font-display text-xl md:text-2xl font-light text-white tracking-wide">
                  {SKILL_CATEGORIES[activeCategory].title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-white/40 font-light mt-1.5 leading-relaxed">
                  {SKILL_CATEGORIES[activeCategory].tagline}
                </p>
              </div>

              {/* Technologies Breakdown list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[8px] tracking-widest text-[#10b981]">
                    // DETAILED_TECHNOLOGIES
                  </span>
                  <div className="flex flex-col gap-2.5">
                    {SKILL_CATEGORIES[activeCategory].technologies.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center justify-between p-3 border border-white/5 bg-[#07070a] rounded"
                      >
                        <span className="font-sans text-xs font-light text-white/80">
                          {tech.name}
                        </span>
                        <span className={`font-mono text-[8px] tracking-widest px-2 py-0.5 rounded ${
                          tech.level === "EXPERT"
                            ? "bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20"
                            : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        }`}>
                          {tech.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Concepts list */}
                <div className="flex flex-col gap-3 pl-0 md:pl-4">
                  <span className="font-mono text-[8px] tracking-widest text-white/40">
                    // ARCHITECTURAL_CONCEPTS
                  </span>
                  <div className="flex flex-col gap-2">
                    {SKILL_CATEGORIES[activeCategory].concepts.map((concept, i) => (
                      <div
                        key={concept}
                        className="flex items-start gap-2.5 text-xs text-white/50 font-light leading-relaxed"
                      >
                        <span className="text-[#10b981] text-[9px] mt-0.5">◇</span>
                        <span>{concept}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative crosshair alignment indicator */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5 font-mono text-[7px] text-white/30">
                <span>COMPILED_STABLE: OK</span>
                <span>COMPILER_TARGET: ES2022</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
