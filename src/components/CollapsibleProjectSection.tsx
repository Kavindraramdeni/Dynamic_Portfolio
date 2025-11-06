import React, { useState } from 'react';
import { Project, ProjectCategory } from '../types';
import { ProjectCard } from './ProjectCard';

interface CollapsibleProjectSectionProps {
  projectCategory: ProjectCategory;
  onProjectSelect: (project: Project) => void;
}

export const CollapsibleProjectSection: React.FC<CollapsibleProjectSectionProps> = ({ projectCategory, onProjectSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
            <button
                onClick={handleToggle}
                className="flex items-center w-full text-left"
                aria-expanded={isOpen}
                aria-controls={`collapsible-content-${projectCategory.category.replace(/\s+/g, '-')}`}
            >
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white border-l-4 border-cyan-400 pl-4">
                    {projectCategory.category}
                </h3>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ml-auto text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div
                id={`collapsible-content-${projectCategory.category.replace(/\s+/g, '-')}`}
                className="transition-all duration-500 ease-in-out overflow-hidden"
                style={{ 
                    maxHeight: isOpen ? '1000px' : '0px',
                    paddingTop: isOpen ? '2rem' : '0rem',
                }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectCategory.items.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            category={projectCategory.category.replace(/ (Projects|Experience)$/, '')}
                            onClick={onProjectSelect}
                            animationDelay={`${index * 100}ms`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};