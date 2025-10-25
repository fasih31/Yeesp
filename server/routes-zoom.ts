import { Router, type Request } from 'express';
import { zoomMeetings } from './services/zoom-meetings';
import { db } from './db';
import { sessions } from '@shared/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// Middleware to ensure user is authenticated
function requireAuth(req: Request, res: any, next: any) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
}

// Apply auth middleware to all Zoom routes
router.use(requireAuth);

router.post('/create-meeting', async (req, res) => {
  try {
    const { topic, startTime, duration, timezone, password, agenda } = req.body;

    if (!topic || !startTime || !duration) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const meeting = await zoomMeetings.createMeeting({
      topic,
      type: 2,
      start_time: startTime,
      duration,
      timezone: timezone || 'UTC',
      password,
      agenda,
    });

    // Only return safe data, not start URL
    res.json({
      meetingId: meeting.id.toString(),
      joinUrl: meeting.join_url,
      password: meeting.password,
    });
  } catch (error: any) {
    console.error('Error creating Zoom meeting:', error);
    res.status(500).json({ error: error.message || 'Failed to create Zoom meeting' });
  }
});

router.get('/meeting/:meetingId', async (req, res) => {
  try {
    const { meetingId } = req.params;
    const meeting = await zoomMeetings.getMeeting(meetingId);

    res.json({
      id: meeting.id,
      topic: meeting.topic,
      startTime: meeting.start_time,
      duration: meeting.duration,
      joinUrl: meeting.join_url,
      password: meeting.password,
    });
  } catch (error: any) {
    console.error('Error fetching Zoom meeting:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch Zoom meeting' });
  }
});

router.delete('/meeting/:meetingId', async (req, res) => {
  try {
    const { meetingId } = req.params;
    await zoomMeetings.deleteMeeting(meetingId);

    res.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting Zoom meeting:', error);
    res.status(500).json({ error: error.message || 'Failed to delete Zoom meeting' });
  }
});

router.patch('/meeting/:meetingId', async (req, res) => {
  try {
    const { meetingId } = req.params;
    const updates = req.body;

    await zoomMeetings.updateMeeting(meetingId, updates);

    res.json({ success: true });
  } catch (error: any) {
    console.error('Error updating Zoom meeting:', error);
    res.status(500).json({ error: error.message || 'Failed to update Zoom meeting' });
  }
});

router.post('/session/:sessionId/zoom-meeting', async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const [session] = await db
      .select()
      .from(sessions)
      .where(eq(sessions.id, sessionId));

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Drizzle returns camelCase fields
    const scheduledAt = new Date(session.scheduledAt);
    const duration = session.duration;

    const meeting = await zoomMeetings.createMeeting({
      topic: session.title,
      type: 2,
      start_time: scheduledAt.toISOString(),
      duration: duration,
      timezone: 'UTC',
    });

    await db
      .update(sessions)
      .set({
        zoomMeetingId: meeting.id.toString(),
        zoomPassword: meeting.password,
        meetingUrl: meeting.join_url,
        videoProvider: 'zoom',
      })
      .where(eq(sessions.id, sessionId));

    res.json({
      meetingId: meeting.id.toString(),
      joinUrl: meeting.join_url,
      password: meeting.password,
    });
  } catch (error: any) {
    console.error('Error creating Zoom meeting for session:', error);
    res.status(500).json({ error: error.message || 'Failed to create Zoom meeting for session' });
  }
});

export default router;
