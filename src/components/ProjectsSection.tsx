import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  ExternalLink,
  Github,
  Sparkles,
  Play,
  CheckCircle2,
  Layers,
  Filter,
  Search,
  Rocket,
  LayoutGrid,
  List,
  Tag,
  ArrowUpRight,
  Clock,
  Briefcase,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';

interface ProjectsSectionProps {
  onOpenProjectDemo: (projectId: string) => void;
  selectedTechFilter?: string | null;
  onClearTechFilter?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenProjectDemo,
  selectedTechFilter,
  onClearTechFilter,
}) => {
  // Category Filter State (Case Studies, Live Demos, Prototypes, Commercial, All)
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  // Skill Tag Filter State (Web Development, Graphic Design, Project Management, etc.)
  const [activeSkillTag, setActiveSkillTag] = useState<string>('all');
  // Search query
  const [searchQuery, setSearchQuery] = useState('');
  // View mode (Grid vs Detailed List)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Categories list
  const categoryFilters: { key: ProjectCategory; label: string; count: number }[] = useMemo(() => {
    return [
      { key: 'all', label: 'All Projects', count: PROJECTS_DATA.length },
      {
        key: 'case-study',
        label: 'Case Studies',
        count: PROJECTS_DATA.filter((p) => p.galleryCategory === 'case-study' || p.category === 'freelance').length,
      },
      {
        key: 'live-demo',
        label: 'Live Demos',
        count: PROJECTS_DATA.filter((p) => p.galleryCategory === 'live-demo').length,
      },
      {
        key: 'prototype',
        label: 'Prototypes',
        count: PROJECTS_DATA.filter((p) => p.galleryCategory === 'prototype').length,
      },
      {
        key: 'commercial',
        label: 'Commercial Deployments',
        count: PROJECTS_DATA.filter((p) => p.category === 'freelance' || p.galleryCategory === 'commercial').length,
      },
    ];
  }, []);

  // Skill tags list requested by user (Web Development, Graphic Design, Project Management, etc.)
  const skillTagFilters = [
    'All Skills',
    'Web Development',
    'Graphic Design',
    'Project Management',
    'UX/UI Design',
    'AI & Machine Learning',
    'Cloud & DevOps',
    'Content Creation',
    'Python',
    'JavaScript',
  ];

  // If a tech was selected from Skills Section, sync it
  React.useEffect(() => {
    if (selectedTechFilter) {
      // Find matching tag or search term
      const matched = skillTagFilters.find(
        (t) => t.toLowerCase() === selectedTechFilter.toLowerCase()
      );
      if (matched) {
        setActiveSkillTag(matched);
      } else {
        setSearchQuery(selectedTechFilter);
      }
    }
  }, [selectedTechFilter]);

  // Filter logic
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      // Category Match
      const matchesCategory =
        activeCategory === 'all' ||
        project.galleryCategory === activeCategory ||
        (activeCategory === 'case-study' && project.category === 'freelance') ||
        (activeCategory === 'commercial' && project.category === 'freelance');

      // Skill Tag Match
      const matchesSkillTag =
        activeSkillTag === 'All Skills' ||
        project.skillTags.some(
          (tag) => tag.toLowerCase() === activeSkillTag.toLowerCase()
        ) ||
        project.technologies.some(
          (tech) => tech.toLowerCase().includes(activeSkillTag.toLowerCase())
        );

      // Search Query Match
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.skillTags.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSkillTag && matchesSearch;
    });
  }, [activeCategory, activeSkillTag, searchQuery]);

  const resetAllFilters = () => {
    setActiveCategory('all');
    setActiveSkillTag('All Skills');
    setSearchQuery('');
    if (onClearTechFilter) onClearTechFilter();
  };

  const hasActiveFilters =
    activeCategory !== 'all' || activeSkillTag !== 'All Skills' || searchQuery !== '' || Boolean(selectedTechFilter);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3">
              <Rocket className="w-3.5 h-3.5" />
              <span>Interactive Portfolio Gallery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
              Curated Project Gallery
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Explore production applications, live interactive simulators, AI integrations, and commercial client deliveries. Filter dynamically by category or core skill competency.
            </p>
          </div>

          {/* Search and Layout Switcher */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 lg:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="gallery-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, skills, tech..."
                className="w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 outline-none transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Grid / List Mode Switcher */}
            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                id="gallery-view-grid-btn"
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Grid Gallery View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                id="gallery-view-list-btn"
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Detailed List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Top Filter Bar 1: Category Tabs (Case Studies, Live Demos, Prototypes, Commercial) */}
        <div className="mb-4">
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Filter by Category
            </span>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-mono font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/90 border border-slate-800/90 rounded-2xl">
            {categoryFilters.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20 scale-[1.02]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                      isActive ? 'bg-slate-950/30 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Top Filter Bar 2: Skill Competencies (Web Development, Graphic Design, Project Management, UX/UI Design, etc.) */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-indigo-400" />
              Filter by Skill Competency
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {skillTagFilters.map((skill) => {
              const isActive = activeSkillTag.toLowerCase() === skill.toLowerCase();
              return (
                <button
                  key={skill}
                  onClick={() => setActiveSkillTag(skill)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-indigo-600 text-white font-bold border border-indigo-400 shadow-md shadow-indigo-500/20'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-cyan-300' : 'bg-slate-600'
                    }`}
                  />
                  <span>{skill}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter & Active Pill indicator */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6 px-1">
          <div>
            Showing <strong className="text-white">{filteredProjects.length}</strong> of{' '}
            <strong className="text-white">{PROJECTS_DATA.length}</strong> projects
            {hasActiveFilters && (
              <span className="text-cyan-400 ml-2 font-mono">
                [Active Filter: {activeCategory !== 'all' ? activeCategory : ''}
                {activeSkillTag !== 'All Skills' ? ` • ${activeSkillTag}` : ''}
                {searchQuery ? ` • "${searchQuery}"` : ''}]
              </span>
            )}
          </div>

          <div className="text-[11px] text-slate-500 hidden sm:block">
            ⚡ Click any card for interactive simulator
          </div>
        </div>

        {/* Project Gallery - Bento Grid Mode or List Mode */}
        {viewMode === 'grid' ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 15 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="group relative flex flex-col bg-slate-900/85 border border-slate-800/90 hover:border-cyan-500/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 backdrop-blur-md"
                >
                  {/* Thumbnail / Header Gradient Banner */}
                  <div
                    className={`h-36 w-full bg-gradient-to-br ${
                      project.thumbnailGradient || 'from-slate-900 to-slate-950'
                    } p-5 relative overflow-hidden flex flex-col justify-between border-b border-slate-800/80 transition-transform duration-500 group-hover:scale-[1.02]`}
                  >
                    {/* Background Decorative Pattern */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

                    {/* Top Row: Category Badge & Metric */}
                    <div className="flex items-center justify-between relative z-10">
                      <span
                        className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full font-bold border backdrop-blur-md ${
                          project.galleryCategory === 'prototype'
                            ? 'bg-purple-950/80 text-purple-300 border-purple-700/60'
                            : project.galleryCategory === 'case-study'
                            ? 'bg-blue-950/80 text-blue-300 border-blue-700/60'
                            : project.galleryCategory === 'live-demo'
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                            : 'bg-amber-950/80 text-amber-300 border-amber-700/60'
                        }`}
                      >
                        {project.galleryCategoryLabel || project.category}
                      </span>

                      {project.metrics && (
                        <span className="text-[10px] font-mono text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded-md border border-cyan-500/30">
                          {project.metrics}
                        </span>
                      )}
                    </div>

                    {/* Thumbnail Footer Info */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span>{project.completionDate || '2025 – 2026'}</span>
                      </span>

                      {project.clientName && (
                        <span className="text-[10px] text-slate-400 font-medium truncate max-w-[150px]">
                          {project.clientName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Title & Subtitle */}
                      <div className="mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-display flex items-center justify-between">
                          <span>{project.title}</span>
                          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-cyan-400" />
                        </h3>
                        <p className="text-xs text-cyan-400/90 font-medium mt-0.5 line-clamp-1">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 text-xs leading-relaxed line-clamp-3 mb-4">
                        {project.description}
                      </p>

                      {/* Skill Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.skillTags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                              activeSkillTag.toLowerCase() === tag.toLowerCase()
                                ? 'bg-indigo-950 text-indigo-300 border border-indigo-500'
                                : 'bg-slate-800/80 text-slate-300 border border-slate-700/50'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Key highlights bullet preview */}
                      <div className="space-y-1 pt-2 border-t border-slate-800/60">
                        {project.keyPoints.slice(0, 2).map((pt, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                            <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
                      {/* Interactive Demo Launcher */}
                      <button
                        onClick={() => onOpenProjectDemo(project.id)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Launch Simulator</span>
                      </button>

                      {/* Github Link */}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="View Source Code on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}

                      {/* Live Deployment Link */}
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition-colors"
                          title="Open Live Deployment"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Detailed List View Mode */
          <motion.div layout className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="group p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span
                        className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold border ${
                          project.galleryCategory === 'prototype'
                            ? 'bg-purple-950/80 text-purple-300 border-purple-700/60'
                            : project.galleryCategory === 'case-study'
                            ? 'bg-blue-950/80 text-blue-300 border-blue-700/60'
                            : 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                        }`}
                      >
                        {project.galleryCategoryLabel || project.category}
                      </span>
                      <h3 className="text-lg font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs text-slate-400">• {project.subtitle}</span>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs text-slate-400 font-mono mr-1">Skills:</span>
                      {project.skillTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="text-slate-600 mx-1">|</span>
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-800/40"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 w-full lg:w-auto">
                    <button
                      onClick={() => onOpenProjectDemo(project.id)}
                      className="flex-1 lg:flex-none inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Interactive Simulator</span>
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}

                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition-colors"
                        title="Live Deployment"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">No Matching Projects Found</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No projects matched your active category "<strong>{activeCategory}</strong>" and skill filter "<strong>{activeSkillTag}</strong>".
            </p>
            <button
              onClick={resetAllFilters}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
