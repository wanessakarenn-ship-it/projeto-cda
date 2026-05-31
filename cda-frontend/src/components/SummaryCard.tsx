import { ReactNode } from 'react';

interface SummaryCardProps {
  value: string | number;
  label: string;
  subtitle?: string;
  icon?: ReactNode;
  isPositive?: boolean;
}

export const SummaryCard = ({
  value,
  label,
  subtitle,
  icon,
  isPositive = false,
}: SummaryCardProps) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md hover:border-indigo-100 flex flex-col group">
      {/* Topo do Card: Valor e Ícone Próximos */}
      <div className="flex items-center gap-2 mb-1">
        <span
          className={`text-2xl font-black tracking-tighter ${
            isPositive ? 'text-emerald-500' : 'text-slate-900'
          }`}
        >
          {/* Adiciona o + apenas se for positivo e não for string já formatada */}
          {isPositive && typeof value === 'number' && '+'}
          {value}
        </span>

        {icon && (
          <div className={`p-1.5 rounded-lg transition-transform group-hover:scale-110 ${
            isPositive ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-indigo-400'
          }`}>
            {/* Renderiza o ícone com tamanho controlado */}
            {icon}
          </div>
        )}
      </div>

      {/* Label Principal */}
      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
        {label}
      </h4>

      {/* Subtítulo Opcional */}
      {subtitle && (
        <p className="text-[9px] text-slate-400 font-medium leading-relaxed mt-1 line-clamp-2">
          {subtitle}
        </p>
      )}
    </div>
  );
};