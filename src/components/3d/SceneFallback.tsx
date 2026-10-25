"use client";

import React from "react";

export default function SceneFallback() {
  return (
    <div
      className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] lg:h-[540px] flex items-center justify-center p-6"
      aria-label="Illustration of a modern laptop with code editor surrounded by geometric shapes"
    >
      <div className="relative w-full max-w-[420px] aspect-[16/10] bg-charcoal-900 border border-charcoal-700 rounded-2xl p-4 shadow-2xl shadow-black/60 flex flex-col justify-between overflow-hidden">
        {/* Glow behind fallback */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan/20 to-violet/20 blur-xl -z-10 rounded-2xl" />

        {/* Top Window Bar */}
        <div className="flex items-center justify-between border-b border-charcoal-800 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-xs text-charcoal-500">Portfolio.tsx</span>
          </div>
          <span className="font-mono text-xs text-cyan">TypeScript</span>
        </div>

        {/* Code Lines Mockup */}
        <div className="font-mono text-xs sm:text-sm space-y-2 text-charcoal-400 select-none">
          <p>
            <span className="text-violet">const</span> <span className="text-cyan">specialist</span> = &#123;
          </p>
          <p className="pl-4">
            frontend: <span className="text-emerald-400">&apos;React & Next.js&apos;</span>,
          </p>
          <p className="pl-4">
            backend: <span className="text-emerald-400">&apos;Node.js & Express&apos;</span>,
          </p>
          <p className="pl-4">
            architecture: <span className="text-cyan">&apos;Scalable & Clean&apos;</span>
          </p>
          <p>&#125;;</p>
        </div>

        {/* Bottom Laptop Base Indication */}
        <div className="mt-4 pt-3 border-t border-charcoal-800 flex items-center justify-between text-xs font-mono text-charcoal-500">
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
