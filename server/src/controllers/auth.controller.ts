import { Request, Response } from 'express';
import User from '../models/user.model.js'; // <-- .js for ESM on Render
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: '30d',
    });
};

// Register user (only one admin)
export const registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    const userCount = await User.countDocuments();
    if (userCount > 0) {
        return res.status(400).json({ message: 'Admin user already exists.' });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        const user = await User.create({ username, password });
        res.status(201).json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id.toString()),
        });
    } catch (error) {
        res.status(400).json({ message: 'Invalid user data', error });
    }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    try {
        const user = await User.findOne({ username });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                token: generateToken(user._id.toString()),
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error during login', error });
    }
};
