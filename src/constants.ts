import React from 'react';
import type { ContactInfo, SkillCategory, TimelineItem, ProjectCategory, Project, Certification, Testimonial } from './types';
import { 
    ReactIcon, NodeIcon, PythonIcon, JavaIcon, JSIcon, HTMLIcon, CSSIcon, FigmaIcon, GitIcon, DockerIcon, CodeIcon,
    WebDevIcon, DesignIcon, BackendIcon, AutomationIcon, EcommerceIcon, ShadcnIcon, NextjsIcon, RestAPIIcon,
    N8nIcon, ZapierIcon, MachineLearningIcon, TensorFlowIcon, UiPathIcon, ComputerVisionIcon, PostmanIcon,
    SeleniumIcon, WebScrapingIcon, HuggingFaceIcon, FirebaseIcon, UniversityIcon, SchoolIcon
} from './components/Icons';
import { AJPhotographyLogo, KriaTechLogo, RobotArmLogo, VSLogo } from './components/ClientLogos';

export const CONTACT_INFO: ContactInfo & { location: string } = {
  email: 'kavindraraj1703@gmail.com',
  phone: '7893194974',
  location: 'Hyderabad, India',
  linkedIn: 'https://www.linkedin.com/in/kavindra-raj-ramdeni/',
  hackerrank: 'https://www.hackerrank.com/profile/kavindraraj1703',
  geekforgeeks: 'https://auth.geeksforgeeks.org/user/kavindraraj1703',
  github: 'https://github.com/Kavindra-Raj',
};

export const SKILLS: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML', icon: React.createElement(HTMLIcon), color: 'orange' },
      { name: 'CSS', icon: React.createElement(CSSIcon), color: 'blue' },
      { name: 'JavaScript', icon: React.createElement(JSIcon), color: 'yellow' },
      { name: 'React', icon: React.createElement(ReactIcon), color: 'sky' },
      { name: 'Tailwind CSS', icon: React.createElement(CodeIcon), color: 'cyan' },
      { name: 'shadcn/ui', icon: React.createElement(ShadcnIcon), color: 'gray' },
    ],
  },
  {
    title: 'Backend & Database',
    skills: [
        { name: 'Node.js', icon: React.createElement(NodeIcon), color: 'green' },
        { name: 'Express', icon: React.createElement(CodeIcon), color: 'gray' },
        { name: 'Next.js', icon: React.createElement(NextjsIcon), color: 'gray' },
        { name: 'REST APIs', icon: React.createElement(RestAPIIcon), color: 'green' },
        { name: 'MongoDB', icon: React.createElement(CodeIcon), color: 'green' },
    ],
  },
  {
    title: 'Languages',
    skills: [
      { name: 'Python', icon: React.createElement(PythonIcon), color: 'yellow' },
      { name: 'C++', icon: React.createElement(CodeIcon), color: 'blue' },
      { name: 'Java', icon: React.createElement(JavaIcon), color: 'red' },
    ],
  },
  {
    title: 'Automation & AI',
    skills: [
      { name: 'n8n Automation', icon: React.createElement(N8nIcon), color: 'indigo' },
      { name: 'Zapier', icon: React.createElement(ZapierIcon), color: 'orange' },
      { name: 'Machine Learning', icon: React.createElement(MachineLearningIcon), color: 'blue' },
      { name: 'TensorFlow', icon: React.createElement(TensorFlowIcon), color: 'orange' },
      { name: 'RPA (UiPath)', icon: React.createElement(UiPathIcon), color: 'blue' },
      { name: 'Computer Vision', icon: React.createElement(ComputerVisionIcon), color: 'cyan' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', icon: React.createElement(CodeIcon), color: 'orange' },
      { name: 'Google Cloud', icon: React.createElement(CodeIcon), color: 'red' },
      { name: 'Docker', icon: React.createElement(DockerIcon), color: 'sky' },
      { name: 'Git', icon: React.createElement(GitIcon), color: 'orange' },
      { name: 'Firebase', icon: React.createElement(FirebaseIcon), color: 'yellow' },
    ],
  },
  {
    title: 'Tools & Extras',
    skills: [
      { name: 'VS Code', icon: React.createElement(CodeIcon), color: 'blue' },
      { name: 'Postman', icon: React.createElement(PostmanIcon), color: 'orange' },
      { name: 'Figma', icon: React.createElement(FigmaIcon), color: 'pink' },
      { name: 'Selenium', icon: React.createElement(SeleniumIcon), color: 'green' },
      { name: 'Web Scraping', icon: React.createElement(WebScrapingIcon), color: 'sky' },
      { name: 'HuggingFace', icon: React.createElement(HuggingFaceIcon), color: 'yellow' },
    ],
  },
];

