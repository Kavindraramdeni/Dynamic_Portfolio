import React from 'react';
import { useUI } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useUI();

  const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 12a5 5 0 110-10 5 5 0 010 10z" />
    </svg>
  );

  const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );

  return (
    <button
      onClick={toggleTheme}
      className="group relative flex items-center justify-center w-12 h-12 rounded-full focus:outline-none transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      <span 
        className="absolute left-1/2 -translate-x-1/2 top-14 w-auto min-w-max px-2 py-1 text-xs font-bold text-white bg-gray-800 rounded-md shadow-md 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none uppercase tracking-wider"
      >
        Toggle Theme
      </span>
    </button>
  );
};