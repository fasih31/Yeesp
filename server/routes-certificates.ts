import { Router, Request, Response } from 'express';
import { certificateService } from './services/certificate';
import { requireAuth } from './middleware/auth';
import { db } from './db';
import { enrollments, courses } from '@shared/schema';
import { eq, and } from 'drizzle-orm';

const router = Router();

/**
 * Issue a certificate for a completed course
 */
router.post('/issue', requireAuth, async (req: Request, res: Response) => {
  try {
    const { courseId } = req.body;
    const userId = req.user!.id;

    // Verify course completion
    const [enrollment] = await db
      .select()
      .from(enrollments)
      .where(and(
        eq(enrollments.userId, userId),
        eq(enrollments.courseId, courseId),
        eq(enrollments.status, 'completed')
      ))
      .limit(1);

    if (!enrollment) {
      return res.status(400).json({ error: 'Course not completed' });
    }

    const certificateId = await certificateService.issueCertificate(userId, courseId);
    
    res.json({ certificateId });
  } catch (error: any) {
    console.error('Error issuing certificate:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Download certificate PDF
 */
router.get('/download/:certificateId', requireAuth, async (req: Request, res: Response) => {
  try {
    const { certificateId } = req.params;

    const certificateData = await certificateService.getCertificateData(certificateId);
    
    if (!certificateData) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    const pdfBuffer = await certificateService.generateCertificatePDF(certificateData);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="certificate-${certificateId}.pdf"`);
    res.send(pdfBuffer);
  } catch (error: any) {
    console.error('Error downloading certificate:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get user's certificates
 */
router.get('/my-certificates', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const userCertificates = await db.query.certificates.findMany({
      where: (certificates, { eq }) => eq(certificates.userId, userId),
      with: {
        course: true,
      },
    });

    res.json(userCertificates);
  } catch (error: any) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Verify a certificate (public route)
 */
router.get('/verify/:certificateId', async (req: Request, res: Response) => {
  try {
    const { certificateId } = req.params;

    const isValid = await certificateService.verifyCertificate(certificateId);
    
    if (!isValid) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    const certificateData = await certificateService.getCertificateData(certificateId);

    res.json({ valid: true, certificate: certificateData });
  } catch (error: any) {
    console.error('Error verifying certificate:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
