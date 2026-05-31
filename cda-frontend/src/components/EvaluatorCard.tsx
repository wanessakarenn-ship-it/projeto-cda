import React from 'react';
import { CheckIcon, PendingIcon } from '../assets/icons/StatusIcons';

type AvaliacaoStatus = 'PENDENTE' | 'REALIZADA';

interface EvaluatorCardProps {
  name: string;
  avatar: string;
  percentage: string;
  status: AvaliacaoStatus;
  isMain?: boolean;
}

export const EvaluatorCard: React.FC<EvaluatorCardProps> = ({
  name,
  avatar,
  percentage,
  status,
  isMain = false,
}) => {
  const isPendente = status === 'PENDENTE';

  return (
    <div className="flex flex-col gap-3 min-w-[200px]">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
        {isMain ? 'Avaliador principal' : 'Avaliadores de apoio'}
      </p>

      <div className="flex items-center justify-between">
        {/* Avaliador */}
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt={`Avatar de ${name}`}
            className="w-8 h-8 rounded-full border border-slate-100"
            loading="lazy"
          />
          <span className="text-sm font-bold text-slate-700 truncate max-w-[120px]">
            {name}
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-slate-400">
            ⚖️ {percentage}
          </span>

          <div className="flex items-center gap-1.5">
            {isPendente ? <PendingIcon /> : <CheckIcon />}

            <span
              className={`text-[11px] font-bold ${
                isPendente ? 'text-slate-400' : 'text-emerald-500'
              }`}
            >
              {isPendente ? 'Pendente' : 'Realizada'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
