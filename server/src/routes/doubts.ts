import { Router } from "express";

export const doubtsRouter = Router();

doubtsRouter.post("/", (_req, res) => {
  res.json({ status: "ok", ticketId: "D-1042" });
});

doubtsRouter.get("/", (_req, res) => {
  res.json({
    doubts: [
      { id: "D-1042", status: "open", message: "Explain Snell's law" }
    ]
  });
});