export const SKILL_ICON_MAP: { [key: string]: React.ReactNode } = {
    'CodeIcon': React.createElement(CodeIcon),
    'DockerIcon': React.createElement(DockerIcon),
    'ReactIcon': React.createElement(ReactIcon),
    'NodeIcon': React.createElement(NodeIcon),
    'PythonIcon': React.createElement(PythonIcon),
    'JavaIcon': React.createElement(JavaIcon),
    'JSIcon': React.createElement(JSIcon),
    'HTMLIcon': React.createElement(HTMLIcon),
    'CSSIcon': React.createElement(CSSIcon),
    'FigmaIcon': React.createElement(FigmaIcon),
    'GitIcon': React.createElement(GitIcon),
    'ShadcnIcon': React.createElement(ShadcnIcon),
    'NextjsIcon': React.createElement(NextjsIcon),
    'RestAPIIcon': React.createElement(RestAPIIcon),
    'N8nIcon': React.createElement(N8nIcon),
    'ZapierIcon': React.createElement(ZapierIcon),
    'MachineLearningIcon': React.createElement(MachineLearningIcon),
    'TensorFlowIcon': React.createElement(TensorFlowIcon),
    'UiPathIcon': React.createElement(UiPathIcon),
    'ComputerVisionIcon': React.createElement(ComputerVisionIcon),
    'PostmanIcon': React.createElement(PostmanIcon),
    'SeleniumIcon': React.createElement(SeleniumIcon),
    'WebScrapingIcon': React.createElement(WebScrapingIcon),
    'HuggingFaceIcon': React.createElement(HuggingFaceIcon),
    'FirebaseIcon': React.createElement(FirebaseIcon),
};

export const SKILL_COLORS = ['gray', 'red', 'orange', 'yellow', 'green', 'blue', 'sky', 'indigo', 'pink', 'cyan'];

export const SKILL_CLOUD_ICONS = [
    { name: 'React', icon: React.createElement(ReactIcon), color: 'text-sky-500' },
    { name: 'Node.js', icon: React.createElement(NodeIcon), color: 'text-green-500' },
    { name: 'Python', icon: React.createElement(PythonIcon), color: 'text-yellow-500' },
    { name: 'Next.js', icon: React.createElement(NextjsIcon), color: 'dark:text-white text-black' },
    { name: 'HTML5', icon: React.createElement(HTMLIcon), color: 'text-orange-500' },
    { name: 'CSS3', icon: React.createElement(CSSIcon), color: 'text-blue-500' },
    { name: 'Figma', icon: React.createElement(FigmaIcon), color: 'text-pink-500' },
    { name: 'TensorFlow', icon: React.createElement(TensorFlowIcon), color: 'text-orange-500' },
    { name: 'Docker', icon: React.createElement(DockerIcon), color: 'text-sky-600' },
    { name: 'Firebase', icon: React.createElement(FirebaseIcon), color: 'text-yellow-500' },
    { name: 'Java', icon: React.createElement(JavaIcon), color: 'text-red-500' },
    { name: 'MongoDB', icon: React.createElement(CodeIcon), color: 'text-green-600' },
    { name: 'TailwindCSS', icon: React.createElement(CodeIcon), color: 'text-cyan-400' },
    { name: 'Express', icon: React.createElement(CodeIcon), color: 'text-gray-400' },
    { name: 'HuggingFace', icon: React.createElement(HuggingFaceIcon), color: 'text-yellow-400' },
];

