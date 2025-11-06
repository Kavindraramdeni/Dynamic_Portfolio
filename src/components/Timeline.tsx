import React from 'react';
import type { TimelineItem } from '../types';

interface TimelineProps {
  items: TimelineItem[];
}

const DefaultIcon = () => (
  <svg className="w-2.5 h-2.5 text-white dark:text-slate-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
    <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
  </svg>
);

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative border-l-2 border-slate-300 dark:border-slate-700 ml-3">
      {items.map((item, index) => (
        <div 
          key={index} 
          className="relative mb-10 ml-12 pl-8 animate-in-view"
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <span className="absolute flex items-center justify-center w-6 h-6 bg-cyan-500 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900">
            {item.icon || <DefaultIcon />}
          </span>
          <h3 className="mb-2 text-lg font-semibold leading-snug text-gray-900 dark:text-white break-words">
            {item.title}
          </h3>
          <p className="text-cyan-400 font-medium">{item.subtitle}</p>
          <time className="block mb-2 text-sm font-normal leading-none text-slate-500 dark:text-slate-400">{item.period}</time>
          <p className="text-base font-normal text-slate-600 dark:text-slate-400">{item.description}</p>
          {item.details && (
            <ul className="mt-4 space-y-2 list-disc list-inside text-slate-600 dark:text-slate-400">
              {item.details.map((detail, i) => (
                <li key={i} className="pl-2">{detail}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};