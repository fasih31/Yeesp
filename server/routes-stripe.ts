import { Router, type Request, type Response } from 'express';
import { stripeService } from './services/stripe';
import { requireAuth } from './middleware/auth';
import { db } from './db';
import { wallets } from '@shared/schema';
import { eq } from 'drizzle-orm';

const router = Router();

/**
 * Create checkout session for wallet deposit
 */
router.post('/create-checkout-session', requireAuth, async (req: Request, res: Response) => {
  try {
    const { amount, description } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const session = await stripeService.createCheckoutSession({
      userId: req.user!.id,
      amount: parseFloat(amount),
      description: description || 'Wallet deposit',
    });

    res.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error('Failed to create checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

/**
 * Get wallet balance
 */
router.get('/wallet/balance', requireAuth, async (req: Request, res: Response) => {
  try {
    const [wallet] = await db.select()
      .from(wallets)
      .where(eq(wallets.userId, req.user!.id))
      .limit(1);

    if (!wallet) {
      // Create wallet if it doesn't exist
      const [newWallet] = await db.insert(wallets).values({
        userId: req.user!.id,
        balance: '0',
        escrowBalance: '0',
        currency: 'USD',
      }).returning();
      
      return res.json(newWallet);
    }

    res.json(wallet);
  } catch (error: any) {
    console.error('Failed to get wallet balance:', error);
    res.status(500).json({ error: 'Failed to get wallet balance' });
  }
});

/**
 * Stripe webhook endpoint
 * Uses rawBody from express.json verify function
 */
router.post('/webhook', async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'] as string;

  if (!signature) {
    return res.status(400).json({ error: 'Missing stripe-signature header' });
  }

  // Use rawBody for webhook signature verification
  const rawBody = (req as any).rawBody as Buffer;
  
  if (!rawBody) {
    return res.status(400).json({ error: 'Raw body not available' });
  }

  try {
    await stripeService.handleWebhook(signature, rawBody);
    res.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

/**
 * Get Stripe publishable key
 */
router.get('/config', async (req: Request, res: Response) => {
  res.json({
    publishableKey: stripeService.getPublishableKey(),
  });
});

/**
 * Verify checkout session completion
 */
router.get('/checkout-session/:sessionId', requireAuth, async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const session = await stripeService.getCheckoutSession(sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Verify session belongs to user
    if (session.metadata?.userId !== req.user!.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({
      status: session.status,
      amountTotal: session.amount_total ? session.amount_total / 100 : 0,
      paymentStatus: session.payment_status,
    });
  } catch (error: any) {
    console.error('Failed to retrieve checkout session:', error);
    res.status(500).json({ error: 'Failed to retrieve checkout session' });
  }
});

export default router;
