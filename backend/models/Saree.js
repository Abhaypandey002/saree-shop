import mongoose from 'mongoose';

const sareeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    fabric: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Saree', sareeSchema);
