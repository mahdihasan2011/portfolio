"use client";

import React from "react";

export default function SceneFallback() {
  return (
    <div
      className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] flex items-center justify-center p-6"
      aria-label="Illustration of a modern laptop with code editor surrounded by geometric shapes"
    >
      <div
        className="relative w-full max-w-[420px] aspect-[16/10] border rounded-2xl p-4 shadow-2xl flex flex-col justify-between overflow-hidden"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-color)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* Glow behind fallback */}
        <div
          className="absolute -inset-1 blur-xl -z-10 rounded-2xl opacity-40"
          style={{
            background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))",
          }}
        />

        {/* Top Window Bar */}
        <div
          className="flex items-center justify-between border-b pb-3 mb-3"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span
              className="ml-2 font-mono text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              MahdiHasan.tsx
            </span>
          </div>
          <span className="font-mono text-xs font-bold" style={{ color: "var(--accent-cyan)" }}>
            TypeScript
          </span>
        </div>

        {/* Code Lines Mockup */}
        <div
          className="font-mono text-xs sm:text-sm space-y-1.5 select-none"
          style={{ color: "var(--text-secondary)" }}
        >
          <p>
            <span style={{ color: "var(--accent-violet)" }}>const</span>{" "}
            <span style={{ color: "var(--accent-cyan)" }}>SoftwareEngineer</span> = &#123;
          </p>
          <p className="pl-4">
            name: <span className="text-emerald-400">&apos;Mahdi Hasan&apos;</span>,
          </p>
          <p className="pl-4">
            frontend: <span className="text-emerald-400">&apos;React 19 & Next.js&apos;</span>,
          </p>
          <p className="pl-4">
            backend: <span className="text-emerald-400">&apos;Node.js & Laravel&apos;</span>,
          </p>
          <p className="pl-4">
            architecture: <span style={{ color: "var(--accent-cyan)" }}>&apos;Scalable & Clean&apos;</span>
          </p>
          <p>&#125;;</p>
        </div>

        {/* Bottom Laptop Base Indication */}
        <div
          className="mt-4 pt-3 border-t flex items-center justify-between text-xs font-mono"
          style={{
            borderColor: "var(--border-color)",
            color: "var(--text-muted)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive 3D Ready</span>
          </div>
          <span>Next.js • Node.js</span>
        </div>
      </div>
    </div>
  );
}
