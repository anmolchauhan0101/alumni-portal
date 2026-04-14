"use client";

import { useEffect, useState } from "react";
import API from "../../services/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ Step 1: If no token → go login
    if (!token) {
      router.push("/login");
      return;
    }

   useEffect(() => {
  const token = localStorage.getItem("token");

  console.log("DASHBOARD TOKEN:", token);

  if (!token) {
    router.push("/login");
    return;
  }

  const fetchUser = async () => {
    try {
      const res = await API.get("/users/me");
      setUser(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err.response?.status);

      // ❌ DO NOT REMOVE TOKEN HERE
      if (err.response?.status === 401) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);

  // ✅ Step 3: loading screen
  if (loading) {
    return (
      <div className="text-center text-gray-400 mt-20">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Welcome */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-md border border-slate-700">
        <h1 className="text-2xl font-bold text-white">
          Welcome, {user?.name || "User"} 👋
        </h1>
        <p className="text-gray-400 mt-2">
          Manage your alumni profile and connections
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow">
          <h3 className="text-gray-400 text-sm">Connections</h3>
          <p className="text-2xl font-bold text-white">0</p>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow">
          <h3 className="text-gray-400 text-sm">Messages</h3>
          <p className="text-2xl font-bold text-white">0</p>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow">
          <h3 className="text-gray-400 text-sm">Profile Views</h3>
          <p className="text-2xl font-bold text-white">0</p>
        </div>

      </div>

      {/* Profile */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow">

        <h2 className="text-xl font-semibold text-white mb-4">
          Your Profile
        </h2>

        {user ? (
          <div className="space-y-2 text-gray-300">
            <p>
              <span className="text-white font-medium">Name:</span> {user.name}
            </p>

            <p>
              <span className="text-white font-medium">Email:</span> {user.email}
            </p>

            <p>
              <span className="text-white font-medium">Company:</span>{" "}
              {user.company || "Not added"}
            </p>
          </div>
        ) : (
          <p className="text-gray-400">No data found</p>
        )}

        <button
          onClick={() => router.push("/dashboard/edit")}
          className="mt-5 bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-green-700"
        >
          Edit Profile
        </button>
      </div>

    </div>
  );
}

