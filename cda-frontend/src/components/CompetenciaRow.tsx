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
    <div className="group flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
      {/* Lado esquerdo */}
      <div className="flex items-center gap-3 w-1/3">
        <span className="text-[10px] font-black text-slate-300 tracking-tight uppercase w-10">
          ⚖️ {weight}
        </span>

        <span className="text-sm font-semibold text-slate-700 truncate">
          {label}
        </span>

        <button
          type="button"
          aria-label="Ver detalhes da competência"
          title="Ver detalhes"
          className="text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ⓘ
        </button>
      </div>

      {/* Barra de progresso */}
      <div className="flex items-center gap-6 flex-1">
        <span className="text-xs font-bold text-slate-500 w-10 text-right">
          {safeScore}%
        </span>

        <div className="flex-1 h-1.5 bg-slate-100 rounded-full relative">
          {/* Preenchimento */}
          <div
            className={`h-full ${barColor} rounded-full transition-all duration-700`}
            style={{ width: `${safeScore}%` }}
          />

          {/* Marcador de meta */}
          <div
            className="absolute top-[-4px] h-3.5 w-[2px] bg-slate-900 rounded-full"
            style={{ left: `${safeTarget}%` }}
            aria-label="Meta"
            title={`Meta: ${safeTarget}%`}
          />
        </div>
      </div>

      {/* Lado direito */}
      <div className="flex items-center gap-3 ml-6">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-black text-xs">
          {level}
        </div>

        <button
          type="button"
          aria-label="Ver comentários"
          title="Comentários"
          className="text-slate-300 hover:text-slate-600 transition-colors"
        >
          💬
        </button>

        <button
          type="button"
          aria-label="Expandir detalhes"
          title="Expandir"
          className="text-slate-300 hover:text-slate-600 transition-colors"
        >
          ⌄
        </button>
      </div>
    </div>
  );
};
