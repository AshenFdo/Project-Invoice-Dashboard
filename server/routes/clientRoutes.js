import express from 'express';
import { createClient } from '../controller/clientController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Any routes defined here will be protected
router.post('/create', protect, createClient);

export default router;