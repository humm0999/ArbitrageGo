import React from 'react';

interface LogoProps {
  className?: string;
  collapsed?: boolean;
  isDarkBackground?: boolean;
}

export function Logo({ className = '', collapsed = false, isDarkBackground = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 font-sans ${className}`}>
      {/* High Density Logo Icon */}
      <div className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-lg shrink-0 text-white shadow-sm">
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          ></path>
        </svg>
      </div>

      {!collapsed && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-lg font-bold tracking-tight ${
                isDarkBackground ? 'text-white' : 'text-[#0A192F]'
              }`}
            >
              Arbitrage<span className="text-blue-500">Go</span>
            </span>
            <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30 uppercase tracking-wider">
              PRO
            </span>
          </div>
          <span className="text-[10px] text-gray-400 font-medium tracking-wide mt-0.5">
            High Density Scanner
          </span>
        </div>
      )}
    </div>
  );
}
