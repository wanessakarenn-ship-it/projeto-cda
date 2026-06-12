import React from 'react';

interface ProfileCardProps {
  name: string;
  role: string;
  location?: string;
  avatar?: string;
  orgInfo?: string;
}

const FALLBACK_AVATAR =
  'https://ui-avatars.com/api/?background=EEF2FF&color=6366F1&bold=true&size=128';

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  role,
  location = '—',
  avatar,
  orgInfo = '—',
}) => {
  return (
    <div className="glass-card p-8 border border-slate-800/80 space-y-6 text-left">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Foto de Perfil */}
        <div className="relative">
          <img
            src={avatar || FALLBACK_AVATAR}
            alt={`Foto de perfil de ${name}`}
            onError={(e) => {
              e.currentTarget.src = FALLBACK_AVATAR;
            }}
            className="w-24 h-24 rounded-3xl object-cover border-4 border-slate-800 shadow-md"
          />

          {/* Indicador de status */}
          <span
            aria-label="Usuário ativo"
            title="Usuário ativo"
            className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-[#090D1A] rounded-full"
          />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-200 tracking-tight">
            {name}
          </h2>
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mt-1">
            {role}
          </p>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-800/60">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Localização
          </span>
          <span className="text-sm font-bold text-slate-300">
            {location}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Informação Organizacional
          </span>
          <span className="text-xs font-medium text-slate-400 leading-relaxed">
            {orgInfo}
          </span>
        </div>
      </div>
    </div>
  );
};
