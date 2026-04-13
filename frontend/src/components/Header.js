"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header({ toggleSidebar, toggleRightPanel }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔥 Check auth
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    // Initial check
    checkAuth();

    // 🔥 Listen for login/logout event
    window.addEventListener("authChanged", checkAuth);

    return () => {
      window.removeEventListener("authChanged", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    // 🔥 Trigger update
    window.dispatchEvent(new Event("authChanged"));

    router.push("/login");
  };

  return (
    <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-xl bg-slate-800 px-3 py-1 rounded-lg hover:bg-slate-700"
        >
          ☰
        </button>
      </div>

      {/* CENTER */}
      <h2
        className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold cursor-pointer"
        onClick={() => router.push("/")}
      >
        🎓 Alumni Connect
      </h2>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        <button
          onClick={toggleRightPanel}
          className="bg-slate-800 px-3 py-2 rounded-lg hover:bg-slate-700"
        >
          ⚡
        </button>

        {isLoggedIn ? (
          <>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Dashboard
            </button>

            <button
              onClick={() => router.push("/profile")}
              className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600"
            >
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => router.push("/login")}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>

            <button
              onClick={() => router.push("/signup")}
              className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
            >
              Signup
            </button>
          </>
        )}
      </div>
    </header>
  );
}