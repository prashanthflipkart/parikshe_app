import { Router } from "express";
import { z } from "zod";
import { db } from "../config/db";
import { requireAuth, AuthedRequest } from "../middleware/auth";

export const purchasesRouter = Router();

purchasesRouter.post("/checkout", async (req, res) => {
  const schema = z.object({
    productId: z.string().min(1),
    couponCode: z.string().optional()
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid productId" });
  }

  const productResult = await db.query(
    'SELECT id, title, price FROM products WHERE id = $1 AND is_active = TRUE LIMIT 1',
    [parsed.data.productId]
  );
  const product = productResult.rows[0];
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let discountPercent = 0;
  if (parsed.data.couponCode?.toUpperCase() === "PARIKSHE10") {
    discountPercent = 10;
  }

  const discountAmount = Math.round((product.price * discountPercent) / 100);
  const total = product.price - discountAmount;

  res.json({
    status: "ok",
    message: "Checkout ready",
    orderId: "order_demo",
    purchaseId: "purchase_demo",
    summary: {
      productId: product.id,
      title: product.title,
      price: product.price,
      discountPercent,
      discountAmount,
      total
    }
  });
});

purchasesRouter.post("/confirm", requireAuth, async (req: AuthedRequest, res) => {
  const schema = z.object({
    productId: z.string().min(1),
    amount: z.number().min(1),
    status: z.string().min(1),
    paymentOrderId: z.string().optional(),
    paymentId: z.string().optional(),
    paymentStatus: z.string().optional()
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid payload" });
  }

  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const purchaseResult = await db.query(
    `
      INSERT INTO purchases (
        id, user_id, product_id, status, amount,
        payment_order_id, payment_id, payment_status
      )
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `,
    [
      userId,
      parsed.data.productId,
      parsed.data.status,
      parsed.data.amount,
      parsed.data.paymentOrderId ?? null,
      parsed.data.paymentId ?? null,
      parsed.data.paymentStatus ?? null
    ]
  );

  await db.query(
    `
      INSERT INTO access_grants (id, user_id, product_id, expires_at)
      VALUES (gen_random_uuid(), $1, $2, NULL)
    `,
    [userId, parsed.data.productId]
  );

  res.json({ status: "ok", purchaseId: purchaseResult.rows[0]?.id });
});

purchasesRouter.get("/me", requireAuth, async (req: AuthedRequest, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const result = await db.query(
    `
      SELECT p.id, p.product_id as "productId", p.status, p.amount,
             p.created_at as "createdAt", pr.title as "productTitle"
      FROM purchases p
      JOIN products pr ON pr.id = p.product_id
      WHERE p.user_id = $1
      ORDER BY p.created_at DESC
    `,
    [userId]
  );
  res.json({ purchases: result.rows });
});

purchasesRouter.get("/:id", requireAuth, async (req: AuthedRequest, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const result = await db.query(
    `
      SELECT p.id, p.product_id as "productId", p.status, p.amount,
             p.created_at as "createdAt", pr.title as "productTitle"
      FROM purchases p
      JOIN products pr ON pr.id = p.product_id
      WHERE p.user_id = $1 AND p.id = $2
      LIMIT 1
    `,
    [userId, req.params.id]
  );

  if (!result.rows[0]) {
    return res.status(404).json({ message: "Purchase not found" });
  }

  res.json({ purchase: result.rows[0] });
});
