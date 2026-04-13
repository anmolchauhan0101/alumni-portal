"use client";

import { useEffect, useState } from "react";
import API from "../../../services/api";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔒 Fetch user
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await API.get("/users/me");

        const user = res.data;

        setName(user.name || "");
        setSkills(user.skills?.join(", ") || "");
        setCompany(user.company || "");

        setLoading(false);
      } catch (err) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  // 🔄 Update
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        "/auth/update",
        {
          name,
          skills: skills.split(",").map((s) => s.trim()),
          company,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FIXED
          },
        }
      );

      alert("Profile updated");

      // 🔥 Go to PROFILE (not dashboard)
      router.push("/profile");

    } catch (err) {
      console.log(err.response?.data);
      alert("Update failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-black">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Edit Profile
        </h2>

        {/* NAME */}
        <label className="block mb-1 font-medium">Name</label>
        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* SKILLS */}
        <label className="block mb-1 font-medium">Skills</label>
        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="e.g. React, Node, Java"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        {/* COMPANY */}
        <label className="block mb-1 font-medium">Company</label>
        <input
          className="w-full border p-2 mb-6 rounded"
          placeholder="Enter your company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <button
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          onClick={handleUpdate}
        >
          Update Profile
        </button>

      </div>
    </div>
  );
}