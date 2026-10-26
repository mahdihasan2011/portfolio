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
  { id: "contact", label: "Contact", step: "04", isDrawer: true },
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
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
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
      className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:flex-col lg:justify-center shrink-0 z-20 select-none px-2"
      aria-label="Timeline navigation"
    >
      {/* Container holding the vertical track & nodes */}
      <div className="relative py-6">
        {/* Subtle Top Micro Header */}
        <div className="mb-8 flex items-center gap-2 pl-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_8px_rgba(0,240,255,0.8)] animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--accent-cyan)] font-bold">
            Timeline
          </span>
        </div>

        {/* Timeline Spine (Track + Animated Glowing Progress Bar) */}
        <div className="relative">
          {/* Base Track Line */}
          <div className="absolute left-[7px] top-3 bottom-3 w-[1.5px] bg-slate-800/80 dark:bg-slate-800/80 rounded-full" />

          {/* Active Liquid Gradient Glowing Progress Line */}
          <div
            className="absolute left-[7px] top-3 w-[1.5px] bg-gradient-to-b from-[var(--accent-cyan)] via-[var(--accent-cyan)] to-[var(--accent-violet)] rounded-full shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all duration-500 ease-out"
            style={{ height: `${progressPercent}%` }}
          />

          {/* Timeline Nodes & Clean Aligned Labels */}
          <nav className="flex flex-col space-y-6 relative z-10">
            {TIMELINE_ITEMS.map((item, index) => {
              const isActive = activeSection === item.id;
              const isPassed = safeActiveIndex > index;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item)}
                  className="group flex items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-cyan)] rounded-lg py-1 transition-all"
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Timeline Node Marker (Fixed width slot centered on the spine) */}
                  <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
                    {/* Active Pulsing Aura */}
                    {isActive && (
                      <span className="absolute -inset-1 rounded-full bg-[var(--accent-cyan)]/20 animate-ping opacity-75" />
                    )}

                    {/* Circular Node Dot */}
                    <div
                      className={`rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-3 h-3 bg-[var(--accent-cyan)] shadow-[0_0_12px_rgba(0,240,255,0.9)] ring-2 ring-cyan/40 scale-125"
                          : isPassed
                          ? "w-2 h-2 bg-[var(--accent-cyan)]/60"
                          : "w-2 h-2 bg-slate-700 dark:bg-slate-700 group-hover:bg-[var(--accent-cyan)] group-hover:scale-125"
                      }`}
                    />
                  </div>

                  {/* Fixed-Width Horizontal Branch Slot (Ensures labels never jitter or jump) */}
                  <div className="w-7 flex items-center pl-1.5 shrink-0">
                    <span
                      className={`h-[1.5px] transition-all duration-300 ${
                        isActive
                          ? "w-5 bg-[var(--accent-cyan)] shadow-[0_0_6px_rgba(0,240,255,0.8)]"
                          : isPassed
                          ? "w-3.5 bg-[var(--accent-cyan)]/50"
                          : "w-2.5 bg-slate-700 group-hover:w-4 group-hover:bg-[var(--accent-cyan)]"
                      }`}
                    />
                  </div>

                  {/* Aligned Monospace Label & Tag */}
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/25 shadow-[0_0_12px_rgba(0,240,255,0.08)]"
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
                      className={`font-mono text-[11px] tracking-[0.15em] uppercase transition-colors ${
                        isActive ? "font-bold" : "font-medium"
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
        <div className="mt-8 pl-1.5">
          <div className="inline-flex items-center gap-1.5 text-[9px] font-mono text-[var(--text-muted)] tracking-wider">
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span className="uppercase tracking-[0.16em] opacity-80">Scroll Synced</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
