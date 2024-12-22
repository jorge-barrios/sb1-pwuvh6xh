import { Router } from 'express';
import { dbOperations } from '../db';

const router = Router();

router.get('/', (_req, res) => {
  try {
    const requests = dbOperations.getPendingRequests();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch requests'
    });
  }
});

export default router;