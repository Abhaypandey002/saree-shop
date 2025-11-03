import Contact from '../models/Contact.js';
import { appendInquiry } from '../excel/excelService.js';

export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Missing required contact fields' });
    }

    const inquiry = await Contact.create({ name, email, phone, message });
    await appendInquiry({ name, email, phone, message });

    res.status(201).json({ message: 'Inquiry submitted successfully', inquiry });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit inquiry', error: error.message });
  }
};
