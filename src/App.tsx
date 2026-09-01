import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ColorPaletteSection } from './components/ColorPaletteSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { EducationCertifications } from './components/EducationCertifications';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDemoModal } from './components/ProjectDemoModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { ResumeViewerModal } from './components/ResumeViewerModal';
import { PROJECTS_DATA, PALETTE_THEMES } from './data/portfolioData';
import { PaletteTheme } from './types';
import { Sparkles, FileText, MessageSquare } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [selectedTechFilter, setSelectedTechFilter] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState<PaletteTheme>(PALETTE_THEMES[0]);

  // Scrollspy observer to highlight active section in Navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'skills', 'palette', 'experience', 'education', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const selectedProject = PROJECTS_DATA.find((p) => p.id === selectedProjectId) || null;

  const handleSelectTech = (tech: string) => {
    setSelectedTechFilter(tech);
    // Smooth scroll to projects section
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 bg-grid-pattern relative">
      {/* Top Navbar */}
      <Navbar
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Layout */}
      <main>
        {/* 1. Hero Section with Interactive Shell */}
        <Hero
          onOpenResume={() => setResumeModalOpen(true)}
          onOpenAiAssistant={() => setAiAssistantOpen(true)}
          onOpenProjectDemo={(id) => setSelectedProjectId(id)}
        />

        {/* 2. Flagship & Mini Projects Section (Dynamic Portfolio Gallery) */}
        <ProjectsSection
          onOpenProjectDemo={(id) => setSelectedProjectId(id)}
          selectedTechFilter={selectedTechFilter}
          onClearTechFilter={() => setSelectedTechFilter(null)}
        />

        {/* 3. Animated Skills Matrix Section */}
        <SkillsSection onSelectTechFilter={handleSelectTech} />

        {/* 4. Professional Color Palette & Accessibility Section */}
        <ColorPaletteSection
          currentTheme={activeTheme}
          onSelectTheme={(theme) => setActiveTheme(theme)}
        />

        {/* 5. Professional Work Experience & Internships Timeline */}
        <ExperienceTimeline onOpenProjectDemo={(id) => setSelectedProjectId(id)} />

        {/* 6. Education & Certifications (DIET Satara Rank #1, 24 Google Badges, AWS/GCP, MKCL) */}
        <EducationCertifications />

        {/* 7. Contact & Collaboration Dispatcher */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
      />

      {/* Floating Action Button for AI Copilot */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <button
          id="floating-ai-copilot-btn"
          onClick={() => setAiAssistantOpen(true)}
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Chat with Nishant's AI Copilot"
        >
          <Sparkles className="w-4 h-4 fill-slate-950 animate-pulse" />
          <span className="hidden sm:inline">Ask AI Copilot</span>
        </button>
      </div>

      {/* Interactive Project Simulator Modal */}
      <ProjectDemoModal
        project={selectedProject}
        onClose={() => setSelectedProjectId(null)}
      />

      {/* Interactive AI Assistant Modal */}
      <AiAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        onOpenProjectDemo={(id) => {
          setAiAssistantOpen(false);
          setSelectedProjectId(id);
        }}
      />

      {/* Full Resume Viewer Modal */}
      <ResumeViewerModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}
