import { Router,RequestHandler } from 'express';
import { sendContactMessage } from '../controllers/contact.controller';

const router = Router();

router.post('/contact', sendContactMessage as RequestHandler);

export default router;
