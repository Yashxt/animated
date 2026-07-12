import React, { useEffect, useRef, useState } from "react";

interface StatementSectionProps {
  id?: string;
  tag?: string;
  statement: string;
  highlightWords?: string[];
  description?: string;
}

export default function StatementSection({
  id,
  tag = "STATEMENT",
  statement,
  highlightWords = [],
  description,
}: StatementSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const renderStatement = () => {
    if (highlightWords.length === 0) return statement;

    // Split statement by words and apply highlighting where applicable
    const words = statement.split(" ");
    return words.map((word, index) => {
      // Strip common punctuation to check if highlighted
      const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      const shouldHighlight = highlightWords.some(
        (hw) => hw.toLowerCase() === cleanWord.toLowerCase()
      );

      return (
        <span
          key={index}
          className={`transition-colors duration-500 ${
            shouldHighlight
              ? "text-[#10b981] font-normal drop-shadow-[0_0_15px_rgba(16,185,129,0.15)]"
              : "text-white/90"
          }`}
        >
          {word}{index === words.length - 1 ? "" : " "}
        </span>
      );
    });
  };

  return (
    <div
      id={id}
      ref={elementRef}
      className={`relative w-full py-24 md:py-36 border-y border-white/[0.03] bg-white/[0.01] overflow-hidden transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* Decorative background grid divider */}
      <div className="absolute inset-0 bg-grid-tech bg-grid-tech-subtle opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        {/* Tag */}
        <span className="font-mono text-[9px] tracking-[0.3em] text-[#10b981]/80 bg-[#10b981]/5 border border-[#10b981]/20 px-3 py-1 rounded-full mb-8">
          // {tag}
        </span>

        {/* Big Statement */}
        <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-tight max-w-5xl text-center">
          "{renderStatement()}"
        </h2>

        {/* Sub-description if provided */}
        {description && (
          <p className="font-sans text-sm md:text-base text-white/40 max-w-xl mt-8 font-light leading-relaxed">
            {description}
          </p>
        )}

        {/* Bottom Technical Crosshairs */}
        <div className="flex items-center gap-2 mt-10 opacity-30">
          <div className="w-8 h-[1px] bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
          <div className="w-8 h-[1px] bg-white/20" />
        </div>
      </div>
    </div>
  );
}
