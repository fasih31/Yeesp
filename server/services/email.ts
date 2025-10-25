// Generic email service - works with SendGrid, Mailgun, SMTP, etc.
// Configure via environment variables

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export class EmailService {
  private provider: 'sendgrid' | 'mailgun' | 'smtp';

  constructor() {
    this.provider = (process.env.EMAIL_PROVIDER as any) || 'smtp';
  }

  async send(options: EmailOptions): Promise<void> {
    // In development, just log emails
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Email (DEV MODE):', {
        to: options.to,
        subject: options.subject,
        preview: options.html.substring(0, 100) + '...',
      });
      return;
    }

    // TODO: Implement actual email sending based on provider
    // For now, this is a placeholder
    switch (this.provider) {
      case 'sendgrid':
        await this.sendViaSendGrid(options);
        break;
      case 'mailgun':
        await this.sendViaMailgun(options);
        break;
      case 'smtp':
        await this.sendViaSMTP(options);
        break;
    }
  }

  private async sendViaSendGrid(options: EmailOptions): Promise<void> {
    // TODO: Implement SendGrid integration
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send(options);
  }

  private async sendViaMailgun(options: EmailOptions): Promise<void> {
    // TODO: Implement Mailgun integration
  }

  private async sendViaSMTP(options: EmailOptions): Promise<void> {
    // TODO: Implement nodemailer SMTP
  }
}

export const emailService = new EmailService();

// Email templates
export const emailTemplates = {
  welcome: (name: string) => `
    <h1>Welcome to YEESP, ${name}!</h1>
    <p>Thank you for joining our platform. Start learning and earning today!</p>
  `,

  assignmentSubmitted: (studentName: string, assignmentTitle: string) => `
    <h2>New Assignment Submission</h2>
    <p><strong>${studentName}</strong> has submitted the assignment: <strong>${assignmentTitle}</strong></p>
    <p>Please review and provide feedback.</p>
  `,

  assignmentGraded: (assignmentTitle: string, grade: number, totalPoints: number) => `
    <h2>Assignment Graded</h2>
    <p>Your assignment <strong>${assignmentTitle}</strong> has been graded.</p>
    <p>Score: <strong>${grade}/${totalPoints}</strong></p>
  `,

  milestoneApproved: (milestoneTitle: string, amount: string) => `
    <h2>Milestone Approved!</h2>
    <p>Your milestone <strong>${milestoneTitle}</strong> has been approved.</p>
    <p>Payment of <strong>$${amount}</strong> will be released shortly.</p>
  `,

  supportTicketReply: (ticketSubject: string) => `
    <h2>New Reply to Your Support Ticket</h2>
    <p>There's a new reply to your ticket: <strong>${ticketSubject}</strong></p>
    <p>Log in to view the response.</p>
  `,

  kycApproved: () => `
    <h2>KYC Verification Approved</h2>
    <p>Congratulations! Your identity verification has been approved.</p>
    <p>You now have full access to all platform features.</p>
  `,

  kycRejected: (reason: string) => `
    <h2>KYC Verification Rejected</h2>
    <p>Unfortunately, your identity verification was not approved.</p>
    <p>Reason: ${reason}</p>
    <p>Please resubmit your documents.</p>
  `,
};
