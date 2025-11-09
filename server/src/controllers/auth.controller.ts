import { Request, Response } from 'express';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: '30d'
    });
};

export const registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Provide all fields' });

    const userCount = await User.countDocuments();
    if (userCount > 0) return res.status(400).json({ message: 'Admin already exists' });

    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    try {
        const user = await User.create({ username, password });
        res.status(201).json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id.toString())
        });
    } catch (error) {
        res.status(400).json({ message: 'Invalid user data', error });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Provide all fields' });

    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id.toString())
        });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
};
