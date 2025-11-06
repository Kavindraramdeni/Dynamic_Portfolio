import React from 'react';
import { Section } from './Section';
import { Testimonial } from '../types';

interface TestimonialsProps {
    testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
    if (testimonials.length === 0) {
        return null; // Don't render the section if there are no testimonials
    }

    return (
        <Section title="Testimonials" id="testimonials" className="bg-gray-50 dark:bg-black/20">
            <div className="relative max-w-5xl mx-auto">
                <div className="flex overflow-x-auto space-x-8 snap-x snap-mandatory pb-4 scrollbar-hide">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial._id} className="snap-center flex-shrink-0 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center text-center">
                            <blockquote className="text-gray-600 dark:text-gray-400 italic mb-4">
                                "{testimonial.quote}"
                            </blockquote>
                            <div className="font-bold text-gray-900 dark:text-white mt-4">{testimonial.author}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.company}</div>
                        </div>
                    ))}
                </div>
                 <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
            </div>
        </Section>
    );
};
