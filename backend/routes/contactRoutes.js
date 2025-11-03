import { Router } from 'express';
import { createInquiry } from '../controllers/contactController.js';

const router = Router();

router.post('/', createInquiry);

export default router;
