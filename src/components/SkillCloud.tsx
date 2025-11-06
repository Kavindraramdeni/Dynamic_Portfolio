import React, { useEffect, useRef } from 'react';
import { useUI } from '../contexts/ThemeContext';

interface SkillCloudProps {
  icons: {
    name: string;
    icon: React.ReactNode;
    color: string;
  }[];
}

interface Tag {
  x: number;
  y: number;
  z: number;
  elem: HTMLDivElement;
}

export const SkillCloud: React.FC<SkillCloudProps> = ({ icons }) => {
  const { theme } = useUI();
  const containerRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<Tag[]>([]);
  const radius = 200;
  const speed = 0.5;

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const tagElements = Array.from(container.children) as HTMLDivElement[];
    
    tagsRef.current = [];
    tagElements.forEach((elem, i) => {
        const phi = Math.acos(-1 + (2 * i + 1) / tagElements.length);
        const theta = Math.sqrt(tagElements.length * Math.PI) * phi;
        
        tagsRef.current.push({
            x: radius * Math.cos(theta) * Math.sin(phi),
            y: radius * Math.sin(theta) * Math.sin(phi),
            z: radius * Math.cos(phi),
            elem: elem
        });
    });

    let angleX = speed * 0.0001;
    let angleY = speed * 0.0001;
    let animationFrameId: number;

    const animate = () => {
        const sinX = Math.sin(angleX);
        const cosX = Math.cos(angleX);
        const sinY = Math.sin(angleY);
        const cosY = Math.cos(angleY);

        tagsRef.current.forEach(tag => {
            const rx1 = tag.x;
            const ry1 = tag.y * cosX - tag.z * sinX;
            const rz1 = tag.y * sinX + tag.z * cosX;

            const rx2 = rx1 * cosY + rz1 * sinY;
            const ry2 = ry1;
            const rz2 = -rx1 * sinY + rz1 * cosY;

            const scale = (rz2 + radius) / (2 * radius);
            
            tag.elem.style.transform = `translate3d(${rx2}px, ${ry2}px, ${rz2}px) scale(${scale * 0.8 + 0.5})`;
            tag.elem.style.zIndex = `${Math.floor(rz2 + radius)}`;
            tag.elem.style.opacity = `${scale * 0.7 + 0.3}`;
        });

        angleX += speed * 0.005;
        angleY += speed * 0.005;

        animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [icons, speed, theme]);


  return (
    <div ref={containerRef} className="absolute w-full h-full" style={{ perspective: '1000px' }}>
      {icons.map((skill, i) => (
        <div
          key={i}
          className={`absolute top-1/2 left-1/2 -mt-6 -ml-6 w-12 h-12 flex items-center justify-center p-2 rounded-full shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700`}
        >
          <div className={`w-8 h-8 ${skill.color}`}>
            {skill.icon}
          </div>
        </div>
      ))}
    </div>
  );
};