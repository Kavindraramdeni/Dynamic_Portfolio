import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model.ts';

export interface ProtectedRequest extends Request {
    user?: IUser;
}

export const protect: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    // FIX: Using type assertion to 'any' for 'req' and 'res' to bypass potential type definition issues
    // that prevent access to standard properties like 'headers' and methods like 'status'.
    const anyReq = req as any;
    const anyRes = res as any;

    if (anyReq.headers.authorization && anyReq.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = anyReq.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

            // Get user from the token
            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                return anyRes.status(401).json({ message: 'Not authorized, user not found' });
            }

            (req as ProtectedRequest).user = user;

            next();
        } catch (error) {
            console.error(error);
            anyRes.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        anyRes.status(401).json({ message: 'Not authorized, no token' });
    }
};