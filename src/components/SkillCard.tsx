import React from 'react';

interface SkillCardProps {
  name: string;
  icon: React.ReactNode;
  color?: string;
  animationDelay: string;
}

const colorMap: { [key: string]: { border: string; shadow: string; text: string; glow: string } } = {
  gray: {
    border: 'hover:border-gray-500',
    shadow: 'hover:shadow-gray-500/20',
    text: 'text-gray-400 group-hover:text-gray-400',
    glow: 'group-hover:text-glow-gray',
  },
  red: {
    border: 'hover:border-red-500',
    shadow: 'hover:shadow-red-500/20',
    text: 'text-red-400 group-hover:text-red-400',
    glow: 'group-hover:text-glow-red',
  },
  orange: {
    border: 'hover:border-orange-500',
    shadow: 'hover:shadow-orange-500/20',
    text: 'text-orange-400 group-hover:text-orange-400',
    glow: 'group-hover:text-glow-orange',
  },
  yellow: {
    border: 'hover:border-yellow-500',
    shadow: 'hover:shadow-yellow-500/20',
    text: 'text-yellow-400 group-hover:text-yellow-400',
    glow: 'group-hover:text-glow-yellow',
  },
  green: {
    border: 'hover:border-green-500',
    shadow: 'hover:shadow-green-500/20',
    text: 'text-green-400 group-hover:text-green-400',
    glow: 'group-hover:text-glow-green',
  },
  blue: {
    border: 'hover:border-blue-500',
    shadow: 'hover:shadow-blue-500/20',
    text: 'text-blue-400 group-hover:text-blue-400',
    glow: 'group-hover:text-glow-blue',
  },
  sky: {
    border: 'hover:border-sky-500',
    shadow: 'hover:shadow-sky-500/20',
    text: 'text-sky-400 group-hover:text-sky-400',
    glow: 'group-hover:text-glow-sky',
  },
  indigo: {
    border: 'hover:border-indigo-500',
    shadow: 'hover:shadow-indigo-500/20',
    text: 'text-indigo-400 group-hover:text-indigo-400',
    glow: 'group-hover:text-glow-indigo',
  },
  pink: {
    border: 'hover:border-pink-500',
    shadow: 'hover:shadow-pink-500/20',
    text: 'text-pink-400 group-hover:text-pink-400',
    glow: 'group-hover:text-glow-pink',
  },
  cyan: {
    border: 'hover:border-cyan-500',
    shadow: 'hover:shadow-cyan-500/20',
    text: 'text-cyan-400 group-hover:text-cyan-400',
    glow: 'group-hover:text-glow-cyan',
  },
};

export const SkillCard: React.FC<SkillCardProps> = ({ name, icon, color = 'cyan', animationDelay }) => {
  const colors = colorMap[color] || colorMap.cyan;
  const [initialTextColor, hoverTextColor] = colors.text.split(' ');

  return (
    <div 
      className={`group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:shadow-lg hover:scale-105 hover:-translate-y-1 ${colors.border} ${colors.shadow} animate-in-view`}
      style={{ transitionDelay: animationDelay }}
    >
      <div className={`${initialTextColor} w-10 h-10 mb-3 transition-all duration-300 ${colors.glow}`}>{icon}</div>
      <p className={`text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-300 ${hoverTextColor}`}>{name}</p>
    </div>
  );
};