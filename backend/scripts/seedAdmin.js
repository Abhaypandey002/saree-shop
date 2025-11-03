import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import Admin from '../models/Admin.js';

dotenv.config();

const args = process.argv.slice(2);
const argMap = args.reduce((acc, current) => {
  const [key, value] = current.split('=');
  if (key && value) {
    acc[key.replace(/^--/, '')] = value;
  }
  return acc;
}, {});

const username = argMap.username || process.env.ADMIN_USERNAME || 'admin';
const password = argMap.password || process.env.ADMIN_PASSWORD || 'admin123';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/saree-sutra';

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    let admin = await Admin.findOne({ username });
    if (admin) {
      console.log(`Admin ${username} already exists.`);
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      admin = await Admin.create({ username, passwordHash });
      console.log(`Admin ${username} created.`);
    }
  } catch (error) {
    console.error('Failed to seed admin', error);
  } finally {
    await mongoose.disconnect();
  }
};

seed();
