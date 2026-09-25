import axios from "axios";

// Using a clean fallback with the correct double slash
const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "https://ashwamedh-gurukul-lms-3.onrender.com/api";

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