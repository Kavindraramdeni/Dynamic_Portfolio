import { Request, Response } from 'express';
import Testimonial from '../models/testimonial.model';

export const getTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: 'desc' });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching testimonials', error });
  }
};

export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const newTestimonial = new Testimonial(req.body);
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(400).json({ message: 'Error creating testimonial', error });
  }
};

export const updateTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTestimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.status(200).json(updatedTestimonial);
  } catch (error) {
    res.status(400).json({ message: 'Error updating testimonial', error });
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
    if (!deletedTestimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting testimonial', error });
  }
};
