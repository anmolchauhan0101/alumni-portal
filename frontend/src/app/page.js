"use client";

import { useEffect, useState } from "react";
import API from "../services/api";
import ProfileCard from "../components/ProfileCard";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users"); // 🔥 backend route
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="px-6 py-8">

      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          🎓 Welcome to Alumni Connect
        </h1>
        <p className="text-gray-400">
          Connect with your college alumni network and grow your career 🚀
        </p>
      </div>

      {/* Cards Grid */}
      {users.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user, i) => (
            <ProfileCard key={i} user={user} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">
          No users found
        </p>
      )}
    </div>
  );
}