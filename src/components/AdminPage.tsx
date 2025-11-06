import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Project, ProjectCategory, Testimonial, LearningSkill } from '../types';
import { AuthContext } from '../contexts/AuthContext';
import { LoginPage } from './LoginPage';
import { SKILL_ICON_MAP, SKILL_COLORS } from '../constants';

const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api';

const flattenProjects = (projectCategories: ProjectCategory[]): (Project & { category: string })[] => {
    return projectCategories.flatMap(pc => pc.items.map(item => ({ ...item, category: pc.category })));
};

const INITIAL_PROJECT_STATE: Omit<Project, '_id' | 'category' | 'gallery'> & { category: string; gallery: string; } = {
    title: '',
    description: '',
    detailedDescription: '',
    tech: '',
    imageUrl: '',
    liveUrl: '',
    repoUrl: '',
    gallery: '',
    featured: false,
    category: 'FSD Projects',
};

const INITIAL_TESTIMONIAL_STATE: Omit<Testimonial, '_id'> = {
    quote: '',
    author: '',
    company: '',
};

const INITIAL_LEARNING_SKILL_STATE: Omit<LearningSkill, '_id'> = {
    name: '',
    icon: 'CodeIcon',
    color: 'cyan',
};

type AdminSection = 'projects' | 'testimonials' | 'learningSkills';

