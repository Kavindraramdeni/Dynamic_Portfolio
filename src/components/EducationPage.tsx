import React from 'react';
import { Timeline } from './Timeline';
import { EDUCATION, CERTIFICATIONS } from '../constants';

interface EducationPageProps {
  onBack: () => void;
}

const EducationPage: React.FC<EducationPageProps> = ({ onBack }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-fade-in py-8 section-content is-visible">
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
        <section className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 md:mb-12 relative">
              <span className="relative z-10">Education Details</span>
              <span className="absolute -left-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-cyan-400/20 rounded-full"></span>
          </h1>
          <Timeline items={EDUCATION} />
        </section>

        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 md:mb-12 relative">
              <span className="relative z-10">Certifications</span>
              <span className="absolute -left-2 top-1/2 -translate-y-1/2 h-9 w-9 bg-cyan-400/20 rounded-full"></span>
          </h2>
          <ul className="space-y-6 text-base">
              {CERTIFICATIONS.map((cert, index) => (
                  <li key={index} className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-200 dark:border-gray-700 pb-4 gap-4">
                    <div>
                        <h4 className="font-semibold text-lg text-gray-800 dark:text-white">{cert.title}{cert.year && ` (${cert.year})`}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Provided by {cert.issuer}</p>
                    </div>
                    {cert.url && (
                        <a 
                            href={cert.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex-shrink-0 ml-auto sm:ml-4 flex items-center text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-colors duration-300 group"
                        >
                            <span className="hidden sm:inline">View Certificate</span>
                            <span className="sm:hidden">View</span>
                            <span className="inline-block ml-1.5 text-lg">🔗</span>
                        </a>
                    )}
                  </li>
              ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default EducationPage;