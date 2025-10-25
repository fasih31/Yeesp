import { Router, Request, Response } from 'express';
import { requireAuth } from './middleware/auth';
import { db } from './db';
import { sql } from 'drizzle-orm';

const router = Router();

/**
 * Submit a course review
 */
router.post('/course/:courseId', requireAuth, async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const { rating, comment } = req.body;
    const studentId = (req as any).user.id;

    // Insert review (we'll add proper table later when schema is updated)
    await db.execute(sql`
      INSERT INTO course_reviews (course_id, student_id, rating, comment)
      VALUES (${courseId}, ${studentId}, ${rating}, ${comment})
      ON CONFLICT (course_id, student_id) 
      DO UPDATE SET rating = ${rating}, comment = ${comment}, created_at = NOW()
    `);

    res.json({ success: true });
  } catch (error: any) {
    console.error('Error submitting course review:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get course reviews
 */
router.get('/course/:courseId', async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;

    const reviews = await db.execute(sql`
      SELECT cr.*, u.name as reviewer_name, u.avatar as reviewer_avatar
      FROM course_reviews cr
      JOIN users u ON cr.student_id = u.id
      WHERE cr.course_id = ${courseId}
      ORDER BY cr.created_at DESC
    `);

    res.json(reviews.rows || []);
  } catch (error: any) {
    console.error('Error fetching course reviews:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Submit a tutor review
 */
router.post('/tutor/:tutorId', requireAuth, async (req: Request, res: Response) => {
  try {
    const { tutorId } = req.params;
    const { rating, comment, sessionId } = req.body;
    const studentId = (req as any).user.id;

    await db.execute(sql`
      INSERT INTO tutor_reviews (tutor_id, student_id, rating, comment, session_id)
      VALUES (${tutorId}, ${studentId}, ${rating}, ${comment}, ${sessionId})
    `);

    res.json({ success: true });
  } catch (error: any) {
    console.error('Error submitting tutor review:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get tutor reviews with average rating
 */
router.get('/tutor/:tutorId', async (req: Request, res: Response) => {
  try {
    const { tutorId } = req.params;

    const [stats] = (await db.execute(sql`
      SELECT 
        COALESCE(AVG(rating)::numeric(10,1), 0) as avg_rating,
        COUNT(*)::int as total_reviews
      FROM tutor_reviews
      WHERE tutor_id = ${tutorId}
    `)).rows;

    const reviews = await db.execute(sql`
      SELECT tr.*, u.name as reviewer_name, u.avatar as reviewer_avatar
      FROM tutor_reviews tr
      JOIN users u ON tr.student_id = u.id
      WHERE tr.tutor_id = ${tutorId}
      ORDER BY tr.created_at DESC
      LIMIT 50
    `);

    res.json({
      avgRating: stats?.avg_rating || 0,
      totalReviews: stats?.total_reviews || 0,
      reviews: reviews.rows || [],
    });
  } catch (error: any) {
    console.error('Error fetching tutor reviews:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
