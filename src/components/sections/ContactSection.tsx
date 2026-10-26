"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  AlertCircle,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

export default function ContactSection() {
  const { personal, contact } = portfolioData;

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Senior Full-Stack Engineering Role",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setFeedbackMessage("Please complete all required fields before transmitting.");
      setStatus("error");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formState.email)) {
      setFeedbackMessage("Please provide a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    // Telegram Bot transmission
    const text = `
🚀 *New Portfolio Direct Inquiry*

👤 *Name:* ${formState.name}
📞 *Phone:* ${formState.phone || "Not provided"}
📧 *Email:* ${formState.email}
📝 *Subject:* ${formState.subject}
💬 *Message:*
${formState.message}

⏰ *Timestamp:* ${new Date().toLocaleString()}
🌐 *Source:* Next.js 3D Portfolio (Mahdi Hasan)
    `;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${contact.telegram.botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: contact.telegram.chatId,
            text: text,
            parse_mode: "Markdown",
          }),
        }
      );

      if (response.ok) {
        setStatus("success");
        setFeedbackMessage("Message transmitted directly! Mahdi will respond promptly.");
        setFormState({
          name: "",
          email: "",
          phone: "",
          subject: "Senior Full-Stack Engineering Role",
          message: "",
        });
      } else {
        setStatus("error");
        setFeedbackMessage(
          `Message delivery notice: Please email ${personal.email} directly.`
        );
      }
    } catch {
      setStatus("error");
      setFeedbackMessage(
        `Notice: Please send your inquiry directly to ${personal.email}.`
      );
    }
  };

  const mailtoUrl = `mailto:${personal.email}?subject=${encodeURIComponent(
    `[Portfolio Inquiry] ${formState.subject} - from ${formState.name || "Colleague"}`
  )}&body=${encodeURIComponent(
    `Name: ${formState.name}\nEmail: ${formState.email}\nPhone: ${formState.phone}\n\nMessage:\n${formState.message}`
  )}`;

  return (
    <section
      id="contact"
      className="py-20 border-t"
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "var(--bg-surface)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Direct Channels"
          title="Let's Build Something Exceptional"
          subtitle={contact.invitation}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Direct Communication Channels (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div
              className="p-6 sm:p-7 rounded-2xl border shadow-sm"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <h3
                className="font-display font-bold text-lg mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Contact Information
              </h3>
              <p
                className="text-sm font-sans leading-relaxed mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                Available for full-time engineering leadership, contracts, or technical consulting.
              </p>

              <div className="space-y-3.5">
                {/* Primary Email */}
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl border transition-colors group"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div
                    className="p-2.5 rounded-lg border group-hover:scale-105 transition-transform shrink-0"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      borderColor: "var(--border-color)",
                      color: "var(--accent-cyan)",
                    }}
                  >
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-[10px] font-mono uppercase font-semibold" style={{ color: "var(--text-muted)" }}>
                      Primary Email
                    </span>
                    <span
                      className="text-sm font-semibold truncate group-hover:text-cyan transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {personal.email}
                    </span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl border transition-colors group"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div
                    className="p-2.5 rounded-lg border group-hover:scale-105 transition-transform shrink-0"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      borderColor: "var(--border-color)",
                      color: "var(--accent-cyan)",
                    }}
                  >
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-[10px] font-mono uppercase font-semibold" style={{ color: "var(--text-muted)" }}>
                      LinkedIn Network
                    </span>
                    <span
                      className="text-sm font-semibold truncate group-hover:text-cyan transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      bd.linkedin.com/in/mahdihasan2011
                    </span>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href={personal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl border transition-colors group"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div
                    className="p-2.5 rounded-lg border group-hover:scale-105 transition-transform shrink-0"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      borderColor: "var(--border-color)",
                      color: "var(--accent-cyan)",
                    }}
                  >
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-[10px] font-mono uppercase font-semibold" style={{ color: "var(--text-muted)" }}>
                      GitHub Profile
                    </span>
                    <span
                      className="text-sm font-semibold truncate group-hover:text-cyan transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      github.com/mahdihasan2011
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Embedded Location Map */}
            <div
              className="h-48 rounded-2xl overflow-hidden border shadow-sm"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.509773020634!2d90.40409601536258!3d23.804093992289303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7c08f3ab429%3A0x5e888a2c8c34a1c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1718796358823"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Location Map Dhaka"
              />
            </div>
          </div>

          {/* Contact Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <div
              className="p-6 sm:p-8 rounded-2xl border shadow-sm"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div
                className="flex items-center justify-between pb-4 mb-6 border-b"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-cyan" />
                  <h3
                    className="font-display font-bold text-lg"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Send Direct Transmission
                  </h3>
                </div>
                <span className="font-mono text-xs text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Dispatch
                </span>
              </div>

              {/* Form Element */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-wider font-mono mb-1.5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Your Full Name <span className="text-cyan">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Alex Johnson"
                    className="w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none"
                    style={{
                      backgroundColor: "var(--bg-surface)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                {/* Email & Phone Split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold uppercase tracking-wider font-mono mb-1.5"
                      style={{ color: "var(--text-secondary)" }}
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
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none"
                      style={{
                        backgroundColor: "var(--bg-surface)",
                        borderColor: "var(--border-color)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold uppercase tracking-wider font-mono mb-1.5"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Phone / WhatsApp
                    </label>
                    <input
                      type="text"
                      id="contact-phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none"
                      style={{
                        backgroundColor: "var(--bg-surface)",
                        borderColor: "var(--border-color)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                </div>

                {/* Subject Selector */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-semibold uppercase tracking-wider font-mono mb-1.5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Inquiry Scope <span className="text-cyan">*</span>
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none"
                    style={{
                      backgroundColor: "var(--bg-surface)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <option value="Senior Full-Stack Engineering Role">Senior Full-Stack Engineering Role</option>
                    <option value="Next.js / React Architecture Consulting">Next.js / React Architecture Consulting</option>
                    <option value="Enterprise Contract / Freelance Project">Enterprise Contract / Freelance Project</option>
                    <option value="Technical Partnership">Technical Partnership</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-wider font-mono mb-1.5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Project Details & Scope <span className="text-cyan">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    placeholder="Briefly describe your objectives, architecture requirements, or timeline..."
                    className="w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none resize-y"
                    style={{
                      backgroundColor: "var(--bg-surface)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                {/* Status Banners */}
                {status === "error" && (
                  <div
                    className="p-3.5 rounded-xl border text-xs font-sans flex items-center gap-2"
                    style={{
                      backgroundColor: "rgba(225, 29, 72, 0.1)",
                      borderColor: "rgba(225, 29, 72, 0.3)",
                      color: "#fda4af",
                    }}
                    role="alert"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                {status === "success" && (
                  <div
                    className="p-4 rounded-xl border text-xs sm:text-sm font-sans flex items-center gap-2.5"
                    style={{
                      backgroundColor: "rgba(16, 185, 129, 0.1)",
                      borderColor: "rgba(16, 185, 129, 0.3)",
                      color: "#6ee7b7",
                    }}
                    role="status"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-sans font-bold text-sm text-charcoal-950 transition-all hover:scale-[1.02] disabled:opacity-60 shadow-md"
                    style={{
                      backgroundColor: "var(--accent-cyan)",
                    }}
                  >
                    <Send className="w-4 h-4" />
                    <span>{status === "submitting" ? "Transmitting..." : "Send Direct Message"}</span>
                  </button>

                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border font-mono text-xs font-semibold transition-colors hover:border-cyan"
                    style={{
                      backgroundColor: "var(--bg-surface)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-secondary)",
                    }}
                    title="Send via Email Client"
                  >
                    <Mail className="w-4 h-4 text-cyan" />
                    <span>Open in Email</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
