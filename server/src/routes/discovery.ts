import { Router } from "express";
import { db } from "../config/db";

export const discoveryRouter = Router();

discoveryRouter.get("/", async (_req, res) => {
  const liveResult = await db.query(
    `
      SELECT id, title, teacher_name as "teacherName", starts_at as "startsAt"
      FROM live_classes
      ORDER BY starts_at ASC
      LIMIT 1
    `
  );

  res.json({
    continueLearning: null,
    todayPlan: [
      { id: "plan_1", title: "Watch 1 lesson", minutes: 12 },
      { id: "plan_2", title: "Attempt 10 MCQs", minutes: 10 }
    ],
    nextLive: liveResult.rows[0] ?? null,
    testOfDay: { id: "test_1", title: "Light - Refraction", questionCount: 10 }
  });
});
