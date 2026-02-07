import { API_BASE } from "./api";

export const requestOtp = async (phone: string) => {
  const response = await fetch(`${API_BASE}/auth/otp/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone })
  });

  return response.json();
};

export const verifyOtp = async (payload: {
  phone: string;
  otp: string;
  category: string;
  grade: string;
  examMonth?: string;
  languagePref?: string;
}) => {
  const response = await fetch(`${API_BASE}/auth/otp/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return response.json();
};

export const getMe = async (token: string) => {
  const response = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.json();
};