export const EDUCATION: TimelineItem[] = [
  {
    title: 'Gokaraju Rangaraju Institute of Engineering and Technology',
    subtitle: 'B.Tech, Information Technology',
    period: '2021 – 2025',
    description: 'CGPA: 7.86',
    icon: React.createElement(UniversityIcon, { className: "w-3.5 h-3.5 text-white" }),
    details: [
        'Relevant Coursework: Data Structures, Algorithms, Database Management Systems, Operating Systems, Computer Networks, AI/ML.',
        'Active member of the university\'s coding and technical clubs, participating in hackathons and coding competitions.',
        'Key Project: Developed a "Sign Language Recognition System" using Python, OpenCV, and TensorFlow, achieving 95% accuracy.',
    ]
  },
  {
    title: 'Narayana IIT Academy, Hyderabad',
    subtitle: 'Intermediate, State Board',
    period: 'Apr 2021',
    description: 'Percentage: 96.8%',
    icon: React.createElement(SchoolIcon, { className: "w-3.5 h-3.5 text-white" }),
  },
  {
    title: 'Sri Chaitanya School, Siddipet',
    subtitle: 'Matriculation, Secondary School Certificate',
    period: 'Mar 2019',
    description: 'GPA: 9.8',
    icon: React.createElement(SchoolIcon, { className: "w-3.5 h-3.5 text-white" }),
  },
];

export const EXPERIENCE: TimelineItem[] = [
  {
    title: 'Freelance Full Stack Developer',
    subtitle: 'Self-Employed',
    period: 'Aug 2025 – Present',
    description: 'Leveraged full-stack skills to build complete web applications for various clients, as showcased in the FSD projects section.',
    details: [
        'Developed both client-side and server-side architecture for dynamic web solutions.',
        'Managed the end-to-end project lifecycle, from initial client consultation to final deployment.',
        'Integrated various third-party services and APIs to extend application functionality.',
    ]
  },
  {
    title: 'Frontend Developer & UI/UX Designer',
    subtitle: 'Website Designer',
    period: 'Feb 2025 – May 2025',
    description: 'Focused on creating intuitive, responsive, and visually appealing user interfaces for various client websites.',
    details: [
        'Translated wireframes and mockups into high-quality, functional code.',
        'Collaborated closely with clients to refine designs and ensure an optimal user experience.',
        'Enhanced website usability and aesthetic appeal through modern design principles.',
    ]
  },
  {
    title: 'Freelance Developer',
    subtitle: 'Collaborations on Personal Projects',
    period: 'Feb 2024 – Nov 2024',
    description: 'Worked as a freelancer on a variety of projects for friends and personal connections, as detailed in the freelancing projects section.',
    details: [
        'Provided web development and design services for small-scale applications.',
        'Gained practical experience by building projects from concept to deployment.',
        'Honed skills in client communication and project management within informal settings.',
    ]
  },
];

export const CERTIFICATIONS: Certification[] = [
    { title: "Java Training", issuer: "Spoken Tutorial, IIT Bombay", year: "2023", url: "https://drive.google.com/file/d/127zc76mb71F9so5rdHXpeBHobEb9KaOU/view?usp=drivesdk" },
    { title: "PCAP: Programming Essentials in Python", issuer: "CISCO", year: "2023", url: "https://drive.google.com/file/d/129S70XBbTBbMaFV02-Gkbuc4DHirwnTh/view?usp=drivesdk" },
    { title: "Intelligent Automation RPA", issuer: "SSC Blueprism", url: "https://drive.google.com/file/d/12B6vSWwdkf_XIpOse3up9VHGfJ1FCkto/view?usp=drivesdk" },
    { title: "Cyber Security Internship", issuer: "CISCO", year: "2023", url: "https://drive.google.com/file/d/1KIhziC6niMcbvONsTMSt615qi1hY5G_P/view?usp=drivesdk" },
    { title: "Data Engineer", issuer: "Amazon Web Services (AWS)", url: "https://www.credly.com/badges/a71c6042-bce8-497f-b05b-f5d5cd0f46a3/public_url" },
    { title: "Cloud Foundation", issuer: "Amazon Web Services (AWS)", url: "https://www.credly.com/badges/d3cfd209-0830-486e-a3a5-ce5ddffd3f49/public_url" },
    { title: "Google Android Developer", issuer: "Google For Developers & EduSkills", url: "https://drive.google.com/file/d/1loBVeI2Q_WqGZktv8EZjHz64-d1q4zXv/view?usp=drivesdk" },
    { title: "Google AI/ML", issuer: "Google For Developers & EduSkills", url: "https://drive.google.com/file/d/1XmOYdvf8gVUPmcZGBbVhVdIsQzDOeMqa/view?usp=drivesdk" },
    { title: "Data Science for Engineers", issuer: "NPTEL", url: "https://drive.google.com/file/d/1nIVX4emVJfbykRPtaGZNHI8pbe1DRPs1/view?usp=drivesdk" },
];

