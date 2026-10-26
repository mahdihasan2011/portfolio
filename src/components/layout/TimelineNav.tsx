"use client";

import React from "react";
import { Send } from "lucide-react";

export interface TimelineNavProps {
  activeSection: string;
  onOpenContactDrawer?: () => void;
}

interface TimelineItem {
  id: string;
  label: string;
  step: string;
  isDrawer?: boolean;
}

const TIMELINE_ITEMS: TimelineItem[] = [
  { id: "about", label: "About", step: "01" },
  { id: "experience", label: "Experience", step: "02" },
  { id: "projects", label: "Projects", step: "03" },
  { id: "education", label: "Education", step: "04" },
  { id: "contact", label: "Contact", step: "05", isDrawer: true },
];

export default function TimelineNav({
  activeSection,
  onOpenContactDrawer,
}: TimelineNavProps) {
  // Play subtle high-frequency synthesizer chime on node interaction
  const playChime = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Audio quietly suppressed
    }
  };

  const activeIndex = TIMELINE_ITEMS.findIndex((item) => item.id === activeSection);
  const safeActiveIndex = activeIndex >= 0 ? activeIndex : 0;
  // Percentage to fill the vertical timeline line down to current active node
  const progressPercent = (safeActiveIndex / (TIMELINE_ITEMS.length - 1)) * 100;

  const handleClick = (e: React.MouseEvent, item: TimelineItem) => {
    playChime();
    if (item.isDrawer) {
      e.preventDefault();
      onOpenContactDrawer?.();
      return;
    }

    const targetEl = document.getElementById(item.id);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${item.id}`);
    }
  };

  return (
    <aside
      className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:flex-col lg:justify-center shrink-0 z-20 select-none"
      aria-label="Timeline navigation"
    >
      {/* Full-height subtle background vertical divider line */}
      <div className="absolute left-[17px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--border-color)] to-transparent pointer-events-none" />

      {/* Main Timeline Card / Column */}
      <div className="relative py-8 pl-1 pr-4">
        {/* Top Minimalist Header Tag */}
        <div className="mb-6 flex items-center gap-2 pl-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_8px_rgba(0,240,255,0.8)] animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--accent-cyan)] font-bold">
            Timeline
          </span>
        </div>

        {/* Timeline Spine (Track + Animated Progress Bar) */}
        <div className="relative">
          {/* Base Track Line */}
          <div className="absolute left-[16px] top-2 bottom-2 w-[2px] bg-slate-800/80 dark:bg-slate-800/80 rounded-full" />

          {/* Active Gradient Glowing Progress Line */}
          <div
            className="absolute left-[16px] top-2 w-[2px] bg-gradient-to-b from-[var(--accent-cyan)] via-[var(--accent-cyan)] to-[var(--accent-violet)] rounded-full shadow-[0_0_10px_rgba(0,240,255,0.7)] transition-all duration-500 ease-out"
            style={{ height: `${progressPercent}%` }}
          />

          {/* Timeline Nodes & Labels */}
          <nav className="flex flex-col space-y-7 relative z-10">
            {TIMELINE_ITEMS.map((item, index) => {
              const isActive = activeSection === item.id;
              const isPassed = safeActiveIndex > index;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item)}
                  className="group flex items-center gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] rounded-lg py-1 px-1 transition-all"
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Timeline Node Marker */}
                  <div className="relative flex items-center justify-center w-8 h-8 shrink-0">
                    {/* Active Pulsing Ring */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-[var(--accent-cyan)]/25 animate-ping opacity-75" />
                    )}

                    {/* Circular Node Dot */}
                    <div
                      className={`relative rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-4 h-4 bg-[var(--accent-cyan)] border-2 border-white dark:border-[#07090e] shadow-[0_0_14px_rgba(0,240,255,0.9)] scale-110"
                          : isPassed
                          ? "w-3 h-3 bg-[var(--accent-cyan)]/60 border border-[var(--accent-cyan)]"
                          : "w-3 h-3 bg-[var(--bg-main)] border-2 border-slate-600 dark:border-slate-700 group-hover:border-[var(--accent-cyan)] group-hover:scale-125"
                      }`}
                    />
                  </div>

                  {/* Horizontal Connector Branch (Dash) */}
                  <span
                    className={`h-[1.5px] transition-all duration-300 ${
                      isActive
                        ? "w-6 bg-[var(--accent-cyan)] shadow-[0_0_8px_rgba(0,240,255,0.8)]"
                        : isPassed
                        ? "w-4 bg-[var(--accent-cyan)]/50"
                        : "w-3 bg-slate-700 group-hover:w-5 group-hover:bg-[var(--accent-cyan)]"
                    }`}
                  />

                  {/* Step Label & Numeric Tag */}
                  <div
                    className={`flex items-center gap-2 px-2.5 py-1 rounded-md transition-all duration-200 ${
                      isActive
                        ? "bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30 text-[var(--accent-cyan)]"
                        : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:bg-[var(--bg-surface)]"
                    }`}
                  >
                    <span
                      className={`font-mono text-[9px] transition-colors ${
                        isActive
                          ? "text-[var(--accent-cyan)] font-bold"
                          : "text-slate-500 group-hover:text-slate-400"
                      }`}
                    >
                      {item.step}
                    </span>
                    <span
                      className={`font-mono text-xs tracking-widest uppercase transition-colors ${
                        isActive ? "font-extrabold" : "font-semibold"
                      }`}
                    >
                      {item.label}
                    </span>
                    {item.isDrawer && (
                      <Send
                        className={`w-2.5 h-2.5 ml-0.5 transition-transform group-hover:translate-x-0.5 ${
                          isActive ? "text-[var(--accent-cyan)]" : "text-slate-500"
                        }`}
                      />
                    )}
                  </div>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom Minimalist Status / Pulse Note */}
        <div className="mt-8 pl-1">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono text-[var(--text-muted)]">
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span className="uppercase tracking-wider">Scroll Synced</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
