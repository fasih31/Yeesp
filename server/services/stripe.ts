import Stripe from 'stripe';
import { db } from '../db';
import { users, walletTransactions, wallets } from '@shared/schema';
import { eq } from 'drizzle-orm';

interface PaymentIntent {
  amount: number;
  currency: string;
  description: string;
  metadata?: Record<string, string>;
}

interface CreateCheckoutSessionParams {
  userId: string;
  amount: number;
  description: string;
  currency?: string;
  metadata?: Record<string, string>;
}

interface PayoutInfo {
  amount: number;
  destination: string;
  description: string;
}

export class StripeService {
  private stripe: Stripe | null;
  private isConfigured: boolean;

  constructor() {
    this.isConfigured = !!process.env.STRIPE_SECRET_KEY;
    
    if (this.isConfigured && process.env.STRIPE_SECRET_KEY) {
      this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2024-12-18.acacia',
      });
    } else {
      this.stripe = null;
    }
  }

  /**
   * Get or create Stripe customer for a user
   */
  async getOrCreateCustomer(userId: string, email: string, name: string): Promise<string> {
    if (!this.stripe) {
      return 'cus_mock_' + Date.now();
    }

    // Check if user already has a Stripe customer ID
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    
    if (user?.stripeCustomerId) {
      return user.stripeCustomerId;
    }

    // Create new Stripe customer
    const customer = await this.stripe.customers.create({
      email,
      name,
      metadata: { userId },
    });

    // Save customer ID to database
    await db.update(users)
      .set({ stripeCustomerId: customer.id })
      .where(eq(users.id, userId));

    return customer.id;
  }

  /**
   * Create a checkout session for wallet deposit
   */
  async createCheckoutSession(params: CreateCheckoutSessionParams): Promise<Stripe.Checkout.Session | any> {
    if (!this.stripe) {
      // Return mock data in development
      return {
        id: 'cs_mock_' + Date.now(),
        url: 'https://checkout.stripe.com/mock',
        amount_total: params.amount * 100,
      };
    }

    const [user] = await db.select().from(users).where(eq(users.id, params.userId)).limit(1);
    if (!user) {
      throw new Error('User not found');
    }

    const customerId = await this.getOrCreateCustomer(params.userId, user.email, user.name);

    const session = await this.stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: params.currency || 'usd',
            product_data: {
              name: params.description,
            },
            unit_amount: Math.round(params.amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.REPLIT_DOMAINS || 'http://localhost:5000'}/wallet?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.REPLIT_DOMAINS || 'http://localhost:5000'}/wallet?cancelled=true`,
      metadata: {
        userId: params.userId,
        type: 'wallet_deposit',
        ...params.metadata,
      },
    });

    return session;
  }

  /**
   * Create payment intent for direct charges
   */
  async createPaymentIntent(data: PaymentIntent): Promise<Stripe.PaymentIntent | any> {
    if (!this.stripe) {
      // Return mock data in development
      return {
        id: 'pi_mock_' + Date.now(),
        client_secret: 'mock_secret_' + Date.now(),
        amount: data.amount,
        status: 'requires_payment_method',
      };
    }

    return await this.stripe.paymentIntents.create({
      amount: Math.round(data.amount * 100), // Convert to cents
      currency: data.currency,
      description: data.description,
      metadata: data.metadata,
    });
  }

  /**
   * Create escrow hold for project milestones
   */
  async createEscrowHold(amount: number, projectId: string, userId: string): Promise<any> {
    return await this.createPaymentIntent({
      amount,
      currency: 'usd',
      description: `Escrow for project ${projectId}`,
      metadata: { projectId, userId, type: 'escrow' },
    });
  }

  /**
   * Release escrow funds to recipient
   */
  async releaseEscrow(amount: number, recipientUserId: string, projectId: string): Promise<any> {
    // Get recipient's wallet
    const [wallet] = await db.select().from(wallets).where(eq(wallets.userId, recipientUserId)).limit(1);
    
    if (!wallet) {
      throw new Error('Recipient wallet not found');
    }

    // Update wallet balance
    await db.update(wallets)
      .set({ 
        balance: String(parseFloat(wallet.balance) + amount),
        escrowBalance: String(parseFloat(wallet.escrowBalance) - amount),
      })
      .where(eq(wallets.id, wallet.id));

    // Record transaction
    await db.insert(walletTransactions).values({
      walletId: wallet.id,
      type: 'escrow_release',
      amount: String(amount),
      description: `Escrow released for project ${projectId}`,
      referenceId: projectId,
      status: 'completed',
    });

    return { id: 'release_' + Date.now(), status: 'succeeded', amount };
  }

  /**
   * Create payout to user's bank account (requires Stripe Connect)
   */
  async createPayout(data: PayoutInfo): Promise<any> {
    if (!this.stripe) {
      return { id: 'payout_mock_' + Date.now(), status: 'paid' };
    }

    // This would require Stripe Connect setup
    // For now, we'll handle payouts through the wallet system
    return { id: 'payout_' + Date.now(), status: 'pending' };
  }

  /**
   * Retrieve checkout session details
   */
  async getCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session | null> {
    if (!this.stripe) {
      return null;
    }

    try {
      return await this.stripe.checkout.sessions.retrieve(sessionId);
    } catch (error) {
      console.error('Failed to retrieve checkout session:', error);
      return null;
    }
  }

  /**
   * Handle Stripe webhook events
   */
  async handleWebhook(signature: string, payload: Buffer): Promise<void> {
    if (!this.stripe) {
      console.log('Stripe not configured, skipping webhook');
      return;
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET not configured');
      return;
    }

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      throw new Error('Webhook signature verification failed');
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      
      case 'payment_intent.succeeded':
        await this.handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      
      case 'payment_intent.payment_failed':
        await this.handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }

  /**
   * Handle successful checkout session
   */
  private async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session): Promise<void> {
    const userId = session.metadata?.userId;
    const type = session.metadata?.type;

    if (!userId || type !== 'wallet_deposit') {
      return;
    }

    const amount = (session.amount_total || 0) / 100; // Convert from cents

    // Get or create user's wallet
    let [wallet] = await db.select().from(wallets).where(eq(wallets.userId, userId)).limit(1);
    
    if (!wallet) {
      const [newWallet] = await db.insert(wallets).values({
        userId,
        balance: '0',
        escrowBalance: '0',
        currency: 'USD',
      }).returning();
      wallet = newWallet;
    }

    // Update wallet balance
    await db.update(wallets)
      .set({ 
        balance: String(parseFloat(wallet.balance) + amount),
        updatedAt: new Date(),
      })
      .where(eq(wallets.id, wallet.id));

    // Record transaction
    await db.insert(walletTransactions).values({
      walletId: wallet.id,
      type: 'deposit',
      amount: String(amount),
      description: 'Wallet deposit via Stripe',
      stripeIntentId: session.payment_intent as string,
      status: 'completed',
    });

    console.log(`Wallet deposit completed for user ${userId}: $${amount}`);
  }

  /**
   * Handle successful payment intent
   */
  private async handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    console.log('Payment intent succeeded:', paymentIntent.id);
    // Additional handling if needed
  }

  /**
   * Handle failed payment intent
   */
  private async handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    console.error('Payment intent failed:', paymentIntent.id, paymentIntent.last_payment_error);
    // Update transaction status to failed
  }

  /**
   * Get publishable key for frontend
   */
  getPublishableKey(): string {
    return process.env.VITE_STRIPE_PUBLIC_KEY || '';
  }
}

export const stripeService = new StripeService();
