import React from 'react';
import { Section } from './Section';
import { SERVICES } from '../constants';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  animationDelay: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, animationDelay }) => (
    <div 
      className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-lg p-6 text-center transition-all duration-300 hover:border-cyan-500 hover:shadow-cyan-500/10 hover:-translate-y-1 animate-in-view"
      // FIX: The component receives `animationDelay` as a prop, but was trying to use an undefined variable `transitionDelay`.
      style={{ transitionDelay: animationDelay }}
    >
        <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 text-cyan-500 dark:text-cyan-400 flex items-center justify-center">
                {icon}
            </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
);


export const Services: React.FC = () => {
  return (
    <Section title="Services" id="services">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
                <ServiceCard 
                  key={index} 
                  icon={service.icon} 
                  title={service.title} 
                  description={service.description} 
                  animationDelay={`${index * 100}ms`}
                />
            ))}
        </div>
    </Section>
  );
};