"use client";

import { useRouter } from "next/navigation";

export default function ProfileCard({ user }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/profile")}
      className="bg-slate-800 p-5 rounded-xl shadow-md cursor-pointer 
                 hover:bg-slate-700 hover:scale-105 transition duration-300"
    >
      <h3 className="text-lg font-semibold text-white mb-1">
        {user.name}
      </h3>

      <p className="text-gray-400 text-sm">
        {user.company}
      </p>

      <div className="mt-3 text-blue-400 text-sm">
        View Profile →
      </div>
    </div>
  );
}