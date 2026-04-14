import axios from "axios";

const API = axios.create({
  baseURL: "https://alumni-portal-a442.onrender.com/api", // ✅ your backend
});

// ✅ attach token automatically
API.interceptors.request.use((req) => {
  import axios from "axios";

const API = axios.create({
  baseURL: "https://alumni-portal-a442.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  console.log("SENDING TOKEN:", token); // 🔍 DEBUG

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;