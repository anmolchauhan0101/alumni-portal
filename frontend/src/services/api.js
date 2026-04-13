import axios from "axios";

console.log("🔥 USING NEW API FILE");

const API = axios.create({
  baseURL: "https://alumni-portal-a442.onrender.com/api",
});

API.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = token;
    }
  }
  return req;
});

export default API;