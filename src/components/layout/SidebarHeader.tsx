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
  Phone,
  ArrowUpRight,
} from "lucide-react";

interface SidebarHeaderProps {
  activeSection: string;
}

export default function SidebarHeader({ activeSection }: SidebarHeaderProps) {
  const { personal, hero } = portfolioData;
  const { isDark, toggleTheme } = useTheme();
  const [soundEnabled, setSoundEnabled] = useState(false);

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

  const navLinks = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        {/* Profile Avatar & Identity */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[var(--accent-cyan)] shadow-lg group shrink-0">
            <Image
              src={personal.avatarUrl}
              alt={personal.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="80px"
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

        {/* Status Badge */}
        <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for new opportunities</span>
        </div>

        {/* Brittany Chiang In-Page Nav (Desktop) */}
        <nav className="nav hidden lg:block" aria-label="In-page jump links">
          <ul className="mt-14 w-max space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={playChime}
                    className="group flex items-center py-3"
                  >
                    <span
                      className={`nav-indicator mr-4 h-px transition-all motion-reduce:transition-none ${
                        isActive
                          ? "w-16 bg-[var(--accent-cyan)]"
                          : "w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-200"
                      }`}
                    />
                    <span
                      className={`nav-text text-xs font-mono font-bold uppercase tracking-widest transition-colors ${
                        isActive
                          ? "text-[var(--accent-cyan)]"
                          : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {link.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom Footer Area in Left Column */}
      <div className="mt-12 lg:mt-0 pt-6">
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
