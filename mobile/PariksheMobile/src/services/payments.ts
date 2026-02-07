import { API_BASE } from "./api";

export const getRazorpayKey = async () => {
  const response = await fetch(`${API_BASE}/payments/key`);
  return response.json();
};

export const createOrder = async (amount: number) => {
  const response = await fetch(`${API_BASE}/payments/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount })
  });

  return response.json();
};

export const verifyPayment = async (payload: Record<string, string>) => {
  const response = await fetch(`${API_BASE}/payments/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return response.json();
};
