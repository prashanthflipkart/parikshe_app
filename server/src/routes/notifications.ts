import { Router } from "express";

export const notificationsRouter = Router();

notificationsRouter.post("/register", (_req, res) => {
  res.json({ status: "ok", message: "FCM token registered (stub)" });
});
