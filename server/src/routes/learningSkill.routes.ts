import { Router } from 'express';
import { getLearningSkills, createLearningSkill, deleteLearningSkill } from '../controllers/learningSkill.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// ✅ FIX: Remove '/learning-skills' from each route since it's already prefixed in server.ts
router.get('/', getLearningSkills);
router.post('/', protect, createLearningSkill);
router.delete('/:id', protect, deleteLearningSkill);

export default router;
