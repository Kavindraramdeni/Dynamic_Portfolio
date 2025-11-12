import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import projectRoutes from './routes/project.routes';
import contactRoutes from './routes/contact.routes';
import authRoutes from './routes/auth.routes';
import testimonialRoutes from './routes/testimonial.routes';
import learningSkillRoutes from './routes/learningSkill.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 10000;

// Middleware
//app.use(cors());
app.use(
  cors({
    origin: [
      "https://dynamicportfolio-omega.vercel.app", // your frontend on Vercel
      "http://localhost:5173" // optional: for local development
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Root endpoint
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

// Mount routers
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/learning-skills', learningSkillRoutes);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI is not defined in .env file.');
    (process as any).exit(1);
}

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI!)
    .then(() => {
        console.log('Successfully connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Backend server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
        (process as any).exit(1);
    });
