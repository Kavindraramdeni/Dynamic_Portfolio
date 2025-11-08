// ❌ remove import React from 'react';

export interface ContactInfo {
  email: string;
  phone: string;
  linkedIn: string;
  hackerrank: string;
  geekforgeeks: string;
  github: string;
}

export interface Skill {
  name: string;
  icon?: unknown; // React.ReactNode replaced with unknown
  color?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface TimelineItem {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  details?: string[];
  icon?: unknown;
}

export interface Project {
  _id?: string;
  title: string;
  description: string;
  detailedDescription?: string;
  tech: string;
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  gallery?: string[];
  featured?: boolean;
  category?: string;
}

export interface ProjectCategory {
  category: string;
  items: Project[];
}

export interface Certification {
  title: string;
  issuer: string;
  year?: string;
  url?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
  imageUrl?: string;
}
