"use client";

import { useState } from "react";
import "./globals.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import RightPanel from "../components/RightPanel";
import Footer from "../components/Footer";

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-slate-900 text-gray-200">

        {/* Header */}
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          toggleRightPanel={() => setRightOpen(!rightOpen)}
        />

        <div className="flex min-h-screen">

          {/* LEFT SIDEBAR */}
          <div
            className={`transition-all duration-300 
            ${sidebarOpen ? "w-64" : "w-16"} 
            bg-slate-950 border-r border-gray-800`}
          >
            <Sidebar isOpen={sidebarOpen} />
          </div>

          {/* MAIN */}
          <main className="flex-1 p-6">
            {children}
          </main>

        </div>

        {/* RIGHT PANEL (SLIDE IN) */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-slate-950 border-l border-gray-800 
          transform ${rightOpen ? "translate-x-0" : "translate-x-full"} 
          transition-transform duration-300 z-50`}
        >
          <RightPanel />
        </div>

        {/* OVERLAY */}
        {rightOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setRightOpen(false)}
          />
        )}

        <Footer />

      </body>
    </html>
  );
}