import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  FileText,
  Award,
  ShieldCheck,
  Code2,
  Cpu,
  Layers,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  GraduationCap,
  CheckCircle2,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
  onOpenAiAssistant: () => void;
  onOpenProjectDemo: (projectId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenResume,
  onOpenAiAssistant,
  onOpenProjectDemo,
}) => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.subtitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Background Decorative Gradients & Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column - Intro & High-Impact Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs text-slate-300 shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-cyan-300 font-semibold">
                Available for High-Impact Roles & Freelance Projects
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                  {PERSONAL_INFO.name}
                </span>
              </h1>

              {/* Dynamic Animated Subtitle */}
              <div className="h-10 sm:h-12 flex items-center">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-cyan-300"
                >
                  &gt; {PERSONAL_INFO.subtitles[roleIndex]}
                </motion.span>
              </div>
            </div>

            {/* Professional Summary from Resume */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {PERSONAL_INFO.summary}
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                id="hero-explore-projects-btn"
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                id="hero-view-resume-btn"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 font-semibold text-sm border border-slate-700 hover:border-cyan-500/40 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>View Full Resume</span>
              </button>

              <button
                id="hero-ask-ai-btn"
                onClick={onOpenAiAssistant}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 font-semibold text-sm border border-cyan-500/40 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Ask AI Copilot</span>
              </button>
            </div>

            {/* Social / Direct Connect Chips */}
            <div className="flex items-center gap-4 pt-2 text-xs text-slate-400">
              <span className="font-mono text-slate-400">Connect:</span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                title="Send Email"
              >
                <Mail className="w-4 h-4 text-slate-400 hover:text-cyan-400" />
                <span className="hidden sm:inline font-mono">{PERSONAL_INFO.email}</span>
              </a>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-mono"
                title="Call Phone"
              >
                <span>{PERSONAL_INFO.phone}</span>
              </a>
            </div>

            {/* High-Impact Stat Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/30 transition-all backdrop-blur-sm"
                >
                  <div className="text-xl sm:text-2xl font-extrabold font-display text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-cyan-400 mt-0.5">{stat.label}</div>
                  <div className="text-[10px] text-slate-400 mt-1 leading-tight">{stat.note}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Nishant Pisal Photo Card & Accolades */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Dynamic Glowing Ambient Aura behind the portrait */}
              <div className="absolute -inset-2 bg-gradient-to-br from-cyan-500/30 via-blue-600/20 to-purple-600/30 rounded-[32px] blur-2xl -z-10 opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Main Photo Card Container */}
              <div className="relative rounded-[28px] overflow-hidden bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/60 shadow-2xl shadow-cyan-500/10 transition-all duration-500 group">
                {/* Top Floating Badges */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2 pointer-events-none">
                  {/* Academic Rank Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 border border-amber-500/40 text-amber-300 text-[11px] font-mono font-bold shadow-lg backdrop-blur-md">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Rank #1 • DIET Satara</span>
                  </div>

                  {/* Live Status Pill */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-medium shadow-lg backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active 2026</span>
                  </div>
                </div>

                {/* Portrait Photo Wrapper */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-950">
                  <img
                    id="hero-profile-photo"
                    src="/nishant-photo.jpg"
                    alt="Nishant Pisal - Full-Stack AI Engineer & Academic Rank #1 Leader"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Scrim at the bottom for smooth text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                </div>

                {/* Bottom Card Content & Credential Highlights */}
                <div className="p-5 relative z-10 -mt-12 bg-gradient-to-b from-slate-950/90 to-slate-900 border-t border-slate-800/80 backdrop-blur-md">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
                        <span>Nishant Pisal</span>
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-950" />
                      </h3>
                      <p className="text-xs font-mono text-cyan-300 font-medium mt-0.5">
                        Software Engineer & Project Manager
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span>Satara, MH</span>
                    </div>
                  </div>

                  {/* Key Credentials Badges */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                      <Award className="w-4 h-4 text-amber-400 shrink-0" />
                      <div className="text-[10px] leading-tight">
                        <div className="text-slate-200 font-bold">24+ Google Badges</div>
                        <div className="text-slate-400">Cloud & AI/ML</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                      <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div className="text-[10px] leading-tight">
                        <div className="text-slate-200 font-bold">MKCL Python</div>
                        <div className="text-slate-400">Advanced Certified</div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Button Bar */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800/60">
                    <button
                      onClick={onOpenResume}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-cyan-400" />
                      <span>View Credentials</span>
                    </button>

                    <button
                      onClick={onOpenAiAssistant}
                      className="py-2 px-3 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 text-xs font-semibold border border-cyan-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Chat with Nishant's AI Assistant"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Chat</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Down Indicator */}
      <div className="flex justify-center mt-12">
        <a
          href="#projects"
          className="text-slate-500 hover:text-cyan-400 transition-colors animate-bounce p-2"
          aria-label="Scroll to Projects"
        >
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};
