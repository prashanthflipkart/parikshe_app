import { Router } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { env } from "../config/env";
import { db } from "../config/db";

export const paymentsRouter = Router();

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET
});

paymentsRouter.get("/key", (_req, res) => {
  res.json({ keyId: env.RAZORPAY_KEY_ID });
});

paymentsRouter.post("/order", async (req, res) => {
  const amount = Number(req.body?.amount ?? 0);
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  const order = await razorpay.orders.create({
    amount: Math.round(amount * 100),
    currency: "INR",
    receipt: `receipt_${Date.now()}`
  });

  res.json({
    status: "ok",
    orderId: order.id,
    amount: order.amount,
    currency: order.currency
  });
});

paymentsRouter.post("/verify", (req, res) => {
  const { orderId, paymentId, signature } = req.body || {};
  if (!orderId || !paymentId || !signature) {
    return res.status(400).json({ message: "Invalid payload" });
  }

  const generated = crypto
    .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  if (generated !== signature) {
    return res.status(400).json({ message: "Invalid signature" });
  }

  return res.json({ status: "ok" });
});

paymentsRouter.post("/webhook", async (req, res) => {
  const signature = req.headers["x-razorpay-signature"] as string | undefined;
  if (!signature) {
    return res.status(400).json({ message: "Missing signature" });
  }

  const body = JSON.stringify(req.body ?? {});
  const generated = crypto
    .createHmac("sha256", env.RAZORPAY_WEBHOOK_SECRET)
    .update(body)
    .digest("hex");

  if (generated !== signature) {
    return res.status(400).json({ message: "Invalid signature" });
  }

  const orderId = req.body?.payload?.payment?.entity?.order_id as string | undefined;
  const paymentId = req.body?.payload?.payment?.entity?.id as string | undefined;
  if (orderId) {
    await db.query(
      `
        UPDATE purchases
        SET payment_order_id = $1,
            payment_id = $2,
            payment_status = 'paid'
        WHERE payment_order_id = $1
      `,
      [orderId, paymentId ?? null]
    );
  }

  return res.json({ status: "ok" });
});
