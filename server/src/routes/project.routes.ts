import { Router, RequestHandler } from 'express';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/project.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// ✅ Correct routes (remove duplicate '/projects')
router.get('/', getProjects as RequestHandler);
router.post('/', protect as RequestHandler, createProject as RequestHandler);
router.put('/:id', protect as RequestHandler, updateProject as RequestHandler);
router.delete('/:id', protect as RequestHandler, deleteProject as RequestHandler);

export default router;
