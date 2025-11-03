import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Admin from '../models/Admin.js';
import Saree from '../models/Saree.js';
import Appointment from '../models/Appointment.js';
import Contact from '../models/Contact.js';

const jwtSecret = process.env.JWT_SECRET || 'supersecretjwt';

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, username: admin.username }, jwtSecret, {
      expiresIn: '7d'
    });

    res.json({ token, username: admin.username });
  } catch (error) {
    res.status(500).json({ message: 'Failed to login', error: error.message });
  }
};

export const createSaree = async (req, res) => {
  try {
    const { name, fabric, color, price, location, imageUrl } = req.body;
    if (!name || !fabric || !color || !price || !location) {
      return res.status(400).json({ message: 'Missing saree details' });
    }

    let finalImageUrl = imageUrl;
    if (req.file) {
      finalImageUrl = `/uploads/${req.file.filename}`;
    }

    if (!finalImageUrl) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const saree = await Saree.create({
      name,
      fabric,
      color,
      price,
      location,
      imageUrl: finalImageUrl
    });

    res.status(201).json(saree);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create saree', error: error.message });
  }
};

export const updateSaree = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    if (req.file) {
      updates.imageUrl = `/uploads/${req.file.filename}`;
    }
    const saree = await Saree.findByIdAndUpdate(id, updates, { new: true });
    if (!saree) {
      return res.status(404).json({ message: 'Saree not found' });
    }
    res.json(saree);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update saree', error: error.message });
  }
};

export const deleteSaree = async (req, res) => {
  try {
    const { id } = req.params;
    const saree = await Saree.findByIdAndDelete(id);
    if (!saree) {
      return res.status(404).json({ message: 'Saree not found' });
    }
    res.json({ message: 'Saree removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete saree', error: error.message });
  }
};

export const getAdminSummary = async (req, res) => {
  try {
    const [sareeCount, appointmentCount, inquiryCount] = await Promise.all([
      Saree.countDocuments(),
      Appointment.countDocuments(),
      Contact.countDocuments()
    ]);

    res.json({ sareeCount, appointmentCount, inquiryCount });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load summary', error: error.message });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load appointments', error: error.message });
  }
};

export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Contact.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load inquiries', error: error.message });
  }
};
