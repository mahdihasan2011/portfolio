"use client";

import React from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import {
  FileDown,
  Compass,
  CheckCircle2,
  MapPin,
  Award,
  Layers,
  ShieldCheck,
  Zap,
  Phone,
  Mail,
  ExternalLink,
  Server,
  Database,
  Cpu,
  Layout,
} from "lucide-react";

export default function AboutSection() {
  const { personal, services } = portfolioData;

  const serviceIcons: Record<string, React.ReactNode> = {
    Layout: <Layout className="w-5 h-5 text-cyan" />,
    Server: <Server className="w-5 h-5 text-violet" />,
    Database: <Database className="w-5 h-5 text-emerald-400" />,
    Cpu: <Cpu className="w-5 h-5 text-amber-400" />,
  };

  return (
    <section
      id="about"
      className="py-20 border-t"
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "var(--bg-surface)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Engineering Leadership"
          title="Engineering Solutions from First Principles"
          subtitle="Combining high-velocity full-stack execution with robust, resilient system architecture and 8+ years of production experience."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Profile Photo Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div
              className="relative w-64 h-80 sm:w-72 sm:h-92 rounded-2xl overflow-hidden border p-2 shadow-2xl group transition-all"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
                boxShadow: "var(--shadow-card)",
              }}
            >
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

              {/* Experience Badge */}
              <div
                className="absolute top-4 right-4 backdrop-blur-md rounded-xl px-3 py-1.5 border flex items-center gap-1.5 text-xs font-mono font-bold shadow-lg"
                style={{
                  backgroundColor: "var(--bg-glass)",
                  borderColor: "var(--accent-cyan)",
                  color: "var(--accent-cyan)",
                }}
              >
                <Award className="w-3.5 h-3.5" />
                <span>8+ Years Exp</span>
              </div>

              {/* Location Badge */}
              <div
                className="absolute bottom-4 left-4 right-4 backdrop-blur-md border rounded-xl px-3 py-2 flex items-center justify-between text-xs font-mono shadow-md"
                style={{
                  backgroundColor: "var(--bg-glass)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan" />
                  <span className="truncate">{personal.location}</span>
                </div>
                <span className="text-emerald-400 font-semibold shrink-0">• Available</span>
              </div>
            </div>

            {/* Quick Contact & CV Chips */}
            <div className="mt-5 w-full max-w-xs flex flex-col gap-2">
              <a
                href={personal.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-mono font-semibold transition-colors hover:border-cyan"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{personal.phoneFormatted}</span>
              </a>

              <a
                href={`mailto:${personal.email}`}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-mono font-semibold transition-colors hover:border-cyan truncate"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                <Mail className="w-3.5 h-3.5 text-cyan" />
                <span className="truncate">{personal.email}</span>
              </a>
            </div>
          </div>

          {/* Biography & Approach Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <TiltCard className="p-6 sm:p-8">
              <h3
                className="font-display text-xl sm:text-2xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Full-Stack Engineer with 8+ Years of Enterprise Delivery
              </h3>

              <div
                className="space-y-4 leading-relaxed text-sm sm:text-base font-sans"
                style={{ color: "var(--text-secondary)" }}
              >
                {personal.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Approach to solving software problems */}
              <div
                className="mt-6 pt-6 border-t"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div
                  className="flex items-center gap-2 font-display font-semibold text-sm uppercase tracking-wider mb-2"
                  style={{ color: "var(--accent-cyan)" }}
                >
                  <Compass className="w-4 h-4" />
                  <span>My Engineering Philosophy</span>
                </div>
                <p
                  className="text-sm leading-relaxed font-sans"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {personal.approach}
                </p>
              </div>

              {/* Highlights 4 Pillars Grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div
                  className="flex items-center gap-2 p-2.5 rounded-xl border"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan shrink-0" />
                  <span>Strict Type-Safe API Contracts</span>
                </div>
                <div
                  className="flex items-center gap-2 p-2.5 rounded-xl border"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>High Concurrency & Fault Tolerance</span>
                </div>
                <div
                  className="flex items-center gap-2 p-2.5 rounded-xl border"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                >
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Sub-50ms Latency Optimizations</span>
                </div>
                <div
                  className="flex items-center gap-2 p-2.5 rounded-xl border"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                >
                  <Layers className="w-4 h-4 text-violet shrink-0" />
                  <span>Distributed Queue Processing</span>
                </div>
              </div>
            </TiltCard>

            {/* Core Services / Capabilities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="p-5 rounded-2xl border transition-all hover:scale-[1.01]"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl border flex items-center justify-center mb-3"
                    style={{
                      backgroundColor: "var(--bg-surface)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    {serviceIcons[service.icon] || <Zap className="w-5 h-5 text-cyan" />}
                  </div>
                  <h4
                    className="font-display font-bold text-base mb-1.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {service.title}
                  </h4>
                  <p
                    className="text-xs sm:text-sm font-sans leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
