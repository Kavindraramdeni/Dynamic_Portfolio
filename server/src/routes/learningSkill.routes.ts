import { Router } from 'express';
import { getLearningSkills, createLearningSkill, deleteLearningSkill } from '../controllers/learningSkill.controller.ts';
import { protect } from '../middleware/auth.middleware.ts';

const router = Router();

// FIX: Removed explicit 'as RequestHandler' casts. Express router methods are overloaded to accept handlers, and type inference should work.
router.get('/learning-skills', getLearningSkills);
router.post('/learning-skills', protect, createLearningSkill);
router.delete('/learning-skills/:id', protect, deleteLearningSkill);

export default router;