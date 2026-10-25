"use client";

import React from "react";
import dynamic from "next/dynamic";
import { portfolioData } from "@/data/portfolioData";
import SceneFallback from "@/components/3d/SceneFallback";
import { ArrowRight, Mail, Terminal } from "lucide-react";

// Lazy-load 3D scene dynamically with SSR disabled and accessible fallback
const HeroLaptopScene = dynamic(
  () => import("@/components/3d/HeroLaptopScene"),
  {
    ssr: false,
    loading: () => <SceneFallback />,
  }
);

export default function HeroSection() {
  const { hero, personal } = portfolioData;

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
      aria-label="Hero Introduction"
    >
      {/* Subtle Ambient Background Gradients */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan/10 via-violet/10 to-transparent blur-3xl -z-10 rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & CTAs (60% width on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal-850 border border-charcoal-700/80 mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
              </span>
              <span className="font-mono text-xs text-slate-300">
                {personal.specialization} Developer
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-slate-100 tracking-tight leading-[1.12]">
              {hero.headline}
            </h1>

            {/* Introduction Description */}
            <p className="mt-5 text-base sm:text-lg text-slate-400 font-sans leading-relaxed max-w-xl">
              {hero.subheadline}
            </p>

            {/* Specialization Tags Row */}
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded bg-charcoal-850 border border-charcoal-750">
                React & Next.js
              </span>
              <span className="px-2.5 py-1 rounded bg-charcoal-850 border border-charcoal-750">
                Node.js & Express
              </span>
              <span className="px-2.5 py-1 rounded bg-charcoal-850 border border-charcoal-750">
                TypeScript
              </span>
              <span className="px-2.5 py-1 rounded bg-charcoal-850 border border-charcoal-750">
                PostgreSQL & MongoDB
              </span>
            </div>

            {/* Call to Actions */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href={hero.primaryCtaHref}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan text-charcoal-950 font-sans font-semibold text-sm hover:bg-cyan/90 transition-all shadow-md shadow-cyan/10 hover:shadow-cyan/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                <span>{hero.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={hero.secondaryCtaHref}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-charcoal-850 text-slate-200 border border-charcoal-700 font-sans font-medium text-sm hover:bg-charcoal-800 hover:border-slate-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                <Mail className="w-4 h-4" />
                <span>{hero.secondaryCtaText}</span>
              </a>
            </div>
          </div>

          {/* Right Column: 3D Composition beside text (40% width on desktop) */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            <HeroLaptopScene />
          </div>
        </div>
      </div>
    </section>
  );
}
