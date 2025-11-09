import { Router,RequestHandler } from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/project.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// FIX: Explicitly cast handlers to RequestHandler to resolve overload resolution errors, likely caused by a type definition conflict.
router.get('/projects', getProjects as RequestHandler);
router.post('/projects', protect as RequestHandler, createProject as RequestHandler);
router.put('/projects/:id', protect as RequestHandler, updateProject as RequestHandler);
router.delete('/projects/:id', protect as RequestHandler, deleteProject as RequestHandler);

export default router;