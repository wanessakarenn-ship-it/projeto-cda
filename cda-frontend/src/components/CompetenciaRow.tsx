import React from 'react';

interface CompetenciaRowProps {
  label: string;
  weight: string;
  score: number;   // 0 a 100
  target: number;  // 0 a 100
  level: number;
}

export const CompetenciaRow: React.FC<CompetenciaRowProps> = ({
  label,
  weight,
  score,
  target,
  level,
}) => {
  // Garantia de valores válidos
  const safeScore = Math.min(Math.max(score, 0), 100);
  const safeTarget = Math.min(Math.max(target, 0), 100);

  const barColor =
    safeScore >= safeTarget
      ? 'bg-emerald-400'
      : safeScore >= 50
      ? 'bg-indigo-400'
      : 'bg-rose-400';

  return (
    <div className="group flex items-center justify-between p-5 border-b border-slate-800/60 last:border-0 hover:bg-[#131A2C]/35 transition-colors text-left">
      {/* Lado esquerdo */}
      <div className="flex items-center gap-3 w-1/3">
        <span className="text-[10px] font-black text-slate-500 tracking-wider uppercase w-12 shrink-0">
          ⚖️ {weight}
        </span>

        <span className="text-sm font-semibold text-slate-200 truncate">
          {label}
        </span>

        <button
          type="button"
          aria-label="Ver detalhes da competência"
          title="Ver detalhes"
          className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity ml-1"
        >
          ⓘ
        </button>
      </div>

      {/* Barra de progresso */}
      <div className="flex items-center gap-6 flex-1">
        <span className="text-xs font-bold text-slate-400 w-10 text-right">
          {safeScore}%
        </span>

        <div className="flex-1 h-1.5 bg-slate-950 rounded-full relative">
          {/* Preenchimento */}
          <div
            className={`h-full ${barColor} rounded-full transition-all duration-700`}
            style={{ width: `${safeScore}%` }}
          />

          {/* Marcador de meta */}
          <div
            className="absolute top-[-4px] h-3.5 w-[2px] bg-slate-400 rounded-full"
            style={{ left: `${safeTarget}%` }}
            aria-label="Meta"
            title={`Meta: ${safeTarget}%`}
          />
        </div>
      </div>

      {/* Lado direito */}
      <div className="flex items-center gap-3 ml-6">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-xs">
          {level}
        </div>

        <button
          type="button"
          aria-label="Ver comentários"
          title="Comentários"
          className="text-slate-500 hover:text-slate-300 transition-colors"
        >
          💬
        </button>

        <button
          type="button"
          aria-label="Expandir detalhes"
          title="Expandir"
          className="text-slate-500 hover:text-slate-300 transition-colors"
        >
          ⌄
        </button>
      </div>
    </div>
  );
};
