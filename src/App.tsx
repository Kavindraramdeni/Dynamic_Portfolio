import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Section } from './components/Section';
import { ProjectCard } from './components/ProjectCard';
import { SkillCard } from './components/SkillCard';
import { Services } from './components/Services';
//import { Clients } from './components/Clients';
import { Contact } from './components/Contact';
import { ProjectDetailPage } from './components/ProjectDetailPage';
//import { WorkProcess } from './components/WorkProcess';
import { SKILLS, EXPERIENCE, getBlogProjects, TESTIMONIALS as FALLBACK_TESTIMONIALS, SKILL_ICON_MAP } from './constants';
import { Project, ProjectCategory, Testimonial, LearningSkill, SkillCategory } from './types';
import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import { Testimonials } from './components/Testimonials';
import { CollapsibleProjectSection } from './components/CollapsibleProjectSection';
import { Preloader } from './components/Preloader';
import { AuthProvider } from './contexts/AuthContext';
import { CodeIcon } from './components/Icons';

const EducationPage = lazy(() => import('./components/EducationPage'));
const BlogPage = lazy(() => import('./components/BlogPage'));
const AdminPage = lazy(() => import('./components/AdminPage'));

// FIX: Property 'env' does not exist on type 'ImportMeta'.
const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api';

const About = () => {
    const Highlight: React.FC<{ children: React.ReactNode; color?: string; }> = ({ children, color = 'cyan' }) => (
        <span className={`font-semibold text-${color}-500 dark:text-${color}-400 text-glow-${color} inline-block transition-transform duration-300 ease-in-out hover:scale-105`}>{children}</span>
    );

    return (
      <Section title="About Me" id="about" className="about-section">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2 about-image">
            <img
              src="/profile.png"
              alt="Kavindra Raj Ramdeni"
              className="rounded-lg shadow-2xl w-full"
              loading="lazy"
            />
          </div>
          <div className="md:col-span-3 about-text">
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              I am a passionate and results-driven <Highlight>Full Stack Developer</Highlight> and <Highlight color="pink">UI/UX Designer</Highlight>  With a strong foundation in both <Highlight color="green">front-end</Highlight> and <Highlight color="blue">back-end</Highlight> technologies, I specialize in creating seamless, user-centric <Highlight color="yellow">web applications</Highlight> and <Highlight color="indigo">AI-powered solutions</Highlight>.
            </p>
            <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              From developing <Highlight color="red">intelligent trading bots</Highlight> to designing <Highlight color="orange">responsive enterprise websites</Highlight>, I thrive on solving complex problems and turning innovative ideas into reality. My goal is to leverage my skills in <Highlight>modern frameworks</Highlight>, <Highlight color="sky">cloud platforms</Highlight>, and <Highlight color="gray">automation</Highlight> to build impactful digital experiences.
            </p>
          </div>
        </div>
      </Section>
    );
};

const Experience = () => (
  <Section title="Experience" id="experience">
    <Timeline items={EXPERIENCE} />
  </Section>
);

