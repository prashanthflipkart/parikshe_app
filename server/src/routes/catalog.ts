import { Router } from "express";
import { db } from "../config/db";

export const catalogRouter = Router();

catalogRouter.get("/categories", async (_req, res) => {
  const result = await db.query("SELECT id, name FROM categories ORDER BY name");
  res.json({ categories: result.rows });
});

catalogRouter.get("/products", async (req, res) => {
  const categoryId = req.query.categoryId as string | undefined;
  const params: string[] = [];
  let query =
    "SELECT id, category_id as \"categoryId\", title, type, duration_months as \"durationMonths\", price FROM products WHERE is_active = TRUE";

  if (categoryId) {
    params.push(categoryId);
    query += " AND category_id = $1";
  }

  const result = await db.query(query, params);
  res.json({ products: result.rows });
});

catalogRouter.get("/products/:id", async (req, res) => {
  const result = await db.query(
    `
      SELECT id, category_id as "categoryId", title, type,
             duration_months as "durationMonths", price
      FROM products
      WHERE id = $1
      LIMIT 1
    `,
    [req.params.id]
  );

  if (!result.rows[0]) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json({ product: result.rows[0] });
});

catalogRouter.get("/subjects", async (req, res) => {
  const categoryId = req.query.categoryId as string | undefined;
  if (!categoryId) {
    return res.status(400).json({ message: "categoryId is required" });
  }

  const result = await db.query(
    "SELECT id, name FROM subjects WHERE category_id = $1 ORDER BY name",
    [categoryId]
  );
  return res.json({ subjects: result.rows });
});

catalogRouter.get("/chapters", async (req, res) => {
  const subjectId = req.query.subjectId as string | undefined;
  if (!subjectId) {
    return res.status(400).json({ message: "subjectId is required" });
  }

  const result = await db.query(
    "SELECT id, name FROM chapters WHERE subject_id = $1 ORDER BY name",
    [subjectId]
  );
  return res.json({ chapters: result.rows });
});

catalogRouter.get("/topics", async (req, res) => {
  const chapterId = req.query.chapterId as string | undefined;
  if (!chapterId) {
    return res.status(400).json({ message: "chapterId is required" });
  }

  const result = await db.query(
    "SELECT id, name FROM topics WHERE chapter_id = $1 ORDER BY name",
    [chapterId]
  );
  return res.json({ topics: result.rows });
});

catalogRouter.get("/lessons", async (req, res) => {
  const topicId = req.query.topicId as string | undefined;
  if (!topicId) {
    return res.status(400).json({ message: "topicId is required" });
  }

  const result = await db.query(
    `
      SELECT id, title, duration_minutes as "durationMinutes", is_free as "isFree"
      FROM lessons
      WHERE topic_id = $1
      ORDER BY title
    `,
    [topicId]
  );
  return res.json({ lessons: result.rows });
});

catalogRouter.get("/lessons/:id", async (req, res) => {
  const result = await db.query(
    `
      SELECT id, title, duration_minutes as "durationMinutes", is_free as "isFree",
             video_url as "videoUrl", notes_url as "notesUrl"
      FROM lessons
      WHERE id = $1
      LIMIT 1
    `,
    [req.params.id]
  );

  if (!result.rows[0]) {
    return res.status(404).json({ message: "Lesson not found" });
  }

  return res.json({ lesson: result.rows[0] });
});
