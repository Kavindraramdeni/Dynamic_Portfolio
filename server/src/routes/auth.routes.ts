import { Router, Request, Response } from 'express'; // Add Request, Response
import { registerUser, loginUser } from '../controllers/auth.controller.ts';

const router = Router();

// Add a GET handler to guide users who access this endpoint via browser
// FIX: Explicitly cast handler to 'any' to resolve overload resolution errors.
router.get('/auth/register', ((req: Request, res: Response) => { // <-- Add types here
    res.status(405).json({
        message: 'Method Not Allowed. This endpoint is for user registration and only accepts POST requests.',
        usage: {
            method: 'POST',
            url: '/api/auth/register',
            body: {
                username: 'your_username',
                password: 'your_password'
            },
            tool: 'Use an API client like Postman or curl.'
        }
    });
}) as any); // The 'as any' might still be needed depending on other types, but try without it first

// FIX: Explicitly cast handlers to 'any' to resolve overload resolution errors.
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

export default router;