import Appointment from '../models/Appointment.js';
import { appendAppointment } from '../excel/excelService.js';

export const createAppointment = async (req, res) => {
  try {
    const { name, email, phone, date, message } = req.body;
    if (!name || !email || !phone || !date) {
      return res.status(400).json({ message: 'Missing required appointment fields' });
    }

    const appointment = await Appointment.create({ name, email, phone, date, message });
    await appendAppointment({ name, email, phone, date, message });

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to book appointment', error: error.message });
  }
};
