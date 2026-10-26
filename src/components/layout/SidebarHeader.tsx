"use client";

import React, { useState } from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import { useTheme } from "@/context/ThemeContext";
import {
  Github,
  Linkedin,
  Mail,
  FileDown,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Send,
  Code2,
  GraduationCap,
} from "lucide-react";

interface SidebarHeaderProps {
  onOpenContactDrawer?: () => void;
}

export default function SidebarHeader({ onOpenContactDrawer }: SidebarHeaderProps) {
  const { personal, skills } = portfolioData;
  const { isDark, toggleTheme } = useTheme();
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>("All");

  const playChime = () => {
    if (!soundEnabled) return;
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
      osc.frequency.setValueAtTime(isDark ? 523.25 : 659.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(isDark ? 783.99 : 880, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Audio quietly suppressed
    }
  };

  // Flattened or filtered skills
  const skillCategories = [
    "All",
    "Frontend & UI",
    "Backend & APIs",
    "Database & Storage",
    "DevOps & Cloud",
  ];

  const displayedSkills =
    selectedSkillCategory === "All"
      ? skills.flatMap((c) => c.skills)
      : skills.find((c) => c.category === selectedSkillCategory)?.skills || [];

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:max-h-screen lg:w-full lg:flex-col lg:justify-between lg:py-12 shrink-0 lg:overflow-y-auto lg:pr-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div>
        {/* Profile Avatar & Identity */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="relative rounded-2xl overflow-hidden border-2 border-[var(--accent-cyan)] shadow-lg group shrink-0"
            style={{ position: "relative", width: "72px", height: "72px", minWidth: "72px", minHeight: "72px" }}
          >
            <Image
              src={personal.avatarUrl}
              alt={personal.name}
              width={144}
              height={144}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
          <div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              <a href="#about" onClick={playChime}>{personal.name}</a>
            </h1>
            <h2 className="mt-1 font-mono text-base sm:text-lg font-semibold text-[var(--accent-cyan)]">
              {personal.title}
            </h2>
          </div>
        </div>

        {/* Short Statement */}
        <p className="mt-4 max-w-sm text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-sans">
          I design and build high-performance web applications, resilient backend architectures, and distributed enterprise software systems.
        </p>

        {/* Status Badge & Direct Contact CTA */}
        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for new opportunities</span>
          </div>

          {onOpenContactDrawer && (
            <button
              onClick={() => {
                onOpenContactDrawer();
                playChime();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cyan/40 bg-cyan/10 hover:bg-cyan/20 text-cyan text-xs font-mono font-medium transition-all hover:scale-105"
            >
              <Send className="w-3 h-3" />
              <span>Contact Now</span>
            </button>
          )}
        </div>

        {/* ========================================================
            TECHNICAL SKILLS (Fixed In Left Sidebar)
            ======================================================== */}
        <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-cyan" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-cyan)]">
                Technical Arsenal
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">
              {displayedSkills.length} Technologies
            </span>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {skillCategories.map((cat) => {
              const shortLabel =
                cat === "Frontend & UI"
                  ? "Frontend"
                  : cat === "Backend & APIs"
                  ? "Backend"
                  : cat === "Database & Storage"
                  ? "Database"
                  : cat === "DevOps & Cloud"
                  ? "DevOps"
                  : "All";

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedSkillCategory(cat)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium transition-all"
                  style={{
                    backgroundColor:
                      selectedSkillCategory === cat ? "var(--accent-cyan)" : "var(--bg-surface)",
                    color: selectedSkillCategory === cat ? "#07090e" : "var(--text-secondary)",
                    border: `1px solid ${
                      selectedSkillCategory === cat ? "var(--accent-cyan)" : "var(--border-color)"
                    }`,
                  }}
                >
                  {shortLabel}
                </button>
              );
            })}
          </div>

          {/* Skill Pills Grid */}
          <div className="flex flex-wrap gap-1.5 max-h-52 overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {displayedSkills.map((skill) => (
              <span
                key={skill.name}
                title={`${skill.name} • ${skill.description}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-primary)] hover:border-cyan hover:text-cyan transition-colors group cursor-default"
              >
                <span>{skill.name}</span>
                <span className="text-[9px] text-[var(--text-muted)] font-sans group-hover:text-cyan/80">
                  {skill.level === "Senior" ? "★ Sr" : "• Adv"}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* ========================================================
            EDUCATION & CREDENTIALS (Compact & Shortened)
            ======================================================== */}
        <div className="mt-6 pt-5 border-t border-[var(--border-color)]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-cyan" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-cyan)]">
                Education
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">
              M.Sc. & B.Sc.
            </span>
          </div>

          <div className="space-y-2.5">
            {/* M.Sc. */}
            <div className="p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-cyan/40 transition-all group">
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-xs font-bold text-[var(--text-primary)] group-hover:text-cyan transition-colors">
                  M.Sc. in Computer Science & Engineering
                </span>
                <span className="font-mono text-[10px] text-[var(--text-muted)] shrink-0">
                  2022 — 2023
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-[11px] font-sans">
                <span className="text-cyan font-semibold">Jahangirnagar University</span>
                <span className="text-[var(--text-muted)] text-[10px]">• Savar, Dhaka</span>
              </div>
            </div>

            {/* B.Sc. */}
            <div className="p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-cyan/40 transition-all group">
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-xs font-bold text-[var(--text-primary)] group-hover:text-cyan transition-colors">
                  B.Sc. in Computer Science & Engineering
                </span>
                <span className="font-mono text-[10px] text-[var(--text-muted)] shrink-0">
                  2013 — 2017
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-[11px] font-sans">
                <span className="text-cyan font-semibold">IUBAT</span>
                <span className="text-[var(--text-muted)] text-[10px]">• Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Area in Left Column */}
      <div className="mt-6 pt-5 border-t border-[var(--border-color)]">
        <div className="flex flex-wrap items-center gap-4">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={personal.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub Profile"
              title="GitHub Profile"
              className="p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] transition-all hover:scale-105"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={personal.linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
              className="p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] transition-all hover:scale-105"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${personal.email}`}
              aria-label="Send Email"
              title="Send Direct Email"
              className="p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] transition-all hover:scale-105"
            >
              <Mail className="w-4 h-4" />
            </a>

            {personal.resumeUrl && (
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="View Full Résumé"
                title="View Full Résumé PDF"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-xs font-mono font-semibold text-[var(--text-primary)] hover:border-[var(--accent-cyan)] transition-all hover:scale-105"
              >
                <FileDown className="w-3.5 h-3.5 text-cyan" />
                <span>Résumé</span>
              </a>
            )}
          </div>

          {/* Quick Utility Actions: Sound & Theme */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playChime();
              }}
              className="p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] transition-all hover:scale-105"
              style={{
                color: soundEnabled ? "var(--accent-cyan)" : "var(--text-muted)",
              }}
              aria-label={soundEnabled ? "Mute interactive audio" : "Enable subtle audio"}
              title={soundEnabled ? "Audio ON" : "Audio OFF"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                toggleTheme();
                playChime();
              }}
              className="p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] transition-all hover:scale-105"
              aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-violet" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
