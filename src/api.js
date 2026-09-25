import axios from "axios";

// Automatically uses the Vercel environment variable in production,
// and falls back to localhost when you are developing locally.
const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: API_URL,
});

export function setToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export async function login(username, password) {
  const response = await api.post("/auth/login/", { username, password });
  localStorage.setItem("access", response.data.access);
  localStorage.setItem("refresh", response.data.refresh);
  setToken(response.data.access);
  localStorage.setItem("username", username);
  return response.data;
}

export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("username");
  setToken(null);
}

const savedToken = localStorage.getItem("access");
if (savedToken) setToken(savedToken);