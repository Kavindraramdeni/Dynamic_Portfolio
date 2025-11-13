import { Router } from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonial.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// Correct routes
router.get('/', getTestimonials as any);
router.post('/', protect as any, createTestimonial as any);
router.put('/:id', protect as any, updateTestimonial as any);
router.delete('/:id', protect as any, deleteTestimonial as any);

export default router;
