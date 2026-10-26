"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import { useTheme } from "@/context/ThemeContext";
import {
  Menu,
  X,
  FileDown,
  ArrowUpRight,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Mail,
  Phone,
} from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { personal } = portfolioData;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Web Audio Synthesizer for subtle futuristic chimes
  const playChime = () => {
    if (!soundEnabled) return;
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
      osc.frequency.setValueAtTime(isDark ? 523.25 : 659.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        isDark ? 783.99 : 880,
        ctx.currentTime + 0.12
      );
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Audio quietly suppressed if restricted
    }
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "GitHub", href: "#github" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-md py-3 shadow-md border-b"
            : "bg-transparent py-4 sm:py-5"
        }`}
        style={{
          backgroundColor: isScrolled
            ? "var(--bg-glass)"
            : "transparent",
          borderColor: isScrolled ? "var(--border-color)" : "transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo / Initials */}
          <Link
            href="#hero"
            onClick={playChime}
            className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-lg"
            aria-label={`${personal.name} home`}
          >
            <span
              className="relative flex items-center justify-center w-10 h-10 rounded-xl border transition-all shadow-sm group-hover:scale-105"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="relative w-full h-full rounded-[10px] overflow-hidden">
                <Image
                  src={personal.avatarUrl}
                  alt={personal.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                  priority
                />
              </div>
              {/* Online Pulse Beacon */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[var(--bg-main)] animate-pulse z-10" />
            </span>
            <div className="flex flex-col">
              <span
                className="font-display text-sm font-bold tracking-tight transition-colors group-hover:text-[var(--accent-cyan)]"
                style={{ color: "var(--text-primary)" }}
              >
                {personal.name}
              </span>
              <span
                className="text-[11px] font-mono leading-none"
                style={{ color: "var(--text-muted)" }}
              >
                {personal.title}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 border px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-color)",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={playChime}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all hover:text-[var(--accent-cyan)] hover:bg-[var(--bg-card)]"
                style={{ color: "var(--text-secondary)" }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playChime();
              }}
              className="p-2 rounded-xl border transition-all hover:scale-105"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
                color: soundEnabled ? "var(--accent-cyan)" : "var(--text-muted)",
              }}
              aria-label={soundEnabled ? "Mute interactive audio" : "Enable subtle audio effects"}
              title={soundEnabled ? "Audio Sound: ON (Click to Mute)" : "Audio Sound: OFF (Click to Enable)"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Interactive Theme Switcher Pill (Unique & Attention-Grabbing) */}
            <button
              onClick={() => {
                toggleTheme();
                playChime();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border font-mono text-xs font-semibold transition-all hover:scale-105 shadow-sm"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
              aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              title={isDark ? "Switch to Titanium Light Theme" : "Switch to Cyber Dark Theme"}
            >
              <div
                className="flex items-center justify-center w-5 h-5 rounded-md transition-colors"
                style={{
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.08)" : "#fef3c7",
                  color: isDark ? "#38bdf8" : "#d97706",
                }}
              >
                {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              </div>
              <span className="hidden sm:inline text-[11px] font-medium">
                {isDark ? "Dark" : "Light"}
              </span>
            </button>

            {/* Résumé Button */}
            {personal.resumeUrl && (
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playChime}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all hover:scale-105"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                <FileDown className="w-3.5 h-3.5 text-cyan" />
                <span>Résumé</span>
              </a>
            )}

            {/* Contact CTA */}
            <a
              href="#contact"
              onClick={playChime}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-xl transition-transform hover:scale-105 shadow-sm text-charcoal-950 font-sans"
              style={{
                backgroundColor: "var(--accent-cyan)",
              }}
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                playChime();
              }}
              className="md:hidden p-2 rounded-xl border transition-colors"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
              aria-label="Open Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-in Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-72 z-50 p-6 flex flex-col justify-between border-l shadow-2xl transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-color)",
          color: "var(--text-primary)",
        }}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: "var(--border-color)" }}>
            <div className="flex items-center gap-2.5">
              <span
                className="relative flex items-center justify-center w-8 h-8 rounded-lg border overflow-hidden"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                }}
              >
                <Image
                  src={personal.avatarUrl}
                  alt={personal.name}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </span>
              <span className="font-display font-bold text-sm">{personal.name}</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-lg border"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <nav className="flex flex-col gap-2 mt-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  playChime();
                }}
                className="px-3.5 py-2.5 rounded-xl font-display font-medium text-sm transition-colors hover:bg-[var(--bg-card)]"
                style={{ color: "var(--text-secondary)" }}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Drawer Footer Actions */}
        <div className="space-y-3 pt-6 border-t" style={{ borderColor: "var(--border-color)" }}>
          {/* Theme Switcher in drawer */}
          <button
            onClick={() => {
              toggleTheme();
              playChime();
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-mono font-semibold"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-color)",
            }}
          >
            <span className="flex items-center gap-2">
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-violet" />}
              <span>{isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
            </span>
            <span className="text-[10px] uppercase font-bold text-cyan">{isDark ? "Dark" : "Light"}</span>
          </button>

          {/* Résumé CTA in drawer */}
          {personal.resumeUrl && (
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
            >
              <FileDown className="w-4 h-4 text-cyan" />
              <span>Download Résumé PDF</span>
            </a>
          )}

          {/* Direct WhatsApp Call */}
          <a
            href={personal.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-charcoal-950 font-sans"
            style={{
              backgroundColor: "var(--accent-cyan)",
            }}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </aside>
    </>
  );
}
