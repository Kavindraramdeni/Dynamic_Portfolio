import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CONTACT_INFO, SKILL_CLOUD_ICONS } from '../constants';
import { LinkedInIcon, GitHubIcon, HackerRankIcon, EmailIcon } from './Icons';
import { SkillCloud } from './SkillCloud';

interface HeroProps {
  onNavigate: (page: string, section?: string) => void;
}

const DomainTypingEffect: React.FC = () => {
    const [text, setText] = useState('');
    const [loopNum, setLoopNum] = useState(0);

    const toRotate = useMemo(() => [
        { text: "a Full Stack Developer", color: "text-green-500 dark:text-green-400 text-glow-green" },
        { text: "a UI/UX Designer", color: "text-blue-500 dark:text-blue-400 text-glow-blue" }
    ], []);
    
    const isDeleting = useRef(false);
    const typingSpeed = useRef(150);

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % toRotate.length;
            const fullText = toRotate[i].text;

            const newText = isDeleting.current
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1);
            
            setText(newText);

            if (!isDeleting.current && newText === fullText) {
                isDeleting.current = true;
                typingSpeed.current = 2000; // Pause at end
            } else if (isDeleting.current && newText === '') {
                isDeleting.current = false;
                setLoopNum(prev => prev + 1);
                typingSpeed.current = 150; // Start typing next word
            } else {
                typingSpeed.current = isDeleting.current ? 75 : 150;
            }
        };
        const timer = setTimeout(handleType, typingSpeed.current);
        return () => clearTimeout(timer);
    }, [text, loopNum, toRotate]);

    const currentColor = toRotate[loopNum % toRotate.length].color;

    return (
        <span className={`font-semibold ${currentColor}`}>
            {text}
            <span className="border-r-4 border-gray-600 dark:border-gray-400 animate-pulse">&nbsp;</span>
        </span>
    );
};


export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('data-href');
    if (targetId) {
        onNavigate('home', targetId);
    }
  };

  const socialLinks = [
    { href: CONTACT_INFO.github, icon: <GitHubIcon />, label: 'GitHub' },
    { href: CONTACT_INFO.linkedIn, icon: <LinkedInIcon />, label: 'LinkedIn' },
    { href: CONTACT_INFO.hackerrank, icon: <HackerRankIcon />, label: 'HackerRank' },
    { href: `mailto:${CONTACT_INFO.email}`, icon: <EmailIcon />, label: 'Email' },
  ];
            // className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 sm:px-10 lg:px-12 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-black" />
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left Column */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            <div className="relative inline-block">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-2xl blur-lg opacity-60"></div>
              <span className="relative block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-glow">
                Kavindra Raj Ramdeni
              </span>
            </div>
          </h1>
          
          <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 h-8">
            I am <DomainTypingEffect />
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <button 
              data-href="#portfolio"
              onClick={handleNavigate}
              className="w-full sm:w-auto bg-cyan-500 text-white font-bold py-3 px-8 rounded-full uppercase tracking-wider hover:bg-cyan-600 transition-all duration-300 flex items-center justify-center group transform hover:scale-105"
            >
              View My Work
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">&#8594;</span>
            </button>
            <a 
              href="/resume.pdf" // Assuming resume is in public folder
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold py-3 px-8 rounded-full uppercase tracking-wider hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Resume
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center md:justify-start gap-6">
            {socialLinks.map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="text-gray-400 hover:text-cyan-500 transition-colors duration-300">
                  {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="relative w-full h-80 md:h-[500px] flex items-center justify-center">
            <SkillCloud icons={SKILL_CLOUD_ICONS} />
        </div>
      </div>
    </section>
  );
};