import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import { PrintRequest, initializeDb } from './schema';

const db = new Database(':memory:');
initializeDb(db);

export const dbOperations = {
  createRequest: (data: Omit<PrintRequest, 'request_id' | 'status'>) => {
    const request_id = uuidv4();
    const stmt = db.prepare(`
      INSERT INTO print_requests (request_id, email_id, from_email, subject, attachments)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      request_id,
      data.email_id,
      data.from,
      data.subject,
      JSON.stringify(data.attachments)
    );
    
    return request_id;
  },

  getPendingRequests: () => {
    const stmt = db.prepare(`
      SELECT request_id, email_id, from_email as "from", subject, attachments, status
      FROM print_requests
      WHERE status = 'pending'
    `);
    
    const requests = stmt.all().map(row => ({
      ...row,
      attachments: JSON.parse(row.attachments as string)
    }));
    
    return requests;
  },

  updateRequestStatus: (requestId: string, status: 'accepted' | 'rejected') => {
    const stmt = db.prepare(`
      UPDATE print_requests
      SET status = ?
      WHERE request_id = ?
    `);
    
    const result = stmt.run(status, requestId);
    return result.changes > 0;
  },

  deleteRequest: (requestId: string) => {
    const stmt = db.prepare('DELETE FROM print_requests WHERE request_id = ?');
    const result = stmt.run(requestId);
    return result.changes > 0;
  }
};