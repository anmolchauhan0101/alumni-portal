"use client";

import { useEffect, useState } from "react";
import API from "../../services/api";
import { useRouter } from "next/navigation";

export default function Profile() {
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
        const res = await API.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-slate-700">

        {/* PROFILE TITLE */}
        <h1 className="text-3xl font-bold mb-6 text-white">
          👤 Profile
        </h1>

        {user ? (
          <>
            {/* NAME */}
            <div className="mb-4">
              <p className="text-gray-400 text-sm">Name</p>
              <p className="text-lg font-semibold text-white">{user.name}</p>
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-lg text-gray-200">{user.email}</p>
            </div>

            {/* COMPANY */}
            <div className="mb-4">
              <p className="text-gray-400 text-sm">Company</p>
              <p className="text-lg text-gray-200">
                {user.company || "Not added"}
              </p>
            </div>

            {/* SKILLS */}
            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-2">Skills</p>

              <div className="flex flex-wrap justify-center gap-2">
                {user.skills && user.skills.length > 0 ? (
                  user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-600 px-3 py-1 rounded-full text-sm text-white"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400">No skills added</p>
                )}
              </div>
            </div>

            {/* BUTTON */}
            <button
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
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