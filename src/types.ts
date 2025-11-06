import React from 'react';

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
  icon?: React.ReactNode;
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
  icon?: React.ReactNode;
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
  _id?: string;
  quote: string;
  author: string;
  company: string;
  imageUrl?: string;
}

export interface LearningSkill {
  _id?: string;
  name: string;
  icon: string;
  color: string;
}
