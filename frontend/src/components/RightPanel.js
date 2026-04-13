"use client";

export default function RightPanel() {
  return (
    <div className="h-full p-5 space-y-6">

      {/* Quick Links */}
      <div className="bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-700">
        <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
          Quick Links
        </h3>

        <div className="space-y-2 text-sm">
          <p className="cursor-pointer text-gray-400 hover:text-white transition">
            📞 Contact Us
          </p>
          <p className="cursor-pointer text-gray-400 hover:text-white transition">
            ⚙ Settings
          </p>
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-700">
        <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
          Suggestions
        </h3>

        <div className="space-y-3 text-sm">
          {["Rahul", "Priya", "Amit"].map((name, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="text-gray-300">{name}</span>
              <button className="text-blue-400 hover:text-blue-500 text-xs">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}