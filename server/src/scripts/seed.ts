import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/project.model.ts';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from the server's .env file
// FIX: __dirname is not available in ES modules. The following lines define it to allow path resolution.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const seedDatabase = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    console.error("MONGO_URI is not defined in .env file");
    throw new Error("MONGO_URI is not defined in .env file");
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding.');

    await Project.deleteMany({});
    console.log('Cleared existing projects from the database.');

    // Path to projects.json at the root of the project
    const filePath = path.join(__dirname, '../../../public/projects.json');
    const projectsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    const projectsToInsert = [];
    for (const category of projectsData) {
        for (const item of category.items) {
            projectsToInsert.push({ ...item, category: category.category });
        }
    }

    if (projectsToInsert.length > 0) {
        await Project.insertMany(projectsToInsert);
        console.log(`Successfully seeded ${projectsToInsert.length} projects into the database.`);
    } else {
        console.log('No projects found in projects.json to seed.');
    }

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
};

seedDatabase();