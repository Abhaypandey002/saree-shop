import { Router } from 'express';
import { getSarees, filterSarees } from '../controllers/sareeController.js';

const router = Router();

router.get('/', getSarees);
router.post('/filter', filterSarees);

export default router;
