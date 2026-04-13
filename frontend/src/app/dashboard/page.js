"use client";

import { useEffect, useState } from "react";
import API from "../../services/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await API.get("/users/me"); // ✅ clean call
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  return (
    <div className="space-y-6">

      {/* 🔥 Welcome Section */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-md border border-slate-700">
        <h1 className="text-2xl font-bold text-white">
          Welcome, {user?.name || "User"} 👋
        </h1>
        <p className="text-gray-400 mt-2">
          Manage your alumni profile and connections
        </p>
      </div>

      {/* 🔥 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow hover:scale-105 transition">
          <h3 className="text-gray-400 text-sm">Connections</h3>
          <p className="text-2xl font-bold text-white">0</p>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow hover:scale-105 transition">
          <h3 className="text-gray-400 text-sm">Messages</h3>
          <p className="text-2xl font-bold text-white">0</p>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow hover:scale-105 transition">
          <h3 className="text-gray-400 text-sm">Profile Views</h3>
          <p className="text-2xl font-bold text-white">0</p>
        </div>

      </div>

      {/* 🔥 Profile Overview */}
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
          <p className="text-gray-400">Loading...</p>
        )}

        <button
          onClick={() => router.push("/dashboard/edit")}
          className="mt-5 bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-green-700 transition"
        >
          Edit Profile
        </button>
      </div>

    </div>
  );
}

