"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="bg-black text-white px-6 py-3 flex justify-between items-center">

      {/* Logo */}
      <h2
        className="cursor-pointer font-bold text-lg"
        onClick={() => router.push("/dashboard")}
      >
        AlumniConnect
      </h2>

      {/* Navigation */}
      <div className="flex gap-4 items-center">

        <Link href="/dashboard" className="hover:text-gray-300">
          Dashboard
        </Link>

        <Link href="/connections" className="hover:text-gray-300">
          Connections
        </Link>

        <Link href="/chat" className="hover:text-gray-300">
          Chat
        </Link>

        <Link href="/profile" className="hover:text-gray-300">
          Profile
        </Link>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>
    </div>
  );
}