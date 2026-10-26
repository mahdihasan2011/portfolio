"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { Github, Linkedin, Mail, ArrowUp, Phone } from "lucide-react";

export default function Footer() {
  const { personal } = portfolioData;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="border-t py-12 px-4 sm:px-6 transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg-main)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        {/* Personal Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p
            className="font-display font-bold text-base"
            style={{ color: "var(--text-primary)" }}
          >
            {personal.name}
          </p>
          <p
            className="text-xs mt-1 font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            © {currentYear} • Software Engineer • Full-Stack Systems, React, Next.js, Node.js & Laravel.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a
            href={personal.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border transition-all hover:scale-105 hover:border-cyan"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-color)",
              color: "var(--text-secondary)",
            }}
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border transition-all hover:scale-105 hover:border-cyan"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-color)",
              color: "var(--text-secondary)",
            }}
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={personal.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border transition-all hover:scale-105 hover:border-cyan"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-color)",
              color: "var(--accent-emerald)",
            }}
            aria-label="WhatsApp Direct Chat"
          >
            <Phone className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${personal.email}`}
            className="p-2.5 rounded-xl border transition-all hover:scale-105 hover:border-cyan"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-color)",
              color: "var(--accent-cyan)",
            }}
            aria-label="Direct Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Back to top control */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-mono font-semibold transition-all hover:scale-105 hover:border-cyan"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-color)",
            color: "var(--text-primary)",
          }}
          aria-label="Back to top of page"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-cyan" />
        </button>
      </div>
    </footer>
  );
}
