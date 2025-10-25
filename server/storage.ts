import { db } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";
import * as schema from "@shared/schema";
import type {
  User, InsertUser,
  Course, InsertCourse,
  Lesson, InsertLesson,
  Enrollment, InsertEnrollment,
  Session, InsertSession,
  Project, InsertProject,
  Bid, InsertBid,
  Review, InsertReview,
  Payment, InsertPayment,
  Certificate, InsertCertificate,
  Notification, InsertNotification,
  RoleRequest, InsertRoleRequest,
  UserApprovedRole, InsertUserApprovedRole,
  BlogPost, InsertBlogPost,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;
  getUsersByRole(role: string): Promise<User[]>;
  getUserApprovedRoles(userId: string): Promise<string[]>;
  createRoleRequest(data: InsertRoleRequest): Promise<RoleRequest>;
  getRoleRequestsByUser(userId: string): Promise<RoleRequest[]>;
  getPendingRoleRequests(): Promise<RoleRequest[]>;
  updateRoleRequest(id: string, data: Partial<RoleRequest>): Promise<RoleRequest | undefined>;
  approveRoleRequest(requestId: string, adminId: string): Promise<void>;

  // Courses
  getCourse(id: string): Promise<Course | undefined>;
  getCourses(): Promise<Course[]>;
  getCoursesByInstructor(instructorId: string): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: string, course: Partial<InsertCourse>): Promise<Course | undefined>;
  deleteCourse(id: string): Promise<boolean>;

  // Lessons
  getLesson(id: string): Promise<Lesson | undefined>;
  getLessonsByCourse(courseId: string): Promise<Lesson[]>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  updateLesson(id: string, lesson: Partial<InsertLesson>): Promise<Lesson | undefined>;
  deleteLesson(id: string): Promise<boolean>;

  // Enrollments
  getEnrollment(id: string): Promise<Enrollment | undefined>;
  getEnrollmentsByStudent(studentId: string): Promise<Enrollment[]>;
  getEnrollmentsByCourse(courseId: string): Promise<Enrollment[]>;
  getEnrollment(studentId: string, courseId: string): Promise<Enrollment | undefined>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  updateEnrollment(id: string, enrollment: Partial<InsertEnrollment>): Promise<Enrollment | undefined>;

  // Sessions
  getSession(id: string): Promise<Session | undefined>;
  getSessionsByTutor(tutorId: string): Promise<Session[]>;
  getSessionsByStudent(studentId: string): Promise<Session[]>;
  createSession(session: InsertSession): Promise<Session>;
  updateSession(id: string, session: Partial<InsertSession>): Promise<Session | undefined>;

  // Projects
  getProject(id: string): Promise<Project | undefined>;
  getProjects(): Promise<Project[]>;
  getProjectsByRecruiter(recruiterId: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;

  // Bids
  getBid(id: string): Promise<Bid | undefined>;
  getBidsByProject(projectId: string): Promise<Bid[]>;
  getBidsByFreelancer(freelancerId: string): Promise<Bid[]>;
  createBid(bid: InsertBid): Promise<Bid>;
  updateBid(id: string, bid: Partial<InsertBid>): Promise<Bid | undefined>;

  // Reviews
  getReview(id: string): Promise<Review | undefined>;
  getReviewsByReviewee(revieweeId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  // Payments
  getPayment(id: string): Promise<Payment | undefined>;
  getPaymentsByUser(userId: string): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePayment(id: string, payment: Partial<InsertPayment>): Promise<Payment | undefined>;

  // Certificates
  getCertificate(id: string): Promise<Certificate | undefined>;
  getCertificatesByStudent(studentId: string): Promise<Certificate[]>;
  createCertificate(certificate: InsertCertificate): Promise<Certificate>;

  // Notifications
  getNotification(id: string): Promise<Notification | undefined>;
  getNotificationsByUser(userId: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  updateNotification(id: string, notification: Partial<InsertNotification>): Promise<Notification | undefined>;
  markNotificationsAsRead(userId: string): Promise<boolean>;
  getNotifications(userId: string, limit?: number): Promise<Notification[]>;
  createNotification(data: {
    userId: string;
    type: string;
    title: string;
    message: string;
    link?: string;
  }): Promise<Notification>;
  markNotificationRead(notificationId: number): Promise<void>;
  getUnreadCount(userId: string): Promise<number>;

  // Blog Posts
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.email, email));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(schema.users).values(user).returning();
    return newUser;
  }

  async updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined> {
    const [updated] = await db.update(schema.users).set(user).where(eq(schema.users.id, id)).returning();
    return updated;
  }

  async getUsersByRole(role: string): Promise<User[]> {
    return await db.select().from(schema.users).where(eq(schema.users.role, role));
  }

  async getUserApprovedRoles(userId: string): Promise<string[]> {
    const approvedRoles = await db
      .select()
      .from(schema.userApprovedRoles)
      .where(eq(schema.userApprovedRoles.userId, userId));
    return approvedRoles.map(r => r.approvedRole);
  }

  async createRoleRequest(data: InsertRoleRequest): Promise<RoleRequest> {
    const [request] = await db.insert(schema.roleRequests).values(data).returning();
    return request;
  }

  async getRoleRequestsByUser(userId: string): Promise<RoleRequest[]> {
    return await db
      .select()
      .from(schema.roleRequests)
      .where(eq(schema.roleRequests.userId, userId))
      .orderBy(schema.roleRequests.createdAt);
  }

  async getPendingRoleRequests(): Promise<RoleRequest[]> {
    return await db
      .select()
      .from(schema.roleRequests)
      .where(eq(schema.roleRequests.status, 'pending'))
      .orderBy(schema.roleRequests.createdAt);
  }

  async updateRoleRequest(id: string, data: Partial<RoleRequest>): Promise<RoleRequest | undefined> {
    const [request] = await db
      .update(schema.roleRequests)
      .set(data)
      .where(eq(schema.roleRequests.id, id))
      .returning();
    return request;
  }

  async approveRoleRequest(requestId: string, adminId: string): Promise<void> {
    const [request] = await db
      .select()
      .from(schema.roleRequests)
      .where(eq(schema.roleRequests.id, requestId));

    if (!request) throw new Error('Role request not found');

    // Update request status
    await db
      .update(schema.roleRequests)
      .set({
        status: 'approved',
        reviewedBy: adminId,
        reviewedAt: new Date(),
      })
      .where(eq(schema.roleRequests.id, requestId));

    // Add approved role
    await db.insert(schema.userApprovedRoles).values({
      userId: request.userId,
      approvedRole: request.requestedRole,
      approvedBy: adminId,
    });
  }


  // Courses
  async getCourse(id: string): Promise<Course | undefined> {
    const [course] = await db.select().from(schema.courses).where(eq(schema.courses.id, id));
    return course;
  }

  async getCourses(): Promise<Course[]> {
    return await db.select().from(schema.courses).orderBy(desc(schema.courses.createdAt));
  }

  async getCoursesByInstructor(instructorId: string): Promise<Course[] > {
    return await db.select().from(schema.courses).where(eq(schema.courses.instructorId, instructorId));
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await db.insert(schema.courses).values(course).returning();
    return newCourse;
  }

  async updateCourse(id: string, course: Partial<InsertCourse>): Promise<Course | undefined> {
    const [updated] = await db.update(schema.courses).set(course).where(eq(schema.courses.id, id)).returning();
    return updated;
  }

  async deleteCourse(id: string): Promise<boolean> {
    const result = await db.delete(schema.courses).where(eq(schema.courses.id, id));
    return true;
  }

  // Lessons
  async getLesson(id: string): Promise<Lesson | undefined> {
    const [lesson] = await db.select().from(schema.lessons).where(eq(schema.lessons.id, id));
    return lesson;
  }

  async getLessonsByCourse(courseId: string): Promise<Lesson[]> {
    return await db.select().from(schema.lessons).where(eq(schema.lessons.courseId, courseId)).orderBy(schema.lessons.order);
  }

  async createLesson(lesson: InsertLesson): Promise<Lesson> {
    const [newLesson] = await db.insert(schema.lessons).values(lesson).returning();
    return newLesson;
  }

  async updateLesson(id: string, lesson: Partial<InsertLesson>): Promise<Lesson | undefined> {
    const [updated] = await db.update(schema.lessons).set(lesson).where(eq(schema.lessons.id, id)).returning();
    return updated;
  }

  async deleteLesson(id: string): Promise<boolean> {
    await db.delete(schema.lessons).where(eq(schema.lessons.id, id));
    return true;
  }

  // Enrollments
  async getEnrollment(studentIdOrId: string, courseId?: string): Promise<Enrollment | undefined> {
    if (courseId) {
      const [enrollment] = await db.select().from(schema.enrollments)
        .where(and(eq(schema.enrollments.studentId, studentIdOrId), eq(schema.enrollments.courseId, courseId)));
      return enrollment;
    } else {
      const [enrollment] = await db.select().from(schema.enrollments).where(eq(schema.enrollments.id, studentIdOrId));
      return enrollment;
    }
  }

  async getEnrollmentsByStudent(studentId: string): Promise<Enrollment[]> {
    return await db.select().from(schema.enrollments).where(eq(schema.enrollments.studentId, studentId));
  }

  async getEnrollmentsByCourse(courseId: string): Promise<Enrollment[]> {
    return await db.select().from(schema.enrollments).where(eq(schema.enrollments.courseId, courseId));
  }

  async createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment> {
    const [newEnrollment] = await db.insert(schema.enrollments).values(enrollment).returning();
    return newEnrollment;
  }

  async updateEnrollment(id: string, enrollment: Partial<InsertEnrollment>): Promise<Enrollment | undefined> {
    const [updated] = await db.update(schema.enrollments).set(enrollment).where(eq(schema.enrollments.id, id)).returning();
    return updated;
  }

  // Sessions
  async getSession(id: string): Promise<Session | undefined> {
    const [session] = await db.select().from(schema.sessions).where(eq(schema.sessions.id, id));
    return session;
  }

  async getSessionsByTutor(tutorId: string): Promise<Session[]> {
    return await db.select().from(schema.sessions).where(eq(schema.sessions.tutorId, tutorId));
  }

  async getSessionsByStudent(studentId: string): Promise<Session[]> {
    return await db.select().from(schema.sessions).where(eq(schema.sessions.studentId, studentId));
  }

  async createSession(session: InsertSession): Promise<Session> {
    const [newSession] = await db.insert(schema.sessions).values(session).returning();
    return newSession;
  }

  async updateSession(id: string, session: Partial<InsertSession>): Promise<Session | undefined> {
    const [updated] = await db.update(schema.sessions).set(session).where(eq(schema.sessions.id, id)).returning();
    return updated;
  }

  // Projects
  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(schema.projects).where(eq(schema.projects.id, id));
    return project;
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(schema.projects).orderBy(desc(schema.projects.createdAt));
  }

  async getProjectsByRecruiter(recruiterId: string): Promise<Project[]> {
    return await db.select().from(schema.projects).where(eq(schema.projects.recruiterId, recruiterId));
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(schema.projects).values(project).returning();
    return newProject;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const [updated] = await db.update(schema.projects).set(project).where(eq(schema.projects.id, id)).returning();
    return updated;
  }

  // Bids
  async getBid(id: string): Promise<Bid | undefined> {
    const [bid] = await db.select().from(schema.bids).where(eq(schema.bids.id, id));
    return bid;
  }

  async getBidsByProject(projectId: string): Promise<Bid[]> {
    return await db.select().from(schema.bids).where(eq(schema.bids.projectId, projectId));
  }

  async getBidsByFreelancer(freelancerId: string): Promise<Bid[]> {
    return await db.select().from(schema.bids).where(eq(schema.bids.freelancerId, freelancerId));
  }

  async createBid(bid: InsertBid): Promise<Bid> {
    const [newBid] = await db.insert(schema.bids).values(bid).returning();
    return newBid;
  }

  async updateBid(id: string, bid: Partial<InsertBid>): Promise<Bid | undefined> {
    const [updated] = await db.update(schema.bids).set(bid).where(eq(schema.bids.id, id)).returning();
    return updated;
  }

  // Reviews
  async getReview(id: string): Promise<Review | undefined> {
    const [review] = await db.select().from(schema.reviews).where(eq(schema.reviews.id, id));
    return review;
  }

  async getReviewsByReviewee(revieweeId: string): Promise<Review[]> {
    return await db.select().from(schema.reviews).where(eq(schema.reviews.revieweeId, revieweeId));
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db.insert(schema.reviews).values(review).returning();
    return newReview;
  }

  // Payments
  async getPayment(id: string): Promise<Payment | undefined> {
    const [payment] = await db.select().from(schema.payments).where(eq(schema.payments.id, id));
    return payment;
  }

  async getPaymentsByUser(userId: string): Promise<Payment[]> {
    return await db.select().from(schema.payments).where(eq(schema.payments.userId, userId));
  }

  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [newPayment] = await db.insert(schema.payments).values(payment).returning();
    return newPayment;
  }

  async updatePayment(id: string, payment: Partial<InsertPayment>): Promise<Payment | undefined> {
    const [updated] = await db.update(schema.payments).set(payment).where(eq(schema.payments.id, id)).returning();
    return updated;
  }

  // Certificates
  async getCertificate(id: string): Promise<Certificate | undefined> {
    const [certificate] = await db.select().from(schema.certificates).where(eq(schema.certificates.id, id));
    return certificate;
  }

  async getCertificatesByStudent(studentId: string): Promise<Certificate[]> {
    return await db.select().from(schema.certificates).where(eq(schema.certificates.studentId, studentId));
  }

  async createCertificate(certificate: InsertCertificate): Promise<Certificate> {
    const [newCertificate] = await db.insert(schema.certificates).values(certificate).returning();
    return newCertificate;
  }

  // Notifications
  async getNotification(id: string): Promise<Notification | undefined> {
    const [notification] = await db.select().from(schema.notifications).where(eq(schema.notifications.id, id));
    return notification;
  }

  async getNotificationsByUser(userId: string): Promise<Notification[]> {
    return await db.select().from(schema.notifications).where(eq(schema.notifications.userId, userId)).orderBy(desc(schema.notifications.createdAt));
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    const [newNotification] = await db.insert(schema.notifications).values(notification).returning();
    return newNotification;
  }

  async updateNotification(id: string, notification: Partial<InsertNotification>): Promise<Notification | undefined> {
    const [updated] = await db.update(schema.notifications).set(notification).where(eq(schema.notifications.id, id)).returning();
    return updated;
  }

  async markNotificationsAsRead(userId: string): Promise<boolean> {
    await db
      .update(schema.notifications)
      .set({ read: true })
      .where(eq(schema.notifications.userId, userId));
    return true;
  }

  async getNotifications(userId: string, limit: number = 20) {
    const notifications = await db.query.notifications.findMany({
      where: eq(schema.notifications.userId, userId),
      orderBy: [desc(schema.notifications.createdAt)],
      limit,
    });
    return notifications;
  }

  async createNotification(data: {
    userId: string;
    type: string;
    title: string;
    message: string;
    link?: string;
  }) {
    const [notification] = await db.insert(schema.notifications).values({
      ...data,
      read: false,
      createdAt: new Date(),
    }).returning();
    return notification;
  }

  async markNotificationRead(notificationId: number) {
    await db.update(schema.notifications)
      .set({ read: true })
      .where(eq(schema.notifications.id, notificationId));
  }

  async getUnreadCount(userId: string) {
    const result = await db.select({ count: sql<number>`count(*)` })
      .from(schema.notifications)
      .where(and(
        eq(schema.notifications.userId, userId),
        eq(schema.notifications.read, false)
      ));
    return result[0]?.count || 0;
  }

  // Blog Posts
  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(schema.blogPosts).where(eq(schema.blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(schema.blogPosts).where(eq(schema.blogPosts.slug, slug));
    return post;
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.select()
      .from(schema.blogPosts)
      .where(eq(schema.blogPosts.published, true))
      .orderBy(desc(schema.blogPosts.publishedAt));
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(schema.blogPosts).values(post).returning();
    return newPost;
  }

  async updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updated] = await db.update(schema.blogPosts).set(post).where(eq(schema.blogPosts.id, id)).returning();
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(schema.blogPosts).where(eq(schema.blogPosts.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export const storage = new DatabaseStorage();