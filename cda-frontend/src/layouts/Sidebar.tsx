import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LogoIcon from '../assets/branding/LogoIcon';
import {
  Home,
  Users,
  BarChart3,
  Settings,
  FileText,
  LogOut,
  AlertTriangle,
  Grid3X3,
} from 'lucide-react';
import { NAV_ITEMS, NavIcon } from '../config/navigation';

/**
 * Mapeamento de ícones (navigation.ts → Lucide)
 */
const iconMap: Record<NavIcon, JSX.Element> = {
  home: <Home size={20} />,
  users: <Users size={20} />,
  chart: <BarChart3 size={20} />,
  settings: <Settings size={20} />,
  target: <BarChart3 size={20} />,
  fileText: <FileText size={20} />,
  alert: <AlertTriangle size={20} />,
  ninebox: <Grid3X3 size={20} />,
  reports: <FileText size={20} />,
};

export const Sidebar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  /**
   * Filtra os itens de navegação conforme o perfil
   * (backend define o perfil, frontend apenas respeita)
   */
  const visibleItems = NAV_ITEMS.filter((item) =>
    user?.perfil ? item.roles.includes(user.perfil) : false
  );

  return (
    <aside
      className="w-20 bg-slate-950 flex flex-col items-center py-8 z-50 border-r border-slate-800/50"
      aria-label="Menu lateral principal"
    >
      {/* Logo */}
      <div className="mb-12 relative">
        <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />
        <LogoIcon className="w-9 h-9 relative z-10" />
      </div>

      {/* Navegação */}
      <nav
        className="flex-1 flex flex-col gap-4 w-full px-3"
        aria-label="Navegação principal"
      >
        {visibleItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={item.label}
            className={({ isActive }) => `
              relative flex items-center justify-center p-3.5 rounded-2xl transition-all duration-300 group
              ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/50'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <div className="relative z-10 transition-transform group-hover:scale-110 group-active:scale-95">
                  {iconMap[item.icon]}
                </div>

                {isActive && (
                  <div className="absolute -left-3 w-1.5 h-8 bg-indigo-500 rounded-r-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                )}

                {/* Tooltip */}
                <span className="absolute left-20 bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-slate-700 shadow-xl">
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-6 border-t border-slate-800/50 w-full px-3">
        <button
          onClick={handleLogout}
          type="button"
          className="w-full flex items-center justify-center p-3.5 rounded-2xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-300 group relative"
          title="Sair do sistema"
        >
          <LogOut size={20} />
          <span className="absolute left-20 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            Sair da Conta
          </span>
        </button>
      </div>
    </aside>
  );
};
