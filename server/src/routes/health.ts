import { Router } from "express";
import { db, testDbConnection } from "../config/db";
import { redis, connectRedis } from "../config/redis";

export const healthRouter = Router();

healthRouter.get("/", async (_req, res) => {
  const status = {
    api: "ok",
    db: "unknown",
    redis: "unknown"
  };

  try {
    await testDbConnection();
    status.db = "ok";
  } catch {
    status.db = "error";
  }

  try {
    await connectRedis();
    status.redis = redis.isOpen ? "ok" : "error";
  } catch {
    status.redis = "error";
  }

  res.json(status);
});
