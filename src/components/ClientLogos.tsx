import React from 'react';

const logoClass = "h-full w-auto";

export const VSLogo: React.FC = () => (
    <svg viewBox="0 0 100 40" className={logoClass} >
        <style>{`
            .vs-v { fill: #facc15; } 
            .vs-s { fill: #111827; } 
            .dark .vs-s { fill: #f9fafb; }
        `}</style>
        <path className="vs-v" d="M0 0 L20 40 L40 0 L30 0 L20 20 L10 0 Z" />
        <path className="vs-s" d="M80 0 C60 0, 60 20, 70 20 S 90 20, 90 10 C 90 0, 80 0, 80 0 Z M 70 20 C 60 20, 60 40, 80 40 C 100 40, 100 20, 90 20 S 70 20, 70 20 Z" />
    </svg>
);

export const KriaTechLogo: React.FC = () => (
    <svg viewBox="0 0 100 100" className={logoClass} fill="currentColor">
        <path d="M50 5 L95 95 L5 95 Z" stroke="currentColor" strokeWidth="5" fill="none" />
        <path d="M35 75 C 50 60, 50 40, 65 25 M65 75 C 50 60, 50 40, 35 25" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
    </svg>
);

export const RobotArmLogo: React.FC = () => (
    <svg viewBox="0 0 64 64" className={logoClass} fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M40 32 L24 32" />
        <path d="M24 32 C12 32, 12 16, 24 16" />
        <path d="M24 16 L12 16" />
        <path d="M12 16 L8 12 M12 16 L8 20" />
        <circle cx="40" cy="32" r="8" />
        <path d="M48 32 L56 32" />
    </svg>
);

export const AJPhotographyLogo: React.FC = () => (
    <svg viewBox="0 0 130 40" className={logoClass} fill="currentColor">
        <text x="0" y="30" fontFamily="Inter, sans-serif" fontSize="30" fontWeight="bold">AJ</text>
        <g transform="translate(60, 0)">
            <rect x="0" y="5" width="50" height="30" rx="5" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="25" cy="20" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="25" cy="20" r="3" fill="currentColor" />
            <rect x="15" y="0" width="10" height="5" rx="2" />
        </g>
    </svg>
);