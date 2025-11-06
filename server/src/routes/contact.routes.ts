import { Router,RequestHandler } from 'express';
import { sendContactMessage } from '../controllers/contact.controller.ts';

const router = Router();

router.post('/contact', sendContactMessage as RequestHandler);

export default router;
