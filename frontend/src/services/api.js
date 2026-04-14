import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 🔥 attach token EVERY request
API.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    console.log("SENDING TOKEN:", token);

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }

  return req;
});

export default API;