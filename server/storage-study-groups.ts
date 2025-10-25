
import { db } from "./db";
import { studyGroups, studyGroupMembers, blogPosts, users } from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";

export const studyGroupStorage = {
  async getStudyGroups() {
    return db.select().from(studyGroups).orderBy(desc(studyGroups.createdAt));
  },

  async getStudyGroupsByCourse(courseId: string) {
    return db.select().from(studyGroups).where(eq(studyGroups.courseId, courseId));
  },

  async createStudyGroup(data: typeof studyGroups.$inferInsert) {
    const [group] = await db.insert(studyGroups).values(data).returning();
    return group;
  },

  async joinStudyGroup(groupId: string, userId: string, role: string = "member") {
    const [membership] = await db.insert(studyGroupMembers).values({
      groupId,
      userId,
      role,
    }).returning();
    return membership;
  },

  async leaveStudyGroup(groupId: string, userId: string) {
    await db.delete(studyGroupMembers).where(
      and(
        eq(studyGroupMembers.groupId, groupId),
        eq(studyGroupMembers.userId, userId)
      )
    );
  },

  async getMyStudyGroups(userId: string) {
    const memberships = await db
      .select()
      .from(studyGroupMembers)
      .where(eq(studyGroupMembers.userId, userId));

    const groupIds = memberships.map(m => m.groupId);
    if (groupIds.length === 0) return [];

    return db.select().from(studyGroups).where(eq(studyGroups.id, groupIds[0]));
  },

  async getPublishedBlogPosts() {
    return db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.publishedAt));
  },

  async getBlogPostBySlug(slug: string) {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    return post;
  },

  async createBlogPost(data: typeof blogPosts.$inferInsert) {
    const [post] = await db.insert(blogPosts).values(data).returning();
    return post;
  },

  async updateBlogPost(id: string, data: Partial<typeof blogPosts.$inferInsert>) {
    const [post] = await db.update(blogPosts).set(data).where(eq(blogPosts.id, id)).returning();
    return post;
  },

  async deleteBlogPost(id: string) {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  },
};

