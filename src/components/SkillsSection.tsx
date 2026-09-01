import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code,
  Layers,
  Database,
  Cpu,
  Wrench,
  Sparkles,
  Award,
  CheckCircle2,
  TrendingUp,
  Sliders,
  Filter,
  BarChart3
} from 'lucide-react';
import { ANIMATED_SKILLS_DATA, SKILL_CATEGORIES } from '../data/portfolioData';
import { AnimatedSkill } from '../types';

interface SkillsSectionProps {
  onSelectTechFilter: (tech: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectTechFilter }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSkillHover, setActiveSkillHover] = useState<string | null>(null);

  const categories = [
    { key: 'all', label: 'All Competencies' },
    { key: 'development', label: 'Development & Core' },
    { key: 'design', label: 'UX/UI & Visual Design' },
    { key: 'ai-cloud', label: 'AI & Cloud Systems' },
    { key: 'management', label: 'Project Management' },
    { key: 'content', label: 'Content Creation & SEO' },
  ];

  const filteredSkills = ANIMATED_SKILLS_DATA.filter((skill) => {
    if (activeCategory === 'all') return true;
    return skill.category === activeCategory;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Mastery':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      case 'Expert':
        return 'bg-cyan-950 text-cyan-300 border-cyan-800';
      case 'Advanced':
        return 'bg-indigo-950 text-indigo-300 border-indigo-800';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="skills" className="py-24 bg-slate-950/80 relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Interactive Skill Mastery & Metrics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            Animated Skills & Technical Proficiency
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            Hands-on technical mastery honed through production systems, MKCL Advanced Python certification, 24+ Google developer badges, and agile client engineering.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 font-mono">
            <span>💡</span>
            <span>Scroll down to trigger progress meters • Click any skill to filter relevant projects</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 scale-105'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Animated Skills Progress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              onMouseEnter={() => setActiveSkillHover(skill.name)}
              onMouseLeave={() => setActiveSkillHover(null)}
              onClick={() => onSelectTechFilter(skill.name)}
              className="p-6 rounded-2xl bg-slate-900/85 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Header Row: Skill Name, Level, and Percentage */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                    <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                      {skill.name}
                    </h3>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${getLevelColor(
                        skill.level
                      )}`}
                    >
                      {skill.level}
                    </span>
                  </div>

                  {/* Percentage Counter Badge */}
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-extrabold text-white font-mono">
                      {skill.percentage}%
                    </span>
                  </div>
                </div>

                {/* Experience & Badge Subheading */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-mono text-cyan-400">
                    {skill.experienceYears}
                  </span>
                  {skill.badge && (
                    <>
                      <span className="text-slate-600">•</span>
                      <span className="text-[11px] font-medium text-slate-300">
                        {skill.badge}
                      </span>
                    </>
                  )}
                </div>

                {/* Animated Progress Bar */}
                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800/80 mb-3 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.2,
                      delay: 0.1 + index * 0.05,
                      ease: [0.34, 1.56, 0.64, 1], // bouncy spring
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 relative"
                    style={{
                      boxShadow: `0 0 12px ${skill.color}40`,
                    }}
                  >
                    {/* Gloss shine on top of bar */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full" />
                  </motion.div>
                </div>

                {/* Skill Description */}
                <p className="text-slate-400 text-xs leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-mono text-slate-400">{skill.categoryLabel}</span>
                <span className="text-cyan-400 group-hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors">
                  <span>View matching projects</span>
                  <span>→</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Breakdown by Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-900">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Code className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm font-display">Full-Stack & Languages</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Extensive mastery in Python (MKCL certified), TypeScript, React, Next.js, Node.js, and MongoDB for scalable web apps.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm font-display">AI & Cloud Ecosystem</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gemini Multimodal API integration, 24 verified Google Developer skill badges, AWS Cloud, and serverless P2P WebRTC pipelines.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm font-display">Agile Delivery & Design</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Product lifecycle management at Quivonex, commercial printing press design, B2B industrial technical spec catalogs, and SEO.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
