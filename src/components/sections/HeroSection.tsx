"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { portfolioData } from "@/data/portfolioData";
import SceneFallback from "@/components/3d/SceneFallback";
import {
  ArrowRight,
  Mail,
  FileDown,
  Sparkles,
  Terminal,
  ShieldCheck,
  Zap,
  Code2,
  CheckCircle2,
} from "lucide-react";

// Lazy-load 3D scene dynamically with SSR disabled and accessible fallback
const HeroLaptopScene = dynamic(() => import("@/components/3d/HeroLaptopScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

export default function HeroSection() {
  const { hero, personal, metrics } = portfolioData;

  // Typewriter effect for rotating roles
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Interactive Mini Inspector Tab
  const [activeTab, setActiveTab] = useState<"stack" | "sla" | "architecture">("stack");

  useEffect(() => {
    const currentRole = hero.rotatingRoles[roleIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % hero.rotatingRoles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, hero.rotatingRoles]);

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
      aria-label="Hero Introduction"
    >
      {/* Background Ambient Mesh Glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] blur-3xl -z-10 rounded-full opacity-35"
        style={{
          background:
            "radial-gradient(circle, var(--accent-cyan) 0%, var(--accent-violet) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & CTAs (60% width on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Status Pill */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6 shadow-sm"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span
                className="font-mono text-xs font-semibold"
                style={{ color: "var(--accent-cyan)" }}
              >
                Available for Senior Roles & High-Impact Contracts
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.12]"
              style={{ color: "var(--text-primary)" }}
            >
              {hero.headlinePrefix}{" "}
              <span className="gradient-text block sm:inline">{hero.headlineHighlight}</span>
            </h1>

            {/* Dynamic Typewriter Role */}
            <div className="mt-4 flex items-center gap-2 font-mono text-sm sm:text-base font-semibold min-h-[1.8em]">
              <span style={{ color: "var(--text-muted)" }}>Specializing in:</span>
              <span
                className="border-r-2 pr-1"
                style={{
                  color: "var(--accent-cyan)",
                  borderColor: "var(--accent-cyan)",
                }}
              >
                {displayText}
              </span>
            </div>

            {/* Introduction Description */}
            <p
              className="mt-4 text-base sm:text-lg font-sans leading-relaxed max-w-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              {hero.subheadline}
            </p>

            {/* Interactive Inspector Tabs (Unique & Attention-Grabbing) */}
            <div
              className="mt-6 w-full max-w-xl p-3.5 rounded-2xl border shadow-sm"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="flex items-center gap-1.5 pb-2.5 border-b mb-3" style={{ borderColor: "var(--border-color)" }}>
                <button
                  onClick={() => setActiveTab("stack")}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors"
                  style={{
                    backgroundColor: activeTab === "stack" ? "var(--bg-surface)" : "transparent",
                    color: activeTab === "stack" ? "var(--accent-cyan)" : "var(--text-muted)",
                    border: `1px solid ${activeTab === "stack" ? "var(--border-color)" : "transparent"}`,
                  }}
                >
                  Core Stack
                </button>
                <button
                  onClick={() => setActiveTab("sla")}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors"
                  style={{
                    backgroundColor: activeTab === "sla" ? "var(--bg-surface)" : "transparent",
                    color: activeTab === "sla" ? "var(--accent-cyan)" : "var(--text-muted)",
                    border: `1px solid ${activeTab === "sla" ? "var(--border-color)" : "transparent"}`,
                  }}
                >
                  Production SLA
                </button>
                <button
                  onClick={() => setActiveTab("architecture")}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors"
                  style={{
                    backgroundColor: activeTab === "architecture" ? "var(--bg-surface)" : "transparent",
                    color: activeTab === "architecture" ? "var(--accent-cyan)" : "var(--text-muted)",
                    border: `1px solid ${activeTab === "architecture" ? "var(--border-color)" : "transparent"}`,
                  }}
                >
                  Architecture
                </button>
              </div>

              {/* Tab Content Display */}
              {activeTab === "stack" && (
                <div className="flex flex-wrap gap-2 text-xs font-mono animate-in fade-in duration-150">
                  {["React 19 / Next.js", "TypeScript", "Node.js & Express", "PHP 8 & Laravel", "MySQL & PostgreSQL", "Redis Caching", "Docker"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md border font-medium"
                        style={{
                          backgroundColor: "var(--bg-surface)",
                          borderColor: "var(--border-color)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              )}

              {activeTab === "sla" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono animate-in fade-in duration-150">
                  <div className="p-2 rounded-lg border" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-color)" }}>
                    <span className="text-cyan font-bold block">99.9% Uptime</span>
                    <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>SLA Standard</span>
                  </div>
                  <div className="p-2 rounded-lg border" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-color)" }}>
                    <span className="text-emerald-400 font-bold block">&lt; 50ms Latency</span>
                    <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>Optimized Cache</span>
                  </div>
                  <div className="p-2 rounded-lg border" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-color)" }}>
                    <span className="text-violet font-bold block">Zero-Downtime</span>
                    <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>CI/CD Pipelines</span>
                  </div>
                </div>
              )}

              {activeTab === "architecture" && (
                <div className="flex flex-col gap-1.5 text-xs font-sans animate-in fade-in duration-150" style={{ color: "var(--text-secondary)" }}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan shrink-0" />
                    <span>First-Principles System Modeling & Type-Safe API Contracts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan shrink-0" />
                    <span>Microservices & Event-Driven Asynchronous Job Queues</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan shrink-0" />
                    <span>ACID Relational Schemas & Resilient Offline-First Syncing</span>
                  </div>
                </div>
              )}
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href={hero.primaryCtaHref}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-bold text-sm text-charcoal-950 transition-all hover:scale-105 shadow-md"
                style={{
                  backgroundColor: "var(--accent-cyan)",
                }}
              >
                <span>{hero.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={hero.secondaryCtaHref}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-sans font-semibold text-sm transition-all hover:scale-105"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                <Mail className="w-4 h-4 text-cyan" />
                <span>{hero.secondaryCtaText}</span>
              </a>

              {personal.resumeUrl && (
                <a
                  href={personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border font-mono text-xs font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-secondary)",
                  }}
                  title="Download Mahdi Hasan Resume (PDF)"
                >
                  <FileDown className="w-4 h-4 text-cyan" />
                  <span>Download CV</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: 3D Centerpiece (50% on desktop) */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            <HeroLaptopScene />
          </div>
        </div>

        {/* Executive Metrics Counters Grid */}
        <div
          className="mt-16 pt-10 border-t grid grid-cols-2 md:grid-cols-4 gap-6"
          style={{ borderColor: "var(--border-color)" }}
        >
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col">
              <span
                className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight"
                style={{ color: "var(--accent-cyan)" }}
              >
                {metric.value}
              </span>
              <span
                className="font-display font-semibold text-sm mt-1"
                style={{ color: "var(--text-primary)" }}
              >
                {metric.label}
              </span>
              <span
                className="text-xs font-mono mt-0.5"
                style={{ color: "var(--text-muted)" }}
              >
                {metric.sublabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
