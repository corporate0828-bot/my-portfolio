import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Printer,
  Download,
  Copy,
  Check,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  Award,
  BookOpen,
  Briefcase,
  Code2,
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA, EXPERIENCES_DATA, EDUCATION_DATA, CERTIFICATIONS_DATA } from '../data/portfolioData';

interface ResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `
NISHANT PISAL
AI Native Developer | AI Enthusiast | Freelancer
Email: ${PERSONAL_INFO.email} | Phone: ${PERSONAL_INFO.phone} | Website: ${PERSONAL_INFO.website}

PROFESSIONAL SUMMARY
${PERSONAL_INFO.summary}

TECHNICAL SKILLS
• Languages: JavaScript, TypeScript, Python (experienced), C++, HTML5, CSS
• Frontend: React.js, Next.js, Tailwind CSS, Bootstrap, SEO
• Backend: Node.js, Cloudinary, MongoDB, Firebase
• AI / Other: Gemini API, Google Developer Program, JWT/OAuth, Web3
• Tools: Git, GitHub, Vercel, Render, Netlify, Hostinger, VS Code

EXPERIENCE
1. AICTE (Aug 2024 – Present) - Development/Data Science/Cloud (Remote, ~8 certifications)
   - Developing web applications/handling data using Python/AWS cloud.
2. Quivonex Pvt Ltd (Jan 2026 – May 2026) - Angular Developer Intern (Onsite, Startup India registered)
   - Coordinating development of client projects and ensuring timely delivery.
3. Freelancing | Development (Feb 2025 – Present)
   - Kalbhairav Digitals: Printing press web application for showcase & queries.
   - Bluewings Polymer: Polymer production company's website.

PROJECTS
• Ingrezy (Major): Futuristic extension for minutes app (Swiggy, Blinkit, Flipkart Minutes). Order an item, ingredients deliver.
• Autobillr (Mini): Invoice data extraction tool tracking company expenses with graphical insights.
• Traceless (Mini): P2P serverless file sharing system with local connection streaming.
• Campus Lost & Found: Cloud-based platform to report and claim lost things on college campus.

EDUCATION
• B.Tech Computer Science & Engineering | DIET Satara (2023–2027)
  - CGPA: 7.2 | Ranked #1 out of 120 students across five consecutive semesters with top-tier GPA.
  - GATE 2026 Qualified | Marks: 23.02
• HSC | RJCK Khandala (2021–2023) | Percentage: 65.67% (Special subject: IT)

CERTIFICATIONS & ACHIEVEMENTS
• 24 Badges - Google Skills / Full Stack Web Development
• AWS Cloud Certified / Google Cloud Certified
• Advance Python - MKCL
• Goldman Sachs / JP Morgan - Operations Job Simulation
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Top Bar Actions */}
          <div className="px-5 py-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">Nishant_Pisal_Resume.pdf</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Verified ATS Format
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Text!' : 'Copy Plaintext'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Document Body */}
          <div className="flex-1 p-6 sm:p-10 overflow-y-auto bg-slate-950 text-slate-200 select-text font-sans">
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800">
                <img
                  src="/nishant-photo.jpg"
                  alt="Nishant Pisal"
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-top border-2 border-cyan-500/40 shadow-lg shrink-0"
                />
                <div className="text-center sm:text-left flex-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className="text-xs sm:text-sm font-semibold text-cyan-400 mt-1 font-mono">
                    AI Native Developer | Full-Stack Software Engineer | Academic Rank #1
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 mt-2.5 text-xs text-slate-400 font-mono">
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-cyan-300 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" /> {PERSONAL_INFO.email}
                    </a>
                    <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:text-emerald-300 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" /> {PERSONAL_INFO.phone}
                    </a>
                    <a href={PERSONAL_INFO.website} target="_blank" rel="noreferrer" className="hover:text-blue-300 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-blue-400" /> nishantpisal.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono border-b border-slate-800 pb-1 mb-2">
                  Professional Summary
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {PERSONAL_INFO.summary}
                </p>
              </div>

              {/* Technical Skills */}
              <div>
                <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono border-b border-slate-800 pb-1 mb-2">
                  Technical Skills
                </h2>
                <div className="grid grid-cols-1 gap-1 text-xs text-slate-300">
                  <p><strong className="text-white font-mono">Languages:</strong> JavaScript, TypeScript, Python (experienced), C++, HTML5, CSS</p>
                  <p><strong className="text-white font-mono">Frontend:</strong> React.js, Next.js, Tailwind CSS, Bootstrap, SEO</p>
                  <p><strong className="text-white font-mono">Backend:</strong> Node.js, Cloudinary, MongoDB, Firebase</p>
                  <p><strong className="text-white font-mono">AI / Other:</strong> Gemini API, Google Developer Program (24 Badges), JWT/OAuth, Web3</p>
                  <p><strong className="text-white font-mono">Tools:</strong> Git, GitHub, Vercel, Render, Netlify, Hostinger, VS Code</p>
                </div>
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono border-b border-slate-800 pb-1 mb-2">
                  Work Experience
                </h2>
                <div className="space-y-4">
                  {EXPERIENCES_DATA.map((exp) => (
                    <div key={exp.id} className="text-xs">
                      <div className="flex justify-between font-bold text-slate-100">
                        <span>{exp.role} | {exp.company}</span>
                        <span className="text-cyan-400 font-mono">{exp.period}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono">{exp.location}</p>
                      <ul className="list-disc list-inside text-slate-300 mt-1 space-y-1">
                        {exp.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono border-b border-slate-800 pb-1 mb-2">
                  Projects & Applications
                </h2>
                <div className="space-y-3">
                  {PROJECTS_DATA.map((proj) => (
                    <div key={proj.id} className="text-xs">
                      <div className="flex justify-between font-bold text-slate-100">
                        <span>{proj.title} — {proj.subtitle}</span>
                        <span className="text-[10px] font-mono px-1.5 rounded bg-slate-800 text-cyan-300">
                          {proj.category.toUpperCase()}
                        </span>
                      </div>
                      <ul className="list-disc list-inside text-slate-300 mt-0.5 space-y-0.5">
                        {proj.keyPoints.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono border-b border-slate-800 pb-1 mb-2">
                  Education & Academic Rank
                </h2>
                <div className="space-y-3">
                  {EDUCATION_DATA.map((edu) => (
                    <div key={edu.id} className="text-xs">
                      <div className="flex justify-between font-bold text-slate-100">
                        <span>{edu.degree} | {edu.institution}</span>
                        <span className="text-cyan-400 font-mono">{edu.period}</span>
                      </div>
                      <p className="text-emerald-400 font-mono font-semibold">{edu.gpaOrScore}</p>
                      <ul className="list-disc list-inside text-slate-300 mt-0.5">
                        {edu.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications & Achievements */}
              <div>
                <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono border-b border-slate-800 pb-1 mb-2">
                  Certifications & Achievements
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {CERTIFICATIONS_DATA.map((cert) => (
                    <div key={cert.id} className="p-2 rounded bg-slate-900 border border-slate-800">
                      <p className="font-bold text-white">{cert.title}</p>
                      <p className="text-[11px] text-cyan-400 font-mono">{cert.issuer}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{cert.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
