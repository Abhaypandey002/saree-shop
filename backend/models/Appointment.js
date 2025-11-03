import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    message: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Appointment', appointmentSchema);
