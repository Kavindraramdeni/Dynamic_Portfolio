import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const sendContactMessage = async (req: Request, res: Response) => {
  const { fullName, email, projectDetails, company, phone, interests } = req.body;

  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Email service is not configured. Please check your .env file.');
    return res.status(500).json({ message: 'Internal Server Error: Email service not configured.' });
  }

  // Basic validation
  if (!fullName || !email || !projectDetails) {
    return res.status(400).json({ message: 'Full name, email, and project details are required.' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${fullName}" <${email}>`,
    to: process.env.EMAIL_RECIPIENT,
    subject: `Portfolio Contact: New message from ${fullName}`,
    html: `
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Interested In:</strong> ${interests || 'N/A'}</p>
      <hr>
      <h3>Message:</h3>
      <p style="white-space: pre-wrap;">${projectDetails}</p>
    `,
  };

  try {
    await transporter.verify(); // Verify connection configuration
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message.' });
  }
};
