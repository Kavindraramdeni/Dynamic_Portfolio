import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  quote: string;
  author: string;
  company: string;
}

const TestimonialSchema: Schema = new Schema({
  quote: { type: String, required: true },
  author: { type: String, required: true },
  company: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
