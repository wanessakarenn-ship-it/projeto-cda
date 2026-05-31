import React from 'react';

interface ProgressBarProps {
  label: string;
  score: number;
  target: number;
}

const clamp = (value: number) => Math.max(0, Math.min(100, value));

export const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  score,
  target,
}) => {
  const safeScore = clamp(score);
  const safeTarget = clamp(target);

  // Código de cores
  const color =
    safeScore >= safeTarget
      ? 'bg-emerald-500'
      : safeScore >= safeTarget * 0.7
      ? 'bg-amber-400'
      : 'bg-rose-500';

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-bold text-slate-700">
          {label}
        </span>
        <span className="text-sm font-black text-slate-800">
          {safeScore}%
        </span>
      </div>

      <div
        className="h-3 bg-slate-200 rounded-full relative overflow-hidden"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeScore}
      >
        {/* Barra de progresso */}
        <div
          className={`h-full ${color} rounded-full transition-all duration-1000`}
          style={{ width: `${safeScore}%` }}
        />

        {/* Marcador de meta */}
        <div
          className="absolute top-0 h-full w-1 bg-slate-900 rounded-full"
          style={{ left: `${safeTarget}%` }}
          title={`Meta: ${safeTarget}%`}
        />
      </div>
    </div>
  );
};
