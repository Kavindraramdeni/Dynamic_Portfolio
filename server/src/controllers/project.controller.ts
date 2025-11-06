import { Request, Response } from 'express';
import Project from '../models/project.model.ts';
import { ProjectCategory } from '../types.ts';

// Helper to group flat project list from DB into the nested structure the frontend expects
const groupByCategory = (projects: any[]): ProjectCategory[] => {
    const grouped = projects.reduce((acc, project) => {
        const category = project.category;
        if (!acc[category]) {
            acc[category] = { category, items: [] };
        }
        acc[category].items.push(project.toObject());
        return acc;
    }, {} as { [key: string]: ProjectCategory });

    const order = ["FSD Projects", "Ongoing Projects", "AI & Automation Projects", "Freelancing Experience", "Academic Projects"];
    
    // FIX: Cast the result of Object.values to ProjectCategory[] to resolve the type error.
    // TypeScript can infer Object.values on a record type as `unknown[]`, which is not assignable
    // to the function's return type of `ProjectCategory[]`. This also allows type inference for sort parameters.
    return (Object.values(grouped) as ProjectCategory[]).sort((a, b) => {
        return order.indexOf(a.category) - order.indexOf(b.category);
    });
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    const groupedProjects = groupByCategory(projects);
    res.status(200).json(groupedProjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: 'Error creating project', error });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProject) {
        return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: 'Error updating project', error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
        return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
};