import React, { useState } from 'react';
import { WORK_PROCESS } from '../constants';

export const WorkProcess: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section id="work-process" className="py-16 md:py-24 overflow-hidden">
      <button
        onClick={handleToggle}
        className="flex items-center mb-12 w-full text-left"
        aria-expanded={isOpen}
        aria-controls="work-process-content"
      >
        <div className="w-12 h-1 bg-cyan-500 mr-4"></div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white uppercase tracking-widest">
          Work Process
        </h2>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ml-auto text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        id="work-process-content"
        className="transition-all duration-500 ease-in-out overflow-hidden"
        style={{ maxHeight: isOpen ? '1000px' : '0px' }}
      >
        <div className="grid md:grid-cols-4 gap-8 text-center pt-1">
          {WORK_PROCESS.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 flex items-center justify-center mb-4 border-2 border-cyan-500/20">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};