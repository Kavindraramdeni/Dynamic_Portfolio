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

// ✅ Allow frontend (Vercel) to connect to backend (Render)
app.use(
  cors({
    origin: [
      "https://dynamicportfolio-omega.vercel.app", // your deployed frontend
      "http://localhost:5173" // local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Parse JSON requests
app.use(express.json());

// ✅ Root route — just for confirmation
app.get('/', (req, res) => {
  res.status(200).json({
    message: '✅ Portfolio Backend is live and running!',
    endpoints: {
      projects: '/api/projects',
      contact: '/api/contact',
      register: '/api/auth/register (POST)',
      login: '/api/auth/login (POST)',
      testimonials: '/api/testimonials',
      learningSkills: '/api/learning-skills'
    },
  });
});

// ✅ Prefix all routes with /api
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/learning-skills', learningSkillRoutes);

// ✅ MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('❌ FATAL ERROR: MONGO_URI not found in .env');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  });
