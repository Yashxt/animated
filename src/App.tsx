/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from "react";
import GlobalBackground from "./components/GlobalBackground";
import Header from "./components/Header";
import HUDSystem from "./components/HUDSystem";
import HeroPlaceholder from "./components/HeroPlaceholder";
import StatementSection from "./components/StatementSection";
import Portfolio from "./components/Portfolio";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import PersonalProjects from "./components/PersonalProjects";
import Footer from "./components/Footer";

export default function App() {
  const [loadedFrames, setLoadedFrames] = useState(0);
  const [totalFrames, setTotalFrames] = useState(240);
  const [assetsReady, setAssetsReady] = useState(false);
  const [preloaderExiting, setPreloaderExiting] = useState(false);

  const handleLoadProgress = useCallback((loaded: number, total: number) => {
    setLoadedFrames(loaded);
    setTotalFrames(total);
  }, []);

  const handleReady = useCallback(() => {
    // Begin the exit animation for the preloader
    setPreloaderExiting(true);
    // After the fade-out transition completes, remove the preloader and reveal the app
    setTimeout(() => {
      setAssetsReady(true);
    }, 800);
  }, []);

  const loadPercent = totalFrames > 0 ? Math.round((loadedFrames / totalFrames) * 100) : 0;

  return (
    <div id="cinematic-app-container" className="relative w-full min-h-screen text-white overflow-hidden bg-[#030305]">

      {/* ═══════════════════════════════════════════════════════════════════
          GLOBAL FULLSCREEN PRELOADER
          Blocks all UI until every frame is loaded. Fades out smoothly.
       ═══════════════════════════════════════════════════════════════════ */}
      {!assetsReady && (
        <div
          id="global-preloader"
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030305] transition-opacity duration-700 ease-out ${
            preloaderExiting ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Preloader Logo Mark */}
          <div className="flex flex-col items-center gap-8">
            {/* Brand */}
            <div className="flex items-center gap-3 select-none">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
              <span className="font-display text-sm tracking-[0.35em] text-white/70 font-light">
                MATVEYAN . STUDIO
              </span>
            </div>

            {/* Progress Bar */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-56 h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#10b981] via-white/90 to-[#10b981] rounded-full transition-all duration-300 ease-out shadow-[0_0_16px_rgba(16,185,129,0.5)]"
                  style={{ width: `${loadPercent}%` }}
                />
              </div>
              <span className="font-mono text-[9px] tracking-[0.3em] text-white/40">
                LOADING_ASSETS // {loadedFrames} / {totalFrames}
              </span>
            </div>

            {/* Percentage */}
            <span className="font-display text-4xl font-extralight tracking-tight text-white/20 tabular-nums">
              {loadPercent}%
            </span>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          MAIN APPLICATION (hidden behind preloader until ready, then fades in)
       ═══════════════════════════════════════════════════════════════════ */}
      <div
        id="app-content-wrapper"
        className={`transition-opacity duration-700 ease-out ${
          assetsReady ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* 1. Global Persistent Background (Atmosphere Stack + Grids) */}
        <GlobalBackground />

        {/* 2. Navigation Header */}
        <Header />

        {/* 3. Realtime Coordinate & Scroll HUD Overlay */}
        <HUDSystem />

        {/* 4. Core Layout Stream */}
        <main id="core-content-stream" className="relative z-10 w-full">
          {/* Fullscreen Hero Placeholder */}
          <HeroPlaceholder onLoadProgress={handleLoadProgress} onReady={handleReady} />

          {/* Featured Statement Section A */}
          <StatementSection
            id="vision-break"
            tag="SELECTED VISION"
            statement="WE ARE NOT JUST CUTTING CLIPS. WE ARE CRAFTING HIGH-STIMULUS VISUAL NARRATIVES."
            highlightWords={["VISUAL", "HIGH-STIMULUS", "NARRATIVES"]}
            description="In a world saturated with generic content, premium pacing and color harmony are the ultimate discriminators. We shape stories for those who understand the language of detail."
          />

          {/* Alternating Portfolio Cases List */}
          <Portfolio />

          {/* Cinematic Section Break B */}
          <StatementSection
            id="specialization-break"
            tag="CORE DUALITY"
            statement="A RARE PAIRING OF RIGOROUS EDITING PRECISION AND BREATHTAKING COLOR GRADING."
            highlightWords={["PRECISION", "COLOR", "GRADING"]}
            description="True cinematic edits require perfect audio synchronization, invisible pacing, and meticulous visual grading. Every frame must load with intent, carry emotion, and command attention."
          />

          {/* Professional Experience Timeline */}
          <Experience />

          {/* Technical Capabilities Matrix */}
          <Skills />

          {/* Experimental Open-Source Lab Projects */}
          <PersonalProjects />

          {/* Contact form and branding footer */}
          <Footer />
        </main>
      </div>
    </div>
  );
}
