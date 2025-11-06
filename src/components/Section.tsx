import React, { useRef, useEffect, useState } from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  id: string;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ title, children, id, className }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const titleObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsTitleVisible(true);
        titleObserver.unobserve(entry.target);
      }
    }, observerOptions);

    const titleRefCurrent = titleRef.current;
    if (titleRefCurrent) {
      titleObserver.observe(titleRefCurrent);
    }
    
    const contentObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsContentVisible(true);
        contentObserver.unobserve(entry.target);
      }
    }, { ...observerOptions, threshold: 0.05 });

    const contentRefCurrent = contentRef.current;
    if (contentRefCurrent) {
      contentObserver.observe(contentRefCurrent);
    }

    return () => {
      if (titleRefCurrent) titleObserver.unobserve(titleRefCurrent);
      if (contentRefCurrent) contentObserver.unobserve(contentRefCurrent);
    };
  }, []);

  return (
    <section id={id} className={`py-16 md:py-24 overflow-x-hidden ${className || ''}`}>
      <div ref={titleRef} className={`section-content ${isTitleVisible ? 'is-visible' : ''}`}>
        <div className="flex items-center mb-12">
          <div className="w-12 h-1 bg-cyan-500 mr-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white uppercase tracking-widest">{title}</h2>
        </div>
      </div>
      <div ref={contentRef} className={`section-content ${isContentVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
        {children}
      </div>
    </section>
  );
};