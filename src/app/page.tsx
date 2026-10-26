"use client";

import React, { useState, useEffect } from "react";
import MouseSpotlight from "@/components/ui/MouseSpotlight";
import SidebarHeader from "@/components/layout/SidebarHeader";
import BrittanyContent from "@/components/sections/BrittanyContent";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("about");

  useEffect(() => {
    const sectionIds = ["about", "experience", "projects", "skills", "education", "contact"];

    const handleScroll = () => {
      // Offset from top of viewport to detect active section
      const scrollPosition = window.scrollY + 220;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-[var(--accent-cyan)]/20 selection:text-[var(--accent-cyan)]">
      {/* Interactive Cursor Glow Spotlight (Signature Brittany Chiang Effect) */}
      <MouseSpotlight />

      {/* Main Container */}
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Sticky Left Column: Profile, Title, Jump Nav, Socials */}
          <SidebarHeader activeSection={activeSection} />

          {/* Scrollable Right Column: Content Sections */}
          <main id="content" className="flex-1">
            <BrittanyContent />
          </main>
        </div>
      </div>
    </div>
  );
}
