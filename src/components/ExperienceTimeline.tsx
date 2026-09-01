import React from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Building,
  Award,
  Sparkles
} from 'lucide-react';
import { EXPERIENCES_DATA } from '../data/portfolioData';

interface ExperienceTimelineProps {
  onOpenProjectDemo: (projectId: string) => void;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ onOpenProjectDemo }) => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Career History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Experience & Internships
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Track record across national cloud data programs, Startup India certified enterprise internships, and independent client freelance deliveries.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-32 space-y-12">
          {EXPERIENCES_DATA.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative pl-6 sm:pl-8 group"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:bg-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all" />

              {/* Period for Desktop (Aligned to Left) */}
              <div className="hidden sm:block absolute -left-36 top-1 text-right w-28">
                <span className="text-xs font-mono font-semibold text-cyan-300">
                  {exp.period}
                </span>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5 font-mono">
                  {exp.type}
                </p>
              </div>

              {/* Card Container */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 shadow-xl shadow-black/20">
                {/* Mobile Period */}
                <div className="sm:hidden flex items-center justify-between text-xs text-cyan-400 font-mono mb-2">
                  <span>{exp.period}</span>
                  <span className="text-[10px] uppercase bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                    {exp.type}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-display">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-cyan-400 font-medium">
                      <span>{exp.company}</span>
                      {exp.tag && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                          {exp.tag}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Highlights List from Resume */}
                <ul className="space-y-2 mt-4 text-xs sm:text-sm text-slate-300">
                  {exp.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Special Freelance Interactive Buttons if Applicable */}
                {exp.id === 'freelancing' && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-slate-400 font-semibold">Client Deployments:</span>
                    <button
                      onClick={() => onOpenProjectDemo('kalbhairav-digitals')}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-slate-700 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>Kalbhairav Digitals Demo</span>
                    </button>
                    <button
                      onClick={() => onOpenProjectDemo('bluewings-polymer')}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-slate-700 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>Bluewings Polymer Demo</span>
                    </button>
                  </div>
                )}

                {/* Tech Skills Used */}
                <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-800/60">
                  {exp.skillsUsed.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
