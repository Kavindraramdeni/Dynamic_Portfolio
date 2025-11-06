import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import projectRoutes from './routes/project.routes.ts';
import contactRoutes from './routes/contact.routes.ts';
import authRoutes from './routes/auth.routes.ts';
import testimonialRoutes from './routes/testimonial.routes.ts';
import learningSkillRoutes from './routes/learningSkill.routes.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Portfolio Backend API!',
        endpoints: [
            '/api/projects',
            '/api/contact',
            '/api/auth/register (POST)',
            '/api/auth/login (POST)',
            '/api/testimonials'
        ],
        documentation: 'Refer to API documentation for details on each endpoint.'
    });
});

app.use('/api', projectRoutes as any);
app.use('/api', contactRoutes as any);
app.use('/api', authRoutes as any);
app.use('/api', testimonialRoutes as any);
app.use('/api', learningSkillRoutes);

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("FATAL ERROR: MONGO_URI is not defined in the .env file.");
    // FIX: Property 'exit' does not exist on type 'Process'. Cast to any to resolve.
    (process as any).exit(1);
}

mongoose.connect(MONGO_URI!)
    .then(() => {
        console.log('Successfully connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Backend server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
        // FIX: Property 'exit' does not exist on type 'Process'. Cast to any to resolve.
        (process as any).exit(1);
    });