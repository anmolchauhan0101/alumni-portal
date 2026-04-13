import axios from "axios";

const API = axios.create({
  baseURL: "https://alumni-portal-a442.onrender.com/api",
});

// ✅ Attach token
API.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

export default API;