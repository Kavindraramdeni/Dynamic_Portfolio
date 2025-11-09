import { RequestHandler } from 'express';
import LearningSkill from '../models/learningSkill.model';

export const getLearningSkills: RequestHandler = async (req, res) => {
  try {
    const skills = await LearningSkill.find().sort({ createdAt: 'asc' });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching learning skills', error });
  }
};

export const createLearningSkill: RequestHandler = async (req, res) => {
  try {
    const newSkill = new LearningSkill(req.body);
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(400).json({ message: 'Error creating learning skill', error });
  }
};

export const deleteLearningSkill: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSkill = await LearningSkill.findByIdAndDelete(id);
    if (!deletedSkill) {
        return res.status(404).json({ message: 'Learning skill not found' });
    }
    res.status(200).json({ message: 'Learning skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting learning skill', error });
  }
};
