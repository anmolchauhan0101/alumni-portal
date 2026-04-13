"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../services/api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");
  const [company, setCompany] = useState("");

  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
        college,
        company,
      });

      alert("Signup successful ✅");

      // optional: auto login token save (if backend returns token)
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      router.push("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      
      <form
        onSubmit={handleSignup}
        className="bg-slate-800 p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Create Account
        </h2>

        <input
          className="w-full p-2 mb-3 rounded bg-slate-700 text-white"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full p-2 mb-3 rounded bg-slate-700 text-white"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full p-2 mb-3 rounded bg-slate-700 text-white"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          className="w-full p-2 mb-3 rounded bg-slate-700 text-white"
          placeholder="College"
          onChange={(e) => setCollege(e.target.value)}
        />

        <input
          className="w-full p-2 mb-5 rounded bg-slate-700 text-white"
          placeholder="Company"
          onChange={(e) => setCompany(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 py-2 rounded hover:bg-green-700"
        >
          Signup
        </button>
      </form>
    </div>
  );
}