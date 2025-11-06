import React from 'react';
import type { Project } from '../types';
import { BarChartIcon, StarIcon, CodeBracketIcon, ExternalLinkSquareIcon } from './Icons';

interface ProjectCardProps {
  project: Project;
  category: string;
  onClick: (project: Project) => void;
  showLinks?: boolean;
  animationDelay?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, category, onClick, showLinks = true, animationDelay }) => {
  const techs = project.tech.split(',').map(t => t.trim());
  const hasLinks = project.repoUrl || (project.liveUrl && project.liveUrl !== '#');

  return (
    <div 
      className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-cyan-500/20 hover:-translate-y-2 project-card-enter animate-in-view"
      style={{ transitionDelay: animationDelay }}
    >
      {/* Card Header */}
      <header className="relative h-40 text-white">
        <div 
          className="w-full h-full block"
        >
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-cyan-700/60 dark:bg-cyan-900/50 mix-blend-multiply group-hover:bg-cyan-700/50 transition-colors duration-300 pointer-events-none"></div>
        <div className="absolute inset-0 p-4 flex flex-col pointer-events-none">
          <div className="flex justify-between items-start">
            <div className="bg-black/20 backdrop-blur-sm p-2 rounded-lg">
                <BarChartIcon />
            </div>
            {project.featured && (
                <div className="flex items-center gap-1.5 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    <StarIcon className="w-3.5 h-3.5" />
                    <span>Featured</span>
                </div>
            )}
          </div>
          
          {showLinks && hasLinks && (
             <div className="mt-auto flex bg-gray-900/30 backdrop-blur-sm rounded-lg p-1 w-full max-w-[200px] mx-auto opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto">
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center gap-2 text-white bg-white/10 hover:bg-white/30 text-sm font-semibold p-2 rounded-md transition-colors duration-200">
                    <CodeBracketIcon />
                    <span>Code</span>
                  </a>
                )}
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center gap-2 text-white bg-blue-600/80 hover:bg-blue-500/80 text-sm font-semibold p-2 rounded-md transition-colors duration-200">
                    <ExternalLinkSquareIcon />
                    <span>Demo</span>
                  </a>
                )}
              </div>
          )}
        </div>
      </header>

      {/* Card Body */}
      <div 
        onClick={() => onClick(project)} 
        className="p-6 flex flex-col flex-grow text-left w-full cursor-pointer transition-colors duration-300 group-hover:bg-gray-50 dark:group-hover:bg-gray-700/50"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(project)}
        aria-label={`View details for ${project.title}`}
      >
        <div className="flex justify-between items-center mb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">{category}</p>
            {project.featured && (
                <div className="flex items-center gap-1 text-orange-500 dark:text-orange-400">
                    <StarIcon className="w-4 h-4" />
                    <span className="text-xs font-bold">Featured</span>
                </div>
            )}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-500 transition-colors">{project.title}</h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">
            {project.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            {techs.slice(0, 5).map(t => (
                <span key={t} className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full">
                    {t}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
};