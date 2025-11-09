import { Router, Request, Response } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js'; // <-- .js for ESM

const router = Router();

// GET /api/auth/register → Info for browser users
router.get('/register', (req: Request, res: Response) => {
    res.status(405).json({
        message: 'Method Not Allowed. Use POST to register.',
        usage: {
            method: 'POST',
            url: '/api/auth/register',
            body: {
                username: 'your_username',
                password: 'your_password'
            },
            tool: 'Use Postman or curl'
        }
    });
});

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/login
router.post('/login', loginUser);

export default router;
