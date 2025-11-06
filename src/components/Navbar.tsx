import React, { useState, useEffect } from 'react';
import { ObjectiveIcon, SkillsIcon, EducationIcon, ProjectsIcon, ContactIcon, ServicesIcon,/* BlogIcon,*/ ExperienceIcon, AdminIcon } from './NavIcons';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { name: 'ABOUT', page: 'home', section: '#about', icon: <ObjectiveIcon /> },
  { name: 'EXPERIENCE', page: 'home', section: '#experience', icon: <ExperienceIcon /> },
  { name: 'SERVICES', page: 'home', section: '#services', icon: <ServicesIcon /> },
  { name: 'SKILLS', page: 'home', section: '#skills', icon: <SkillsIcon /> },
  { name: 'EDUCATION', page: 'education', icon: <EducationIcon /> },
  { name: 'PORTFOLIO', page: 'home', section: '#portfolio', icon: <ProjectsIcon /> },
 // { name: 'BLOG', page: 'blog', icon: <BlogIcon /> },
  { name: 'CONTACT', page: 'home', section: '#contact', icon: <ContactIcon /> },
  { name: 'ADMIN', page: 'admin', icon: <AdminIcon /> },
];

interface NavbarProps {
  onNavigate: (page: string, section?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: string, section?: string) => {
    onNavigate(page, section);
    setIsMobileMenuOpen(false);
  };
  
  const HamburgerIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
    </svg>
  );

  const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMobileMenuOpen ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => handleNavClick('home', '#home')} className="text-2xl font-bold text-gray-900 dark:text-white tracking-wider">
            K<span className="text-cyan-400">.</span>R
          </button>
          <div className="hidden md:flex items-center space-x-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.page, link.section)}
                className="group relative flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:text-cyan-400 transition-colors duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12">
                  {link.icon}
                </div>
                <span 
                  className="absolute left-1/2 -translate-x-1/2 top-14 w-auto min-w-max px-2 py-1 text-xs font-bold text-white bg-gray-800 rounded-md shadow-md 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none uppercase tracking-wider"
                >
                  {link.name}
                </span>
              </button>
            ))}
            <ThemeToggle />
          </div>
          <div className="md:hidden flex items-center">
             <ThemeToggle />
             <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none ml-1"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden md:hidden ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {NAV_LINKS.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.page, link.section)}
              className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-cyan-100 dark:active:bg-cyan-900/50 block px-3 py-3 rounded-md text-base font-medium w-full text-left flex items-center gap-4 transition-colors duration-200"
            >
              {link.icon}
              <span>{link.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
