import { API_BASE } from "./api";

export const fetchMediaToken = async () => {
  const response = await fetch(`${API_BASE}/media/token`);
  return response.json();
};

export const fetchRelatedVideos = async () => {
  const response = await fetch(`${API_BASE}/media/related`);
  return response.json();
};
