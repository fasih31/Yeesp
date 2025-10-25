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

/**
 * Download report in CSV or PDF format
 */
router.get('/download', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { type, format, fromDate, toDate } = req.query;

    let data: any[] = [];
    let headers: string[] = [];
    let filename = `${type}-report`;

    switch (type) {
      case 'courses':
        const coursesData = await db.execute(sql`
          SELECT 
            c.id,
            c.title,
            c.category,
            c.level,
            c.price,
            u.name as tutor_name,
            COUNT(DISTINCT e.id) as total_enrollments,
            COUNT(DISTINCT CASE WHEN e.completed = true THEN e.id END) as completions,
            c.created_at
          FROM courses c
          LEFT JOIN users u ON c.tutor_id = u.id
          LEFT JOIN enrollments e ON c.id = e.course_id
          WHERE c.created_at BETWEEN ${fromDate} AND ${toDate}
          GROUP BY c.id, c.title, c.category, c.level, c.price, u.name, c.created_at
          ORDER BY c.created_at DESC
        `);
        data = coursesData.rows;
        headers = ['ID', 'Title', 'Category', 'Level', 'Price', 'Tutor', 'Enrollments', 'Completions', 'Created'];
        break;

      case 'students':
        const studentsData = await db.execute(sql`
          SELECT 
            u.id,
            u.name,
            u.email,
            COUNT(DISTINCT e.id) as courses_enrolled,
            COUNT(DISTINCT CASE WHEN e.completed = true THEN e.id END) as courses_completed,
            u.created_at
          FROM users u
          LEFT JOIN enrollments e ON u.id = e.student_id
          WHERE u.role = 'student' AND u.created_at BETWEEN ${fromDate} AND ${toDate}
          GROUP BY u.id, u.name, u.email, u.created_at
          ORDER BY u.created_at DESC
        `);
        data = studentsData.rows;
        headers = ['ID', 'Name', 'Email', 'Enrolled', 'Completed', 'Registered'];
        break;

      case 'tutors':
        const tutorsData = await db.execute(sql`
          SELECT 
            u.id,
            u.name,
            u.email,
            COUNT(DISTINCT c.id) as total_courses,
            COUNT(DISTINCT e.id) as total_students,
            COALESCE(SUM(t.amount), 0) as total_earnings,
            u.created_at
          FROM users u
          LEFT JOIN courses c ON u.id = c.tutor_id
          LEFT JOIN enrollments e ON c.id = e.course_id
          LEFT JOIN wallet_transactions t ON u.id = t.user_id AND t.type = 'earning'
          WHERE (u.role = 'tutor' OR 'tutor' = ANY(u.approved_roles))
            AND u.created_at BETWEEN ${fromDate} AND ${toDate}
          GROUP BY u.id, u.name, u.email, u.created_at
          ORDER BY total_earnings DESC
        `);
        data = tutorsData.rows;
        headers = ['ID', 'Name', 'Email', 'Courses', 'Students', 'Earnings', 'Registered'];
        break;

      case 'classes':
        const classesData = await db.execute(sql`
          SELECT 
            s.id,
            s.title,
            u.name as tutor_name,
            s.scheduled_at,
            s.duration,
            s.status,
            s.video_provider,
            s.created_at
          FROM sessions s
          LEFT JOIN users u ON s.tutor_id = u.id
          WHERE s.created_at BETWEEN ${fromDate} AND ${toDate}
          ORDER BY s.scheduled_at DESC
        `);
        data = classesData.rows;
        headers = ['ID', 'Title', 'Tutor', 'Scheduled', 'Duration', 'Status', 'Provider', 'Created'];
        break;

      case 'billing':
        const billingData = await db.execute(sql`
          SELECT 
            t.id,
            u.name as user_name,
            t.type,
            t.amount,
            t.status,
            t.description,
            t.created_at
          FROM wallet_transactions t
          LEFT JOIN users u ON t.user_id = u.id
          WHERE t.created_at BETWEEN ${fromDate} AND ${toDate}
          ORDER BY t.created_at DESC
        `);
        data = billingData.rows;
        headers = ['ID', 'User', 'Type', 'Amount', 'Status', 'Description', 'Date'];
        break;

      case 'projects':
        const projectsData = await db.execute(sql`
          SELECT 
            p.id,
            p.title,
            u.name as client_name,
            p.budget,
            p.status,
            COUNT(DISTINCT b.id) as total_bids,
            p.created_at
          FROM projects p
          LEFT JOIN users u ON p.client_id = u.id
          LEFT JOIN bids b ON p.id = b.project_id
          WHERE p.created_at BETWEEN ${fromDate} AND ${toDate}
          GROUP BY p.id, p.title, u.name, p.budget, p.status, p.created_at
          ORDER BY p.created_at DESC
        `);
        data = projectsData.rows;
        headers = ['ID', 'Title', 'Client', 'Budget', 'Status', 'Bids', 'Created'];
        break;

      default:
        return res.status(400).json({ error: 'Invalid report type' });
    }

    if (format === 'csv') {
      // Generate CSV
      let csv = headers.join(',') + '\n';
      data.forEach((row: any) => {
        csv += Object.values(row).map((val: any) => 
          typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val
        ).join(',') + '\n';
      });

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}.csv"`);
      res.send(csv);
    } else {
      // For PDF, send JSON for now (you can integrate PDF library later)
      res.json({
        type,
        headers,
        data,
        dateRange: { from: fromDate, to: toDate },
      });
    }
  } catch (error: any) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get report statistics
 */
router.get('/stats/:type', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const { fromDate, toDate } = req.query;

    let stats: any = {};

    switch (type) {
      case 'courses':
        const courseStats = await db.execute(sql`
          SELECT 
            COUNT(DISTINCT c.id) as total_courses,
            COUNT(DISTINCT e.id) as total_enrollments,
            COUNT(DISTINCT CASE WHEN e.completed = true THEN e.id END) as total_completions,
            AVG(c.price)::numeric(10,2) as avg_price
          FROM courses c
          LEFT JOIN enrollments e ON c.id = e.course_id
          WHERE c.created_at BETWEEN ${fromDate} AND ${toDate}
        `);
        stats = courseStats.rows[0];
        break;

      case 'billing':
        const billingStats = await db.execute(sql`
          SELECT 
            SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END)::numeric(10,2) as total_deposits,
            SUM(CASE WHEN type = 'withdrawal' THEN amount ELSE 0 END)::numeric(10,2) as total_withdrawals,
            SUM(CASE WHEN type = 'earning' THEN amount ELSE 0 END)::numeric(10,2) as total_earnings,
            COUNT(*) as total_transactions
          FROM wallet_transactions
          WHERE created_at BETWEEN ${fromDate} AND ${toDate}
        `);
        stats = billingStats.rows[0];
        break;

      default:
        return res.status(400).json({ error: 'Invalid report type' });
    }

    res.json(stats);
  } catch (error: any) {
    console.error('Error fetching report stats:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
