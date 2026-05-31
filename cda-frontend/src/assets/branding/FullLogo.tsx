import React from 'react';
import LogoIcon from './LogoIcon';

export const FullLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <LogoIcon className="w-8 h-8" />
      <span className="text-xl font-black text-slate-900 tracking-tighter">
        CDA<span className="text-indigo-600">2026</span>
      </span>
    </div>
  );
};
