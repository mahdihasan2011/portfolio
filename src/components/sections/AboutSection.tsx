"use client";

import React from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import { FileDown, Compass, CheckCircle2, MapPin } from "lucide-react";

export default function AboutSection() {
  const { personal } = portfolioData;

  return (
    <section id="about" className="py-20 border-t border-charcoal-800/80 bg-charcoal-900/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="About Me"
          title="Engineering Solutions from First Principles"
          subtitle="Combining high-velocity full-stack execution with robust system architecture."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Profile Photo Column */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-64 h-80 sm:w-72 sm:h-92 rounded-2xl overflow-hidden border border-charcoal-700 bg-charcoal-850 p-2 shadow-2xl shadow-black/60 group">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src={personal.avatarUrl}
                  alt={`${personal.name} portrait`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 256px, 288px"
                  priority
                />
              </div>

              {/* Location Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-charcoal-950/85 backdrop-blur-md border border-charcoal-700/80 rounded-xl px-3 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan" />
                  <span>{personal.location}</span>
                </div>
                <span className="text-emerald-400 font-semibold">• Open</span>
              </div>
            </div>
          </div>

          {/* Biography & Approach Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <TiltCard className="p-6 sm:p-8">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-100 mb-4">
                Full-Stack Engineer with 8+ Years of Craftsmanship
              </h3>

              <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base font-sans">
                {personal.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Approach to solving software problems */}
              <div className="mt-6 pt-6 border-t border-charcoal-750">
                <div className="flex items-center gap-2 text-cyan font-display font-semibold text-sm uppercase tracking-wider mb-2">
                  <Compass className="w-4 h-4" />
                  <span>My Problem-Solving Approach</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-400 font-sans">
                  {personal.approach}
                </p>
              </div>

              {/* Highlights grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-charcoal-800/60 border border-charcoal-750">
                  <CheckCircle2 className="w-4 h-4 text-cyan shrink-0" />
                  <span>Type-Safe Architecture (TypeScript)</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-charcoal-800/60 border border-charcoal-750">
                  <CheckCircle2 className="w-4 h-4 text-cyan shrink-0" />
                  <span>High-Performance Next.js & React</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-charcoal-800/60 border border-charcoal-750">
                  <CheckCircle2 className="w-4 h-4 text-cyan shrink-0" />
                  <span>Scalable Node.js & Express APIs</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-charcoal-800/60 border border-charcoal-750">
                  <CheckCircle2 className="w-4 h-4 text-cyan shrink-0" />
                  <span>ACID Relational & Document Databases</span>
                </div>
              </div>

              {/* Optional Résumé Download Button (Shown only when configured) */}
              {personal.resumeUrl && (
                <div className="mt-8 pt-4 flex items-center justify-start">
                  <a
                    href={personal.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-charcoal-800 text-slate-100 border border-charcoal-700 hover:border-cyan/50 hover:bg-charcoal-750 font-sans text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                  >
                    <FileDown className="w-4 h-4 text-cyan" />
                    <span>Download Complete Résumé (PDF)</span>
                  </a>
                </div>
              )}
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
