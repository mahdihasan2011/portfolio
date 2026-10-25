"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const { personal } = portfolioData;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-charcoal-800 bg-charcoal-950 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400">
        {/* Personal Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="font-display font-semibold text-slate-200">
            {personal.name}
          </p>
          <p className="text-xs text-charcoal-500 mt-1">
            © {currentYear} • Full-stack software developer specializing in React, Next.js, and Node.js.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={personal.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-charcoal-850 border border-charcoal-700/80 text-slate-400 hover:text-cyan hover:border-cyan/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-charcoal-850 border border-charcoal-700/80 text-slate-400 hover:text-cyan hover:border-cyan/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${personal.email}`}
            className="p-2 rounded-lg bg-charcoal-850 border border-charcoal-700/80 text-slate-400 hover:text-cyan hover:border-cyan/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            aria-label="Direct Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Back to top control */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-charcoal-850 border border-charcoal-700/80 text-xs text-slate-300 hover:text-cyan hover:border-cyan/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          aria-label="Back to top of page"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
