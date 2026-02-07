import { API_BASE } from "./api";

export const createCheckout = async (productId: string, couponCode?: string) => {
  const response = await fetch(`${API_BASE}/purchases/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, couponCode })
  });

  return response.json();
};

export const confirmPurchase = async (
  token: string | null,
  payload: {
    productId: string;
    amount: number;
    status: string;
    paymentOrderId?: string;
    paymentId?: string;
    paymentStatus?: string;
  }
) => {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`${API_BASE}/purchases/confirm`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload)
  });
  return response.json();
};

export const getPurchaseHistory = async (token: string | null) => {
  const response = await fetch(`${API_BASE}/purchases/me`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined
  });
  return response.json();
};

export const getPurchaseDetail = async (token: string | null, id: string) => {
  const response = await fetch(`${API_BASE}/purchases/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined
  });
  return response.json();
};
