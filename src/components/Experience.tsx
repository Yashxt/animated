import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface TimelineItem {
  id: string;
  year: string;
  role: string;
  company: string;
  location: string;
  bullets: string[];
  skills: string[];
}

const EXPERIENCE_DATA: TimelineItem[] = [
  {
    id: "color-grading-practice",
    year: "MONTH 03",
    role: "Resolve Color Page & Grading",
    company: "Self-Directed Advanced Study",
    location: "Remote Study",
    bullets: [
      "Mastered node-based color grading in DaVinci Resolve, practicing primary corrections, qualifiers, tracking, and cinematic look creation.",
      "Completed color space transform exercises matching Sony S-Log3, ARRI LogC, and RED footage to ACES standards.",
      "Developed custom PowerGrades, film print emulation trees, and LUT presets for practice sequences."
    ],
    skills: ["Resolve Color Page", "ACES Color Space", "Film Emulation", "Node Tree Workflow"]
  },
  {
    id: "editing-assembly-training",
    year: "MONTH 02",
    role: "Resolve Edit Page & Fairlight Audio",
    company: "Portfolio Development",
    location: "Remote Study",
    bullets: [
      "Assembled narrative rough and fine cuts for practice projects, trailer re-edits, and promo clips to study pacing and rhythm.",
      "Synchronized multi-camera timelines and synced separate audio tracks using Resolve audio-wave matching.",
      "Conformed timelines, cleaned up vocal noise, and structured audio tracks inside the Fairlight tab."
    ],
    skills: ["Resolve Edit Page", "Fairlight Audio", "Multi-Cam Timeline", "Audio Syncing"]
  },
  {
    id: "creative-foundations",
    year: "MONTH 01",
    role: "Resolve Fusion VFX & Deliver Workflows",
    company: "Skill Acquisition",
    location: "Remote Study",
    bullets: [
      "Learned ingestion protocols, proxy workflows, transcoding, and formatting files for web and social platforms.",
      "Practiced planar tracking, title animations, chroma keying, and simple VFX compositing inside the Fusion tab.",
      "Configured advanced render profiles, queues, and transcode formats inside the Deliver tab."
    ],
    skills: ["Fusion Node Trees", "Deliver Page Renders", "Planar Tracker", "Proxy Ingestion"]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-36 border-b border-white/[0.03]">
      {/* Structural background elements */}
      <div className="absolute inset-0 bg-grid-tech bg-grid-tech-subtle opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div id="experience-header" className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs tracking-[0.3em] text-[#10b981]">
              [ 02 // TRAINING & PRACTICE ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
              LEARNING JOURNEY
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-white/40 max-w-xs font-light leading-relaxed">
            A detailed log of post-production study, skill acquisition, and hands-on portfolio practice projects.
          </p>
        </div>

        {/* Timeline Rows Container */}
        <div id="experience-timeline" className="flex flex-col border-t border-white/10">
          {EXPERIENCE_DATA.map((item) => (
            <TimelineRow key={item.id} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}

interface TimelineRowProps {
  key?: React.Key;
  item: TimelineItem;
}

function TimelineRow({ item }: TimelineRowProps) {
  const [isVisible, setIsVisible] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

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

    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      id={`experience-row-${item.id}`}
      className={`grid grid-cols-1 md:grid-cols-12 py-10 md:py-14 border-b border-white/5 items-start transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* Year Col */}
      <div className="md:col-span-2 mb-4 md:mb-0">
        <span className="font-mono text-sm tracking-[0.2em] text-[#10b981] font-semibold">
          {item.year}
        </span>
      </div>

      {/* Title & Organization Col */}
      <div className="md:col-span-5 mb-6 md:mb-0 flex flex-col gap-1.5 pr-4">
        <h3 className="font-display text-lg md:text-xl font-medium text-white tracking-tight">
          {item.role}
        </h3>
        <div className="flex items-center gap-2 font-mono text-[10px] text-white/50 tracking-wider">
          <span>{item.company}</span>
          <span>//</span>
          <span className="text-white/35">{item.location}</span>
        </div>
      </div>

      {/* Description & Skill Tags Col */}
      <div className="md:col-span-5 flex flex-col gap-6">
        <ul className="flex flex-col gap-3.5 list-none">
          {item.bullets.map((bullet, idx) => (
            <li 
              key={idx} 
              className="font-sans text-xs md:text-sm text-white/50 leading-relaxed font-light flex gap-2.5 items-start"
            >
              <span className="text-[#10b981] font-bold text-[10px] mt-1 shrink-0">◇</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Competencies used */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="font-mono text-[8px] tracking-wider text-white/40 bg-white/[0.015] border border-white/[0.04] px-2.5 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
