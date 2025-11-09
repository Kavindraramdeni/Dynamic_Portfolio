import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import projectRoutes from './routes/project.routes.js';        // <-- .js for ESM
import contactRoutes from './routes/contact.routes.js';
import authRoutes from './routes/auth.routes.js';
import testimonialRoutes from './routes/testimonial.routes.js';
import learningSkillRoutes from './routes/learningSkill.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000; // Render uses dynamic port

app.use(cors());
app.use(express.json());

// Root endpoint for API info
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

// Mount routers with correct prefixes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/learning-skills', learningSkillRoutes);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("FATAL ERROR: MONGO_URI is not defined in the .env file.");
    (process as any).exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Backend server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
        (process as any).exit(1);
    });
