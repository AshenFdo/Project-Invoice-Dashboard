import express from 'express';
import { createClient, getAllClients ,deleteClient  } from '../controller/clientController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Any routes defined here will be protected
router.post('/create', protect, createClient);
router.get('/', protect, getAllClients); //get all clients for a specific user
router.delete('/:id', protect, deleteClient); //delete a specific client by ID

export default router;