const AdminPage: React.FC<{ onBack: () => void; }> = ({ onBack }) => {
    const auth = useContext(AuthContext);
    
    // States
    const [projects, setProjects] = useState<(Project & { category: string })[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [learningSkills, setLearningSkills] = useState<LearningSkill[]>([]);
    
    // Form data states
    const [projectFormData, setProjectFormData] = useState<Omit<Project, '_id' | 'gallery'> & { _id?: string; gallery: string }>(INITIAL_PROJECT_STATE);
    const [testimonialFormData, setTestimonialFormData] = useState<Testimonial>(INITIAL_TESTIMONIAL_STATE);
    const [learningSkillFormData, setLearningSkillFormData] = useState<LearningSkill>(INITIAL_LEARNING_SKILL_STATE);

    // Editing states
    const [isEditingProject, setIsEditingProject] = useState<boolean>(false);
    const [isEditingTestimonial, setIsEditingTestimonial] = useState<boolean>(false);
    
    // UI states
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<AdminSection>('projects');

    const API_PROJECTS_URL = `${API_BASE_URL}/projects`;
    const API_TESTIMONIALS_URL = `${API_BASE_URL}/testimonials`;
    const API_LEARNING_SKILLS_URL = `${API_BASE_URL}/learning-skills`;

    const getAuthHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.token}`
    });

    const fetchProjects = useCallback(async () => {
        const res = await fetch(API_PROJECTS_URL);
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data: ProjectCategory[] = await res.json();
        setProjects(flattenProjects(data));
    }, []);

    const fetchTestimonials = useCallback(async () => {
        const res = await fetch(API_TESTIMONIALS_URL);
        if (!res.ok) throw new Error('Failed to fetch testimonials');
        const data: Testimonial[] = await res.json();
        setTestimonials(data);
    }, []);

    const fetchLearningSkills = useCallback(async () => {
        const res = await fetch(API_LEARNING_SKILLS_URL);
        if (!res.ok) throw new Error('Failed to fetch learning skills');
        const data: LearningSkill[] = await res.json();
        setLearningSkills(data);
    }, []);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            await Promise.all([fetchProjects(), fetchTestimonials(), fetchLearningSkills()]);
        } catch (err: any) {
            setError(err.message + ". Is the backend server running?");
        } finally {
            setIsLoading(false);
        }
    }, [fetchProjects, fetchTestimonials, fetchLearningSkills]);

    useEffect(() => {
        if (auth?.isAuthenticated) {
            fetchData();
        } else {
            setIsLoading(false);
        }
    }, [auth?.isAuthenticated, fetchData]);

    // --- EDIT HANDLERS ---
    const handleEditProject = (project: Project & { category: string }) => {
        window.scrollTo(0, 0);
        setIsEditingProject(true);
        setProjectFormData({
            ...project,
            gallery: project.gallery?.join(', ') || '',
        });
    };

    const handleEditTestimonial = (testimonial: Testimonial) => {
        window.scrollTo(0, 0);
        setIsEditingTestimonial(true);
        setTestimonialFormData(testimonial);
    };

    // --- FORM & SUBMIT HANDLERS ---
    const handleProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = isEditingProject ? `${API_PROJECTS_URL}/${projectFormData._id}` : API_PROJECTS_URL;
        const method = isEditingProject ? 'PUT' : 'POST';
        const body = { ...projectFormData, gallery: projectFormData.gallery.split(',').map(s => s.trim()).filter(Boolean) };
        try {
            const res = await fetch(url, { method, headers: getAuthHeaders(), body: JSON.stringify(body) });
            if (!res.ok) throw new Error(`Failed to ${isEditingProject ? 'update' : 'create'} project`);
            setProjectFormData(INITIAL_PROJECT_STATE);
            setIsEditingProject(false);
            await fetchProjects();
        } catch (err: any) { alert(`Error: ${err.message}`); }
    };

    const handleTestimonialSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = isEditingTestimonial ? `${API_TESTIMONIALS_URL}/${testimonialFormData._id}` : API_TESTIMONIALS_URL;
        const method = isEditingTestimonial ? 'PUT' : 'POST';
        try {
            const res = await fetch(url, { method, headers: getAuthHeaders(), body: JSON.stringify(testimonialFormData) });
            if (!res.ok) throw new Error(`Failed to ${isEditingTestimonial ? 'update' : 'create'} testimonial`);
            setTestimonialFormData(INITIAL_TESTIMONIAL_STATE);
            setIsEditingTestimonial(false);
            await fetchTestimonials();
        } catch (err: any) { alert(`Error: ${err.message}`); }
    };
    
    const handleLearningSkillSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(API_LEARNING_SKILLS_URL, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(learningSkillFormData) });
            if (!res.ok) throw new Error('Failed to create learning skill');
            setLearningSkillFormData(INITIAL_LEARNING_SKILL_STATE);
            await fetchLearningSkills();
        } catch (err: any) { alert(`Error: ${err.message}`); }
    };

    // --- GENERIC DELETE HANDLER ---
    const handleDelete = async (id: string | undefined, type: AdminSection) => {
        if (!id || !window.confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) return;
        let url: string, fetcher: () => Promise<void>;
        switch(type) {
            case 'projects': url = `${API_PROJECTS_URL}/${id}`; fetcher = fetchProjects; break;
            case 'testimonials': url = `${API_TESTIMONIALS_URL}/${id}`; fetcher = fetchTestimonials; break;
            case 'learningSkills': url = `${API_LEARNING_SKILLS_URL}/${id}`; fetcher = fetchLearningSkills; break;
            default: return;
        }
        try {
            const res = await fetch(url, { method: 'DELETE', headers: getAuthHeaders() });
            if (!res.ok) throw new Error(`Failed to delete item`);
            await fetcher();
        } catch (err: any) { alert(`Error: ${err.message}`); }
    };
    
    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><p>Loading Admin Panel...</p></div>;
    if (!auth?.isAuthenticated) return <LoginPage />;

    const projectCategories = ["FSD Projects", "Ongoing Projects", "AI & Automation Projects", "Freelancing Experience", "Academic Projects"];

    return (
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="animate-fade-in py-8">
                <div className="flex justify-between items-center mb-8 md:mb-12">
                    <button onClick={onBack} className="flex items-center text-slate-500 dark:text-slate-400 hover:text-cyan-400 transition-colors duration-300 group text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Back to Portfolio
                    </button>
                    <button onClick={auth.logout} className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600">Logout</button>
                </div>
                
                <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
                {error && <p className="text-red-500 bg-red-100 dark:bg-red-900/50 p-4 rounded-md mb-6">{error}</p>}
                
                <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {(['projects', 'testimonials', 'learningSkills'] as AdminSection[]).map(section => (
                            <button key={section} onClick={() => setActiveSection(section)}
                                className={`${activeSection === section ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                            >{section.replace('Skills', ' Skills')}</button>
                        ))}
                    </nav>
                </div>

                {activeSection === 'projects' && (
                    <section id="admin-projects">
                        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-md mb-12">
                            <h2 className="text-2xl font-bold mb-6">{isEditingProject ? 'Edit Project' : 'Add New Project'}</h2>
                            <form onSubmit={handleProjectSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input name="title" value={projectFormData.title} onChange={(e) => setProjectFormData(p => ({...p, title: e.target.value}))} placeholder="Title" required className="form-input w-full p-2 border rounded dark:bg-gray-700"/>
                                    <select name="category" value={projectFormData.category} onChange={(e) => setProjectFormData(p => ({...p, category: e.target.value}))} className="form-input w-full p-2 border rounded dark:bg-gray-700">
                                        {projectCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                                <textarea name="description" value={projectFormData.description} onChange={(e) => setProjectFormData(p => ({...p, description: e.target.value}))} placeholder="Short Description" required className="form-input w-full p-2 border rounded dark:bg-gray-700"></textarea>
                                <textarea name="detailedDescription" value={projectFormData.detailedDescription} onChange={(e) => setProjectFormData(p => ({...p, detailedDescription: e.target.value}))} placeholder="Detailed Description (newlines supported)" rows={4} className="form-input w-full p-2 border rounded dark:bg-gray-700"></textarea>
                                <input name="tech" value={projectFormData.tech} onChange={(e) => setProjectFormData(p => ({...p, tech: e.target.value}))} placeholder="Tech Stack (comma-separated)" required className="form-input w-full p-2 border rounded dark:bg-gray-700"/>
                                <input name="imageUrl" value={projectFormData.imageUrl} onChange={(e) => setProjectFormData(p => ({...p, imageUrl: e.target.value}))} placeholder="Image URL" required className="form-input w-full p-2 border rounded dark:bg-gray-700"/>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input name="liveUrl" value={projectFormData.liveUrl} onChange={(e) => setProjectFormData(p => ({...p, liveUrl: e.target.value}))} placeholder="Live Demo URL" className="form-input w-full p-2 border rounded dark:bg-gray-700"/>
                                    <input name="repoUrl" value={projectFormData.repoUrl} onChange={(e) => setProjectFormData(p => ({...p, repoUrl: e.target.value}))} placeholder="Code Repo URL" className="form-input w-full p-2 border rounded dark:bg-gray-700"/>
                                </div>
                                <textarea name="gallery" value={projectFormData.gallery} onChange={(e) => setProjectFormData(p => ({...p, gallery: e.target.value}))} placeholder="Gallery Image URLs (comma-separated)" className="form-input w-full p-2 border rounded dark:bg-gray-700"></textarea>
                                <div className="flex items-center gap-4">
                                    <input type="checkbox" name="featured" checked={projectFormData.featured} onChange={(e) => setProjectFormData(p => ({...p, featured: e.target.checked}))} id="featured" className="h-4 w-4"/>
                                    <label htmlFor="featured">Featured Project</label>
                                </div>
                                <div className="flex gap-4">
                                    <button type="submit" className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600">{isEditingProject ? 'Update' : 'Create'}</button>
                                    {isEditingProject && <button type="button" onClick={() => { setProjectFormData(INITIAL_PROJECT_STATE); setIsEditingProject(false); }} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>}
                                </div>
                            </form>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Existing Projects</h2>
                            <div className="space-y-4">
                                {projects.map(p => (
                                    <div key={p._id} className="bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-md flex justify-between items-center">
                                        <div><h3 className="font-bold">{p.title}</h3><p className="text-sm text-gray-500 dark:text-gray-400">{p.category}</p></div>
                                        <div className="flex gap-2"><button onClick={() => handleEditProject(p)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">Edit</button><button onClick={() => handleDelete(p._id, 'projects')} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Delete</button></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
                
                {activeSection === 'testimonials' && (
                     <section id="admin-testimonials">
                        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-md mb-12">
                            <h2 className="text-2xl font-bold mb-6">{isEditingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</h2>
                            <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                                <textarea name="quote" value={testimonialFormData.quote} onChange={(e) => setTestimonialFormData(p => ({...p, quote: e.target.value}))} placeholder="Quote" required rows={3} className="form-input w-full p-2 border rounded dark:bg-gray-700"></textarea>
                                <input name="author" value={testimonialFormData.author} onChange={(e) => setTestimonialFormData(p => ({...p, author: e.target.value}))} placeholder="Author" required className="form-input w-full p-2 border rounded dark:bg-gray-700"/>
                                <input name="company" value={testimonialFormData.company} onChange={(e) => setTestimonialFormData(p => ({...p, company: e.target.value}))} placeholder="Company" required className="form-input w-full p-2 border rounded dark:bg-gray-700"/>
                                <div className="flex gap-4">
                                    <button type="submit" className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600">{isEditingTestimonial ? 'Update' : 'Create'}</button>
                                    {isEditingTestimonial && <button type="button" onClick={() => { setTestimonialFormData(INITIAL_TESTIMONIAL_STATE); setIsEditingTestimonial(false); }} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>}
                                </div>
                            </form>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Existing Testimonials</h2>
                            <div className="space-y-4">
                                {testimonials.map(t => (
                                    <div key={t._id} className="bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-md flex justify-between items-center">
                                        <div><h3 className="font-bold">{t.author}</h3><p className="text-sm text-gray-500 dark:text-gray-400 truncate w-96">"{t.quote}"</p></div>
                                        <div className="flex gap-2"><button onClick={() => handleEditTestimonial(t)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">Edit</button><button onClick={() => handleDelete(t._id, 'testimonials')} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Delete</button></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {activeSection === 'learningSkills' && (
                    <section id="admin-learning-skills">
                        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-md mb-12">
                            <h2 className="text-2xl font-bold mb-6">Add New Learning Skill</h2>
                            <form onSubmit={handleLearningSkillSubmit} className="space-y-4">
                                <input name="name" value={learningSkillFormData.name} onChange={(e) => setLearningSkillFormData(p => ({...p, name: e.target.value}))} placeholder="Skill Name" required className="form-input w-full p-2 border rounded dark:bg-gray-700"/>
                                <div className="grid grid-cols-2 gap-4">
                                    <select name="icon" value={learningSkillFormData.icon} onChange={(e) => setLearningSkillFormData(p => ({...p, icon: e.target.value}))} className="form-input w-full p-2 border rounded dark:bg-gray-700">
                                        {Object.keys(SKILL_ICON_MAP).map(iconName => <option key={iconName} value={iconName}>{iconName}</option>)}
                                    </select>
                                    <select name="color" value={learningSkillFormData.color} onChange={(e) => setLearningSkillFormData(p => ({...p, color: e.target.value}))} className="form-input w-full p-2 border rounded dark:bg-gray-700">
                                        {SKILL_COLORS.map(color => <option key={color} value={color}>{color}</option>)}
                                    </select>
                                </div>
                                <button type="submit" className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600">Create</button>
                            </form>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Current Learning Skills</h2>
                            <div className="space-y-4">
                                {learningSkills.map(s => (
                                    <div key={s._id} className="bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-md flex justify-between items-center">
                                        <h3 className="font-bold">{s.name}</h3>
                                        <button onClick={() => handleDelete(s._id, 'learningSkills')} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Delete</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default AdminPage;