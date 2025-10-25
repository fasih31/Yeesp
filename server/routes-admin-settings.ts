import { Router, Request, Response } from 'express';
import { requireAuth } from './middleware/auth';
import { db } from './db';
import { sql } from 'drizzle-orm';

const router = Router();

const requireAdmin = (req: any, res: Response, next: any) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

const DEFAULT_SETTINGS = {
  platformFee: "10",
  minProjectBudget: "50",
  maxProjectBudget: "100000",
  commissionRate: "15",
  withdrawalMinimum: "25",
  defaultCurrency: "USD",
  maintenanceMode: false,
  registrationOpen: true,
  emailVerificationRequired: true,
  platformName: "YEESP",
  supportEmail: "support@yeesp.com",
  termsUrl: "/terms",
  privacyUrl: "/privacy",
};

router.get('/settings', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    res.json(DEFAULT_SETTINGS);
  } catch (error: any) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/settings', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const settings = req.body;
    
    res.json({ success: true, settings });
  } catch (error: any) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
