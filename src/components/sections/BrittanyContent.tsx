"use client";

import React, { useState } from "react";
import Image from "next/image";
import { portfolioData, Project } from "@/data/portfolioData";
import ProjectModal from "@/components/ui/ProjectModal";
import {
  ExternalLink,
  Github,
  Mail,
  Linkedin,
  Send,
  AlertCircle,
  CheckCircle2,
  GraduationCap,
  Layers,
  ArrowRight,
  Code2,
  Database,
  Server,
  Cpu,
} from "lucide-react";

export default function BrittanyContent() {
  const { personal, hero, experience, projects, skills, contact } = portfolioData;

  // Project modal state
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Contact form state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Software Engineering Opportunity",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setFeedbackMessage("Please complete all required fields.");
      setFormStatus("error");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formState.email)) {
      setFeedbackMessage("Please provide a valid email address.");
      setFormStatus("error");
      return;
    }

    setFormStatus("submitting");

    const text = `
🚀 *New Direct Inquiry (Portfolio)*
👤 *Name:* ${formState.name}
📧 *Email:* ${formState.email}
📞 *Phone:* ${formState.phone || "Not provided"}
📝 *Subject:* ${formState.subject}
💬 *Message:*
${formState.message}
⏰ *Time:* ${new Date().toLocaleString()}
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
        setFormStatus("success");
        setFeedbackMessage("Message transmitted directly! I will respond promptly.");
        setFormState({
          name: "",
          email: "",
          phone: "",
          subject: "Software Engineering Opportunity",
          message: "",
        });
      } else {
        setFormStatus("error");
        setFeedbackMessage(`Notice: Please email ${personal.email} directly.`);
      }
    } catch {
      setFormStatus("error");
      setFeedbackMessage(`Notice: Please send your inquiry directly to ${personal.email}.`);
    }
  };

  // Filter projects
  const projectCategories = [
    "All",
    "Enterprise & POS",
    "Fintech & Trading",
    "E-Commerce",
    "AI & SaaS",
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Filter work experience only (education has its own dedicated section)
  const workExperience = experience.filter((e) => e.type === "Work");
  const educationItems = experience.filter((e) => e.type === "Education");

  return (
    <div className="pt-24 lg:w-[52%] lg:py-24">
      {/* ========================================================
          SECTION: ABOUT
          ======================================================== */}
      <section
        id="about"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-32 lg:scroll-mt-24"
        aria-label="About me"
      >
        {/* Mobile Sticky Header */}
        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[var(--bg-main)]/90 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 border-b border-[var(--border-color)] lg:border-none">
          <h2 className="text-sm font-bold uppercase tracking-widest font-mono text-[var(--accent-cyan)] lg:sr-only">
            About
          </h2>
        </div>

        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-sans">
          {personal.bio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <p className="pt-2 text-sm leading-relaxed">
            <span className="font-semibold text-[var(--text-primary)]">Engineering Philosophy: </span>
            {personal.approach}
          </p>
        </div>

        {/* Quick Highlights / Metrics Pill Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {portfolioData.metrics.map((metric) => (
            <div
              key={metric.label}
              className="p-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col"
            >
              <span className="font-display text-2xl font-bold text-[var(--accent-cyan)]">
                {metric.value}
              </span>
              <span className="font-sans text-xs font-semibold text-[var(--text-primary)] mt-0.5">
                {metric.label}
              </span>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">
                {metric.sublabel}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          SECTION: EXPERIENCE
          ======================================================== */}
      <section
        id="experience"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-32 lg:scroll-mt-24"
        aria-label="Work experience"
      >
        {/* Mobile Sticky Header */}
        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[var(--bg-main)]/90 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 border-b border-[var(--border-color)] lg:border-none">
          <h2 className="text-sm font-bold uppercase tracking-widest font-mono text-[var(--accent-cyan)] lg:sr-only">
            Experience
          </h2>
        </div>

        <div>
          <ol className="group/list">
            {workExperience.map((item) => (
              <li key={item.id} className="mb-12">
                <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-40">
                  {/* Hover Highlight Card Overlay */}
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-2xl transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[var(--bg-card)] lg:group-hover:shadow-md lg:group-hover:border lg:group-hover:border-[var(--border-color)]" />

                  {/* Left Column: Period */}
                  <header
                    className="z-10 mb-2 mt-1 text-xs font-mono font-semibold uppercase tracking-wide text-[var(--text-muted)] sm:col-span-2"
                    aria-label={item.period}
                  >
                    {item.period}
                  </header>

                  {/* Right Column: Role & Content */}
                  <div className="z-10 sm:col-span-6">
                    <h3 className="font-display font-medium leading-snug text-[var(--text-primary)]">
                      <div className="inline-flex items-baseline font-bold leading-tight group/link text-base text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                        <span>
                          {item.role} ·{" "}
                          <span className="inline-block text-[var(--accent-cyan)]">
                            {item.organization}
                            <ArrowRight className="inline-block h-3.5 w-3.5 shrink-0 ml-1.5 transition-transform group-hover/link:translate-x-1 -rotate-45" />
                          </span>
                        </span>
                      </div>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] font-sans">
                      {item.summary}
                    </p>

                    {item.highlights && item.highlights.length > 0 && (
                      <ul className="mt-2.5 space-y-1 text-xs text-[var(--text-muted)] font-sans">
                        {item.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-[var(--accent-cyan)] font-bold">›</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech Badges */}
                    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies used">
                      {item.techStack.map((tech) => (
                        <li key={tech}>
                          <span className="inline-flex items-center rounded-full bg-[var(--accent-cyan)]/10 px-3 py-1 text-xs font-mono font-medium text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/20">
                            {tech}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* View Full Resume Link */}
          {personal.resumeUrl && (
            <div className="mt-8">
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 font-mono text-sm font-bold text-[var(--text-primary)] hover:text-[var(--accent-cyan)] group transition-colors"
              >
                <span>View Full Résumé</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 -rotate-45" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          SECTION: PROJECTS
          ======================================================== */}
      <section
        id="projects"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-32 lg:scroll-mt-24"
        aria-label="Selected projects"
      >
        {/* Mobile Sticky Header */}
        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[var(--bg-main)]/90 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 border-b border-[var(--border-color)] lg:border-none">
          <h2 className="text-sm font-bold uppercase tracking-widest font-mono text-[var(--accent-cyan)] lg:sr-only">
            Projects
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1 rounded-full text-xs font-mono font-medium transition-all"
              style={{
                backgroundColor:
                  activeCategory === cat ? "var(--accent-cyan)" : "var(--bg-card)",
                color: activeCategory === cat ? "#07090e" : "var(--text-secondary)",
                border: `1px solid ${
                  activeCategory === cat ? "var(--accent-cyan)" : "var(--border-color)"
                }`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div>
          <ul className="group/list">
            {filteredProjects.map((project) => (
              <li key={project.id} className="mb-12">
                <div
                  onClick={() => setActiveModalProject(project)}
                  className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-40 cursor-pointer"
                >
                  {/* Hover Highlight Card Overlay */}
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-2xl transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[var(--bg-card)] lg:group-hover:shadow-md lg:group-hover:border lg:group-hover:border-[var(--border-color)]" />

                  {/* Left Column: Image Thumbnail */}
                  <div className="z-10 sm:order-1 sm:col-span-2 sm:translate-y-1">
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-[var(--border-color)] group-hover:border-[var(--accent-cyan)] transition-colors">
                      <Image
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 200px"
                      />
                    </div>
                  </div>

                  {/* Right Column: Project Info */}
                  <div className="z-10 sm:order-2 sm:col-span-6">
                    <h3 className="font-display font-medium leading-snug text-[var(--text-primary)]">
                      <div className="inline-flex items-baseline font-bold leading-tight group/link text-base text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                        <span>
                          {project.title}{" "}
                          <span className="inline-block">
                            <ArrowRight className="inline-block h-3.5 w-3.5 shrink-0 ml-1 transition-transform group-hover/link:translate-x-1 -rotate-45" />
                          </span>
                        </span>
                      </div>
                    </h3>
                    <p className="mt-1 text-xs font-mono font-medium text-[var(--accent-cyan)]">
                      {project.subtitle}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] font-sans">
                      {project.problemSolved}
                    </p>

                    {/* Tech Badges */}
                    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies used:">
                      {project.tags.map((tag) => (
                        <li key={tag}>
                          <span className="inline-flex items-center rounded-full bg-[var(--accent-cyan)]/10 px-3 py-1 text-xs font-mono font-medium text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/20">
                            {tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ========================================================
          SECTION: SKILLS
          ======================================================== */}
      <section
        id="skills"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-32 lg:scroll-mt-24"
        aria-label="Technical skills"
      >
        {/* Mobile Sticky Header */}
        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[var(--bg-main)]/90 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 border-b border-[var(--border-color)] lg:border-none">
          <h2 className="text-sm font-bold uppercase tracking-widest font-mono text-[var(--accent-cyan)] lg:sr-only">
            Skills
          </h2>
        </div>

        <div className="space-y-6">
          {skills.map((category) => (
            <div
              key={category.category}
              className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]"
            >
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-cyan)] mb-3">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-mono font-medium text-[var(--text-primary)] hover:border-[var(--accent-cyan)] transition-colors"
                  >
                    <span>{skill.name}</span>
                    <span className="text-[10px] text-[var(--text-muted)] font-sans">• {skill.level}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          SECTION: EDUCATION
          ======================================================== */}
      <section
        id="education"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-32 lg:scroll-mt-24"
        aria-label="Education & Degrees"
      >
        {/* Mobile Sticky Header */}
        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[var(--bg-main)]/90 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 border-b border-[var(--border-color)] lg:border-none">
          <h2 className="text-sm font-bold uppercase tracking-widest font-mono text-[var(--accent-cyan)] lg:sr-only">
            Education
          </h2>
        </div>

        <ol className="group/list">
          {educationItems.map((edu) => (
            <li key={edu.id} className="mb-8">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-40">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-2xl transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[var(--bg-card)] lg:group-hover:shadow-md lg:group-hover:border lg:group-hover:border-[var(--border-color)]" />

                <header className="z-10 mb-2 mt-1 text-xs font-mono font-semibold uppercase tracking-wide text-[var(--text-muted)] sm:col-span-2">
                  {edu.period}
                </header>

                <div className="z-10 sm:col-span-6">
                  <h3 className="font-display font-medium leading-snug text-[var(--text-primary)]">
                    <div className="inline-flex items-baseline font-bold leading-tight group/link text-base text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                      <span>
                        {edu.role} ·{" "}
                        <span className="inline-block text-[var(--accent-cyan)]">
                          {edu.organization}
                        </span>
                      </span>
                    </div>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] font-sans">
                    {edu.summary}
                  </p>
                  {edu.highlights && (
                    <ul className="mt-2 space-y-1 text-xs text-[var(--text-muted)] font-sans">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[var(--accent-cyan)] font-bold">›</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {edu.techStack.map((tech) => (
                      <li key={tech}>
                        <span className="inline-flex items-center rounded-full bg-[var(--accent-violet)]/10 px-3 py-1 text-xs font-mono font-medium text-[var(--accent-violet)] border border-[var(--accent-violet)]/20">
                          {tech}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ========================================================
          SECTION: CONTACT
          ======================================================== */}
      <section
        id="contact"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-32 lg:scroll-mt-24"
        aria-label="Contact information"
      >
        {/* Mobile Sticky Header */}
        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[var(--bg-main)]/90 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 border-b border-[var(--border-color)] lg:border-none">
          <h2 className="text-sm font-bold uppercase tracking-widest font-mono text-[var(--accent-cyan)] lg:sr-only">
            Contact
          </h2>
        </div>

        <div className="p-6 sm:p-7 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
          <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">
            Let&apos;s Build Something Exceptional
          </h3>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] font-sans mb-6">
            {contact.invitation}
          </p>

          {/* Quick Active Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent-cyan)] transition-colors group"
            >
              <Mail className="w-4 h-4 text-cyan shrink-0" />
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono uppercase block text-[var(--text-muted)]">Email</span>
                <span className="text-xs font-semibold truncate block text-[var(--text-primary)] group-hover:text-cyan transition-colors">
                  {personal.email}
                </span>
              </div>
            </a>

            <a
              href={personal.linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent-cyan)] transition-colors group"
            >
              <Linkedin className="w-4 h-4 text-cyan shrink-0" />
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono uppercase block text-[var(--text-muted)]">LinkedIn</span>
                <span className="text-xs font-semibold truncate block text-[var(--text-primary)] group-hover:text-cyan transition-colors">
                  Mahdi Hasan
                </span>
              </div>
            </a>

            <a
              href={personal.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent-cyan)] transition-colors group"
            >
              <Github className="w-4 h-4 text-cyan shrink-0" />
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono uppercase block text-[var(--text-muted)]">GitHub</span>
                <span className="text-xs font-semibold truncate block text-[var(--text-primary)] group-hover:text-cyan transition-colors">
                  @{personal.githubUsername}
                </span>
              </div>
            </a>
          </div>

          {/* Embedded Message Dispatch Form */}
          <form onSubmit={handleFormSubmit} className="space-y-3.5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-[11px] font-mono uppercase font-semibold text-[var(--text-secondary)] mb-1"
                >
                  Name <span className="text-cyan">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formState.name}
                  onChange={handleFormChange}
                  required
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-cyan transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-[11px] font-mono uppercase font-semibold text-[var(--text-secondary)] mb-1"
                >
                  Email <span className="text-cyan">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formState.email}
                  onChange={handleFormChange}
                  required
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-cyan transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-[11px] font-mono uppercase font-semibold text-[var(--text-secondary)] mb-1"
              >
                Message <span className="text-cyan">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={3}
                value={formState.message}
                onChange={handleFormChange}
                required
                placeholder="Briefly describe your requirements or inquiry..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-cyan transition-colors resize-y"
              />
            </div>

            {formStatus === "error" && (
              <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{feedbackMessage}</span>
              </div>
            )}

            {formStatus === "success" && (
              <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{feedbackMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={formStatus === "submitting"}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-sans font-bold text-xs text-charcoal-950 bg-[var(--accent-cyan)] transition-all hover:scale-105 disabled:opacity-60 shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{formStatus === "submitting" ? "Transmitting..." : "Send Direct Message"}</span>
            </button>
          </form>
        </div>
      </section>

      {/* ========================================================
          COLOPHON (Iconic Brittany Chiang Style Footer Note)
          ======================================================== */}
      <footer className="max-w-md pb-16 text-xs leading-relaxed text-[var(--text-muted)] font-sans">
        <p>
          Loosely designed in{" "}
          <span className="font-medium text-[var(--text-primary)]">Figma</span> and coded in{" "}
          <span className="font-medium text-[var(--text-primary)]">Visual Studio Code</span> by Mahdi Hasan. Built with{" "}
          <span className="font-medium text-[var(--text-primary)]">Next.js</span> and{" "}
          <span className="font-medium text-[var(--text-primary)]">Tailwind CSS</span>, deployed with 99.9% uptime SLA. Modeled after the iconic{" "}
          <a
            href="https://brittanychiang.com"
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-[var(--text-primary)] hover:text-cyan transition-colors inline-flex items-baseline"
          >
            Brittany Chiang
            <ArrowRight className="inline-block h-2.5 w-2.5 ml-0.5 -rotate-45" />
          </a>{" "}
          portfolio layout.
        </p>
      </footer>

      {/* Interactive Project Details Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
}
