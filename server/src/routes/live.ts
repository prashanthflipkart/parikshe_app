import { Router } from "express";
import { db } from "../config/db";

export const liveRouter = Router();

liveRouter.get("/", async (_req, res) => {
  const result = await db.query(
    `
      SELECT id, title, teacher_name as "teacherName",
             starts_at as "startsAt"
      FROM live_classes
      ORDER BY starts_at ASC
      LIMIT 20
    `
  );
  res.json({ liveClasses: result.rows });
});
