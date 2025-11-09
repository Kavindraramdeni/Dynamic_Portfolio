import mongoose, { Schema, Document } from 'mongoose';

export interface ILearningSkill extends Document {
  name: string;
  icon: string;
  color: string;
}

const LearningSkillSchema: Schema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<ILearningSkill>('LearningSkill', LearningSkillSchema);
