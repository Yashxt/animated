/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
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
  return (
    <div id="cinematic-app-container" className="relative w-full min-h-screen text-white overflow-hidden bg-[#030305]">
      {/* 1. Global Persistent Background (Atmosphere Stack + Grids) */}
      <GlobalBackground />

      {/* 2. Navigation Header */}
      <Header />

      {/* 3. Realtime Coordinate & Scroll HUD Overlay */}
      <HUDSystem />

      {/* 4. Core Layout Stream */}
      <main id="core-content-stream" className="relative z-10 w-full">
        {/* Fullscreen Hero Placeholder */}
        <HeroPlaceholder />

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
  );
}
