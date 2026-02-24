import express from 'express';
import { fetchFreelancer, updateFreelancer } from '../controllers/freelancerController.js';
const router = express.Router();

router.get('/:id', fetchFreelancer);
router.post('/update', updateFreelancer);

export default router;
