// AI-powered recommendation service
// In production, integrate with OpenAI/similar API

import OpenAI from "openai";
import { db } from "../db";
import { courses, enrollments, lessonProgress, assignments, submissions, quizResults } from "@db/schema";
import { eq, desc, and } from "drizzle-orm";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function generateRecommendations(userId: string) {
  try {
    // Get user's enrolled courses and progress
    const userEnrollments = await db.query.enrollments.findMany({
      where: eq(enrollments.userId, userId),
      with: {
        course: true,
      },
    });

    const completedCourses = userEnrollments
      .filter((e) => e.completionPercentage === 100)
      .map((e) => e.course.title);

    const inProgressCourses = userEnrollments
      .filter((e) => e.completionPercentage > 0 && e.completionPercentage < 100)
      .map((e) => e.course.title);

    // Get quiz performance
    const quizzes = await db.query.quizResults.findMany({
      where: eq(quizResults.userId, userId),
      orderBy: [desc(quizResults.createdAt)],
      limit: 10,
    });

    const avgQuizScore = quizzes.length > 0
      ? quizzes.reduce((sum, q) => sum + (q.score / q.totalScore * 100), 0) / quizzes.length
      : 0;

    const prompt = `Based on a student who has:
- Completed courses: ${completedCourses.join(", ") || "None"}
- In-progress courses: ${inProgressCourses.join(", ") || "None"}
- Average quiz performance: ${avgQuizScore.toFixed(1)}%

Recommend 5 courses they should take next to advance their learning. Focus on logical progression and skill building.
Format as JSON array: [{ "title": "Course Name", "reason": "Why this course", "difficulty": "beginner|intermediate|advanced" }]`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return null;
  }
}

export async function generatePersonalizedLearningPath(userId: string, goal: string) {
  try {
    const userEnrollments = await db.query.enrollments.findMany({
      where: eq(enrollments.userId, userId),
      with: {
        course: true,
      },
    });

    const completedCourses = userEnrollments
      .filter((e) => e.completionPercentage === 100)
      .map((e) => ({ title: e.course.title, category: e.course.category }));

    const prompt = `Create a personalized learning path for a student with goal: "${goal}"
Current knowledge: ${JSON.stringify(completedCourses)}

Generate a step-by-step learning path with 6-8 courses/topics.
Format as JSON: [{ "step": 1, "title": "Course Title", "description": "What they'll learn", "estimatedWeeks": 4 }]`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Learning Path Error:", error);
    return null;
  }
}