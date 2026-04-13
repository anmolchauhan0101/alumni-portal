"use client";

import { useRouter, usePathname } from "next/navigation";

export default function Sidebar({ isOpen }) {
  const router = useRouter();
  const pathname = usePathname();

  const menu = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Profile", path: "/profile", icon: "👤" },
    { name: "Connections", path: "/connections", icon: "🤝" },
    { name: "Chat", path: "/chat", icon: "💬" },
  ];

  return (
    <div className="h-full p-3 space-y-2">

      {menu.map((item) => {
        const isActive = pathname === item.path;

        return (
          <div
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
              ${
                isActive
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-400 hover:bg-slate-800 hover:text-white"
              }`}
          >
            <span className="text-lg">{item.icon}</span>

            {isOpen && (
              <span className="font-medium tracking-wide">
                {item.name}
              </span>
            )}
          </div>
        );
      })}

    </div>
  );
}