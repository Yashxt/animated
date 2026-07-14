import React, { useEffect, useRef, useState } from "react";
import { Film, Download, ArrowUpRight } from "lucide-react";

interface LabProject {
  id: string;
  title: string;
  tag: string;
  description: string;
  stars: string;
  forks: string;
  tech: string[];
  url: string;
}

const LAB_PROJECTS: LabProject[] = [
  {
    id: "aces-lookdev",
    title: "ACES Look Development Tool",
    tag: "COLOR_LUT",
    description: "A custom ACES-compliant LUT pack designed for low-light digital sensors (Sony FX3/A7SIII) to achieve rich skin tones and cinematic roll-off.",
    stars: "420",
    forks: "38",
    tech: ["ACES Workflow", "Sony S-Log3", "Cube LUTs"],
    url: "#"
  },
  {
    id: "resolve-proxy-script",
    title: "Resolve Proxy Automation Script",
    tag: "PIPELINE_SCRIPT",
    description: "A Python script designed for DaVinci Resolve script terminal to automatically set proxy generation settings and background sync workflows.",
    stars: "180",
    forks: "25",
    tech: ["Resolve Scripting", "Python", "Deliver Presets"],
    url: "#"
  },
  {
    id: "resolve-fusion-glitches",
    title: "Fusion Analog Glitch Templates",
    tag: "FUSION_MACRO",
    description: "A package of drag-and-drop analog glitch effects created natively as macros inside Resolve's Fusion page.",
    stars: "890",
    forks: "124",
    tech: ["Resolve Fusion", "Macro Presets", "CRT Emulation"],
    url: "#"
  },
  {
    id: "resolve-subtitle-importer",
    title: "Resolve Subtitle Ingestion Tool",
    tag: "EDIT_UTILITY",
    description: "A post-production helper script to parse timecode files and automatically generate synchronized subtitle tracks on the Resolve Edit page.",
    stars: "310",
    forks: "15",
    tech: ["Resolve Edit Page", "SRT Ingest", "Subtitle Tracks"],
    url: "#"
  }
];

export default function PersonalProjects() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="relative py-24 md:py-36 border-b border-white/[0.03]" ref={sectionRef}>
      <div className="absolute inset-0 bg-grid-tech bg-grid-tech-subtle opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div id="projects-header" className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs tracking-[0.3em] text-[#10b981]">
              [ 04 // ASSET TOOLKIT ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
              CREATIVE LAB
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-white/40 max-w-xs font-light leading-relaxed">
            A repository of open-source post-production utilities, color management scripts, and editing presets built for modern creative workflows.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div 
          id="personal-projects-grid" 
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {LAB_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              id={`lab-card-${proj.id}`}
              className="group relative flex flex-col justify-between p-6 bg-white/[0.01] border border-white/[0.04] rounded-sm hover:border-[#10b981]/30 transition-all duration-300 hover:bg-white/[0.015] hover:shadow-[0_0_30px_rgba(16,185,129,0.03)]"
            >
              {/* Card top banner */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Film className="w-4 h-4 text-white/30 group-hover:text-[#10b981] transition-colors" />
                  <span className="font-mono text-[8px] tracking-[0.25em] text-white/40">
                    {proj.tag}
                  </span>
                </div>
                
                {/* Download counter stats */}
                <div className="flex items-center gap-2 font-mono text-[8px] tracking-wider text-white/35 select-none">
                  <Download className="w-3.5 h-3.5 text-[#10b981]/80" />
                  <span>{proj.stars}+ DOWNLOADS</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-2.5">
                <h3 className="font-display text-base font-medium text-white tracking-wide group-hover:text-[#10b981] transition-colors flex items-center justify-between">
                  {proj.title}
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#10b981]" />
                </h3>
                <p className="font-sans text-xs text-white/45 leading-relaxed font-light">
                  {proj.description}
                </p>
              </div>

              {/* Footer row with tech tags */}
              <div className="mt-6 pt-4 border-t border-white/[0.03] flex flex-wrap gap-2 justify-between items-center">
                <div className="flex gap-1.5">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[8px] tracking-wide text-white/30 bg-white/[0.01] border border-white/5 px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-[8px] tracking-widest text-[#10b981]/50 group-hover:text-[#10b981] transition-colors">
                  {proj.id === "aces-lookdev" ? "GET_LUT" : proj.id === "analog-glitch-presets" ? "GET_PRESETS" : "LAUNCH_TOOL"}
                </span>
              </div>

              {/* Internal Accent corner overlays */}
              <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
