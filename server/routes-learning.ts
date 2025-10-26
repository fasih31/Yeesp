import { Router } from 'express';
import { requireAuth } from './middleware/auth';
import { db } from './db';
import { sql } from 'drizzle-orm';

const router = Router();

// Add your learning routes here
// Example:
// router.get('/notes', requireAuth, async (req, res) => {
//   // Implementation
// });

export default router;