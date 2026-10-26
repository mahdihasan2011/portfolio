"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export interface TimelineNavProps {
  activeSection: string;
  onOpenContactDrawer?: () => void;
}

interface HudNavItem {
  id: string;
  label: string;
  code: string;
}

const TIMELINE_WAYPOINTS: HudNavItem[] = [
  { id: "about", label: "About", code: "01" },
  { id: "experience", label: "Experience", code: "02" },
  { id: "projects", label: "Projects", code: "03" },
];

export default function TimelineNav({
  activeSection,
  onOpenContactDrawer,
}: TimelineNavProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = Math.min(
          100,
          Math.max(0, Math.round((window.scrollY / totalHeight) * 100))
        );
        setScrollProgress(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Subtle synthesizer chime on waypoint click
  const playChime = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Audio quietly suppressed
    }
  };

  const handleClick = (e: React.MouseEvent, targetId: string) => {
    playChime();
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  return (
    <aside
      className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:flex-col lg:justify-between shrink-0 z-20 select-none py-10 w-[120px] xl:w-[135px]"
      aria-label="Section timeline navigation"
    >
      {/* Top Origin Anchor: Click to Scroll to Top, aligned with the vertical line */}
      <div className="self-end w-7 flex flex-col items-center gap-1 z-10">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            playChime();
          }}
          title="Scroll to Top"
          className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 transition-all hover:scale-110 cursor-pointer"
        >
          <ArrowUp className="w-3 h-3" />
        </button>
        <span className="font-mono text-[8px] font-bold text-[var(--accent-cyan)] tracking-widest uppercase">
          START
        </span>
      </div>

      {/* Central Continuous Liquid Telemetry Track */}
      <div className="relative flex-1 flex flex-col justify-around my-4 w-full">
        {/* Background Track Line (centered at 14px from right) */}
        <div className="absolute right-[14px] top-0 bottom-0 w-[1.5px] -translate-x-1/2 bg-[var(--border-color)]/50 rounded-full" />

        {/* Dynamic Liquid Glowing Fill Line */}
        <div
          className="absolute right-[14px] top-0 w-[1.5px] -translate-x-1/2 bg-gradient-to-b from-[var(--accent-cyan)] to-[var(--accent-cyan)] shadow-[0_0_8px_rgba(0,240,255,0.8)] rounded-full transition-all duration-150 pointer-events-none"
          style={{ height: `${scrollProgress}%` }}
        />

        {/* Traveling Glowing Laser Head Bead */}
        <div
          className="absolute right-[14px] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_12px_rgba(0,240,255,1)] ring-2 ring-cyan/40 pointer-events-none transition-all duration-150 z-20"
          style={{ top: `${scrollProgress}%` }}
        />

        {/* Waypoints along the line (Badges placed on the LEFT of the line) */}
        {TIMELINE_WAYPOINTS.map((item) => {
          const isActive = activeSection === item.id;
          const isPassed =
            (item.id === "about" &&
              (activeSection === "experience" ||
                activeSection === "projects")) ||
            (item.id === "experience" && activeSection === "projects");

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className="group relative flex items-center justify-end w-full z-10 transition-all duration-200 cursor-pointer py-1"
            >
              {/* Waypoint Monospace Tag (on the LEFT of the vertical line) */}
              <div className="flex items-center gap-1.5 transition-transform duration-200 group-hover:-translate-x-0.5 whitespace-nowrap">
                <div
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--accent-cyan)]/15 border-[var(--accent-cyan)]/40 text-[var(--accent-cyan)] shadow-[0_0_12px_rgba(0,240,255,0.18)] ring-1 ring-[var(--accent-cyan)]/30"
                      : "bg-[var(--bg-surface)]/85 border-[var(--border-color)]/70 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:border-[var(--accent-cyan)]/50 group-hover:bg-[var(--bg-surface)] backdrop-blur-xs"
                  }`}
                >
                  <span className="font-mono text-[9px] font-bold opacity-75">
                    {item.code}
                  </span>
                  <span
                    className={`font-mono text-[10px] tracking-wider uppercase transition-colors ${
                      isActive ? "font-bold text-[var(--accent-cyan)]" : "font-medium"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Micro Horizontal Connector Trace from tag to bead */}
                <div
                  className={`w-2 h-[1.5px] transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--accent-cyan)] shadow-[0_0_6px_rgba(0,240,255,0.8)]"
                      : isPassed
                      ? "bg-[var(--accent-cyan)]/50"
                      : "bg-[var(--border-color)]/70 group-hover:bg-[var(--accent-cyan)]/50"
                  }`}
                />
              </div>

              {/* Waypoint Bead centered right on the track line (w-7 = 28px, center is 14px) */}
              <div className="relative flex items-center justify-center w-7 h-7 shrink-0">
                {isActive && (
                  <span className="absolute -inset-0.5 rounded-full bg-[var(--accent-cyan)]/30 animate-ping opacity-75" />
                )}
                <div
                  className={`rounded-full transition-all duration-300 flex items-center justify-center ${
                    isActive
                      ? "w-3.5 h-3.5 bg-[var(--accent-cyan)] shadow-[0_0_12px_rgba(0,240,255,0.95)] ring-2 ring-cyan/40 scale-110"
                      : isPassed
                      ? "w-2.5 h-2.5 bg-[var(--accent-cyan)]/70 group-hover:scale-125"
                      : "w-2 h-2 bg-[var(--bg-main)] border border-[var(--border-color)] group-hover:border-[var(--accent-cyan)] group-hover:bg-[var(--accent-cyan)] group-hover:scale-125"
                  }`}
                >
                  {isActive && (
                    <div className="w-1 h-1 rounded-full bg-white shadow-xs" />
                  )}
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Bottom Destination Gauge: Real-time Depth Percentage aligned with line */}
      <div className="self-end w-7 flex flex-col items-center gap-1 z-10">
        <div className="flex items-center gap-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-cyan)] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent-cyan)] shadow-[0_0_4px_rgba(0,240,255,0.9)]" />
          </span>
          <span className="font-mono text-[8px] font-bold text-[var(--accent-cyan)] tracking-widest">
            {scrollProgress}%
          </span>
        </div>
        <span className="font-mono text-[7px] text-[var(--text-muted)] tracking-wider uppercase">
          DEPTH
        </span>
      </div>
    </aside>
  );
}