export const SERVICES = [
    {
        icon: React.createElement(WebDevIcon),
        title: 'Web Development',
        description: 'Building responsive, high-performance websites and full-stack applications using modern technologies like React and Node.js.'
    },
    {
        icon: React.createElement(DesignIcon),
        title: 'UI/UX Design',
        description: 'Creating intuitive, user-centric, and visually appealing interfaces with tools like Figma to deliver seamless user experiences.'
    },
    {
        icon: React.createElement(BackendIcon),
        title: 'Backend Development',
        description: 'Developing robust server-side logic, APIs, and database management systems to power applications efficiently.'
    },
    {
        icon: React.createElement(AutomationIcon),
        title: 'AI & Automation',
        description: 'Implementing AI-powered solutions and automation systems to solve complex problems and improve efficiency.'
    },
    {
        icon: React.createElement(EcommerceIcon),
        title: 'E-commerce Solutions',
        description: 'Building and customizing online stores with custom features, payment gateways, and a focus on user experience.'
    }
];

export const WORK_PROCESS = [
    {
        icon: React.createElement(NodeIcon),
        title: 'Discovery & Strategy',
        description: 'Understanding project goals, target audience, and requirements to create a solid plan and architecture.'
    },
    {
        icon: React.createElement(FigmaIcon),
        title: 'Design & Prototyping',
        description: 'Crafting wireframes, mockups, and interactive prototypes to visualize the user experience and interface.'
    },
    {
        icon: React.createElement(WebDevIcon),
        title: 'Development & Integration',
        description: 'Writing clean, efficient code and integrating front-end and back-end components for a seamless application.'
    },
    {
        icon: React.createElement(DockerIcon),
        title: 'Testing & Deployment',
        description: 'Rigorous testing to ensure quality, followed by deploying the application to a live environment for users.'
    }
];

export const getBlogProjects = (projects: ProjectCategory[]): (Project & { category: string })[] => {
    return projects.flatMap(category => 
        category.items
            .filter(item => item.featured)
            .map(item => ({
                ...item,
                category: category.category,
            }))
    );
};


export const CLIENTS = [
    { name: 'VS Signage Enterprise', logo: React.createElement(VSLogo) },
    { name: 'Kria Tech', logo: React.createElement(KriaTechLogo) },
    { name: 'Cloud Kitchen Automation', logo: React.createElement(RobotArmLogo) },
    { name: 'AJ Photography', logo: React.createElement(AJPhotographyLogo) },
];

export const TESTIMONIALS: Testimonial[] = [
    {
        quote: "Kavindra transformed our online presence with the new website for VS Signage. His design sense is impeccable, and the final product was not only visually stunning but also incredibly fast and responsive. Our client engagement has noticeably improved since the launch.",
        author: "Sai Krishna",
        company: "Director, VS Signage Enterprise",
    },
    {
        quote: "Working with Kavindra on the Kria Tech website was a fantastic experience. He grasped our technical requirements quickly and delivered a high-quality site using React and TypeScript. His professionalism and collaborative spirit made the entire process smooth and efficient.",
        author: "Vivek",
        company: "CTO, Kria Tech",
    },
    {
        quote: "Kavindra's work on our AI Photo Booth was nothing short of brilliant. He brought a complex idea to life with impressive technical skill, creating an interactive experience that was the highlight of our event. He is a true innovator and a pleasure to work with.",
        author: "Ajay Kumar",
        company: "Event Organizer, Creative Events Co.",
    }
];
