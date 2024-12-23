import { Router } from 'express';
import { dbOperations } from '../db';
import { PrintRequestSchema } from '../db/schema';

const router = Router();

router.post('/', (req, res) => {
  try {
    // Extract the relevant data from the Make webhook payload
    const printRequest = {
      email_id: req.body.email_id,
      from: req.body.from,
      subject: req.body.subject,
      attachments: typeof req.body.attachments === 'string' ? req.body.attachments.split(',') : []
    };

    const validatedData = PrintRequestSchema.parse(printRequest);
    const requestId = dbOperations.createRequest(validatedData);
    
    res.json({ success: true, request_id: requestId });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ 
      success: false, 
      error: 'Invalid request data',
      received: req.body // This helps debug what data was actually received
    });
  }
});

export default router;