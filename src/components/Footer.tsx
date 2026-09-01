import React from 'react';
import {
  ArrowUp,
  Heart,
  Code2,
  Sparkles,
  FileText,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
  onOpenAiAssistant: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume, onOpenAiAssistant }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1.5px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-display font-extrabold text-base text-cyan-400">
                  NP
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                  {PERSONAL_INFO.name}
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h3>
                <p className="text-xs text-cyan-400 font-mono">
                  AI Native Developer | Freelancer
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Rank #1 CSE Scholar at DIET Satara, 24+ Google Skill Badges, crafting high-performance AI integrations, P2P networks, and production web platforms.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={onOpenAiAssistant}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI Copilot</span>
              </button>
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:text-white cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Resume</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">About & Honors</a></li>
              <li><a href="#projects" className="hover:text-cyan-400 transition-colors">Flagship Projects</a></li>
              <li><a href="#skills" className="hover:text-cyan-400 transition-colors">Technical Skills</a></li>
              <li><a href="#experience" className="hover:text-cyan-400 transition-colors">Experience Timeline</a></li>
              <li><a href="#education" className="hover:text-cyan-400 transition-colors">Education & Rank #1</a></li>
              <li><a href="#certifications" className="hover:text-cyan-400 transition-colors">Google Badges & Certs</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Direct Contact</a></li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Direct Channels
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <a
                href={PERSONAL_INFO.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>nishantpisal.com</span>
              </a>
            </div>

            <div className="pt-2 text-[11px] text-slate-500">
              Satara / Pune, Maharashtra, India • Available for Global Roles
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React, Tailwind CSS & Motion.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
