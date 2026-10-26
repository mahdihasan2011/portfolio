"use client";

import React, { useState, useEffect } from "react";
import MouseSpotlight from "@/components/ui/MouseSpotlight";
import SidebarHeader from "@/components/layout/SidebarHeader";
import TimelineNav from "@/components/layout/TimelineNav";
import BrittanyContent from "@/components/sections/BrittanyContent";
import FloatingContactButton from "@/components/ui/FloatingContactButton";
import ContactDrawer from "@/components/ui/ContactDrawer";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [isContactDrawerOpen, setIsContactDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    // In-page jump sections (skills and education are in left sidebar)
    const sectionIds = ["about", "experience", "projects"];

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
      <div className="mx-auto min-h-screen max-w-[1360px] px-4 sm:px-6 md:px-8 lg:px-8 xl:px-12 font-sans py-12 lg:py-0 pb-20 lg:pb-0">
        <div className="lg:flex lg:justify-between lg:gap-6 xl:gap-10 relative">
          {/* Sticky Left Column: Profile, Title, Fixed Skills, Socials */}
          <div className="lg:w-[34%] xl:w-[32%] shrink-0">
            <SidebarHeader
              activeSection={activeSection}
              onOpenContactDrawer={() => setIsContactDrawerOpen(true)}
            />
          </div>

          {/* Middle Line Area: Timeline Navigation with Line, Nodes & Labels */}
          <div className="hidden lg:flex lg:w-[135px] xl:w-[155px] shrink-0 justify-center">
            <TimelineNav
              activeSection={isContactDrawerOpen ? "contact" : activeSection}
              onOpenContactDrawer={() => setIsContactDrawerOpen(true)}
            />
          </div>

          {/* Scrollable Right Column: Content Sections */}
          <main id="content" className="flex-1 lg:max-w-[53%] xl:max-w-[55%] lg:pl-2">
            <BrittanyContent
              onOpenContactDrawer={() => setIsContactDrawerOpen(true)}
            />
          </main>
        </div>
      </div>

      {/* Floating Action Button (FAB) for Instant Contact */}
      <FloatingContactButton onClick={() => setIsContactDrawerOpen(true)} />

      {/* Slide-over Contact Drawer (Telegram Bot API Integrated) */}
      <ContactDrawer
        isOpen={isContactDrawerOpen}
        onClose={() => setIsContactDrawerOpen(false)}
      />
    </div>
  );
}
