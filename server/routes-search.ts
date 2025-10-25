import { Router, Request, Response } from 'express';
import { db } from './db';
import { courses, users, projects } from '@shared/schema';
import { sql, ilike, and, or, gte, lte, eq } from 'drizzle-orm';

const router = Router();

/**
 * Advanced search for courses
 */
router.get('/courses', async (req: Request, res: Response) => {
  try {
    const { 
      query, 
      category, 
      level, 
      minPrice, 
      maxPrice, 
      rating, 
      sortBy = 'relevance' 
    } = req.query;

    let conditions = [];

    if (query) {
      conditions.push(
        or(
          ilike(courses.title, `%${query}%`),
          ilike(courses.description, `%${query}%`)
        )
      );
    }

    if (category && category !== 'all') {
      conditions.push(eq(courses.category, category as string));
    }

    if (level && level !== 'all') {
      conditions.push(eq(courses.level, level as string));
    }

    if (minPrice) {
      conditions.push(gte(courses.price, parseFloat(minPrice as string)));
    }

    if (maxPrice) {
      conditions.push(lte(courses.price, parseFloat(maxPrice as string)));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    let orderBy;
    switch (sortBy) {
      case 'newest':
        orderBy = sql`${courses.createdAt} DESC`;
        break;
      case 'price-low':
        orderBy = sql`${courses.price} ASC`;
        break;
      case 'price-high':
        orderBy = sql`${courses.price} DESC`;
        break;
      case 'rating':
        orderBy = sql`${courses.createdAt} DESC`;
        break;
      case 'popular':
        orderBy = sql`${courses.createdAt} DESC`;
        break;
      default:
        orderBy = sql`${courses.createdAt} DESC`;
    }

    const results = await db.query.courses.findMany({
      where: whereClause,
      with: {
        tutor: {
          columns: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      limit: 50,
    });

    res.json(results);
  } catch (error: any) {
    console.error('Error searching courses:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Advanced search for tutors
 */
router.get('/tutors', async (req: Request, res: Response) => {
  try {
    const { 
      query, 
      category, 
      minPrice, 
      maxPrice, 
      rating, 
      sortBy = 'relevance' 
    } = req.query;

    let whereClause = sql`role = 'tutor' OR 'tutor' = ANY(approved_roles)`;

    if (query) {
      whereClause = sql`${whereClause} AND (name ILIKE ${'%' + query + '%'} OR bio ILIKE ${'%' + query + '%'})`;
    }

    const results = await db.execute(sql`
      SELECT id, name, email, avatar, bio, created_at
      FROM users
      WHERE ${whereClause}
      LIMIT 50
    `);

    res.json(results.rows);
  } catch (error: any) {
    console.error('Error searching tutors:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Advanced search for projects
 */
router.get('/projects', async (req: Request, res: Response) => {
  try {
    const { 
      query, 
      category, 
      minBudget, 
      maxBudget, 
      sortBy = 'relevance' 
    } = req.query;

    let conditions = [];

    if (query) {
      conditions.push(
        or(
          ilike(projects.title, `%${query}%`),
          ilike(projects.description, `%${query}%`)
        )
      );
    }

    if (category && category !== 'all') {
      conditions.push(eq(projects.category, category as string));
    }

    if (minBudget) {
      conditions.push(gte(projects.budget, parseFloat(minBudget as string)));
    }

    if (maxBudget) {
      conditions.push(lte(projects.budget, parseFloat(maxBudget as string)));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    let orderBy;
    switch (sortBy) {
      case 'newest':
        orderBy = sql`${projects.createdAt} DESC`;
        break;
      case 'price-low':
        orderBy = sql`${projects.budget} ASC`;
        break;
      case 'price-high':
        orderBy = sql`${projects.budget} DESC`;
        break;
      default:
        orderBy = sql`${projects.createdAt} DESC`;
    }

    const results = await db.query.projects.findMany({
      where: whereClause,
      with: {
        client: {
          columns: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      limit: 50,
    });

    res.json(results);
  } catch (error: any) {
    console.error('Error searching projects:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
