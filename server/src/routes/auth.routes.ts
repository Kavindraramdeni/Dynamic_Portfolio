import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';

const router = Router();

router.get('/register', (req, res) => {
    res.status(405).json({
        message: 'Method Not Allowed. Use POST to register.',
        usage: {
            method: 'POST',
            url: '/api/auth/register',
            body: { username: 'your_username', password: 'your_password' },
            tool: 'Use Postman or curl'
        }
    });
});

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
