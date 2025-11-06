import React from 'react';
import { Section } from './Section';
import { CLIENTS } from '../constants';

export const Clients: React.FC = () => {
  return (
    <Section title="Clients" id="clients">
      <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-lg p-8">
          <div className="flex justify-center items-center flex-wrap gap-x-12 gap-y-10">
            {CLIENTS.map((client) => (
                <div
                  key={client.name}
                  title={client.name}
                  className="h-28 w-28 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 flex justify-center items-center p-5 grayscale transition-all duration-300 hover:grayscale-0 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/10 rounded-full text-gray-500 dark:text-gray-400 hover:scale-105"
                >
                  {client.logo}
                </div>
              ))}
          </div>
      </div>
    </Section>
  );
};