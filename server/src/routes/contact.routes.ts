import { Router, RequestHandler } from 'express';
import { sendContactMessage } from '../controllers/contact.controller';

const router = Router();

// ✅ FIX: Remove '/contact' — this router is already mounted at '/api/contact'
router.post('/', sendContactMessage as RequestHandler);

export default router;
