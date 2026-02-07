import { Router } from "express";
import { z } from "zod";
import { db } from "../config/db";
import { scrapePariksheCourses } from "../jobs/scrapeParikshe";
import { env } from "../config/env";

export const adminRouter = Router();

adminRouter.use((req, res, next) => {
  const key = req.header("x-admin-key");
  if (!key || key !== env.ADMIN_API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return next();
});

const logAudit = async (action: string, entity: string, entityId: string | null, payload: any) => {
  await db.query(
    `
      INSERT INTO audit_logs (id, actor, action, entity, entity_id, payload)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5)
    `,
    ["admin", action, entity, entityId, payload]
  );
};

adminRouter.get("/categories", async (_req, res) => {
  const result = await db.query("SELECT id, name FROM categories ORDER BY name");
  res.json({ categories: result.rows });
});

adminRouter.post("/categories", async (req, res) => {
  const schema = z.object({ id: z.string().min(1), name: z.string().min(1) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid category payload" });
  }

  await db.query(
    "INSERT INTO categories (id, name) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name",
    [parsed.data.id, parsed.data.name]
  );
  await logAudit("upsert", "category", parsed.data.id, parsed.data);
  res.json({ status: "ok" });
});

adminRouter.patch("/categories/:id", async (req, res) => {
  const schema = z.object({ name: z.string().min(1) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid category payload" });
  }
  const result = await db.query(
    "UPDATE categories SET name = $1 WHERE id = $2 RETURNING id",
    [parsed.data.name, req.params.id]
  );
  if (!result.rows[0]) {
    return res.status(404).json({ message: "Category not found" });
  }
  await logAudit("update", "category", req.params.id, parsed.data);
  res.json({ status: "ok" });
});

adminRouter.delete("/categories/:id", async (req, res) => {
  const result = await db.query("DELETE FROM categories WHERE id = $1 RETURNING id", [
    req.params.id
  ]);
  if (!result.rows[0]) {
    return res.status(404).json({ message: "Category not found" });
  }
  await logAudit("delete", "category", req.params.id, {});
  res.json({ status: "ok" });
});

adminRouter.get("/products", async (_req, res) => {
  const result = await db.query(
    `
      SELECT id, category_id as "categoryId", title, type, duration_months as "durationMonths",
             price, is_active as "isActive"
      FROM products
      ORDER BY title
    `
  );
  res.json({ products: result.rows });
});

adminRouter.post("/products", async (req, res) => {
  const schema = z.object({
    categoryId: z.string().min(1),
    title: z.string().min(1),
    type: z.string().min(1),
    durationMonths: z.number().optional(),
    price: z.number()
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid product payload" });
  }

  const result = await db.query(
    `
      INSERT INTO products (id, category_id, title, type, duration_months, price, is_active)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, TRUE)
      RETURNING id
    `,
    [
      parsed.data.categoryId,
      parsed.data.title,
      parsed.data.type,
      parsed.data.durationMonths ?? null,
      parsed.data.price
    ]
  );
  await logAudit("create", "product", result.rows[0]?.id ?? null, parsed.data);
  res.json({ status: "ok", id: result.rows[0]?.id });
});

adminRouter.get("/content", (_req, res) => {
  res.json({ content: [] });
});

adminRouter.post("/content", (_req, res) => {
  res.json({ status: "ok", message: "Content uploaded (stub)" });
});

adminRouter.get("/live", async (_req, res) => {
  const result = await db.query(
    `
      SELECT id, title, teacher_name as "teacherName", starts_at as "startsAt"
      FROM live_classes
      ORDER BY starts_at DESC
      LIMIT 50
    `
  );
  res.json({ liveClasses: result.rows });
});

adminRouter.post("/live", async (req, res) => {
  const schema = z.object({
    productId: z.string().min(1),
    title: z.string().min(1),
    teacherName: z.string().min(1),
    startsAt: z.string().min(1),
    durationMinutes: z.number().optional()
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid live class payload" });
  }

  const result = await db.query(
    `
      INSERT INTO live_classes (id, product_id, title, teacher_name, starts_at, duration_minutes)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5)
      RETURNING id
    `,
    [
      parsed.data.productId,
      parsed.data.title,
      parsed.data.teacherName,
      parsed.data.startsAt,
      parsed.data.durationMinutes ?? 0
    ]
  );
  await logAudit("create", "live_class", result.rows[0]?.id ?? null, parsed.data);
  res.json({ status: "ok", id: result.rows[0]?.id });
});

adminRouter.get("/coupons", (_req, res) => {
  res.json({ coupons: [] });
});

adminRouter.post("/coupons", (_req, res) => {
  res.json({ status: "ok", message: "Coupon created (stub)" });
});

adminRouter.get("/users", (_req, res) => {
  res.json({ users: [] });
});

adminRouter.post("/users/grant", (_req, res) => {
  res.json({ status: "ok", message: "Access granted (stub)" });
});

adminRouter.get("/reports", (_req, res) => {
  res.json({
    enrollments: 0,
    activeUsers: 0,
    watchTimeHours: 0,
    conversionRate: 0
  });
});

adminRouter.post("/sync/parikshe", async (_req, res) => {
  const results = await scrapePariksheCourses();
  await db.query(
    `
      INSERT INTO sync_logs (id, source, status, synced_count, details)
      VALUES (gen_random_uuid(), $1, $2, $3, $4)
    `,
    ["parikshe_web", "ok", results.length, JSON.stringify(results)]
  );
  res.json({ status: "ok", synced: results.length, results });
});

adminRouter.get("/sync/parikshe/history", async (_req, res) => {
  const result = await db.query(
    `
      SELECT id, source, status, synced_count as "syncedCount", created_at as "createdAt"
      FROM sync_logs
      WHERE source = 'parikshe_web'
      ORDER BY created_at DESC
      LIMIT 10
    `
  );
  res.json({ history: result.rows });
});
