"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolioData";
import { Menu, X, FileDown, ArrowUpRight } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { personal } = portfolioData;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-charcoal-950/85 backdrop-blur-md border-b border-charcoal-800 py-3.5 shadow-lg shadow-black/40"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo / Initials */}
          <Link
            href="#hero"
            className="group flex items-center gap-2.5 text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-md"
            aria-label={`${personal.name} home`}
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-charcoal-850 border border-charcoal-700 font-mono text-sm font-bold text-cyan group-hover:border-cyan/60 group-hover:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all">
              {personal.initials}
            </span>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold tracking-tight text-slate-200 group-hover:text-cyan transition-colors">
                {personal.name}
              </span>
              <span className="text-[11px] font-mono text-charcoal-500">
                {personal.specialization}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-charcoal-900/60 border border-charcoal-800/80 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-charcoal-800/80 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {personal.resumeUrl && (
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg bg-charcoal-850 text-slate-300 border border-charcoal-700 hover:border-cyan/50 hover:text-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Résumé</span>
              </a>
            )}

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg bg-cyan text-charcoal-950 hover:bg-cyan/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan shadow-sm"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-charcoal-850 text-slate-300 border border-charcoal-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Accessible Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden bg-charcoal-950/95 backdrop-blur-lg pt-24 px-6 flex flex-col justify-between pb-8 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-xl font-semibold text-slate-300 hover:text-cyan py-2 border-b border-charcoal-800 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-6 border-t border-charcoal-800">
            {personal.resumeUrl && (
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-xl bg-charcoal-850 text-slate-200 border border-charcoal-700"
              >
                <FileDown className="w-4 h-4" /> Download Résumé
              </a>
            )}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl bg-cyan text-charcoal-950"
            >
              Get in Touch <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
