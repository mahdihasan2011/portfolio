"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  Sparkles,
  Layout,
  Server,
  Database,
  Cloud,
  Star,
} from "lucide-react";

interface SidebarHeaderProps {
  activeSection?: string;
  onOpenContactDrawer?: () => void;
}

interface SkillItem {
  name: string;
  description: string;
  level: string;
}

export default function SidebarHeader({
  activeSection = "about",
  onOpenContactDrawer,
}: SidebarHeaderProps) {
  const { personal, skills } = portfolioData;
  const { isDark, toggleTheme } = useTheme();
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger compact sticky header when scrolled past top hero space on mobile
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend & UI":
        return <Layout className="w-3 h-3 shrink-0" />;
      case "Backend & APIs":
        return <Server className="w-3 h-3 shrink-0" />;
      case "Database & Storage":
        return <Database className="w-3 h-3 shrink-0" />;
      case "DevOps & Cloud":
        return <Cloud className="w-3 h-3 shrink-0" />;
      case "All":
      default:
        return <Sparkles className="w-3 h-3 shrink-0" />;
    }
  };

  const getCategoryShortLabel = (cat: string) => {
    switch (cat) {
      case "Frontend & UI":
        return "Frontend";
      case "Backend & APIs":
        return "Backend";
      case "Database & Storage":
        return "Database";
      case "DevOps & Cloud":
        return "DevOps";
      default:
        return "All";
    }
  };

  const displayedSkills =
    selectedSkillCategory === "All"
      ? skills.flatMap((c) => c.skills)
      : skills.find((c) => c.category === selectedSkillCategory)?.skills || [];

  const currentSkill =
    activeSkill ||
    (hoveredSkill ? displayedSkills.find((s) => s.name === hoveredSkill) : null);

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:max-h-screen lg:w-full lg:flex-col lg:justify-between lg:py-12 shrink-0 lg:overflow-y-auto lg:pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div>
        {/* Profile Avatar & Identity: Shortened and fixed on top when scrolled in mobile view */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isScrolled
              ? "fixed top-0 left-0 right-0 z-30 bg-[var(--bg-glass)] backdrop-blur-md border-b border-[var(--border-color)] px-4 py-2.5 shadow-md lg:static lg:p-0 lg:bg-transparent lg:border-none lg:shadow-none"
              : "relative mb-4"
          }`}
        >
          <div className="flex items-center justify-between max-w-[1360px] mx-auto lg:max-w-none">
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className={`relative rounded-xl overflow-hidden border-2 border-[var(--accent-cyan)] shadow-md group shrink-0 transition-all duration-300 ${
                  isScrolled
                    ? "w-10 h-10 min-w-10 min-h-10 lg:w-[72px] lg:h-[72px] lg:min-w-[72px] lg:min-h-[72px]"
                    : "w-[72px] h-[72px] min-w-[72px] min-h-[72px]"
                }`}
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
                <h1
                  className={`font-display font-bold tracking-tight text-[var(--text-primary)] transition-all duration-300 ${
                    isScrolled ? "text-lg sm:text-xl lg:text-4xl xl:text-5xl" : "text-4xl sm:text-5xl"
                  }`}
                >
                  <a href="#about" onClick={playChime}>{personal.name}</a>
                </h1>
                <h2
                  className={`font-mono font-semibold text-[var(--accent-cyan)] transition-all duration-300 ${
                    isScrolled ? "text-xs sm:text-sm lg:text-base xl:text-lg" : "mt-1 text-base sm:text-lg"
                  }`}
                >
                  {personal.title}
                </h2>
              </div>
            </div>

            {/* Active section indicator shown on the right side of mobile sticky header */}
            {isScrolled && (
              <div className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] text-xs font-mono font-bold tracking-wider uppercase shadow-sm transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_6px_rgba(0,240,255,0.8)]" />
                <span>{activeSection}</span>
              </div>
            )}
          </div>
        </div>

        {/* Layout placeholder on mobile to prevent content jump when header docks to top */}
        {isScrolled && <div className="h-[96px] lg:hidden mb-4" />}

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
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] shadow-[0_0_8px_rgba(0,240,255,0.2)]">
                <Code2 className="w-3.5 h-3.5" />
              </div>
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-cyan)]">
                Technical Arsenal
              </h3>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-[10px] font-mono text-[var(--text-muted)] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_4px_rgba(0,240,255,0.8)]" />
              <span>{displayedSkills.length} Technologies</span>
            </div>
          </div>

          {/* Animated Category Tabs with Framer Motion Sliding Pill */}
          <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-[var(--bg-surface)]/60 border border-[var(--border-color)] mb-3.5 backdrop-blur-sm shadow-xs">
            {skillCategories.map((cat) => {
              const isActive = selectedSkillCategory === cat;
              const shortLabel = getCategoryShortLabel(cat);

              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedSkillCategory(cat);
                    setActiveSkill(null);
                    playChime();
                  }}
                  className={`relative px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium transition-colors duration-150 flex items-center gap-1.5 z-10 select-none cursor-pointer ${
                    isActive
                      ? "text-[var(--accent-contrast)] font-bold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]/80"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillCategoryTab"
                      className="absolute inset-0 rounded-lg bg-[var(--accent-cyan)] shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1">
                    {getCategoryIcon(cat)}
                    <span>{shortLabel}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Staggered & Fluid Animated Skill Badges */}
          <motion.div layout className="flex flex-wrap gap-1.5">
            <AnimatePresence mode="popLayout">
              {displayedSkills.map((skill, index) => {
                const isSelected = activeSkill?.name === skill.name;
                const isHovered = hoveredSkill === skill.name;
                const isSenior =
                  skill.level.includes("Senior") || skill.level.includes("Lead");

                return (
                  <motion.button
                    layout
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: -6 }}
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 26,
                      delay: index * 0.015,
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setActiveSkill(isSelected ? null : skill);
                      playChime();
                    }}
                    onMouseEnter={() => {
                      setHoveredSkill(skill.name);
                    }}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`group relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all duration-200 text-left cursor-pointer ${
                      isSelected
                        ? "border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] shadow-[0_0_14px_rgba(0,240,255,0.25)] ring-1 ring-[var(--accent-cyan)]/40"
                        : isHovered
                        ? "border-[var(--accent-cyan)]/70 bg-[var(--bg-surface)] text-[var(--accent-cyan)] shadow-[0_2px_12px_rgba(0,240,255,0.18)]"
                        : "border-[var(--border-color)] bg-[var(--bg-surface)]/90 text-[var(--text-primary)] hover:border-[var(--accent-cyan)]/60 hover:text-[var(--accent-cyan)]"
                    }`}
                  >
                    <span className="font-medium tracking-tight">{skill.name}</span>
                    <span
                      className={`text-[9px] px-1 py-0.2 rounded font-sans transition-colors inline-flex items-center gap-0.5 ${
                        isSenior
                          ? "bg-amber-400/10 text-amber-500 dark:text-amber-300 border border-amber-400/25 group-hover:border-amber-400/40"
                          : "text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)]/80"
                      }`}
                    >
                      {isSenior && (
                        <Star className="w-2.5 h-2.5 fill-current shrink-0" />
                      )}
                      <span>{isSenior ? "Sr" : "• Adv"}</span>
                    </span>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Micro-Inspector Drawer: Expands when a skill is clicked or hovered */}
          <AnimatePresence>
            {currentSkill && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -6 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="mt-3 overflow-hidden rounded-xl border border-[var(--accent-cyan)]/35 bg-[var(--accent-cyan)]/5 backdrop-blur-md p-3 shadow-[0_4px_20px_rgba(0,240,255,0.08)]"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-cyan)] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-cyan)]" />
                    </span>
                    <span className="font-mono text-xs font-bold text-[var(--text-primary)]">
                      {currentSkill.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30">
                    {currentSkill.level}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                  {currentSkill.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
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
                <span className="text-[var(--text-muted)] text-[10px]">• Dhaka, Bangladesh</span>
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

      {/* Bottom Footer Area: Fixed at bottom on mobile, pinned to sidebar on desktop */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-card)]/90 backdrop-blur-md border-t border-[var(--border-color)] px-3 sm:px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-xl lg:static lg:bottom-auto lg:left-auto lg:right-auto lg:z-auto lg:p-0 lg:bg-transparent lg:shadow-none lg:border-t lg:border-[var(--border-color)] lg:mt-6 lg:pt-5">
        <div className="flex items-center justify-between lg:justify-start lg:gap-4 max-w-md mx-auto lg:mx-0">
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
