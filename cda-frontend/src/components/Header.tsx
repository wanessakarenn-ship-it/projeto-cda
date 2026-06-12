import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Search, Settings, MessageSquare, Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavTab {
  label: string;
  path: string;
  roles?: Array<'ADMIN' | 'GESTOR' | 'COLABORADOR'>;
}

const NAV_TABS: NavTab[] = [
  { label: 'Minhas avaliações', path: '/' },
  { label: 'Minha equipe', path: '/gestao', roles: ['GESTOR', 'ADMIN'] },
  { label: 'Relatórios', path: '/gestao/relatorios', roles: ['GESTOR', 'ADMIN'] },
  { label: 'Administração', path: '/admin', roles: ['ADMIN'] },
];

interface HeaderProps {
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getInitials = (name?: string) =>
    name
      ?.trim()
      .split(/\s+/)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) ?? '??';

  const visibleTabs = NAV_TABS.filter(
    (tab) => !tab.roles || tab.roles.includes(user?.perfil ?? 'COLABORADOR')
  );

  return (
    <header className="h-16 bg-[#0B0F19]/80 border-b border-slate-800/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 shrink-0 relative z-40 text-slate-100">
      
      {/* Botão Hambúrguer para Mobile e Nome do App */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors block md:hidden"
          title="Abrir menu"
          aria-label="Abrir menu"
        >
          <Menu size={20} />
        </button>
        <h2 className="text-sm md:text-lg font-black text-white tracking-tight">CDA 2026</h2>
      </div>

      {/* Navegação (Oculta no celular, visível de md para cima) */}
      <nav className="hidden md:flex items-center gap-8 h-full">
        <div className="flex gap-6 h-full">
          {visibleTabs.map(({ label, path }) => {
            const isActive =
              path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(path);

            return (
              <button
                key={label}
                type="button"
                onClick={() => navigate(path)}
                aria-current={isActive ? 'page' : undefined}
                className={`text-[11px] font-black uppercase tracking-wider h-full border-b-2 transition-all ${
                  isActive
                    ? 'border-indigo-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Ações + Perfil */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-5 text-slate-400">
          <button
            type="button"
            title="Buscar"
            aria-label="Buscar"
            className="hover:text-indigo-600 transition-colors"
          >
            <Search size={18} />
          </button>

          <button
            type="button"
            title="Configurações"
            aria-label="Configurações"
            className="hover:text-indigo-600 transition-colors"
          >
            <Settings size={18} />
          </button>

          <button
            type="button"
            title="Notificações"
            aria-label="Notificações"
            className="hover:text-indigo-600 transition-colors relative"
          >
            <MessageSquare size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
          </button>
        </div>

        {/* Perfil */}
        <button
          type="button"
          className="flex items-center gap-3 pl-6 border-l border-slate-800 hover:opacity-80 transition-opacity"
        >
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-200 leading-none">
              {user?.nome ?? 'Usuário'}
            </p>
            <p className="text-[10px] text-slate-500 font-medium uppercase mt-1">
              {user?.perfil ?? 'COLABORADOR'}
            </p>
          </div>

          <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xs font-black border border-indigo-500/20 shadow-sm">
            {getInitials(user?.nome)}
          </div>
        </button>
      </div>
    </header>
  );
};
