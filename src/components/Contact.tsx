import React, { useState,} from 'react';
import { CONTACT_INFO } from '../constants';
import { EmailIcon, GitHubIcon, LinkedInIcon, HackerRankIcon, PhoneIcon } from './Icons';

// Simple right arrow icon for the send button
const RightArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);

const LoadingSpinner = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const INTERESTS = ['UI/UX', 'Web Development', 'Backend Development', 'AI & Automation', 'E-commerce Solutions'];

export const Contact: React.FC = () => {
    const [selectedInterests, setSelectedInterests] = useState<string[]>(['Web Development']); // Default interest
    const [formData, setFormData] = useState({
        fullName: '',
        company: '',
        email: '',
        phone: '',
        projectDetails: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleInterestToggle = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
        );
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error on change if it exists
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!formData.projectDetails.trim()) newErrors.projectDetails = 'Project details are required.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmissionStatus('idle'); // Reset status on new submission attempt
        if (!validateForm()) {
            // Focus on the first invalid field for better UX
            const firstErrorField = Object.keys(errors).find(key => errors[key]);
            if (firstErrorField) {
                document.getElementsByName(firstErrorField)?.[0]?.focus();
            }
            return;
        }
    
        setSubmissionStatus('submitting');
        
        const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api';
    
        try {
            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    interests: selectedInterests.join(', '),
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Server responded with status ${response.status}`);
            }
    
            setSubmissionStatus('success');
            // Clear form after successful submission
            setFormData({ fullName: '', company: '', email: '', phone: '', projectDetails: '' });
            setSelectedInterests(['Web Development']); // Reset interests
        } catch (error) {
            console.error('Failed to send message:', error);
            setSubmissionStatus('error');
        } finally {
            // Auto-clear success/error messages after a while
            setTimeout(() => {
                setSubmissionStatus('idle');
            }, 5000); // Message visible for 5 seconds
        }
    };
    
    return (
      <footer id="contact" className="bg-gray-100 dark:bg-gray-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-12">
                <div className="w-12 h-1 bg-cyan-500 mr-4"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white uppercase tracking-widest">Get in Touch</h2>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-lg shadow-2xl">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">I'm interested in...</h3>
                            <div className="flex flex-wrap gap-3">
                                {INTERESTS.map(interest => (
                                    <button
                                        type="button"
                                        key={interest}
                                        onClick={() => handleInterestToggle(interest)}
                                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                                            selectedInterests.includes(interest)
                                            ? 'bg-cyan-500 text-white shadow-md'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                        aria-pressed={selectedInterests.includes(interest)}
                                    >
                                        {interest}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="fullName" className="sr-only">Full Name</label>
                                <input 
                                    type="text" 
                                    name="fullName" 
                                    id="fullName"
                                    placeholder="Full Name *" 
                                    value={formData.fullName} 
                                    onChange={handleInputChange} 
                                    className={`form-input w-full ${errors.fullName ? 'border-red-500 ring-red-500' : ''}`}
                                    aria-invalid={!!errors.fullName}
                                    aria-describedby={errors.fullName ? "error-fullName" : undefined}
                                />
                                {errors.fullName && <p id="error-fullName" className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                            </div>
                            <div>
                                <label htmlFor="company" className="sr-only">Company</label>
                                <input 
                                    type="text" 
                                    name="company" 
                                    id="company"
                                    placeholder="Company (Optional)" 
                                    value={formData.company} 
                                    onChange={handleInputChange} 
                                    className="form-input w-full" 
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email Address</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email"
                                    placeholder="Email Address *" 
                                    value={formData.email} 
                                    onChange={handleInputChange} 
                                    className={`form-input w-full ${errors.email ? 'border-red-500 ring-red-500' : ''}`}
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? "error-email" : undefined}
                                />
                                {errors.email && <p id="error-email" className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="phone" className="sr-only">Phone</label>
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    id="phone"
                                    placeholder="Phone (Optional)" 
                                    value={formData.phone} 
                                    onChange={handleInputChange} 
                                    className="form-input w-full" 
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="projectDetails" className="sr-only">Project Details</label>
                        <textarea 
                            name="projectDetails" 
                            id="projectDetails"
                            placeholder="Tell me about your project *" 
                            value={formData.projectDetails} 
                            onChange={handleInputChange} 
                            rows={5} 
                            className={`form-input w-full ${errors.projectDetails ? 'border-red-500 ring-red-500' : ''}`}
                            aria-invalid={!!errors.projectDetails}
                            aria-describedby={errors.projectDetails ? "error-projectDetails" : undefined}
                        ></textarea>
                        {errors.projectDetails && <p id="error-projectDetails" className="text-red-500 text-xs mt-1">{errors.projectDetails}</p>}
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <button 
                            type="submit" 
                            disabled={submissionStatus === 'submitting'}
                            className="w-full sm:w-auto flex items-center justify-center bg-cyan-500 text-white font-bold py-3 px-8 rounded-full uppercase tracking-wider hover:bg-cyan-600 transition-all duration-300 disabled:bg-cyan-700 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                        >
                            {submissionStatus === 'submitting' ? (
                                <>
                                    <LoadingSpinner />
                                    <span className="ml-2">Sending...</span>
                                </>
                            ) : (
                                <>
                                    <span>Send Message</span>
                                    <RightArrowIcon />
                                </>
                            )}
                        </button>
                        <div role="status" aria-live="polite" className="h-6 text-center sm:text-left">
                            {submissionStatus === 'success' && <p className="text-green-600 dark:text-green-400 font-semibold">Message sent successfully! Thank you.</p>}
                            {submissionStatus === 'error' && <p className="text-red-600 dark:text-red-400 font-semibold">Something went wrong. Please try again.</p>}
                        </div>
                    </div>
                </form>
            </div>
            
            <div className="text-center mt-16">
                 <p className="text-gray-600 dark:text-gray-400 mb-6">Let's connect on other platforms!</p>
                 <div className="flex justify-center items-center gap-6 mb-8">
                     <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="text-gray-500 dark:text-gray-400 hover:text-cyan-500 transition-colors duration-300"><GitHubIcon /></a>
                     <a href={CONTACT_INFO.linkedIn} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="text-gray-500 dark:text-gray-400 hover:text-cyan-500 transition-colors duration-300"><LinkedInIcon /></a>
                     <a href={CONTACT_INFO.hackerrank} target="_blank" rel="noopener noreferrer" aria-label="HackerRank profile" className="text-gray-500 dark:text-gray-400 hover:text-cyan-500 transition-colors duration-300"><HackerRankIcon /></a>
                     <a href={`tel:${CONTACT_INFO.phone}`} aria-label="Call me" className="text-gray-500 dark:text-gray-400 hover:text-cyan-500 transition-colors duration-300"><PhoneIcon /></a>
                     <a href={`mailto:${CONTACT_INFO.email}`} aria-label="Send an email" className="text-gray-500 dark:text-gray-400 hover:text-cyan-500 transition-colors duration-300"><EmailIcon /></a>
                 </div>
                 <p className="text-sm text-gray-500 dark:text-gray-500">
                    &copy; {new Date().getFullYear()} Kavindra Raj Ramdeni. All Rights Reserved.
                 </p>
            </div>
        </div>
      </footer>
    );
};