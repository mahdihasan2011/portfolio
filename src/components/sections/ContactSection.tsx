"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import SectionHeading from "@/components/ui/SectionHeading";
import { Mail, Github, Linkedin, Send, AlertCircle, Info, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const { personal, contact } = portfolioData;

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "demo_notice" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setErrorMessage("Please complete all required fields before submitting.");
      setStatus("error");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formState.email)) {
      setErrorMessage("Please provide a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    // If no backend is configured, explicitly present as a demo without fake success!
    setTimeout(() => {
      if (!contact.isBackendConfigured) {
        setStatus("demo_notice");
      }
    }, 600);
  };

  const mailtoUrl = `mailto:${personal.email}?subject=${encodeURIComponent(
    `Portfolio Inquiry from ${formState.name || "Visitor"}`
  )}&body=${encodeURIComponent(
    `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
  )}`;

  return (
    <section id="contact" className="py-20 border-t border-charcoal-800/80 bg-charcoal-900/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Contact & Inquiries"
          title="Let's Build Something Exceptional"
          subtitle={contact.invitation}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Direct Communication Channels (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-charcoal-850 border border-charcoal-750/80 shadow-sm">
              <h3 className="font-display font-bold text-lg text-slate-100 mb-2">
                Direct Channels
              </h3>
              <p className="text-sm text-slate-400 font-sans leading-relaxed mb-6">
                Feel free to reach out directly via email or connect with me on GitHub and LinkedIn.
              </p>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-charcoal-900 border border-charcoal-800 hover:border-cyan/50 hover:bg-charcoal-800 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-charcoal-800 text-cyan group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs font-mono text-charcoal-500 uppercase">
                      Email Address
                    </span>
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan transition-colors truncate">
                      {personal.email}
                    </span>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href={personal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-charcoal-900 border border-charcoal-800 hover:border-cyan/50 hover:bg-charcoal-800 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-charcoal-800 text-cyan group-hover:scale-105 transition-transform">
                    <Github className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs font-mono text-charcoal-500 uppercase">
                      GitHub Profile
                    </span>
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan transition-colors truncate">
                      {personal.githubUrl.replace("https://", "")}
                    </span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-charcoal-900 border border-charcoal-800 hover:border-cyan/50 hover:bg-charcoal-800 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-charcoal-800 text-cyan group-hover:scale-105 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs font-mono text-charcoal-500 uppercase">
                      LinkedIn Network
                    </span>
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan transition-colors truncate">
                      {personal.linkedinUrl.replace("https://", "")}
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Availability Callout */}
            <div className="p-5 rounded-xl bg-charcoal-850/60 border border-charcoal-750/70 text-xs font-mono text-slate-400 flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 shrink-0 animate-pulse" />
              <p className="leading-relaxed">
                Currently open for senior full-stack roles, Next.js / React contracts, and architectural consulting.
              </p>
            </div>
          </div>

          {/* Contact Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-charcoal-850 border border-charcoal-750/80 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-charcoal-800">
                <h3 className="font-display font-bold text-lg text-slate-100">
                  Send a Direct Message
                </h3>
                {!contact.isBackendConfigured && (
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-charcoal-800 border border-charcoal-700 text-charcoal-400 flex items-center gap-1">
                    <Info className="w-3 h-3 text-cyan" /> Demo Form
                  </span>
                )}
              </div>

              {/* Form Element */}
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono mb-2"
                  >
                    Your Name <span className="text-cyan">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Alex Johnson"
                    className="w-full px-4 py-3 rounded-xl bg-charcoal-900 border border-charcoal-750 text-slate-200 text-sm placeholder:text-charcoal-500 focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono mb-2"
                  >
                    Email Address <span className="text-cyan">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="name@organization.com"
                    className="w-full px-4 py-3 rounded-xl bg-charcoal-900 border border-charcoal-750 text-slate-200 text-sm placeholder:text-charcoal-500 focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono mb-2"
                  >
                    Message & Project Details <span className="text-cyan">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    placeholder="Briefly describe your goals, timeline, or requirements..."
                    className="w-full px-4 py-3 rounded-xl bg-charcoal-900 border border-charcoal-750 text-slate-200 text-sm placeholder:text-charcoal-500 focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors resize-y"
                  />
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div
                    className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-300 text-xs font-sans flex items-center gap-2"
                    role="alert"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Explicit Demo Notice (Never fake success!) */}
                {status === "demo_notice" && (
                  <div
                    className="p-4 rounded-xl bg-charcoal-900 border border-cyan/40 text-slate-300 text-xs sm:text-sm font-sans space-y-3"
                    role="status"
                  >
                    <div className="flex items-center gap-2 text-cyan font-semibold">
                      <Info className="w-4 h-4" />
                      <span>Form Submission Validated (Demo Environment)</span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Because an active backend mail server endpoint is not configured in this sample, your message was not transmitted to a database. You can instantly send your completed message via your email client using the button below:
                    </p>
                    <a
                      href={mailtoUrl}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-cyan text-charcoal-950 hover:bg-cyan/90 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open Pre-filled Email to {personal.email}</span>
                    </a>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan text-charcoal-950 font-sans font-semibold text-sm hover:bg-cyan/90 disabled:opacity-60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {status === "submitting" ? "Validating Submission..." : "Send Message"}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
