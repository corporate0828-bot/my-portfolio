export type ProjectCategory = 'all' | 'case-study' | 'live-demo' | 'prototype' | 'commercial';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'major' | 'mini' | 'freelance' | 'ai';
  galleryCategory: 'case-study' | 'live-demo' | 'prototype' | 'commercial';
  galleryCategoryLabel: string;
  description: string;
  keyPoints: string[];
  technologies: string[];
  skillTags: string[]; // e.g. 'Web Development', 'Graphic Design', 'Project Management', 'UX/UI Design', 'AI & Machine Learning', 'Cloud & DevOps', 'Content Creation'
  githubUrl?: string;
  liveDemoUrl?: string;
  featured?: boolean;
  metrics?: string;
  thumbnailGradient?: string;
  thumbnailIcon?: string;
  interactiveDemoId?: 'ingrezy' | 'autobillr' | 'traceless' | 'campus-lost-found' | 'kalbhairav' | 'bluewings';
  completionDate?: string;
  clientName?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'remote' | 'onsite' | 'freelance';
  tag?: string;
  highlights: string[];
  skillsUsed: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  gpaOrScore: string;
  badge?: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  category: 'cloud' | 'programming' | 'google' | 'finance-ops';
  badgeCount?: string;
  description: string;
  iconName: string;
}

export interface AnimatedSkill {
  name: string;
  percentage: number;
  category: 'development' | 'design' | 'management' | 'ai-cloud' | 'content';
  categoryLabel: string;
  experienceYears: string;
  level: 'Mastery' | 'Expert' | 'Advanced' | 'Proficient';
  badge?: string;
  description: string;
  color: string;
}

export interface SkillCategory {
  title: string;
  categoryKey: 'languages' | 'frontend' | 'backend' | 'ai-other' | 'tools';
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Proficient';
    iconName?: string;
    badge?: string;
  }[];
}

export interface ColorToken {
  name: string;
  role: string;
  hex: string;
  textColor: string;
  wcagContrast: string;
  description: string;
}

export interface PaletteTheme {
  id: string;
  name: string;
  tagline: string;
  primary: string;
  secondary: string;
  accent: string;
  surface: string;
  background: string;
  text: string;
  textMuted: string;
  border: string;
  glow: string;
}

