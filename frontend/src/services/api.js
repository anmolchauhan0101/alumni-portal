import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api"
});

// 🔥 Attach token properly
API.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`; // ✅ FIXED
    }
  }
  return req;
});

export default API;