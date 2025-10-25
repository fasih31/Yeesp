import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import { db } from '../db';
import { certificates, users, courses } from '@shared/schema';
import { eq, and } from 'drizzle-orm';

export interface CertificateData {
  studentName: string;
  courseName: string;
  completionDate: Date;
  instructorName: string;
  certificateId: string;
  verificationUrl: string;
}

export class CertificateService {
  /**
   * Generate a certificate PDF
   */
  async generateCertificatePDF(data: CertificateData): Promise<Buffer> {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = new PDFDocument({ 
          size: 'LETTER',
          layout: 'landscape',
          margins: { top: 50, bottom: 50, left: 72, right: 72 }
        });

        const chunks: Buffer[] = [];
        
        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        // Background and Border
        doc.rect(0, 0, doc.page.width, doc.page.height)
           .fillAndStroke('#f8f9fa', '#0ea5e9')
           .lineWidth(20);

        doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60)
           .stroke('#0ea5e9')
           .lineWidth(2);

        // Header - YEESP Branding
        doc.fontSize(36)
           .fillColor('#0ea5e9')
           .font('Helvetica-Bold')
           .text('YEESP', 0, 80, { align: 'center' });

        doc.fontSize(16)
           .fillColor('#64748b')
           .font('Helvetica')
           .text('Youth Education and Employment Support Platform', 0, 125, { align: 'center' });

        // Certificate Title
        doc.fontSize(48)
           .fillColor('#0f172a')
           .font('Helvetica-Bold')
           .text('Certificate of Completion', 0, 180, { align: 'center' });

        // Divider Line
        doc.moveTo(200, 250)
           .lineTo(doc.page.width - 200, 250)
           .stroke('#cbd5e1');

        // Presented to
        doc.fontSize(16)
           .fillColor('#64748b')
           .font('Helvetica')
           .text('This certifies that', 0, 280, { align: 'center' });

        // Student Name
        doc.fontSize(32)
           .fillColor('#0f172a')
           .font('Helvetica-Bold')
           .text(data.studentName, 0, 315, { align: 'center' });

        // Course completion text
        doc.fontSize(16)
           .fillColor('#64748b')
           .font('Helvetica')
           .text('has successfully completed the course', 0, 360, { align: 'center' });

        // Course Name
        doc.fontSize(24)
           .fillColor('#0ea5e9')
           .font('Helvetica-Bold')
           .text(data.courseName, 0, 390, { align: 'center', width: doc.page.width });

        // Completion Date
        doc.fontSize(14)
           .fillColor('#64748b')
           .font('Helvetica')
           .text(`Completed on ${data.completionDate.toLocaleDateString('en-US', { 
             year: 'numeric', 
             month: 'long', 
             day: 'numeric' 
           })}`, 0, 445, { align: 'center' });

        // QR Code for Verification
        const qrCodeData = await QRCode.toDataURL(data.verificationUrl);
        doc.image(qrCodeData, doc.page.width - 150, doc.page.height - 150, { width: 100, height: 100 });

        // Certificate ID
        doc.fontSize(10)
           .fillColor('#94a3b8')
           .font('Helvetica')
           .text(`Certificate ID: ${data.certificateId}`, 0, doc.page.height - 100, { align: 'center' });

        // Signature Line and Instructor
        const signatureY = doc.page.height - 180;
        doc.moveTo(150, signatureY)
           .lineTo(350, signatureY)
           .stroke('#cbd5e1');

        doc.fontSize(12)
           .fillColor('#0f172a')
           .font('Helvetica')
           .text(data.instructorName, 150, signatureY + 10, { align: 'center', width: 200 });

        doc.fontSize(10)
           .fillColor('#64748b')
           .text('Instructor', 150, signatureY + 28, { align: 'center', width: 200 });

        // Footer - Developer Credit
        doc.fontSize(8)
           .fillColor('#94a3b8')
           .font('Helvetica')
           .text('Developed by Fasih ur Rehman', 0, doc.page.height - 40, { align: 'center' });

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Issue a certificate for course completion
   */
  async issueCertificate(userId: string, courseId: string): Promise<string> {
    // Check if certificate already exists
    const [existing] = await db
      .select()
      .from(certificates)
      .where(and(
        eq(certificates.studentId, userId),
        eq(certificates.courseId, courseId)
      ))
      .limit(1);

    if (existing) {
      return existing.id;
    }

    // Get user and course info
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    const [course] = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);

    if (!user || !course) {
      throw new Error('User or course not found');
    }

    // Create certificate record
    const [certificate] = await db
      .insert(certificates)
      .values({
        studentId: userId,
        courseId,
        issuedAt: new Date(),
      })
      .returning();

    return certificate.id;
  }

  /**
   * Get certificate data for PDF generation
   */
  async getCertificateData(certificateId: string): Promise<CertificateData | null> {
    const [certificate] = await db
      .select({
        id: certificates.id,
        studentName: users.name,
        courseName: courses.title,
        completionDate: certificates.issuedAt,
        instructorId: courses.instructorId,
      })
      .from(certificates)
      .innerJoin(users, eq(certificates.studentId, users.id))
      .innerJoin(courses, eq(certificates.courseId, courses.id))
      .where(eq(certificates.id, certificateId))
      .limit(1);

    if (!certificate) {
      return null;
    }

    // Get instructor name
    const [instructor] = await db
      .select({ name: users.name })
      .from(users)
      .where(eq(users.id, certificate.instructorId))
      .limit(1);

    const baseUrl = process.env.APP_URL || 'http://localhost:5000';
    
    return {
      studentName: certificate.studentName,
      courseName: certificate.courseName,
      completionDate: certificate.completionDate,
      instructorName: instructor?.name || 'YEESP Team',
      certificateId: certificate.id,
      verificationUrl: `${baseUrl}/verify-certificate/${certificate.id}`,
    };
  }

  /**
   * Verify a certificate
   */
  async verifyCertificate(certificateId: string): Promise<boolean> {
    const [certificate] = await db
      .select()
      .from(certificates)
      .where(eq(certificates.id, certificateId))
      .limit(1);

    return !!certificate;
  }
}

export const certificateService = new CertificateService();
