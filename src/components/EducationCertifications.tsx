import React from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Award,
  BookOpen,
  Trophy,
  CheckCircle2,
  Cloud,
  Code,
  Briefcase,
  Star,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { EDUCATION_DATA, CERTIFICATIONS_DATA } from '../data/portfolioData';

export const EducationCertifications: React.FC = () => {
  const getCertIcon = (name: string) => {
    switch (name) {
      case 'Award':
        return <Award className="w-5 h-5 text-amber-400" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-cyan-400" />;
      case 'Server':
        return <ShieldCheck className="w-5 h-5 text-blue-400" />;
      case 'Code':
        return <Code className="w-5 h-5 text-emerald-400" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-purple-400" />;
      default:
        return <GraduationCap className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="education" className="py-20 bg-slate-950/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Education & Academic Honors */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Academic Excellence</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white font-display">
                Education & Honors
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Rigorous computer science curriculum, continuous top-tier academic ranking, and engineering fundamentals.
              </p>
            </div>

            <div className="space-y-6">
              {EDUCATION_DATA.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`p-6 rounded-2xl border transition-all ${
                    edu.id === 'btech'
                      ? 'bg-gradient-to-b from-slate-900/90 to-slate-950/90 border-cyan-500/40 shadow-xl shadow-cyan-950/20'
                      : 'bg-slate-900/70 border-slate-800'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-semibold text-cyan-400">
                      {edu.period}
                    </span>
                    {edu.badge && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        <Trophy className="w-3 h-3 text-amber-400" />
                        {edu.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white font-display">{edu.degree}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                    {edu.institution}
                  </p>

                  <div className="mt-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                    <p className="text-xs font-mono font-semibold text-emerald-400">
                      {edu.gpaOrScore}
                    </p>
                  </div>

                  <ul className="space-y-1.5 mt-4 text-xs text-slate-300">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications & 24 Google Badges */}
          <div id="certifications" className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3">
                <Award className="w-3.5 h-3.5" />
                <span>Industry Credentials</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white font-display">
                Certifications & Badges
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                24+ Google developer badges, cloud architectural certifications, and financial engineering simulations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CERTIFICATIONS_DATA.map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                        {getCertIcon(cert.iconName)}
                      </div>
                      {cert.badgeCount && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          {cert.badgeCount}
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-sm text-white font-display leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-cyan-400 font-mono mt-0.5">{cert.issuer}</p>

                    <p className="text-slate-300 text-xs mt-2.5 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                    <span className="capitalize">{cert.category}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
