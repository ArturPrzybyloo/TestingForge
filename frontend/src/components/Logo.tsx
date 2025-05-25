import React from 'react';

const Logo: React.FC = () => (
  <div className="flex items-center space-x-2">
    {/* Simple SVG icon */}
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="13" stroke="#22d3ee" strokeWidth="2" fill="#0f172a" />
      <rect x="9" y="9" width="10" height="10" rx="3" fill="#22d3ee" />
    </svg>
    <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text tracking-tight">Testing Forge</span>
  </div>
);

export default Logo; 