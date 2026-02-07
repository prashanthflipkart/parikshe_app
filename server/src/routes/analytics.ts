import { Router } from "express";

export const analyticsRouter = Router();

analyticsRouter.get("/summary", (_req, res) => {
  res.json({
    progressPercent: 68,
    accuracyPercent: 74,
    timeSpentMinutes: 320,
    weakAreas: ["Refraction", "Electricity"]
  });
});
