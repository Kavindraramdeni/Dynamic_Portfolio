import React from 'react';
import { ProjectCard } from './ProjectCard';
import { Project } from '../types';

interface BlogPageProps {
  onBack: () => void;
  onProjectSelect: (project: Project) => void;
  projects: (Project & { category: string })[];
}

const BlogPage: React.FC<BlogPageProps> = ({ onBack, onProjectSelect, projects }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-fade-in py-8">
        <div className="mb-8 md:mb-12">
          <button
            onClick={onBack}
            className="flex items-center text-slate-500 dark:text-slate-400 hover:text-cyan-400 transition-colors duration-300 group text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portfolio
          </button>
        </div>
        <section>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 md:mb-12 relative">
              <span className="relative z-10">Blog & Case Studies</span>
              <span className="absolute -left-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-cyan-400/20 rounded-full"></span>
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                  <ProjectCard 
                      key={project.title} 
                      project={project}
                      category={project.category.replace(/ (Projects|Experience)$/, '')}
                      onClick={onProjectSelect}
                      showLinks={false} 
                  />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPage;