"use client";

import { useEffect, useState } from "react";
import API from "../../services/api";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/me"); // ✅ NO manual headers
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-96 text-center">

        <h1 className="text-2xl font-bold mb-6 text-white">
          Profile
        </h1>

        {user ? (
          <>
            <p className="mb-2 text-gray-300">
              <span className="font-semibold text-white">Name:</span> {user.name}
            </p>

            <p className="mb-4 text-gray-300">
              <span className="font-semibold text-white">Email:</span> {user.email}
            </p>

            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => router.push("/dashboard/edit")}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <p className="text-gray-400">Loading...</p>
        )}

      </div>
    </div>
  );
}