import { Router } from 'express';
import { dbOperations } from '../db';

const router = Router();

router.post('/:requestId', async (req, res) => {
  const { requestId } = req.params;
  const { decision } = req.body;

  if (!['accept', 'reject'].includes(decision)) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid decision'
    });
  }

  try {
    const updated = dbOperations.updateRequestStatus(
      requestId, 
      decision === 'accept' ? 'accepted' : 'rejected'
    );

    if (!updated) {
      return res.status(404).json({ 
        success: false, 
        error: 'Request not found'
      });
    }

    // Send response that Make can use
    res.json({
      success: true,
      decision,
      requestId,
      timestamp: new Date().toISOString()
    });
    
    // Delete the request after sending response
    dbOperations.deleteRequest(requestId);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process decision'
    });
  }
});

export default router;