import { Router } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { db } from "../config/db";
import { redis, connectRedis } from "../config/redis";
import { env } from "../config/env";
import { requireAuth, AuthedRequest } from "../middleware/auth";

export const authRouter = Router();

const requestSchema = z.object({
  phone: z.string().min(8).max(20)
});

const verifySchema = z.object({
  phone: z.string().min(8).max(20),
  otp: z.string().length(6),
  category: z.string().min(1),
  grade: z.string().min(1),
  examMonth: z.string().optional(),
  languagePref: z.string().optional()
});

authRouter.post("/otp/request", async (req, res) => {
  const parsed = requestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid phone number" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const key = `otp:${parsed.data.phone}`;

  await connectRedis();
  await redis.set(key, otp, { EX: 300 });

  res.json({
    status: "ok",
    message: "OTP generated",
    devOtp: env.NODE_ENV === "development" ? otp : undefined
  });
});

authRouter.post("/otp/verify", async (req, res) => {
  const parsed = verifySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid payload" });
  }

  await connectRedis();
  const key = `otp:${parsed.data.phone}`;
  const stored = await redis.get(key);

  if (!stored || stored !== parsed.data.otp) {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  const { phone, category, grade, examMonth, languagePref } = parsed.data;
  const userResult = await db.query(
    "SELECT id, phone FROM users WHERE phone = $1 LIMIT 1",
    [phone]
  );

  let userId = userResult.rows[0]?.id as string | undefined;

  if (!userId) {
    const newId = randomUUID();
    await db.query("INSERT INTO users (id, phone) VALUES ($1, $2)", [newId, phone]);
    userId = newId;
  }

  await db.query(
    `
      INSERT INTO profiles (user_id, category, grade, exam_month, language_pref)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (user_id)
      DO UPDATE SET category = EXCLUDED.category,
                    grade = EXCLUDED.grade,
                    exam_month = EXCLUDED.exam_month,
                    language_pref = EXCLUDED.language_pref,
                    updated_at = NOW()
    `,
    [userId, category, grade, examMonth ?? null, languagePref ?? null]
  );

  const token = jwt.sign({ userId, phone }, env.JWT_SECRET, { expiresIn: "7d" });

  return res.json({ status: "ok", token });
});

authRouter.get("/me", requireAuth, async (req: AuthedRequest, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const result = await db.query(
    `
      SELECT u.id, u.phone, p.category, p.grade, p.exam_month, p.language_pref
      FROM users u
      LEFT JOIN profiles p ON p.user_id = u.id
      WHERE u.id = $1
    `,
    [userId]
  );

  return res.json({ user: result.rows[0] });
});
