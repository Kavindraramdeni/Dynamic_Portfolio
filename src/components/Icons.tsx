import React from 'react';

const iconClass = "w-6 h-6";
const skillIconClass = "w-full h-full";

export const EmailIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export const PhoneIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export const LocationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const LinkedInIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const HackerRankIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="currentColor" viewBox="0 0 256 256">
        <path d="M152 24H104C64.3 24 32 56.3 32 96v64c0 39.7 32.3 72 72 72h48c39.7 0 72-32.3 72-72V96c0-39.7-32.3-72-72-72zM100 200H68V88h32v112zm88 0h-56V88h32v84h24v28zm-60-96h-24V88h24v16z" />
    </svg>
);

export const GeekForGeeksIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.68,6.59,6.11,12,5.57,5.41L10.2,19,3,12,10.2,5ZM20.78,5,18,2.22,12.43,7.79,10.94,6.3,18,-.8,21,2,13.84,9.15Zm-1.46,9.59L13.75,23,11,20.22l5.57-5.57,1.48,1.48L12.48,21.7,18,17.18Z" />
  </svg>
);

export const GitHubIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);


// Skill Icons
export const ReactIcon: React.FC = () => <svg className={skillIconClass} viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>;
export const NodeIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.35 2.02c.2-.34.6-.34.8-.02l8.86 15.02c.2.34-.01.8-.41.8H3.39c-.41 0-.62-.46-.41-.8L11.35 2.02zM12 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2-8a2 2 0 1 1 4 0v4a2 2 0 1 1-4 0v-4z" /></svg>;
export const PythonIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3-5a2 2 0 0 1 2 2v2a2 2 0 1 1-4 0V5a2 2 0 0 1 2-2zm0 14a2 2 0 0 1-2-2v-2a2 2 0 1 1 4 0v2a2 2 0 0 1-2 2z" /></svg>;
export const JavaIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v8h-2zm-3-3h8v2h-8z" /></svg>;
export const JSIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z" /></svg>;
export const HTMLIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 3h16l-1.5 18L12 23.25 5.5 21z" /></svg>;
export const CSSIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 3h16l-1.5 18L12 23.25 5.5 21zM12 19l4-1.5V15h-4zm0-6h4V7h-4z" /></svg>;
export const FigmaIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 3a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-3-3a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" /></svg>;
export const GitIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.8 9.2c-.3-.2-.7-.3-1.1-.3h-3.3c-.4 0-.8.1-1.1.4-.4.2-.7.6-.9 1-.2.4-.2.8-.2 1.3v3.1c0 .5.1.9.3 1.3s.5.7.8 1c.4.2.8.4 1.2.4h3.3c.4 0 .8-.1 1.1-.3s.5-.5.7-.8c.2-.3.3-.7.3-1.1v-3.2c0-.4-.1-.8-.3-1.2s-.4-.7-.7-.9zM2.2 12c0-.5.2-1 .6-1.4.4-.4.8-.6 1.4-.6s1 .2 1.4.6.6.8.6 1.4-.2 1-.6 1.4-.8.6-1.4.6-1-.2-1.4-.6-.6-.8-.6-1.4zm6.6 0c0-.5.2-1 .6-1.4.4-.4.8-.6 1.4-.6s1 .2 1.4.6.6.8.6 1.4-.2 1-.6 1.4-.8.6-1.4.6-1-.2-1.4-.6-.6-.8-.6-1.4z" /></svg>;
export const DockerIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.5 12.3c-.3-.2-.7-.2-1 0L20 13.1v-1.6c0-1.2-.9-2.1-2-2.1h-4.5c-1.1 0-2 .9-2 2.1v1.6l-1.4-.8c-.3-.2-.7-.2-1 0-.3.2-.5.5-.5.9v4.4c0 .4.2.7.5.9.3.2.7.2 1 0l1.4-.8v1.6c0 1.2.9 2.1 2 2.1h4.5c1.1 0 2-.9 2-2.1v-1.6l1.5.8c.3.2.7.2 1 0 .3-.2.5-.5.5-.9v-4.4c0-.4-.2-.7-.5-.9z" /></svg>;
export const CodeIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>;
export const ShadcnIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm-44 104h88v11.43c0 22.13-39.4 39.81-88 39.81V128Z"/></svg>;
export const NextjsIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none"><circle cx="64" cy="64" r="64" fill="black"/><path d="M85.47,33.42h18.33v61.58H85.47v-24.3l-18.7,24.3H48.43V33.42H66.76v24.49L85.47,33.42Z" fill="white"/></svg>;
export const RestAPIIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-9L21 3m0 0L16.5 7.5M21 3H3" /></svg>;
export const N8nIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.2 6.1L6.1 12.2l-2-2L10.2 4zM4 10.2L10.1 4l2 2-6.1 6.2zM21.9 12.1L12 22l-2-2 9.9-9.9zM12 2l10 10-2 2-10-10z"/></svg>;
export const ZapierIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 2h14v4H5zm0 6h14v4H5zm0 6h14v4H5zm15 2h4v4h-4zm0-6h4v4h-4zm0-6h4v4h-4zM0 2h4v4H0zm0 6h4v4H0zm0 6h4v4H0z"/></svg>;
export const MachineLearningIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-.75.75h-3.75m-3.75 0H4.5a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h3.75M8.25 3.75a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-.75.75H4.5a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h3.75m9.75 0a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h7.5M10.5 6a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V6.75a.75.75 0 0 0-.75-.75h-.01M13.5 9a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.01M4.5 9a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75H4.5m3 0a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.01" /></svg>;
export const TensorFlowIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.5 4L12 10l-2 4h4l2-4 3 2.25V18h-4v-4H7v4H3V6.25L5.5 4M12 2L2 8v12h20V8L12 2z"/></svg>;
export const UiPathIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 4C6.48 4 2 8.48 2 14v6h20v-6c0-5.52-4.48-10-10-10z"/></svg>;
export const ComputerVisionIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639l4.25-8.5a1.012 1.012 0 0 1 1.634 0l4.25 8.5a1.012 1.012 0 0 1 0 .639l-4.25 8.5a1.012 1.012 0 0 1-1.634 0l-4.25-8.5ZM12.036 12.322a1.012 1.012 0 0 1 0-.639l4.25-8.5a1.012 1.012 0 0 1 1.634 0l4.25 8.5a1.012 1.012 0 0 1 0 .639l-4.25 8.5a1.012 1.012 0 0 1-1.634 0l-4.25-8.5Z" /><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>;
export const VercelIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg>;
export const PostmanIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-4 7a3 3 0 1 1 6 0v2.26a3 3 0 1 1-6 0V9zm4 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /></svg>;
export const SeleniumIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm3 3v12h12V6H6zm2 2h8v2H8zm0 4h5v2H8z" /></svg>;
export const WebScrapingIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.03 1.121 0 1.131.094 1.976 1.057 1.976 2.192V7.5M12 14.25v-6.362c0-.528.42-1.036.94-1.126.314-.058.633-.058.946 0 .52.09.94.6.94 1.126v6.362M12 14.25a9 9 0 1 1-12 0 9 9 0 0 1 12 0Z" /></svg>;
export const HuggingFaceIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM8.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm4 5c-1.6 0-3 1.4-3 3s1.4 3 3 3 3-1.4 3-3-1.4-3-3-3zm1.5-5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"/></svg>;
export const FirebaseIcon: React.FC = () => <svg className={skillIconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.86 3.62L5.27 18.71 12.06 12.06 18.71 5.27 12.86 3.62zM4.38 8.54l8.48 2.44-2.44-8.48L4.38 8.54z" /></svg>;


// Service Icons
export const WebDevIcon: React.FC = () => <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>;
export const DesignIcon: React.FC = () => <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622-3.385m3.388 1.62a15.998 15.998 0 01-1.622 3.385m0 0a15.998 15.998 0 01-3.388 1.62m5.043-.025a15.998 15.998 0 00-1.622 3.385m-5.043.025a15.998 15.998 0 01-1.622-3.385" /></svg>;
export const BackendIcon: React.FC = () => <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008z" /></svg>;
export const AutomationIcon: React.FC = () => <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.979 14.979 0 00-2.522-1.256l-3.333-1.256a14.978 14.978 0 00-1.256-2.522m1.256 9.333A14.978 14.978 0 0112 14.37v4.82m-3.333-4.82a14.979 14.979 0 01-2.522-1.256l-3.333-1.256a14.979 14.979 0 01-1.256-2.522m1.256 9.333A14.979 14.979 0 017.441 12h4.118m-4.118 0a14.979 14.979 0 011.256-2.522l3.333-1.256a14.979 14.979 0 012.522-1.256m-9.333 4.118A14.979 14.979 0 017.441 12h4.118m4.118 0a14.979 14.979 0 00-1.256-2.522l-3.333-1.256a14.979 14.979 0 00-2.522-1.256m-1.256 9.333A14.979 14.979 0 007.441 12h4.118" /></svg>;
export const EcommerceIcon: React.FC = () => <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l3.468-6.936a1.125 1.125 0 00-.97-1.565H5.168L4.623 3.19A2.25 2.25 0 002.468 2.25H2.25" /></svg>;

// New Icons for Project Card
export const BarChartIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

export const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-5 h-5"} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

export const ExternalLinkSquareIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5 0V6.375c0-.621.504-1.125 1.125-1.125h4.125c.621 0 1.125.504 1.125 1.125V10.5m-4.5 0L19.5 4.5" />
    </svg>
);

export const CodeBracketIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
);

export const UniversityIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .5L2 7v2h20V7L12 .5zM5 10v8h2v-8H5zm4 0v8h2v-8H9zm4 0v8h2v-8h-2zm4 0v8h2v-8h-2zM2 21h20v2H2z" />
    </svg>
);

export const SchoolIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
);