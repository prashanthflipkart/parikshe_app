import { API_BASE } from "./api";

export const getAnalyticsSummary = async () => {
  const response = await fetch(`${API_BASE}/analytics/summary`);
  return response.json();
};