const Portfolio: React.FC<{ 
    onProjectSelect: (project: Project) => void; 
    projects: ProjectCategory[]; 
}> = ({ onProjectSelect, projects }) => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const projectCategories = useMemo(() => ['All', ...[...new Set(projects.map(p => p.category))]], [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <Section title="Portfolio" id="portfolio">
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {projectCategories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
              activeCategory === category
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="space-y-12" key={activeCategory}>
        {filteredProjects.map((projectCategory) => {
          if (projectCategory.items.length === 0) return null;

          if (projectCategory.category === 'Academic Projects') {
            return (
              <CollapsibleProjectSection 
                key={projectCategory.category}
                projectCategory={projectCategory}
                onProjectSelect={onProjectSelect}
              />
            );
          }
          
          return (
            <div key={projectCategory.category}>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 border-l-4 border-cyan-400 pl-4">
                {projectCategory.category}
              </h3>
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
          );
        })}
      </div>
    </Section>
  );
};


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<ProjectCategory[]>([]);
  const [blogProjects, setBlogProjects] = useState<(Project & { category: string })[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [learningSkills, setLearningSkills] = useState<LearningSkill[]>([]);
  const [allSkills, setAllSkills] = useState<SkillCategory[]>(SKILLS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFatalError, setIsFatalError] = useState(false);
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);

  useEffect(() => {
    const fetchProjectsFromJson = async () => {
      try {
        const response = await fetch('/projects.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ProjectCategory[] = await response.json();
        setProjects(data);
        setBlogProjects(getBlogProjects(data));
        setError("Displaying static project data. To manage projects dynamically, please ensure the local backend server is running.");
        setIsFatalError(false);
      } catch (jsonError) {
        console.error("Failed to fetch projects from JSON fallback:", jsonError);
        setError("Critical Error: Could not load project data. The file 'projects.json' may be missing or corrupt.");
        setIsFatalError(true);
      }
    };

    const fetchProjects = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`${API_BASE_URL}/projects`, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ProjectCategory[] = await response.json();
        setProjects(data);
        setBlogProjects(getBlogProjects(data));
        setError(null);
        setIsFatalError(false);
      } catch (error) {
        console.warn("Failed to fetch projects from API, falling back to static JSON:", error);
        await fetchProjectsFromJson();
      }
    };

    const fetchTestimonials = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/testimonials`);
            if (!response.ok) {
                console.warn(`Failed to fetch testimonials: ${response.status}, using fallback.`);
                setTestimonials(FALLBACK_TESTIMONIALS);
                return;
            }
            const data: Testimonial[] = await response.json();
            if (data && data.length > 0) {
                setTestimonials(data);
            } else {
                setTestimonials(FALLBACK_TESTIMONIALS);
            }
        } catch (error) {
            console.warn("Could not fetch testimonials, using fallback.", error);
            setTestimonials(FALLBACK_TESTIMONIALS);
        }
    };

    const fetchLearningSkills = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/learning-skills`);
            if (response.ok) {
                const data: LearningSkill[] = await response.json();
                setLearningSkills(data);
            }
        } catch (error) {
            console.warn("Could not fetch learning skills.", error);
        }
    };

    const loadData = async () => {
        await Promise.all([
            fetchProjects(),
            fetchTestimonials(),
            fetchLearningSkills(),
        ]);
        setTimeout(() => setIsLoading(false), 1500);
    }
    
    loadData();

  }, []);

  useEffect(() => {
    if (learningSkills.length > 0) {
        const learningSkillsCategory: SkillCategory = {
            title: 'Learning Skills',
            skills: learningSkills.map(skill => ({
                name: skill.name,
                icon: SKILL_ICON_MAP[skill.icon] || React.createElement(CodeIcon),
                color: skill.color,
            }))
        };
        setAllSkills([...SKILLS, learningSkillsCategory]);
    } else {
        setAllSkills(SKILLS);
    }
  }, [learningSkills]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsBackToTopVisible(true);
      } else {
        setIsBackToTopVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleNavigate = (page: string, section?: string) => {
    setCurrentPage(page);
    setSelectedProject(null);
    // Use timeout to allow state to update before scrolling
    setTimeout(() => {
        if (page === 'home' && section) {
            const element = document.querySelector(section);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, 0);
  };
  
  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleClearProject = () => {
    setSelectedProject(null);
    // Use timeout to allow state to update before scrolling back to portfolio
    setTimeout(() => {
        const portfolioSection = document.querySelector('#portfolio');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 0);
  };

  const handleBackToHome = () => {
    handleNavigate('home');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  const Skills = () => (
    <Section title="Skills" id="skills" className="bg-gray-50 dark:bg-black/20">
      <div className="max-w-5xl mx-auto">
        {allSkills.map((category) => (
          <div key={category.title} className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{category.title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {category.skills.map((skill, skillIndex) => (
                <SkillCard 
                    key={skill.name} 
                    name={skill.name} 
                    icon={skill.icon} 
                    color={skill.color}
                    animationDelay={`${skillIndex * 50}ms`}
                 />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );

  const renderContent = () => {
    if (isFatalError) {
      return (
        <div className="h-screen flex items-center justify-center text-center px-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-8 rounded-lg max-w-lg">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error Loading Data</h2>
            <p className="text-lg text-red-800 dark:text-red-300">{error}</p>
          </div>
        </div>
      );
    }
    
    if (selectedProject) {
      return <ProjectDetailPage project={selectedProject} onBack={handleClearProject} />;
    }
    
    switch (currentPage) {
      case 'education':
        return <EducationPage onBack={handleBackToHome} />;
      case 'blog':
        return <BlogPage onBack={handleBackToHome} onProjectSelect={handleProjectSelect} projects={blogProjects} />;
      case 'admin':
        return <AdminPage onBack={handleBackToHome} />;
      case 'home':
      default:
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <About />
              <Experience />
              <Services />
            </div >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Skills />
              <Portfolio 
                onProjectSelect={handleProjectSelect} 
                projects={projects}
              />
            
            <Testimonials testimonials={testimonials} />
            
            <Contact />
            </div>
          </>
        );
    }
  };

  return (
    <AuthProvider>
      {isLoading && <Preloader />}
      <Navbar onNavigate={handleNavigate} />
      {error && !isFatalError && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 bg-yellow-100 dark:bg-yellow-900/80 border border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 px-4 py-3 rounded-md shadow-lg text-sm w-11/12 max-w-3xl text-center backdrop-blur-sm" role="alert">
          <strong>Warning:</strong> {error}
        </div>
      )}
      <main className={`pt-20 transition-all duration-300 ${error && !isFatalError ? 'mt-28' : ''}`}>
        <Suspense fallback={<Preloader />}>
          {!isLoading && renderContent()}
        </Suspense>
      </main>
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-cyan-500 text-white p-3 rounded-full shadow-lg hover:bg-cyan-600 transition-all duration-300 z-50 ${isBackToTopVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Scroll back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </AuthProvider>
  );
}

export default App;
