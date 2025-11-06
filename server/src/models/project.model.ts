import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  detailedDescription?: string;
  tech: string;
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  gallery?: string[];
  featured?: boolean;
  category: string;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  detailedDescription: { type: String },
  tech: { type: String, required: true },
  imageUrl: { type: String, required: true },
  liveUrl: { type: String },
  repoUrl: { type: String },
  gallery: [{ type: String }],
  featured: { type: Boolean, default: false },
  category: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);
