import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import {
  adminLogin,
  createSaree,
  updateSaree,
  deleteSaree,
  getAdminSummary,
  getAppointments,
  getInquiries
} from '../controllers/adminController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ storage });

router.post('/login', adminLogin);

router.use(authenticate);

router.get('/dashboard/summary', getAdminSummary);
router.get('/appointments', getAppointments);
router.get('/inquiries', getInquiries);
router.post('/sarees', upload.single('image'), createSaree);
router.put('/sarees/:id', upload.single('image'), updateSaree);
router.delete('/sarees/:id', deleteSaree);

export default router;
