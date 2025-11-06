import React, { useState, useEffect, useCallback } from 'react';
import type { Project } from '../types';

const ExternalLinkIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const GitHubIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project, onBack }) => {
    const techs = project.tech.split(',').map(t => t.trim());
    const galleryImages = project.gallery?.length ? project.gallery : [];
    const descriptionParagraphs = project.detailedDescription?.split('\n').filter(p => p.trim() !== '') || [project.description];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const handlePrev = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1));
    }, [galleryImages.length]);

    const handleNext = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1));
    }, [galleryImages.length]);
    
    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX === 0) return;
        const touchEndX = e.changedTouches[0].clientX;
        const swipeDistance = touchEndX - touchStartX;
        const swipeThreshold = 50;
        if (swipeDistance > swipeThreshold) handlePrev();
        else if (swipeDistance < -swipeThreshold) handleNext();
        setTouchStartX(0);
    };

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, handlePrev, handleNext]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-fade-in py-8">
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
                
                <article>
                    <header className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">{project.title}</h1>
                        <div className="flex flex-wrap gap-2">
                            {techs.map(t => (
                                <span key={t} className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold px-3 py-1 rounded-full">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </header>

                    <div className="mb-12">
                        <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="w-full h-auto object-cover rounded-lg shadow-2xl"
                            loading="lazy"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About This Project</h2>
                            <div className="text-gray-600 dark:text-gray-400 space-y-4 text-base leading-relaxed prose prose-lg dark:prose-invert">
                                {descriptionParagraphs.map((para, index) => (
                                    <p key={index}>{para}</p>
                                ))}
                            </div>
                        </div>
                        
                        <aside className="lg:col-span-1">
                             {(project.liveUrl || project.repoUrl) && (
                                <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-lg p-6 sticky top-24">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Project Links</h3>
                                    <div className="flex flex-col space-y-3">
                                        {project.liveUrl && project.liveUrl !== '#' && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-cyan-500 text-white font-bold py-3 px-6 rounded-full uppercase tracking-wider hover:bg-cyan-600 transition-all duration-300 w-full text-sm">
                                                View Live Project
                                                <ExternalLinkIcon />
                                            </a>
                                        )}
                                        {project.repoUrl && (
                                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-gray-800 text-white font-bold py-3 px-6 rounded-full uppercase tracking-wider hover:bg-gray-700 transition-all duration-300 w-full text-sm">
                                                View Code
                                                <span className="w-5 h-5 ml-2"><GitHubIcon /></span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                             )}
                        </aside>
                    </div>

                    {galleryImages.length > 0 && (
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Project Gallery</h2>
                            {/* Main Slider */}
                            <div 
                                className="relative w-full max-w-4xl mx-auto group"
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                            >
                                <div className="overflow-hidden rounded-lg shadow-2xl">
                                    <div 
                                        className="flex transition-transform duration-500 ease-in-out"
                                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                    >
                                        {galleryImages.map((img, index) => (
                                            <div key={index} className="flex-shrink-0 w-full">
                                                <button onClick={() => openLightbox(index)} className="w-full block" aria-label={`View image ${index + 1} in full screen`}>
                                                    <img 
                                                        src={img} 
                                                        alt={`${project.title} gallery image ${index + 1}`} 
                                                        className="w-full h-auto object-contain transition-transform duration-500 ease-in-out group-hover:scale-105 cursor-pointer" 
                                                    />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <button onClick={handlePrev} className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 transition-opacity duration-300 z-10 opacity-70 hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-2xl font-bold pb-1" aria-label="Previous image">&#8249;</button>
                                <button onClick={handleNext} className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 transition-opacity duration-300 z-10 opacity-70 hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-2xl font-bold pb-1" aria-label="Next image">&#8250;</button>
                            </div>

                            {/* Thumbnail Navigation */}
                            <div className="w-full max-w-4xl mx-auto mt-4">
                                 <div className="flex justify-center gap-3 overflow-x-auto p-2 scrollbar-hide">
                                     {galleryImages.map((img, index) => (
                                         <button 
                                             key={index} 
                                             onClick={() => goToSlide(index)}
                                             className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 transition-all duration-200 ${currentIndex === index ? 'border-cyan-500 scale-105 shadow-lg' : 'border-transparent hover:border-gray-400 dark:hover:border-gray-600'}`}
                                             aria-label={`Go to image ${index + 1}`}
                                         >
                                             <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                         </button>
                                     ))}
                                 </div>
                                 <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
                            </div>
                        </section>
                    )}
                </article>

                {lightboxOpen && galleryImages.length > 0 && (
                    <div 
                        className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 animate-fade-in"
                        onClick={closeLightbox}
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="relative w-full h-full max-w-5xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
                            <img 
                                src={galleryImages[currentIndex]} 
                                alt={`${project.title} gallery image ${currentIndex + 1}`} 
                                className="w-full h-full object-contain" 
                            />
                            <button onClick={handlePrev} className="absolute top-1/2 left-2 md:-left-12 -translate-y-1/2 bg-black/50 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-black/80 transition-opacity duration-300 z-10 text-3xl font-bold pb-1" aria-label="Previous image">&#8249;</button>
                            <button onClick={handleNext} className="absolute top-1/2 right-2 md:-right-12 -translate-y-1/2 bg-black/50 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-black/80 transition-opacity duration-300 z-10 text-3xl font-bold pb-1" aria-label="Next image">&#8250;</button>
                            <button onClick={closeLightbox} className="absolute top-2 right-2 md:top-4 md:right-4 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 transition-opacity duration-300 z-10 text-2xl font-bold" aria-label="Close lightbox">&times;</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};