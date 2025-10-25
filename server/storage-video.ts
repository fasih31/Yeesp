import { db } from "./db";
import { sessions, attendance, users } from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";

// Video session management
export async function updateSessionVideo(
  sessionId: string,
  videoData: {
    videoRoomId?: string;
    meetingUrl?: string;
    status?: string;
    startedAt?: Date;
    endedAt?: Date;
    recordingUrl?: string;
  }
) {
  const [session] = await db
    .update(sessions)
    .set(videoData)
    .where(eq(sessions.id, sessionId))
    .returning();
  return session;
}

// Get session with participants and attendance
export async function getSessionWithAttendance(sessionId: string) {
  const session = await db.query.sessions.findFirst({
    where: eq(sessions.id, sessionId),
    with: {
      tutor: true,
      student: true,
    },
  });

  if (!session) return null;

  const attendanceRecords = await db.query.attendance.findMany({
    where: eq(attendance.sessionId, sessionId),
    with: {
      user: true,
    },
    orderBy: desc(attendance.joinedAt),
  });

  return {
    ...session,
    attendance: attendanceRecords,
  };
}

// Record attendance when user joins
export async function recordAttendance(
  sessionId: string,
  userId: string,
  status: string = 'present'
) {
  const [record] = await db
    .insert(attendance)
    .values({
      sessionId,
      userId,
      status,
      joinedAt: new Date(),
    })
    .returning();
  return record;
}

// Update attendance when user leaves
export async function updateAttendanceOnLeave(
  attendanceId: string,
  leftAt: Date
) {
  const record = await db.query.attendance.findFirst({
    where: eq(attendance.id, attendanceId),
  });

  if (!record) return null;

  const durationMinutes = Math.round(
    (leftAt.getTime() - new Date(record.joinedAt).getTime()) / 60000
  );

  const [updated] = await db
    .update(attendance)
    .set({
      leftAt,
      duration: durationMinutes,
    })
    .where(eq(attendance.id, attendanceId))
    .returning();

  return updated;
}

// Get all attendance for a user
export async function getUserAttendance(userId: string) {
  return await db.query.attendance.findMany({
    where: eq(attendance.userId, userId),
    with: {
      session: {
        with: {
          tutor: true,
        },
      },
    },
    orderBy: desc(attendance.joinedAt),
  });
}

// Get attendance statistics for a tutor's sessions
export async function getTutorAttendanceStats(tutorId: string) {
  const tutorSessions = await db.query.sessions.findMany({
    where: eq(sessions.tutorId, tutorId),
  });

  const sessionIds = tutorSessions.map((s) => s.id);

  const allAttendance = await db
    .select()
    .from(attendance)
    .where(
      and(
        // @ts-ignore
        attendance.sessionId.in(sessionIds)
      )
    );

  const totalSessions = tutorSessions.length;
  const totalAttendees = allAttendance.length;
  const avgAttendanceRate = totalSessions > 0 
    ? (allAttendance.filter(a => a.status === 'present').length / totalAttendees) * 100 
    : 0;

  return {
    totalSessions,
    totalAttendees,
    avgAttendanceRate: Math.round(avgAttendanceRate),
    recentAttendance: allAttendance.slice(0, 10),
  };
}

// Mark student as absent if they didn't join
export async function markAbsentStudents(sessionId: string) {
  const session = await db.query.sessions.findFirst({
    where: eq(sessions.id, sessionId),
  });

  if (!session) return null;

  // Check if student attended
  const studentAttendance = await db.query.attendance.findFirst({
    where: and(
      eq(attendance.sessionId, sessionId),
      eq(attendance.userId, session.studentId)
    ),
  });

  // If no attendance record and session is completed, mark as absent
  if (!studentAttendance && session.status === 'completed') {
    await db.insert(attendance).values({
      sessionId,
      userId: session.studentId,
      status: 'absent',
      joinedAt: session.scheduledAt,
    });
  }

  return session;
}
