import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { user } = useAuth();

  /**
   * Título dinâmico conforme o perfil vindo do BACKEND
   */
  const getHeaderTitle = () => {
    switch (user?.perfil) {
      case 'ADMIN':
        return 'Dashboard Administrativo';
      case 'GESTOR':
        return 'Painel do Gestor';
      case 'COLABORADOR':
        return 'Minha Performance';
      default:
        return 'Plataforma CDA';
    }
  };

  /**
   * Gera iniciais do nome do usuário
   */
  const getInitials = (name?: string) => {
    if (!name) return '??';

    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }

    return (
      parts[0][0] + parts[parts.length - 1][0]
    ).toUpperCase();
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-10 sticky top-0 z-40">
      {/* Breadcrumb / Contexto */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
          <span className="hover:text-indigo-600 cursor-pointer transition-colors">
            CDA 2026
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900">
            {getHeaderTitle()}
          </span>
        </div>
      </div>

      {/* Ações + Perfil */}
      <div className="flex items-center gap-8">
        {/* Busca */}
        <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl group focus-within:border-indigo-200 focus-within:bg-white transition-all">
          <Search
            size={16}
            className="text-slate-400 group-focus-within:text-indigo-500"
          />
          <input
            type="text"
            placeholder="Buscar informações..."
            className="bg-transparent border-none text-sm focus:ring-0 placeholder:text-slate-400 text-slate-600 w-48 outline-none"
          />
        </div>

        {/* Notificações / Ajuda */}
        <div className="flex items-center gap-2 border-r border-slate-100 pr-6">
          <button
            type="button"
            className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all relative group"
            title="Notificações"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
          </button>

          <button
            type="button"
            className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            title="Central de Ajuda"
          >
            <HelpCircle size={20} />
          </button>
        </div>

        {/* Usuário */}
        <button className="flex items-center gap-3 pl-2 group outline-none">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
              {user?.nome ?? 'Usuário'}
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              {user?.perfil ?? 'Acesso CDA'}
            </p>
          </div>

          <div className="relative">
            <div className="w-10 h-10 rounded-[14px] bg-slate-900 text-white flex items-center justify-center text-xs font-black shadow-lg shadow-slate-200 group-hover:scale-105 group-active:scale-95 transition-all">
              {getInitials(user?.nome)}
            </div>

            {/* Indicador online */}
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          <ChevronDown
            size={14}
            className="text-slate-300 group-hover:text-slate-600 transition-colors"
          />
        </button>
      </div>
    </header>
  );
};
