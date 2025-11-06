import { Router } from 'express';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonial.controller.ts';
import { protect } from '../middleware/auth.middleware.ts';

const router = Router();

// FIX: Explicitly cast handlers to 'any' to resolve overload resolution errors.
router.get('/testimonials', getTestimonials as any);
router.post('/testimonials', protect as any, createTestimonial as any);
router.put('/testimonials/:id', protect as any, updateTestimonial as any);
router.delete('/testimonials/:id', protect as any, deleteTestimonial as any);

export default router;