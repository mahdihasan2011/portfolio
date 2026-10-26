"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Compass, Briefcase, FolderGit2, ArrowUp } from "lucide-react";

export interface TimelineNavProps {
  activeSection: string;
  onOpenContactDrawer?: () => void;
}

interface HudNavItem {
  id: string;
  label: string;
  code: string;
  icon: React.ComponentType<{ className?: string }>;
}

const HUD_NAV_ITEMS: HudNavItem[] = [
  { id: "about", label: "About", code: "01", icon: Compass },
  { id: "experience", label: "Experience", code: "02", icon: Briefcase },
  { id: "projects", label: "Projects", code: "03", icon: FolderGit2 },
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

  // Subtle audio chime feedback on section jump
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
      className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:flex-col lg:justify-center shrink-0 z-20 select-none py-6"
      aria-label="Section navigation"
    >
      <div className="relative group">
        {/* Subtle Ambient Glow behind the capsule on hover */}
        <div className="absolute -inset-1 rounded-3xl bg-[var(--accent-cyan)]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Futuristic Glass Telemetry Capsule */}
        <div className="relative rounded-2xl border border-[var(--border-color)]/80 bg-[var(--bg-surface)]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-1.5 flex flex-col items-center gap-1.5 transition-all duration-300 hover:border-[var(--accent-cyan)]/40 hover:shadow-[0_8px_32px_rgba(0,240,255,0.08)]">
          {/* Top Telemetry Header */}
          <div className="flex items-center justify-between w-full px-2 py-1 border-b border-[var(--border-color)]/60">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-cyan)] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent-cyan)] shadow-[0_0_6px_rgba(0,240,255,0.9)]" />
              </span>
              <span className="font-mono text-[9px] font-bold tracking-widest text-[var(--accent-cyan)] uppercase">
                INDEX
              </span>
            </div>
            <span className="font-mono text-[9px] text-[var(--text-muted)] font-semibold">
              {scrollProgress}%
            </span>
          </div>

          {/* Navigation Action Nodes */}
          <nav className="flex flex-col gap-1 w-full relative">
            {HUD_NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`group/btn relative flex items-center justify-between gap-2.5 px-2.5 py-1.5 rounded-xl text-xs transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? "text-[var(--accent-contrast)] font-bold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                  }`}
                >
                  {/* Fluid Magnetic Spring Sliding Pill (Framer Motion layoutId) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeHudNavPill"
                      className="absolute inset-0 rounded-xl bg-[var(--accent-cyan)] shadow-[0_0_14px_rgba(0,240,255,0.4)]"
                      transition={{ type: "spring", stiffness: 450, damping: 28 }}
                    />
                  )}

                  {/* Icon & Label */}
                  <div className="relative z-10 flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">
                      {item.label}
                    </span>
                  </div>

                  {/* Section Numeric Index Tag */}
                  <span
                    className={`relative z-10 font-mono text-[8px] px-1 py-0.5 rounded font-semibold transition-colors ${
                      isActive
                        ? "bg-black/20 text-white/95"
                        : "bg-[var(--border-color)]/60 text-[var(--text-muted)] group-hover/btn:text-[var(--text-secondary)]"
                    }`}
                  >
                    {item.code}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Bottom Telemetry Footer: SVG Circular Progress Dial & Back-to-Top */}
          <div className="w-full pt-1 border-t border-[var(--border-color)]/60 flex items-center justify-between px-2">
            <div className="flex items-center gap-1.5" title={`${scrollProgress}% scrolled`}>
              <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 -rotate-90" viewBox="0 0 20 20">
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="text-[var(--border-color)]"
                    fill="transparent"
                  />
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeDasharray={2 * Math.PI * 8}
                    strokeDashoffset={
                      2 * Math.PI * 8 * (1 - scrollProgress / 100)
                    }
                    className="text-[var(--accent-cyan)] transition-all duration-150"
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
              </div>
              <span className="font-mono text-[8px] text-[var(--text-muted)] font-medium">
                LIVE
              </span>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                playChime();
              }}
              title="Return to top"
              className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 transition-colors"
            >
              <ArrowUp className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
