import { API_BASE } from "./api";

export const registerFcmToken = async (token: string) => {
  const response = await fetch(`${API_BASE}/notifications/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  });

  return response.json();
};
