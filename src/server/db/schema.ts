import Database from 'better-sqlite3';
import { z } from 'zod';

// Schema validation
export const PrintRequestSchema = z.object({
  email_id: z.string(),
  from: z.string(),
  subject: z.string(),
  attachments: z.array(z.string()),
});

export type PrintRequest = z.infer<typeof PrintRequestSchema> & {
  request_id: string;
  status: 'pending' | 'accepted' | 'rejected';
};

export function initializeDb(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS print_requests (
      request_id TEXT PRIMARY KEY,
      email_id TEXT UNIQUE NOT NULL,
      from_email TEXT NOT NULL,
      subject TEXT NOT NULL,
      attachments TEXT NOT NULL,
      status TEXT DEFAULT 'pending'
    )
  `);
}