// backend/src/routes/serviceRoutes.ts
import { Router } from 'express';
import { 
  getServices, 
  getAllServices, 
  createService, 
  updateService, 
  deleteService 
} from '../controllers/serviceController';
import { protect, adminOnly } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getServices);                    // Public
router.get('/all', protect, adminOnly, getAllServices);   // Protected
router.post('/', protect, adminOnly, createService);
router.put('/:id', protect, adminOnly, updateService);
router.delete('/:id', protect, adminOnly, deleteService);

export default router;